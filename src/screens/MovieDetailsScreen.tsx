import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme';
import {baseImagePath} from '../api/TMDB';
import {GenreBox, LoadingIndicator, Rating} from '../components/atoms';
import {CastCard} from '../components/molecules/cast-card';
import CustomIcon from '../icons/custom-icon';
import {RootStackParamList} from '../navigation/navigation';
import {getCast, getMovie} from '../services/TMDB';
import {formatDate} from '../utils/date';

type MovieDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

const MovieDetailsScreen = ({route}: MovieDetailProps) => {
  const {id} = route.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[] | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    (async () => {
      try {
        const details = await getMovie(id);
        setMovieDetails(details);

        const castDetails = await getCast(id);
        setCast(castDetails.cast);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    })();
  }, [id]);

  if (
    movieDetails === null ||
    movieDetails === undefined ||
    cast === undefined ||
    cast === null
  ) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={{paddingBottom: 32}}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      <View style={styles.detailContainer}>
        <ImageBackground
          style={styles.backdrop}
          source={{uri: baseImagePath('original', movieDetails.backdrop_path)}}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.header}>
              <Header
                iconName="close"
                action={() => navigation.goBack()}
                title=""
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={[styles.posterContainer]}></View>
        <Image
          source={{uri: baseImagePath('w342', movieDetails.poster_path)}}
          style={styles.posterImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.runtimeContainer}>
          <CustomIcon name="clock" size={18} color={COLORS.WhiteRGBA75} />
          <Text style={styles.runtimeText}>
            {Math.floor(movieDetails?.runtime / 60)}h{' '}
            {Math.floor(movieDetails?.runtime % 60)}m
          </Text>
        </View>

        <Text style={styles.title}>{movieDetails.title}</Text>

        <View style={styles.genreContainer}>
          {movieDetails.genres.map(genre => (
            <GenreBox id={genre.id} key={genre.id} />
          ))}
        </View>

        <Text style={styles.tagline}>{movieDetails.tagline}</Text>
      </View>

      <View style={styles.aboutContainer}>
        <View style={styles.releaseRatingContainer}>
          <Rating
            voteAvg={movieDetails.vote_average}
            voteCount={movieDetails.vote_count}
          />
          <Text style={styles.releaseDate}>
            {formatDate(movieDetails.release_date)}
          </Text>
        </View>
        <Text style={styles.overView}>{movieDetails.overview}</Text>
      </View>

      <View style={styles.castContainer}>
        <Text style={styles.castHeader}>Top Cast</Text>
        <FlatList
          horizontal
          data={cast}
          decelerationRate={0}
          pagingEnabled
          contentContainerStyle={{gap: SPACING.space_36}}
          keyExtractor={(item: Cast) => item.cast_id}
          renderItem={({item, index}) => (
            <CastCard castDetails={{...item}} width={80} />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.push('SeatBooking', {
              movie: movieDetails,
            })
          }>
          <Text style={styles.buttonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollViewContainer: {
    backgroundColor: 'black',
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingBottom: 32,
  },
  detailContainer: {
    backgroundColor: 'black',
  },

  header: {
    marginTop: SPACING.space_15 * 2,
    marginHorizontal: SPACING.space_36 + 2,
  },

  backdrop: {
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  posterImage: {
    position: 'absolute',
    aspectRatio: 220 / 350,
    width: '70%',
    alignSelf: 'center',
    top: '15%',
  },
  posterContainer: {
    aspectRatio: 2402 / 1727,
  },
  contentContainer: {
    gap: SPACING.space_15,
    flex: 1,
    alignItems: 'center',
    marginTop: SPACING.space_16,
  },

  runtimeContainer: {
    flexDirection: 'row',
    gap: SPACING.space_8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  runtimeText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
  title: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    textAlign: 'center',
  },
  genreContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
  },
  tagline: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_thin,
    fontStyle: 'italic',
    fontSize: FONTSIZE.size_16,
    fontWeight: '300',
    marginHorizontal: SPACING.space_24,
  },
  aboutContainer: {
    marginHorizontal: SPACING.space_24,
    marginTop: SPACING.space_15,
    gap: 5,
  },
  releaseRatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
  },

  releaseDate: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
  overView: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    lineHeight: 20,
  },
  castContainer: {
    marginTop: SPACING.space_15,
    marginHorizontal: SPACING.space_24,
    gap: SPACING.space_16,
  },
  castHeader: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    alignItems: 'center',
  },
  castImageContainer: {},
  castImage: {
    width: 80,
    height: 75,
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_36,
  },
  button: {
    backgroundColor: COLORS.Orange,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    color: 'white',
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default MovieDetailsScreen;
