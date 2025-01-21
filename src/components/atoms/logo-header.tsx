import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../theme'

export const LogoHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TICKT</Text>
      <Text style={styles.dot}>.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:SPACING.space_32,
        flexDirection:'row',
        gap:SPACING.space_4,
        alignItems:'center'
    },
    title:{
        color:COLORS.White,
        fontFamily:FONTFAMILY.poppins_bold,
        fontSize:FONTSIZE.size_24,
        letterSpacing:1.5
    },
    dot:{
        color:COLORS.Orange,
        fontFamily:FONTFAMILY.poppins_bold,
        fontSize:FONTSIZE.size_18 + 10,
        letterSpacing:1.5
    }
})