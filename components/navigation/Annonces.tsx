import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Annonce {
    _id: string;
    titre: string;
    description: string;
    prix: string;
    location: string;
    categorie: string;
    vendeur: string;
}

const Annonces = () => {
    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://192.168.1.117:3000/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setAnnonces(data))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                annonces.map((annonce) => (
                    <View key={annonce._id} style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titre}>{annonce.titre}</Text>
                        </View>
                        <Text style={styles.description}>{annonce.description}</Text>
                        <Text style={styles.prix}>{annonce.prix}</Text>
                        <Text style={styles.categorie}>{annonce.categorie}</Text>
                        <Text style={styles.location}>{annonce.location}</Text>
                        <Text style={styles.vendeur}>{annonce.vendeur}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#88c6d1',
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
        backgroundColor: '#88c6d1',
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
    location: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    vendeur: {
        fontSize: 14,
        color: '#666',
    },
});

export default Annonces;
