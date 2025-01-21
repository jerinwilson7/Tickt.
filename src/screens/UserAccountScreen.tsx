import {Text, View, StyleSheet, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { TabRootParamList } from '../navigation/tab-navigation';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { SPACING } from '../../theme';

type AccountProps = NativeStackScreenProps<TabRootParamList, 'User'>;

export const UserAccountScreen = ({navigation, route}: AccountProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header
          action={() => navigation.goBack()}
          iconName="close"
          title="My Profile"
        />
      </View>

      <View style={styles.profileContainer}>
        <Image
        style={styles.profileImage}
          source={{
            uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
        />
      <Text style={styles.profileName}>Zara</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    marginTop: SPACING.space_15 * 2,
    marginHorizontal: SPACING.space_36 + 2,
  },

  profileContainer: {
    width:'100%',
    alignItems:'center',
    marginTop:SPACING.space_20 * 2,
    gap:SPACING.space_12
  },
  profileImage: {
    height:80,
    width:80,
    borderRadius:100
  },
  profileName: {
    color:'white',
    fontSize:16,
  },
});
