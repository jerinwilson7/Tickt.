import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { COLORS, FONTFAMILY, SPACING } from '../../../theme';
import { useRegister } from '../../hooks/api/auth/useRegister';
import { RootStackParamList } from '../../navigation/navigation';
import { useAuth } from '../../providers';
import { registerSchema, SignUpForm } from '../../schemas';
import { CustomError } from '../../utils/error';
import { AuthButton } from '../atoms';

type RegisterFormProps = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>(
    'An unexpected error occurred during register',
  );
  const {setIsAuthenticating, user, signOut, signUp} = useAuth();
  const {mutateAsync: register, isPending} = useRegister();

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<SignUpForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
  try {
    if (!signUp) return;

    setIsAuthenticating(true);
    const userCredentials = await signUp(data.email, data.password);

    await register(
      {
        email: userCredentials.user.email!,
        uid: userCredentials.user.uid,
      },
      {
        onError: () => {
          setErrorMessage('Server authentication failed');
          Toast.show({
            type: 'error',
            text1: errorMessage,
          });
          if (user) {
            signOut();
            userCredentials.user.delete();
          }
        },
        onSuccess: () => {
          Toast.show({
            text1: 'User registered successfully',
            type: 'success',
          });
        },
      },
    );
  } catch (error: any) {
    if (user) {
      user.delete(); 
    }

    if (error instanceof CustomError) {
      setErrorMessage(error.message);
    } else if (error instanceof Error) {
      setErrorMessage(error.message); 
    }

    Toast.show({
      type: 'error',
      text1: errorMessage, 
    });
  } finally {
    setIsAuthenticating(false); 
  }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor={COLORS.White}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{required: true}}
          name="password"
          render={({field: {onBlur, onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={COLORS.White}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <AuthButton
        buttonText="Create Account"
        backgroundColor={COLORS.Orange}
        action={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    width: '90%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA32,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    gap: SPACING.space_20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
