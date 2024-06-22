import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ navigation }) => {
  const searchRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);
  const search = async () => {
    const searchValue = searchRef.current.value;
    if(searchValue === ''){
      await AsyncStorage.removeItem('search');
    } else {
      await AsyncStorage.setItem('search', searchValue);
    };
    setReloadKey(prevKey => prevKey + 1);
    navigation.navigate('Home', {key: reloadKey});
  };
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToLancamentos = () => {
    navigation.navigate('Lancamentos');
  };

  const navigateToSignin = () => {
    navigation.navigate('Signin');
  };

  const navigateToAreaLogada = () => {
    navigation.navigate('AreaLogada');
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
        <TouchableOpacity onPress={navigateToAreaLogada}>
          <Text style={styles.menuText}>Minha coleção</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar jogo..."
          placeholderTextColor="orange"
          ref={searchRef}
        />
        <TouchableOpacity onPress={search}>
          <Icon name="search" size={24} color="orange" />
        </TouchableOpacity>
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
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'white',
  },
});

export default Header;



