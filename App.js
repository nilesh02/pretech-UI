import React from 'react';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './core/theme';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';
import MenuDrawer from './screens/MenuDrawer';

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
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
