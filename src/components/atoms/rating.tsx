import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../../theme';
import CustomIcon from '../../icons/custom-icon';


type RatingProps = {
  voteAvg: number;
  voteCount: number;
};

export const Rating = ({voteAvg, voteCount}: RatingProps) => {
  return (
    <View style={styles.ratingContainer}>
      <CustomIcon name="star" size={20} color={COLORS.Yellow} />
      <Text style={styles.rating}>
        {Number(voteAvg).toFixed(1)} ({voteCount})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
    ratingContainer: {
      gap: SPACING.space_4,
      flexDirection: 'row',
    },
});
