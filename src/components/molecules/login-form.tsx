import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, SPACING} from '../../../theme';
import {AuthButton} from '../atoms';

export const LoginForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          placeholderTextColor={COLORS.White}
          // value={searchInput}
          // onChangeText={textInput => setSearchInput(textInput)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={COLORS.White}
          // value={searchInput}
          // onChangeText={textInput => setSearchInput(textInput)}
        />
      </View>

      <AuthButton
        buttonText="Login"
        backgroundColor={COLORS.Orange}
        action={() => {}}
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
  container:{
    gap:SPACING.space_20
  }
});
