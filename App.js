import React from 'react';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { theme } from './core/theme';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';
import MenuDrawer from './screens/MenuDrawer';
import configureStore from './store/store.js';

const store = configureStore();

const AppNavigator = createSwitchNavigator(
  {
     LoadingScreen,
     LoginScreen,
     ForgotPasswordScreen,
     RegisterScreen,
     MainScreen:MenuDrawer,
  },
 {
   initialRouteName: 'LoadingScreen',
   headerMode: 'none'
 },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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
