import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
  } from 'react-native';
  import {generateDate} from '../utils/date';
  import {
    NativeStackScreenProps,
  } from '@react-navigation/native-stack';
  import {generateSeats} from '../utils/seat-booking';
  import {useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
  } from '../../theme';
  import CustomIcon from '../icons/custom-icon';
  import {TIME} from '../constants/ticket';
  import {baseImagePath} from '../api/TMDB';
  import EncryptedStorage from 'react-native-encrypted-storage';
import { RootStackParamList } from '../navigation/navigation';
import { Header } from '../components/molecules';
import { DateList, TimeList } from '../components/atoms';
  
  type SeatBookingProp = NativeStackScreenProps<
    RootStackParamList,
    'SeatBooking'
  >;
  
  export const SeatBookingScreen = ({route, navigation}: SeatBookingProp) => {
    const [seats, setSeats] = useState<Seat[][]>(generateSeats());
    const [selectedSeats, setSelectedSeats] = useState<Seat[] | undefined>();
    const [dates, setDates] = useState<DateDay[]>(generateDate());
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedTime, setSelectedTime] = useState(TIME[0]);
    const [price, setPrice] = useState(0);
    const [bookingDetails, setBookingDetails] = useState<
      BookingDetails | undefined
    >();
  
    const {movie} = route.params;

    const selectSeat = (seat: Seat, rowIndex: number, colIndex: number) => {
      if (seat.taken) return;
      const newSeating = seats.map((row, rowIdx) =>
        rowIdx === rowIndex
          ? row.map((item, colIdx) =>
              colIdx === colIndex ? {...item, selected: !item.selected} : item,
            )
          : row,
      );
      const newSelectedSeats = newSeating.flatMap(row =>
        row.filter(seat => seat.selected),
      );
      setSeats(newSeating);
      setPrice(newSelectedSeats.length * 135);
      setSelectedSeats(newSelectedSeats);
    };

    const onSelectDate = (selectedDate: number) => {
      const getSelectedDate = dates.find(date => date.date === selectedDate);
      console.log('GET', getSelectedDate);
      setSelectedDate(getSelectedDate || dates[0]);
    };

    const onSelectTime = (selectedTime: string) => {
      const getSelectedTime = TIME.find(time => time === selectedTime);
      -setSelectedTime(getSelectedTime || TIME[0]);
    };
  
    const bookSeats = async () => {
      if (!selectedSeats?.length ) {
        ToastAndroid.showWithGravity(
          'Please seats, date and time of the show',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        return;
      }
      try {
        setBookingDetails({
          selectedSeats,
          time: selectedTime,
          date: selectedDate,
          movie,
        });
        await EncryptedStorage.setItem('ticket', JSON.stringify(bookingDetails));
      } catch (error) {
        console.log('ERROR booking tickets');
      }

      if (bookingDetails)
        navigation.navigate('Tickets', {ticketDetails: bookingDetails});
    };

    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <StatusBar hidden />
        <View>
          <ImageBackground
            source={{uri: baseImagePath('original', movie.backdrop_path)}}
            style={styles.bgImage}>
            <LinearGradient
              colors={[COLORS.BlackRGB10, COLORS.Black]}
              style={styles.linearGradient}>
              <View style={styles.header}>
                <Header
                  iconName="close"
                  action={() => navigation.goBack()}
                  title=""
                />
              </View>
            </LinearGradient>
          </ImageBackground>
          <Text style={styles.screenText}>Screen this side</Text>
        </View>

        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {seats.map((item, rowIndex) => (
              <View key={rowIndex} style={styles.seatRow}>
                {item.map((seat, colIndex) => (
                  <TouchableOpacity
                    key={seat.number}
                    onPress={() => selectSeat(seat, rowIndex, colIndex)}>
                    <CustomIcon
                      name="seat"
                      size={20}
                      style={[
                        styles.seatIcon,
                        seat.taken && {color: COLORS.WhiteRGBA15},
                        seat.selected && {color: COLORS.Orange},
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.seatIndicatorContainer}>
          <View style={styles.seatIndicator}>
            <CustomIcon name="radio" size={20} color="white" />
            <Text style={styles.indicatorText}>Available</Text>
          </View>
          <View style={styles.seatIndicator}>
            <CustomIcon name="radio" size={20} color={COLORS.Grey} />
            <Text style={styles.indicatorText}>Taken</Text>
          </View>
          <View style={styles.seatIndicator}>
            <CustomIcon name="radio" size={20} color={COLORS.Orange} />
            <Text style={styles.indicatorText}>Selected</Text>
          </View>
        </View>
  
        <View style={styles.dateContainer}>
          <FlatList
            horizontal
            decelerationRate={0}
            pagingEnabled
            snapToAlignment="center"
            data={dates}
            contentContainerStyle={{gap: 10}}
            keyExtractor={item => item.day}
            renderItem={({item}) => (
              <DateList
                onSelect={onSelectDate}
                dateObject={item}
                isSelected={selectedDate.day === item.day}
              />
            )}
          />
        </View>
  
        <View style={styles.timeContainer}>
          <FlatList
            horizontal
            decelerationRate={0}
            pagingEnabled
            snapToAlignment="center"
            data={TIME}
            contentContainerStyle={{gap: 10}}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TimeList
                onTimeSelect={onSelectTime}
                time={item}
                isSelected={selectedTime === item}
              />
            )}
          />
        </View>
        {price > 0 && (
          <View style={styles.buttonContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceTitle}>Total Price</Text>
              <Text style={styles.price}>Rs {price}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={bookSeats}>
              <Text style={styles.buyButtonText}>Buy Tickets</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
    },
    bgImage: {
      width: '100%',
      aspectRatio: 3072 / 1727,
    },
    linearGradient: {
      height: '100%',
    },
    header: {
      marginTop: SPACING.space_15 * 2,
      marginHorizontal: SPACING.space_36 + 2,
    },
    screenText: {
      color: COLORS.WhiteRGBA50,
      fontSize: FONTSIZE.size_10,
      fontFamily: FONTFAMILY.poppins_regular,
      textAlign: 'center',
    },
    seatContainer: {
      marginVertical: SPACING.space_20,
    },
    containerGap20: {
      gap: SPACING.space_20,
    },
    seatRow: {
      flexDirection: 'row',
      gap: SPACING.space_20,
      justifyContent: 'center',
    },
    seatIcon: {
      fontSize: FONTSIZE.size_24,
      color: COLORS.White,
    },
    seatIndicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.space_24 * 2,
      marginTop: SPACING.space_8,
      marginBottom: SPACING.space_18,
    },
    seatIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.space_4,
    },
    indicatorText: {
      color: 'white',
      fontWeight: '500',
      fontSize: FONTSIZE.size_12,
      textAlign: 'center',
      fontFamily: FONTFAMILY.poppins_medium,
    },
  
    dateContainer: {
      marginHorizontal: SPACING.space_20,
    },
    timeContainer: {
      marginHorizontal: SPACING.space_20,
      marginTop: SPACING.space_16,
      marginBottom: SPACING.space_15 * 2,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 18,
    },
    priceContainer: {
      paddingHorizontal: 32,
    },
    priceTitle: {
      color: COLORS.WhiteRGBA50,
      fontSize: FONTSIZE.size_14,
      fontFamily: FONTFAMILY.poppins_regular,
    },
    contentContainer: {
      paddingBottom: 40,
    },
    price: {
      color: 'white',
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_24,
    },
    buyButton: {
      backgroundColor: COLORS.Orange,
      paddingTop: SPACING.space_18,
      paddingHorizontal: SPACING.space_36,
      borderRadius: BORDERRADIUS.radius_20,
      alignItems: 'center',
    },
    buyButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
  });
  
  