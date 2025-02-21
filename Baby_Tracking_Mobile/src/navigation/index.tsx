import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import person from '../assets/person.png';
import home from '../assets/home.png'
import search from "../assets/bell.png"
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { NotFound } from './screens/NotFound';
import { Notifications } from './screens/Notifications';
import Login from './screens/Login';

const HomeTabs = createBottomTabNavigator({
  screenOptions: ({ navigation }) => ({
    headerRight: () => {
      return <HeaderButton onPress={() => navigation.navigate("Notifications")}><Image source={search} tintColor={"white"} style={{ width: 25, height: 25, marginRight: 10 }} /></HeaderButton>
    },
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#8B5FBF"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: "bold"
    },
  }),
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={home}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        title: "Profile",
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={person}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#8B5FBF"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: "bold"
    },
  },
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text style={{ color: "#fff", fontSize: 17 }}>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    Login: {
      screen: Login,
      options: {
        title: "Login"
      }
    },
    Notifications: {
      screen: Notifications,
      options: {
        title: "Notifications"
      }
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },

  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
