import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { COLORS, FONTFAMILY, SPACING } from '../../../theme';
import { useLogin } from '../../hooks/api/auth/useLogin';
import { RootStackParamList } from '../../navigation/navigation';
import { useAuth } from '../../providers';
import { loginSchema, SignInForm } from '../../schemas';
import { CustomError } from '../../utils/error';
import { AuthButton } from '../atoms';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginForm {
  navigationAction:()=>void
}

export const LoginForm = ({navigationAction}:LoginForm) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { signIn,signOut, setIsAuthenticating, isAuthenticating} = useAuth();
  const {mutateAsync:login,isPending:isLoggingIn} = useLogin()
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<SignInForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      if (!signIn) return;
      setIsAuthenticating(true);

      const existingUser = await signIn(data.email, data.password);
            
      const email = existingUser.user.email!
      const token = await existingUser.user.getIdToken();
      const uid = existingUser.user.uid;

      await login(
        {email, token, uid},
        {
          onError: error => {
            console.log('Login API error:', error);
            signOut
          },
          onSuccess:()=>{
            Toast.show({
              text1:'Login success',
              type:'success'
            })
          }
        },
      );
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred during login';
      let statusCode = 500;

      if (error instanceof CustomError) {
        errorMessage = error.message || errorMessage;
        statusCode = error.status;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      setLoginError(errorMessage);
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
        buttonText="Loginx"
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
