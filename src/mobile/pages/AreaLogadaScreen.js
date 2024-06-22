import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../components/Api';
import GameCard from '../components/GameCard/GameCard'; // Certifique-se de importar corretamente o componente GameCard

const AreaLogadaScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Possuo', value: 'OWNED', icon: () => <Icon name="gamepad" size={18} color="orange" /> },
    { label: 'Quero', value: 'WANTED', icon: () => <Icon name="search" size={18} color="orange" /> },
    { label: 'Já tive', value: 'ALREADY_HAD', icon: () => <Icon name="trophy" size={18} color="orange" /> },
    { label: 'Peguei emprestado', value: 'BORROWED', icon: () => <Icon name="exchange" size={18} color="orange" /> },
  ]);
  const [collections, setCollections] = useState([]);
  const [groupedCollections, setGroupedCollections] = useState({
    owned: [],
    wanted: [],
    already_had: [],
    borrowed: [],
  });

  useEffect(async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      return navigation.navigate('HomeScreen');
    };

    const collections = await api('collections', 'collections/findByUser/' + user, 'GET');
    const collectionsData = collections.data;

    const collectionsWithDetails = await Promise.all(
      collectionsData.map(async (collection) => {
        const gameDetails = await api('games', 'gamesById/' + collection.game_id, 'GET');
        return {
          ...collection, gameDetails: {
            id: gameDetails.data.id,
            gameName: gameDetails.data.name,
            imageUrl: gameDetails.data.background_image,
            gameRating: gameDetails.data.rating || gameDetails.data.gameRating || 0
          }
        };
      })
    );

    setCollections(collectionsWithDetails);
    const grouped = collectionsWithDetails.reduce((acc, collection) => {
      const status = collection.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(collection);
      return acc;
    }, {});

    setGroupedCollections(grouped);
  }, []);

  const handleScrollToSection = (index) => {
    scrollViewRef.current.scrollTo({
      y: index * 300, // Ajuste conforme necessário para o tamanho da seção
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.menu}>
          <Text style={styles.title}>Minhas coleções</Text>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(value) => {
                const index = items.findIndex(item => item.value === value);
                handleScrollToSection(index);
              }}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropDownContainerStyle={styles.dropdownMenuContainer}
              zIndex={1000}
              isVisible={open}
              placeholder="Selecione a coleção"
              isOpened={open}
              onClose={() => setOpen(false)}
              scrollViewProps={{
                onScrollBeginDrag: () => setOpen(false),
              }}
              maxHeight={300}
            />
          </View>
        </View>
        {items.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name={section.icon().props.name} size={20} color="orange" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>{section.label}</Text>
            </View>
            <View style={styles.cards}>
              {groupedCollections[section.value]?.map((collection, idx) => (
                <View key={idx} style={styles.card}>
                  <GameCard
                    key={collection.gameDetails.id}
                    navigation={navigation}
                    gameId={collection.gameDetails.id}
                    imageUrl={collection.gameDetails.imageUrl}
                    gameName={collection.gameDetails.gameName}
                    gameRating={'Nota: ' + collection.gameDetails.gameRating}
                    // Estilo adicional para garantir exibição em grade
                    style={{ marginBottom: 10, marginRight: 10, width: '45%' }}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={() => scrollViewRef.current.scrollTo({ y: 0, animated: true })}>
              <Text style={styles.backToTop}>Voltar ao topo</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    zIndex: 1000,
  },
  title: {
    fontSize: 24,
    color: 'orange',
    marginRight: 10,
  },
  dropdownContainer: {
    flex: 1,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: 'rgba(255, 165, 0, 0.9)',
  },
  dropdownText: {
    fontSize: 16,
    color: 'white',
  },
  dropdownMenuContainer: {
    backgroundColor: 'rgba(255, 165, 0, 0.9)',
    zIndex: 1000,
  },
  section: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'orange',
  },
  cards: {
    flexDirection: 'row', // Para exibir os GameCards em linha
    flexWrap: 'wrap', // Para permitir que os GameCards quebrem linha automaticamente
    justifyContent: 'space-between', // Distribui os GameCards no espaço disponível
  },
  card: {
    width: '48%', // Ajuste conforme necessário para o espaçamento e a quantidade de GameCards por linha
    marginBottom: 10,
  },
  backToTop: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default AreaLogadaScreen;
