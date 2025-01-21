import { useEffect, useState } from 'react';
import {
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme';
import { baseImagePath } from '../api/TMDB';
import { AuthButton } from '../components/atoms';
import { getBackground } from '../services/TMDB';
  
  export const RegisterScreen = () => {
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
  
    return (
      <View style={styles.container}>
        <StatusBar translucent />
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
          <Text style={styles.registerTitle}>Join Tickt Today!</Text>
          <Text style={styles.registerTagline}>
            Sign up to secure your seat at the movies.
          </Text>
        </View>
        <View style={styles.credentiallContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor={COLORS.White}
              // value={searchInput}
              // onChangeText={textInput => setSearchInput(textInput)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={COLORS.White}
              // value={searchInput}
              // onChangeText={textInput => setSearchInput(textInput)}
            />
          </View>
  
          <AuthButton
            buttonText="Create Account"
            backgroundColor={COLORS.Orange}
            action={()=>{}}
          />
  
          <View style={styles.rulerContainer}>
            <View style={styles.ruler} />
            <Text style={styles.or}>OR</Text>
            <View style={styles.ruler} />
          </View>
  
          <View style={{gap: SPACING.space_12}}>
            <AuthButton buttonText="Sign up with Facebook" bordered  action={()=>{}}/>
            <AuthButton buttonText="Sign up with Google" bordered  action={()=>{}}/>
          </View>
          <Text style={styles.redirectText}>
            Already have an account? Sign In.
          </Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.Black,
      alignItems: 'center',
      justifyContent: 'center',
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
      paddingVertical: 4,
      paddingHorizontal: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    credentiallContainer: {
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
  
  