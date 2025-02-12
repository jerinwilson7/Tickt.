import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../../theme';
import CustomIcon from '../icons/custom-icon';
import {
  HomeScreen,
  OrderScreen,
  SearchScreen,
  UserAccountScreen
} from '../screens';
import { RootStackParamList } from './navigation';

export type TabRootParamList = {
  Home: undefined;
  Search: undefined;
  Orders: undefined
  User: undefined;
  Register: undefined;
  Login: {redirectTo?: keyof RootStackParamList};
};

const Tab = createBottomTabNavigator<TabRootParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        },
        tabBarStyle: {
          backgroundColor: 'black',
          height: SPACING.space_36 * 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.container,
                  focused && {backgroundColor: COLORS.Orange},
                ]}>
                <CustomIcon
                  name="video"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.container,
                  focused && {backgroundColor: COLORS.Orange},
                ]}>
                <CustomIcon
                  name="search"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.container,
                  focused && {backgroundColor: COLORS.Orange},
                ]}>
                <CustomIcon
                  name="ticket"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.container,
                  focused && {backgroundColor: COLORS.Orange},
                ]}>
                <CustomIcon
                  name="user"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 64,
    borderRadius: SPACING.space_10 * 10,
  },
});

export default TabNavigator;
