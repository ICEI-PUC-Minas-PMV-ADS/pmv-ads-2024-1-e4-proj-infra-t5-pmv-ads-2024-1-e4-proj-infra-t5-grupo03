import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

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
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            header: () => <Header navigation={navigation} />,
            headerShown: true,
          })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lancamentos" component={LancamentosScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="AreaLogada" component={AreaLogadaScreen} />
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
