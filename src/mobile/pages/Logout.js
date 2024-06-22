import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
    const handleSignOut = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Você está logado</Text>
            <Button title="Logout" onPress={handleSignOut} />
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
    text: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
});

export default LogoutScreen;
