import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS, SPACING} from '../../../theme';

export const LoadingIndicator = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.ScrollViewContainer}>
      <StatusBar backgroundColor={COLORS.Black} />
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollViewContainer: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.Black,
    marginBottom: SPACING.space_36,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHeaderContainer: {
    marginTop: SPACING.space_15 * 2,
    marginHorizontal: SPACING.space_36,
  },
});
