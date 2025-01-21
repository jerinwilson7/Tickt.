import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../../../theme';

type SubMovieCard = {
  movie: Movie;
  shouldMarginatedAtEnd?: boolean;
  shouldMarginatedAround?: boolean;
  cardFunction: (id:number) => void;
  cardWidth: number;
  isFirst?: boolean;
  isLast?: boolean;
  imagePath: string;
};

export const SubMovieCard = ({
  cardFunction,
  imagePath,
  cardWidth,
  isFirst,
  isLast,
  movie,
  shouldMarginatedAround,
  shouldMarginatedAtEnd,
}: SubMovieCard) => {
  return (
    <TouchableOpacity
    onPress={()=>cardFunction(movie.id)}
      style={[
        shouldMarginatedAtEnd && isFirst && {marginLeft: SPACING.space_28},
        shouldMarginatedAtEnd && isLast && {marginRight: SPACING.space_28},
        shouldMarginatedAround && {margin:SPACING.space_12},
        {maxWidth:cardWidth}
      ]}>
      <View style={styles.container}>
        <Image
          source={{uri: imagePath}}
          style={[styles.posterImage]}
        />
        <Text numberOfLines={1} style={[styles.title, {width: cardWidth}]}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.space_12,
    flex: 1,
    backgroundColor: 'black',
  },
  posterImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
    
  },
  title: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    textAlign: 'center',
  },
});
