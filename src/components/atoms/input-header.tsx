import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
import { COLORS, FONTFAMILY, SPACING } from '../../../theme';
import CustomIcon from '../../icons/custom-icon';
  
  type InputHeaderProps = {
    searchFunction:(keyword:string)=>void
  }
  
  export const InputHeader = ({searchFunction}:InputHeaderProps) => {
    const [searchInput, setSearchInput] = useState('');
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search your movies"
          placeholderTextColor={COLORS.White}
          value={searchInput}
          onChangeText={textInput => setSearchInput(textInput)}
        />
        <TouchableOpacity style={styles.search} onPress={()=>searchFunction(searchInput)}>
          <CustomIcon name="search" size={20} color={COLORS.Orange} />
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: COLORS.WhiteRGBA32,
      borderRadius: 15,
      paddingVertical: 4,
      paddingHorizontal: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      color: COLORS.White,
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: 14,
      width: '90%',
    },
    search: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: SPACING.space_4,
    },
  });
  