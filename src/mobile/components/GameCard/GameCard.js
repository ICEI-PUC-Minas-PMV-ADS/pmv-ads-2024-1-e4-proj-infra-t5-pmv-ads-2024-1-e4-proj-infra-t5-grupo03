import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameCard = ({ imageUrl, gameName, gameRating, navigation, gameId }) => {

  async function saveGame() {
    await AsyncStorage.setItem('game', gameId);
    navigation.navigate('Game')
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={saveGame}
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.gameName}>{gameName}</Text>
        <Text style={styles.gameRating}>{gameRating}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: 150,
    marginRight: 10,
    marginBottom: 5,
    paddingBottom: '5px',
  },
  image: {
    width: '100%',
    height: 100,
  },
  info: {
    padding: 10,
  },
  gameName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  gameRating: {
    fontSize: 12,
    color: '#555',
  },
});

export default GameCard;
