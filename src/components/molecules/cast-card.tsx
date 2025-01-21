import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../../../theme';
import {baseImagePath} from '../../api/TMDB';

type CastProps = {
  castDetails: Cast;
  width: number;
};

export const CastCard = ({castDetails, width}: CastProps) => {
  return (
    <View style={styles.castImageContainer} key={castDetails.cast_id}>
      <Image
        style={styles.castImage}
        source={{uri: baseImagePath('w185', castDetails.profile_path)}}
      />
      <Text style={styles.castName}>{castDetails.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  castContainer: {
    marginTop: SPACING.space_15,
    marginHorizontal: SPACING.space_24,
    gap: SPACING.space_16,
    marginBottom: 32,
  },
  castHeader: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    alignItems: 'center',
  },
  castImageContainer: {
    gap: SPACING.space_4,
  },
  castImage: {
    width: 80,
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25,
  },
  castName: {
    color: 'white',
    maxWidth: 80,
    fontSize: FONTSIZE.size_12,
  },
});
