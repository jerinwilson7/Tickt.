import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { SPACING } from '../../theme';
import { getPopular } from '../api/services/TMDB';
import { baseImagePath, searchMovies } from '../api/TMDB';
import { InputHeader } from '../components/atoms';
import { SubMovieCard } from '../components/organisms';
import { RootStackParamList } from '../navigation/navigation';

export const SearchScreen = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | undefined>();

  useEffect(() => {
    (async () => {
      let searchMovies = await getPopular();
      setFilteredMovies(searchMovies.results);
    })();
  }, []);

  const stackNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {width, height} = Dimensions.get('screen');

  const handleSearch = async(keyword:string)=>{
    const filteredData = await fetch(searchMovies(keyword))
    const movies = await filteredData.json();
    setFilteredMovies(movies.results)
  }

  return (
    <View
      style={styles.container}>
      <View>
        <FlatList
          data={filteredMovies}
          keyExtractor={(item: Movie) => String(item.id)}
          contentContainerStyle={styles.centerContentContainer}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.inputContainer}>
            <InputHeader searchFunction={handleSearch}/>
          </View>
          }
          renderItem={({item}) => (
            <SubMovieCard
              movie={{...item}}
              shouldMarginatedAround
              cardFunction={() =>
                stackNavigation.push('MovieDetails', {id: item.id})
              }
              cardWidth={width / 2 - SPACING.space_12 * 2}
             
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems:'center'
  },
  inputContainer: {
    paddingHorizontal: SPACING.space_36,
    paddingTop: SPACING.space_36,
    display:'flex'
  },
  centerContentContainer:{
    alignItems:'center',
    gap:40
  }
});
