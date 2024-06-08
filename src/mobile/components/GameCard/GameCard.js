import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GameCard = ({ imageUrl, gameName, gameRating }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.gameName}>{gameName}</Text>
        <Text style={styles.gameRating}>Nota: {gameRating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: 150,
    marginRight: 10,
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
