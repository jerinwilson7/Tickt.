import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../../theme';

type DateListProps = {
  dateObject: DateDay;
  isSelected: boolean;
  onSelect: (date: number) => void;
};

export const DateList = ({dateObject, isSelected, onSelect}: DateListProps) => {
  return (
    <TouchableOpacity
      style={[styles.dateBox, isSelected && {backgroundColor: COLORS.Orange}]}
      onPress={() => onSelect(dateObject.date)}>
      <Text style={styles.dateText}>{dateObject.date}</Text>
      <Text style={styles.dayText}>{dateObject.day}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    paddingTop: SPACING.space_16,
    paddingBottom: SPACING.space_18,
    backgroundColor: COLORS.WhiteRGBA32,
    paddingHorizontal: SPACING.space_18,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  dateText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontWeight: '500',
    fontSize: FONTSIZE.size_24,
  },
  dayText: {
    color: 'white',
    fontSize: FONTSIZE.size_12,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});
