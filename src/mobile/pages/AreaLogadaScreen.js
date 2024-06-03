import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const AreaLogadaScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Favoritos', value: 'favoritos', icon: () => <Icon name="heart" size={18} color="orange" /> },
    { label: 'Jogando', value: 'jogando', icon: () => <Icon name="gamepad" size={18} color="orange" /> },
    { label: 'Finalizado', value: 'finalizado', icon: () => <Icon name="trophy" size={18} color="orange" /> },
    { label: 'Peguei emprestado', value: 'emprestado', icon: () => <Icon name="exchange" size={18} color="orange" /> },
    { label: 'Na fila', value: 'fila', icon: () => <Icon name="list-ul" size={18} color="orange" /> },
    { label: 'Jogar novamente', value: 'novamente', icon: () => <Icon name="repeat" size={18} color="orange" /> },
    { label: 'Lista de desejo', value: 'desejo', icon: () => <Icon name="search" size={18} color="orange" /> },
  ]);

  const handleScrollToSection = (index) => {
    scrollViewRef.current.scrollTo({
      y: index * 300, // Adjust the multiplier based on the section height
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
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
              zIndex={1000} // Z-Index ajustado para aparecer à frente
              isVisible={open} // Para garantir que seja visível
              placeholder="Selecione a coleção" // Texto do placeholder alterado
              isOpened={open} // Manter aberto enquanto interage
              onClose={() => setOpen(false)} // Fechar corretamente
              scrollViewProps={{
                onScrollBeginDrag: () => setOpen(false), // Fechar ao começar a rolar
              }}
              maxHeight={300} // Altura máxima do dropdown
            />
          </View>
        </View>
        {items.map((section, index) => (
          <View
            key={index}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <Icon name={section.icon().props.name} size={20} color="orange" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>{section.label}</Text>
            </View>
            <View style={styles.cards}></View>
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
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    zIndex: 1000, // Z-Index ajustado para aparecer à frente
  },
  title: {
    fontSize: 24,
    color: 'orange',
    marginRight: 10,
  },
  dropdownContainer: {
    flex: 1,
    zIndex: 1000, // Z-Index ajustado para aparecer à frente
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
    zIndex: 1000, // Z-Index ajustado para aparecer à frente
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
    height: 100, // Placeholder for card content
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  backToTop: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'right',
  },
});

export default AreaLogadaScreen;

