import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../../theme';

type TimeListProps = {
    time:string,
    isSelected:boolean
    onTimeSelect:(time:string)=>void
}

export const TimeList = ({isSelected,onTimeSelect,time}:TimeListProps) => {
  return (
    <TouchableOpacity onPress={()=>onTimeSelect(time)} style={[styles.TimeBox,isSelected && {backgroundColor:COLORS.Orange}]}>
      <Text style={[styles.TimeText,isSelected && {color:'white'}]}>{time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
      TimeBox: {
        paddingTop: SPACING.space_10,
        paddingBottom: SPACING.space_8,
        backgroundColor: COLORS.Black,
        borderWidth:1,
        borderColor:COLORS.Grey,
        paddingHorizontal: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15 * 2,
      },
      TimeText: {
        color: COLORS.WhiteRGBA50,
        fontFamily: FONTFAMILY.poppins_medium,
        fontWeight: '400',
        fontSize: FONTSIZE.size_14,
        textAlign:'center'
      },
});
