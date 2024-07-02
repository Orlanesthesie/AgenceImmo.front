import { useNavigation } from "@react-navigation/native";
import { Route } from "expo-router/build/Route";
import { HStack, Heading, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Annonce {
    _id: string;
    titre: string;
    description: string;
    prix: string;
    localisation: string;
    categorie: string;
    vendeur: string;
}

const Annonce = (props:any) => {
    const [annonce, setAnnonce] = useState<Annonce|null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    console.log(props.id);

    useEffect(() => {
        fetch(`http://192.168.1.117:3000/annonce/${props.id}`,{
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setAnnonce(data))
            .catch((error) => setError(error.message));
    }, []);
    if (!annonce) {
        return (
         <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                    Loading
                </Heading>
        </HStack>
        )
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
                    <View key={annonce._id} style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titre}>{annonce.titre}</Text>
                        </View>
                        <Text style={styles.description}> Description: {annonce.description}</Text>
                        <Text style={styles.prix}>Prix: {annonce.prix}</Text>
                        <Text style={styles.categorie}>Categorie: {annonce.categorie}</Text>
                        <Text style={styles.localisation}>Localisation: {annonce.localisation}</Text>
                        <Text style={styles.vendeur}>Vendeur: {annonce.vendeur}</Text>                       
                    </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '##88c6d1',
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
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    titre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
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
});

export default Annonce;
