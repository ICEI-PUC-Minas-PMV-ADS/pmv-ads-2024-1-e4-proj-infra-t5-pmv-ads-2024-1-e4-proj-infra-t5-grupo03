import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../components/Api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

const GameDetailScreen = ({ navigation }) => {
    const [image, setImage] = useState('');
    const [userId, setUserId] = useState(null);
    const [gameName, setGameName] = useState('');
    const [description, setDescription] = useState('');
    const [evaluations, setEvaluations] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const reviewRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [items2, setItems2] = useState([
        { label: '1', value: 1, icon: () => <Icon name="star" size={12} color="red" /> },
        { label: '2', value: 2, icon: () => <Icon name="star" size={12} color="white" /> },
        { label: '3', value: 3, icon: () => <Icon name="star" size={12} color="yellow" /> },
        { label: '4', value: 4, icon: () => <Icon name="star" size={12} color="blue" /> },
        { label: '5', value: 5, icon: () => <Icon name="star" size={12} color="green" /> },
    ]);
    const [value2, setValue2] = useState(null);
    const [value, setValue] = useState(null);
    const [note, setNote] = useState(0);
    const [items, setItems] = useState([
        { label: 'Possuo', value: 'OWNED', icon: () => <Icon name="gamepad" size={18} color="orange" /> },
        { label: 'Quero', value: 'WANTED', icon: () => <Icon name="search" size={18} color="orange" /> },
        { label: 'Já tive', value: 'ALREADY_HAD', icon: () => <Icon name="trophy" size={18} color="orange" /> },
        { label: 'Peguei emprestado', value: 'BORROWED', icon: () => <Icon name="exchange" size={18} color="orange" /> },
    ]);
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await AsyncStorage.getItem('user');
            if (userId) {
                setUserId(userId);
            }
        };
        fetchUserData();
        const fetchGameDetails = async () => {
            const gameId = await AsyncStorage.getItem('game');
            if (!gameId) {
                return navigation.navigate('Home');
            };
            const gameDetails = await api('games', 'gamesById/' + gameId, 'GET');
            setImage(gameDetails.data.background_image);
            setGameName(gameDetails.data.name);
            setDescription(gameDetails.data.description);
            fetchEvaluations(gameId, 1);
        };

        fetchGameDetails();
    }, []);

    const handleSubmit = async () => {
        const review = reviewRef.current.value;
        const gameId = await AsyncStorage.getItem('game');
        try {
            await api('evaluations', 'evaluations', 'POST', {
                review: review,
                note: note,
                user_id: userId,
                game_id: gameId
            });
            Toast.show({
                type: 'info',
                text1: '✅ Avaliação realizada com sucesso',
                text2: '🎮 Sua avaliação foi enviada com sucesso! Atualize a página para visualizar'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: '❌ Erro',
                text2: '🛑 Algo de errado aconteceu, por favor tente novamente mais tarde'
            });
        }
    }

    const fetchEvaluations = async (gameId, page) => {
        const response = await api('evaluations', `evaluations/findByGame/${gameId}`, 'GET', null, null, page);
        const evaluationsWithUsers = await Promise.all(
            response.data.map(async (evaluation) => {
                const userResponse = await api('users', `users/${evaluation.user_id}`, 'GET');
                return {
                    ...evaluation,
                    username: userResponse.data.nickname,
                };
            })
        );

        if (evaluationsWithUsers.length < 5) {
            setHasMore(false);
        }

        if (page === 1) {
            setEvaluations(evaluationsWithUsers);
        } else {
            setEvaluations((prevEvaluations) => [...prevEvaluations, ...evaluationsWithUsers]);
        }
    };

    const loadMore = async () => {
        const gameId = await AsyncStorage.getItem('game');
        const nextPage = page + 1;
        setPage(nextPage);
        fetchEvaluations(gameId, nextPage);
    };

    const handleAdd = async (index) => {
        try {
            const gameId = await AsyncStorage.getItem('game');
            console.log({
                game_id: gameId,
                user_id: userId,
                status: index
            })
            await api('collections', 'collections', 'POST', {
                game_id: gameId,
                user_id: userId,
                status: index
            });
            Toast.show({
                type: 'info',
                text1: '✅ Coleção atualizada com sucesso',
                text2: '🎮 Sua coleção foi atualizada com sucesso!'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: '❌ Erro',
                text2: '🛑 Algo de errado aconteceu, por favor tente novamente mais tarde'
            });
        }
    };

    return (
        <ImageBackground
            source={{ uri: image }}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image source={{ uri: image }} style={styles.gameImage} />
                    <Text style={styles.title}>{gameName}</Text>
                    <Text style={styles.description}>{description}</Text>
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
                                handleAdd(value);
                            }}
                            style={styles.dropdown}
                            textStyle={styles.dropdownText}
                            dropDownContainerStyle={styles.dropdownMenuContainer}
                            zIndex={1000}
                            isVisible={open}
                            placeholder="Adicione a sua coleção"
                            isOpened={open}
                            onClose={() => setOpen(false)}
                            scrollViewProps={{
                                onScrollBeginDrag: () => setOpen(false),
                            }}
                            maxHeight={300}
                        />
                    </View>
                    {evaluations && (
                        <Text style={styles.title}>Avaliações</Text>
                    )}
                    {evaluations.map((evaluation, index) => (
                        <View key={index} style={styles.evaluationContainer}>
                            <Text style={styles.evaluationText}>{evaluation.username} - Nota: {evaluation.note}</Text>
                            <Text style={styles.evaluationText}>{evaluation.review}</Text>
                        </View>
                    ))}
                    {hasMore && (
                        <Button title="Carregar mais" onPress={loadMore} />
                    )}
                    {userId && (
                        <View style={styles.form}>
                            <Text style={styles.title}>Deixe sua avaliação</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Deixe sua avaliação"
                                placeholderTextColor="#aaa"
                                ref={reviewRef}
                            />
                            <DropDownPicker
                            syle={styles.dropdownContainer}
                            open={open2}
                            value={value2}
                            items={items2}
                            setOpen={setOpen2}
                            setValue={setValue2}
                            setItems={setItems2}
                            onChangeValue={(value2) => {
                                setNote(value2);
                            }}
                            style={styles.dropdown}
                            textStyle={styles.dropdownText}
                            dropDownContainerStyle={styles.dropdownMenuContainer}
                            zIndex={1000}
                            isVisible={open}
                            placeholder="Nota"
                            isOpened={open}
                            onClose={() => setOpen(false)}
                            scrollViewProps={{
                                onScrollBeginDrag: () => setOpen(false),
                            }}
                            maxHeight={300}
                        />
                            <TouchableOpacity style={styles.gameButton} onPress={handleSubmit}>
                                <Text style={styles.gameText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
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
    gameButton: {
        backgroundColor: 'orange',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 5,
        width: '50%',
        alignSelf: 'center',
    },
    gameText: {
        color: '#fff',
        fontSize: 16,
    },
    backgroundImageStyle: {
        opacity: 0.7,
    },
    form: {
        width: '80%',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    gameImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: 'orange',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        width: '100%',
        marginBottom: 20,
    },
    evaluationContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '100%',
    },
    evaluationText: {
        color: 'white',
        fontSize: 14,
    },
});

export default GameDetailScreen;
