import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToLancamentos = () => {
    navigation.navigate('Lancamentos');
  };

  const navigateToSignin = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Icon name="gamepad" size={24} color="gray" />
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.brandText}>Boxgames</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLancamentos}>
          <Text style={styles.menuText}>Lançamentos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar jogo..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={navigateToSignin}>
          <Icon name="user" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 40,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    color: 'orange',
    fontSize: 15,
    marginLeft: 10,
    fontStyle: 'bold',
  },
  menuText: {
    color: 'gray',
    fontSize: 15,
    marginLeft: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    height: 30,
    width: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black',
  },
});

export default Header;



