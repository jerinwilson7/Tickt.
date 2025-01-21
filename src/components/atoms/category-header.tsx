import {StyleSheet, Text} from 'react-native';
import {FONTFAMILY, FONTSIZE, SPACING} from '../../../theme';

type CategoryHeader = {
  title: string;
};

export const CategoryHeader = ({title}: CategoryHeader) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingTop: SPACING.space_36,
    paddingLeft: SPACING.space_28,
    paddingBottom: SPACING.space_24,
  },
});
