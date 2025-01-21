import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MovieDetailsScreen,
  RegisterScreen,
  SeatBookingScreen,
  TicketScreen,
} from '../screens';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './tab-navigation';

export type RootStackParamList = {
  MovieDetails: {id: number};
  SeatBooking: {movie: MovieDetails};
  Tab: undefined;
  Login: undefined;
  Register: undefined;
  Tickets: {ticketDetails: BookingDetails};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'default'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Tickets"
          component={TicketScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
