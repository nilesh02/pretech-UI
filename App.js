import React from 'react';
import {Vibration, Platform} from 'react-native';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { theme } from './core/theme';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';
import BottomMenu from './screens/BottomMenu';
import configureStore from './store/store.js';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as firebase from 'firebase';

const store = configureStore();

const AppNavigator = createSwitchNavigator(
  {
     LoadingScreen,
     LoginScreen,
     ForgotPasswordScreen,
     RegisterScreen,
     MainScreen:BottomMenu,
  },
 {
   initialRouteName: 'LoadingScreen',
   headerMode: 'none'
 },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      expoPushToken: '',
      notification: {},
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBPRy468mWKldsZ2yx2dyzL8PSCE7rlMJk",
      authDomain: "sample-2216b.firebaseapp.com",
      databaseURL: "https://sample-2216b.firebaseio.com",
      projectId: "sample-2216b",
      storageBucket: "sample-2216b.appspot.com",
      messagingSenderId: "714106496514",
      appId: "1:714106496514:web:40a17f5f0af225dea1691b",
      measurementId: "G-60N4PNB2QH"
    };
    firebase.initializeApp(firebaseConfig);
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        console.log('com.pretech-Asking for permission')
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        console.log('Failed to get push token for push notification!');
        return;
      }
      console.log("com.pretech- reached")
      try{
        token = await Notifications.getExpoPushTokenAsync();
        console.log("com.pretech token-"+token);
        const firestore = firebase.firestore();
          firestore.collection("collections").doc("notifications").update({
              token
          }).then(alert('token added-'+token));
        this.setState({ expoPushToken: token });
      } catch(e){
        console.log("com.pretech-"+e)
        alert(e);
      }
      
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  render() {
    return (
      <Provider store = { store }>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </Provider>
    );
  }
}

// curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{"to":"ExponentPushToken[qPwg76CrNKq8gDdnYLmjqM]","title":"hello","body":"world"}'
