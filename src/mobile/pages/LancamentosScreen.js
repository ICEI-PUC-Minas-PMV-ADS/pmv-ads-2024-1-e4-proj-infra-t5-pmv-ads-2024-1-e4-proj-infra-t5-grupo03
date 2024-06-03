import { View, Text, StyleSheet } from 'react-native';

const LancamentosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lançamentos Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    fontSize: 24,
  },
});

export default LancamentosScreen;
