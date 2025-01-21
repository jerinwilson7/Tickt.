import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../../../theme';
import CustomIcon from '../../icons/custom-icon';

type AuthButtonProps = {
  buttonText: string;
  backgroundColor?: string;
  bordered?: boolean;
  iconName?: string;
  action: () => void;
};

export const AuthButton = ({
  buttonText,
  action,
  iconName,
  backgroundColor,
  bordered,
}: AuthButtonProps) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        styles.authButton,
        backgroundColor && {backgroundColor},
        bordered && {borderWidth: 2, borderColor: COLORS.WhiteRGBA75},
      ]}>
      {iconName && <CustomIcon name={iconName} color="white" size={20} />}
      <Text style={styles.authButtonCtx}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  authButton: {
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_4 * 4,
  },
  authButtonCtx: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
    fontSize: FONTSIZE.size_16,
  },
});
