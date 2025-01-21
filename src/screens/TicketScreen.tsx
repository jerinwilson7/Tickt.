import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme';
import {baseImagePath} from '../api/TMDB';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../icons/custom-icon';
import { RootStackParamList } from '../navigation/navigation';
import { Header } from 'react-native/Libraries/NewAppScreen';

type TicketProps = NativeStackScreenProps<RootStackParamList, 'Tickets'>;

export const TicketScreen = ({navigation}: TicketProps) => {
  const [ticketDetails, setTicketDetails] = useState<
    BookingDetails | undefined
  >();

  useEffect(() => {
    (async () => {
      try {
        const ticketData = await EncryptedStorage.getItem('ticket');
        if (ticketData) {
          setTicketDetails(JSON.parse(ticketData));
        }
      } catch (error) {
        console.log('Error fetching ticket details');
      }
    })();
  }, []);

  if (!ticketDetails) {
    return (
      <ScrollView
        style={styles.ScrollViewContainer}
        contentContainerStyle={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <Header
            action={() => navigation.goBack()}
            iconName="close"
            title="My Tickets"
          />
        </View>
      </ScrollView>
    );
  }

  const seats = ticketDetails.selectedSeats.map(seat => seat.number).join(',');

  return (
    <ScrollView
      style={styles.ScrollViewContainer}
      contentContainerStyle={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Header
          action={() => navigation.goBack()}
          iconName="close"
          title="My Tickets"
        />
      </View>
      <View style={styles.ticketMainContainer}>
        <ImageBackground
          source={{
            uri: baseImagePath('original', ticketDetails.movie.poster_path),
          }}
          style={styles.ticketImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View style={[styles.blackCircle, styles.blackCircleLeft]}></View>
            <View style={[styles.blackCircle, styles.blackCircleRight]}></View>
          </LinearGradient>
        </ImageBackground>

          <View style={styles.borderStyle}></View>

        <View style={styles.ticketFooterContainer}>
          <View style={[styles.blackCircle, {top: -55, left: -45}]}></View>
          <View style={[styles.blackCircle, {top: -55, right: -45}]}></View>
          <View style={styles.timeDateContainer}>
            <View>
              <Text style={styles.dateText}>{ticketDetails.date.date}</Text>
              <Text style={styles.dayText}>{ticketDetails.date.day}</Text>
            </View>
            <View>
              <CustomIcon
                style={styles.clock}
                name="clock"
                size={24}
                color="white"
              />
              <Text style={styles.dayText}>{ticketDetails.date.day}</Text>
            </View>
          </View>
          <View style={styles.seatingContainer}>
            <View>
              <Text style={styles.dateText}>Hall</Text>
              <Text style={styles.dayText}>02</Text>
            </View>
            <View>
              <Text style={styles.dateText}>Row</Text>
              <Text style={styles.dayText}>04</Text>
            </View>
            <View>
              <Text style={styles.dateText}>Seats</Text>
              <Text style={styles.dayText}>{seats}</Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollViewContainer: {
    backgroundColor: 'black',
    paddingBottom: 32,
  },
  borderStyle:{
    borderWidth:2,
    borderColor:'black',
    borderStyle:'dashed',
    height:1,
    backgroundColor:COLORS.Orange,
    position:'absolute',
    top:'60%',
    width:300
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingBottom: 32,
  },

  header: {
    marginTop: SPACING.space_15 * 4,
    marginHorizontal: SPACING.space_36 + 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ticketMainContainer: {
    flex: 1,
    marginTop:SPACING.space_20 * 2,
    alignItems: 'center',
  },
  ticketImage: {
    aspectRatio: 200 / 300,
    width: 300,
    borderTopRightRadius: BORDERRADIUS.radius_15 * 2,
    borderTopLeftRadius: BORDERRADIUS.radius_15 * 2,
    overflow: 'hidden',
  },
  linearGradient: {
    height: '100%',
  },
  blackCircle: {
    backgroundColor: 'black',
    height: 80,
    width: 80,
    position: 'absolute',
    borderRadius: 100,
    zIndex: 100,
  },
  blackCircleLeft: {
    bottom: -25,
    left: -45,
  },
  blackCircleRight: {
    bottom: -25,
    right: -45,
  },
  ticketFooterContainer: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    top: -1,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  timeDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
  },
  clock: {
    paddingTop: 8,
    paddingBottom: SPACING.space_12,
  },

  dayText: {
    color: 'white',
    fontSize: FONTSIZE.size_12,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  seatingContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_4,
    gap: SPACING.space_36 + 2,
    marginBottom:SPACING.space_16
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
});
