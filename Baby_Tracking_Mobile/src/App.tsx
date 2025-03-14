import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { ToastProvider } from 'react-native-toast-notifications';
import { Icon, PaperProvider } from 'react-native-paper';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/icons/newspaper.png'),
  require('./assets/icons/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <PaperProvider>
      <ToastProvider
        placement="bottom"
        duration={5000}
        animationType='zoom-in'
        animationDuration={250}
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="gray"
        textStyle={{ fontSize: 20 }}
        offset={50} // offset for both top and bottom toasts
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}
        successIcon={<Icon size={24} color='white' source={"check-bold"} />}
        dangerIcon={<Icon size={24} color='white' source={"close-octagon"} />}
        warningIcon={<Icon size={24} color='white' source={"alert"} />}
      >
        <Navigation
          linking={{
            enabled: 'auto',
            prefixes: [
              // Change the scheme to match your app's scheme defined in app.json
              'babytrackingmobile',
            ],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </ToastProvider >
    </PaperProvider>

  );
}
