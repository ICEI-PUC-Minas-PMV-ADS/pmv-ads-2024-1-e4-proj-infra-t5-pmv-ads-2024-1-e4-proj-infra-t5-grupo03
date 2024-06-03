import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SigninScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Lógica para autenticar o usuário
    console.log('Login button pressed');
  };

  const handleForgotPassword = () => {
    // Lógica para lidar com esqueceu sua senha
    console.log('Forgot Password button pressed');
  };

  const handleGoogleLogin = () => {
    // Lógica para login com Google
    console.log('Login with Google button pressed');
  };

  const handleFacebookLogin = () => {
    // Lógica para login com Facebook
    console.log('Login with Facebook button pressed');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu login</Text>
      <View style={styles.form}>
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
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>ou continue com...</Text>
        <View style={styles.socialLogin}>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <Icon name="google" size={24} color="#DB4437" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <Icon name="facebook" size={24} color="#4267B2" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Ainda não tem conta? Cadastre-se aqui</Text>
        </TouchableOpacity>
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
    width: '100%',
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
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF', 
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5, 
    width: '50%', 
    alignSelf: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  signUpText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#007BFF',
  },
});

export default SigninScreen;
