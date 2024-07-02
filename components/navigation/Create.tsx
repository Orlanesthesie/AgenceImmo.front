import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const CreateAnnonce = () => {
    interface Annonce {
        _id: string;
        titre: string;
        description: string;
        prix: string;
        localisation: string;
        categorie: string;
        vendeur: string;
    }

    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [categorie, setCategorie] = useState('');
    const [vendeur, setVendeur] = useState('');
    const [prix, setPrix] = useState('');

    const navigation = useNavigation();

    const createAnnonce = () => {
        fetch("http://192.168.1.117:3000/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titre,
                prix,
                description,
                categorie,
                localisation,
                vendeur,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setAnnonces([...annonces, data]);
                setTitre('');
                setPrix('');
                setDescription('');
                setCategorie('');
                setLocalisation('');
                setVendeur('');
                setError(null);
                navigation.navigate('index');
            })
            .catch((error) => setError(error.message));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titre}>Créer une annonce</Text>
                </View>
                {error && (
                    <Text style={styles.errorText}>Error: {error}</Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Titre"
                    value={titre}
                    onChangeText={setTitre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prix"
                    value={prix}
                    onChangeText={setPrix}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Localisation"
                    value={localisation}
                    onChangeText={setLocalisation}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Catégorie"
                    value={categorie}
                    onChangeText={setCategorie}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Vendeur"
                    value={vendeur}
                    onChangeText={setVendeur}
                />
                <TouchableOpacity onPress={createAnnonce} style={styles.soumettre}> 
                    <Text style={styles.buttonText}>Soumettre</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#9C27B0',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        backgroundColor: '#E91E63',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    prix: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    categorie: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    localisation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    vendeur: {
        fontSize: 14,
        color: '#666',
    },
    soumettre: {
        backgroundColor: '#FFC107', 
        padding: 10, 
        borderRadius: 5, 
        alignItems: 'center',
        justifyContent: 'center', 
        shadowColor: '#000',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateAnnonce;
