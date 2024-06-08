import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { api } from '../components/Api';
import GameCard from '../components/GameCard/GameCard'; 

const HomeScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await api('games', 'games', 'GET');
        setGames(gamesData.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {games.map((item) => (
          <GameCard
            key={item.id}
            imageUrl={item.background_image}
            gameName={item.name}
            gameRating={item.rating}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: '10px'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
