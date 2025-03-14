import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';
import person from '../assets/icons/person.png';
import home from '../assets/icons/home.png'
import notification from "../assets/icons/bell.png"
import menu from "../assets/icons/menu.png"
import Home from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { NotFound } from './screens/NotFound';
import { Notifications } from './screens/Notifications';
import Login from './screens/Login';
import { Register } from './screens/Register';
import { ProfileDetail } from './screens/ProfileDetail';
import BabyDetail from './screens/BabyDetail';
import MemberShips from './screens/MemberShips';
import { View } from 'react-native-ui-lib';
import BabyList from '../components/BabyList';
import CreateForm from '../components/CreateForm';
import EditForm from '../components/EditForm';

const HomeTabs = createBottomTabNavigator({
  screenOptions: ({ navigation }) => ({
    headerRight: () => {
      return <HeaderButton onPress={() => navigation.navigate("Notifications")}><Image source={notification} tintColor={"white"} style={{ width: 25, height: 25, marginRight: 10 }} /></HeaderButton>
    },
    tabBarStyle: styles.tabBar,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#8B5FBF",
    },
    tabBarShowLabel: false,
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
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Image source={home} style={[styles.icon, focused && styles.iconFocused]} />
            <Text style={[styles.label, focused && styles.labelFocused]}>Home</Text>
          </View>
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Image source={person} style={[styles.icon, focused && styles.iconFocused]} />
            <Text style={[styles.label, focused && styles.labelFocused]}>Profile</Text>
          </View>
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    animation: "slide_from_right",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#8B5FBF"
    },
    headerShadowVisible: false,
    statusBarTranslucent: true,
    statusBarBackgroundColor: 'transparent',
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
    ProfileDetail: {
      screen: ProfileDetail,
      options: {

        title: "Detail",
      }
    },
    BabyDetail: {
      screen: BabyDetail,
      options: {
        title: "Baby Detail"
      }
    },
    MemberShips: {
      screen: MemberShips,
      options: {
        title: "MemberShips"
      }
    },
    Home: {
      screen: Home,
      options: {
        title: "Home"
      }
    },
    Login: {
      screen: Login,
      options: () => ({
        headerShown: true,
        title: ""
      })
    },
    Register: {
      screen: Register,
      options: {
        headerShown: true,
        title: ""
      }
    },
    Notifications: {
      screen: Notifications,
      options: {
        headerShown: true,
        title: "Notifications"
      }
    },
    BabyList: {
      screen: BabyList,
      options: {
        title: "Baby List"
      }
    },
    CreateForm: {
      screen: CreateForm,
      options: {
        title: ""
      }
    },
    EditForm: {
      screen: EditForm,
      options: {
        title: "Edit"
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

export type RootStackParamList = {
  HomeTabs: undefined;
  Settings: undefined;
  ProfileDetail: { user: User };
  Login: undefined;
  Register: undefined;
  Notifications: undefined;
  NotFound: undefined;
  BabyDetail: { baby: Child };
  MemberShips: undefined;
  Home: undefined;
  BabyList: { baby: Child };
  CreateForm: { Component: React.ComponentType };
  EditForm: { Component: React.ComponentType };
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    height: 80,
    paddingTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    paddingTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#888",
  },
  iconFocused: {
    tintColor: "#8B5FBF",
  },
  label: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
    textAlign: "center",
    width: "100%",
    maxWidth: 60,
  },
  labelFocused: {
    color: "#8B5FBF",
    fontWeight: "bold",
  },
});