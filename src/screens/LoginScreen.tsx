import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme';
import { getBackground } from '../api/services/TMDB';
import { baseImagePath } from '../api/TMDB';
import { AuthButton } from '../components/atoms';
import { LoginForm } from '../components/molecules';
import { RootStackParamList } from '../navigation/navigation';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation, route}: LoginProps) => {
  const [backdropImage, setBackdropImage] = useState();


  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const tempBackground = await getBackground();
        setBackdropImage(tempBackground);
      } catch (error) {
        console.log('Error fetching background image for Login');
      }
    };
    fetchBackground();
  }, []);

  const handleNavigation = async () => {
  
      navigation.navigate('Tab');
  };

  const handleOktaSignIn = async () => {
    try {
      // Initiate the sign-in flow
      console.log('hai')
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{uri: baseImagePath('original', backdropImage!)}}
        style={styles.bgImage}>
        <LinearGradient
          colors={[COLORS.BlackRGB10, COLORS.Black]}
          style={styles.linearGradient}>
          <View style={styles.header}>
            <Text style={styles.title}>TICKT</Text>
            <Text style={styles.dot}>.</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.registerTextContainer}>
        <Text style={styles.registerTitle}>Welcome Back!</Text>
        <Text style={styles.registerTagline}>
          Log in to book your next movie adventure.
        </Text>
      </View>
      <View style={styles.credentialContainer}>
        <LoginForm navigationAction={handleNavigation} />

        <View style={styles.rulerContainer}>
          <View style={styles.ruler} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.ruler} />
        </View>

        <View style={{gap: SPACING.space_12}}>
          <AuthButton
            buttonText="Sign in with Facebook"
            bordered
            action={handleNavigation}
          />
          <AuthButton
            buttonText="Sign in with Google"
            bordered
            action={handleOktaSignIn}
          />
        </View>
        <TouchableOpacity onPress={()=>navigation.push('Register')}>
        <Text style={styles.redirectText}>
          New to Tickt.? Create an Account.
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    aspectRatio: 3072 / 1527,
    position: 'absolute',
    top: 0,
  },
  linearGradient: {
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.space_15 * 2,
    marginHorizontal: SPACING.space_36 + 2,
  },
  registerTextContainer: {
    paddingHorizontal: SPACING.space_10 * 9,
  },
  registerTitle: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    textAlign: 'center',
  },

  registerTagline: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.WhiteRGBA50,
    textAlign: 'center',
  },
  input: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    width: '90%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA32,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  credentialContainer: {
    paddingHorizontal: 25,
    marginTop: SPACING.space_20,
    gap: SPACING.space_20,
  },
  rulerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruler: {
    height: 2,
    width: '40%',
    backgroundColor: 'white',
  },
  or: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    paddingHorizontal: 10,
  },
  redirectText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.WhiteRGBA50,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    letterSpacing: 6,
    textAlign: 'left',
  },
  dot: {
    color: COLORS.Orange,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_24,
    paddingLeft: SPACING.space_4,
  },
});

export default LoginScreen;
