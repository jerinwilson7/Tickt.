import {StyleSheet, Text, View} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../theme';
import { GENRE_LIST } from '../../constants/genre';

type GenreBoxProps = {
    id:number
}
export const GenreBox = ({id}:GenreBoxProps) => {
  return (
    <View style={styles.genre}>
      <Text style={styles.genreText}>{GENRE_LIST[id]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
     genre: {
        borderWidth:1,
        borderColor:COLORS.WhiteRGBA75,
        paddingHorizontal:SPACING.space_8,
        paddingVertical:SPACING.space_4,
        borderRadius:BORDERRADIUS.radius_10
      },
      genreText: {
        color:'white',
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize:FONTSIZE.size_12,
        textAlign:'center'
      },
});
