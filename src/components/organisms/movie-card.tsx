import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../../theme';
import {GenreBox, Rating} from '../atoms';

type MovieCard = {
  movie: Movie;
  shouldMarginatedAtEnd: boolean;
  cardFunction: (id: number) => void;
  cardWidth: number;
  isFirst: boolean;
  imagePath: string;
  isLast: boolean;
};

export const MovieCard = ({
  cardFunction,
  cardWidth,
  isFirst,
  isLast,
  movie,
  imagePath,
  shouldMarginatedAtEnd,
}: MovieCard) => {
  return (
    <TouchableOpacity
      onPress={() => cardFunction(movie.id)}
      style={[
        shouldMarginatedAtEnd && isFirst && {marginLeft: SPACING.space_28},
        shouldMarginatedAtEnd && isLast && {marginRight: SPACING.space_28},
      ]}>
      <View style={styles.container}>
        <Image
          source={{uri: imagePath}}
          style={[styles.posterImage, {width: cardWidth}]}
        />
        <View style={styles.contentContainer}>
          <Rating
            voteAvg={Number(movie.vote_average)}
            voteCount={movie.vote_count}
          />
          <Text numberOfLines={1} style={[styles.title, {width: cardWidth}]}>
            {movie.original_title}
          </Text>
          <View style={styles.genreContainer}>
            {movie.genre_ids.map(id => (
              <GenreBox id={id} key={id} />
            ))}
          </View>
        </View>
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
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    textAlign: 'center',
  },
  contentContainer: {
    gap: SPACING.space_16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  genreContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
  },
  genre: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA75,
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_10,
  },
  genreText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    textAlign: 'center',
  },
});
