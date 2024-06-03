import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Signin');
  };

  const handleSignup = () => {
    // Implemente aqui a lógica para realizar o cadastro do usuário
    // Pode enviar os dados para o servidor ou realizar validações localmente
    console.log('Realizar cadastro');
  };

  const handleGoogleLogin = () => {
    // Lógica para login com Google
    console.log('Login com Google');
  };

  const handleFacebookLogin = () => {
    // Lógica para login com Facebook
    console.log('Login com Facebook');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu cadastro</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#999"
          secureTextEntry
        />
        {/* Botão de Cadastrar */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Cadastrar</Text>
        </TouchableOpacity>
        {/* Texto de Já tem conta? Entre aqui */}
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInText}>Já tem conta? Entre aqui</Text>
        </TouchableOpacity>
        {/* Texto "ou continue com..." e botões de login social */}
        <Text style={styles.orText}>ou continue com...</Text>
        <View style={styles.socialLogin}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Icon name="google" size={24} color="#DB4437" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
            <Icon name="facebook" size={24} color="#4267B2" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
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