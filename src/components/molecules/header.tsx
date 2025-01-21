import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../../theme';
import CustomIcon from '../../icons/custom-icon';

interface HeaderProps {
  title: string;
  iconName?: string;
  action?: () => void;
}

export const Header = ({action, iconName, title}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={action} style={styles.iconContainer}>
       {iconName && <CustomIcon name={iconName} size={24} color="white" />}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign:'center',
  },
  iconContainer: {
    backgroundColor: COLORS.Orange,
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_10 * 10,
  },
});
