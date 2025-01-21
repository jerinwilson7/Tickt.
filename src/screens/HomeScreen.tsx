import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {baseImagePath} from '../api/TMDB';
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from '../services/TMDB';
import {RootStackParamList} from '../navigation/navigation';
import {TabRootParamList} from '../navigation/tab-navigation';
import {COLORS, SPACING} from '../../theme';
import {
  CategoryHeader,
  LoadingIndicator,
  LogoHeader,
} from '../components/atoms';
import {MovieCard, SubMovieCard} from '../components/organisms';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

type HomeProps = NativeStackScreenProps<TabRootParamList, 'Home'>;

export const HomeScreen = ({navigation}: HomeProps) => {
  const [nowPlaying, setNowPlaying] = useState<Movie[] | undefined>(undefined);
  const [upcoming, setUpcoming] = useState<Movie[] | undefined>(undefined);
  const [popular, setPopular] = useState<Movie[] | undefined>(undefined);
  const [topRated, setTopRated] = useState<Movie[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempNowPlaying = await getNowPlaying();
        setNowPlaying(tempNowPlaying.results);

        const tempUpcoming = await getUpcoming();
        setUpcoming(tempUpcoming.results);

        const tempPopular = await getPopular();
        setPopular(tempPopular.results);

        const tempTopRated = await getTopRated();
        setTopRated(tempTopRated.results);
      } catch (error) {
        console.error('Error fetching movie data: ', error);
      }
    };

    fetchData();
  }, []);

  const stackNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!nowPlaying && !upcoming && !popular && !topRated) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <LogoHeader />
      <ScrollView
        style={styles.ScrollViewContainer}
        contentContainerStyle={styles.container}>
        <StatusBar backgroundColor={COLORS.Black} />
        <CategoryHeader title="Now Playing" />
        <FlatList
          horizontal
          data={nowPlaying}
          keyExtractor={item => item.id.toString()}
          decelerationRate={0}
          pagingEnabled
          snapToInterval={width * 0.7 + SPACING.space_36}
          snapToAlignment="center"
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <MovieCard
              movie={{...item, genre_ids: item.genre_ids.slice(0, 3)}}
              cardFunction={() =>
                stackNavigation.push('MovieDetails', {id: item.id})
              }
              cardWidth={width * 0.7}
              isFirst={index === 0}
              isLast={index === popular?.length! - 1}
              shouldMarginatedAtEnd
              imagePath={baseImagePath('w780', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title="Popular" />
        <FlatList
          horizontal
          data={popular}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              movie={{...item}}
              cardFunction={() =>
                stackNavigation.push('MovieDetails', {id: item.id})
              }
              cardWidth={width / 3}
              isFirst={index === 0}
              isLast={index === popular?.length! - 1}
              shouldMarginatedAtEnd
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title="Upcoming" />
        <FlatList
          horizontal
          data={upcoming}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              movie={{...item}}
              cardFunction={() =>
                stackNavigation.push('MovieDetails', {id: item.id})
              }
              cardWidth={width / 3}
              isFirst={index === 0}
              isLast={index === upcoming?.length! - 1}
              shouldMarginatedAtEnd
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title="Top Rated" />
        <FlatList
          horizontal
          data={topRated}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              movie={{...item}}
              cardFunction={() =>
                stackNavigation.push('MovieDetails', {id: item.id})
              }
              cardWidth={width / 3}
              isFirst={index === 0}
              isLast={index === upcoming?.length! - 1}
              shouldMarginatedAtEnd
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ScrollViewContainer: {
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: COLORS.Black,
    marginBottom: SPACING.space_36,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  inputHeaderContainer: {
    marginTop: SPACING.space_15 * 2,
    marginHorizontal: SPACING.space_36,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
