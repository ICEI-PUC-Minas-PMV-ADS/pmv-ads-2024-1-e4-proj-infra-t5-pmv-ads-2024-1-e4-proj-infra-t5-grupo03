import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { api } from '../components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const handleLogin = () => {
    navigation.navigate('Signin');
  };

  const handleSignup = async () => {
    if (!emailRef.current.value || !passwordRef.current.value || !nicknameRef.current.value || !passwordConfirmationRef.current.value) {
      Toast.show({
        type: 'error',
        text1: '❌ Erro no cadastro',
        text2: '🛑 Todos os campos são necessários'
      });
    } else if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      Toast.show({
        type: 'error',
        text1: '❌ Erro no cadastro',
        text2: '🛑 Senhas não coincidem'
      })
    } else {
      const response = await api('users', 'users', 'POST', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        nickname: nicknameRef.current.value
      });

      if (response.data.nickname == nicknameRef.current.value) {
        Toast.show({
          type: 'error',
          text1: '✅ Cadastro realizado com sucesso',
          text2: '🎮 Redirecionando...'
        });
        setTimeout(async () => {
          await AsyncStorage.setItem('user', response.data.id);
          navigation.navigate('AreaLogada');
        }, 3000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu cadastro</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Apelido"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          ref={nicknameRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          ref={emailRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          ref={passwordRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#999"
          secureTextEntry
          ref={passwordConfirmationRef}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInText}>Já tem conta? Entre aqui</Text>
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  signupButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#999',
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  socialIcon: {
    marginRight: 5,
  },
});

export default SignupScreen;