import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import LancamentosScreen from './pages/LancamentosScreen';
import SigninScreen from './pages/SigninScreen';
import SignupScreen from './pages/SignupScreen';
import AreaLogadaScreen from './pages/AreaLogadaScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
            headerShown: true,
          })}
        />
        <Stack.Screen 
          name="Lancamentos" 
          component={LancamentosScreen} 
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
            headerShown: true,
          })}
        />
        <Stack.Screen 
          name="Signin" 
          component={SigninScreen} 
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
            headerShown: true,
          })}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
            headerShown: true,
          })}
        />
        <Stack.Screen 
          name="AreaLogada" 
          component={AreaLogadaScreen}
          options={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
            headerShown: true,
          })}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default App;
