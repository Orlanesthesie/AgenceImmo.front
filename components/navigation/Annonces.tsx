import { Link, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

interface Annonce {
    _id: string;
    titre: string;
    description: string;
    prix: string;
    localisation: string;
    categorie: string;
    vendeur: string;
}

const Annonces = () => {
    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

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

    const deleteAnnonce = (id: string) => {
        fetch(`http://192.168.1.117:3000/delete/${id}`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setAnnonces(annonces.filter(annonce => annonce._id !== id));
            })
            .catch((error) => setError(error.message));
    };


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
                        <Text style={styles.prix}>{annonce.prix} €</Text>
                        <Text style={styles.localisation}>{annonce.localisation}</Text>
                        <TouchableOpacity style={styles.voir}>
                            <Link 
                                href={{
                                    pathname: '/view/[id]',
                                    params: { id: annonce._id },
                                }}>
                            <Text>Voir</Text>
                        </Link>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.modifier}> 
                            <Text>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.supprimer}
                            onPress={() => deleteAnnonce(annonce._id)}
                        > 
                            <Text>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
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
        textAlign: 'center',
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
        textAlign: 'center',
    },
    vendeur: {
        fontSize: 14,
        color: '#666',
    },
    voir: {
        backgroundColor: '#FFC107', 
        padding: 10, 
        borderRadius: 5, 
        alignItems: 'center',
        justifyContent: 'center', 
        shadowColor: '#000', 
    },
    modifier: {
        backgroundColor: '#FF9800', 
        padding: 10, 
        borderRadius: 5, 
        alignItems: 'center',
        justifyContent: 'center', 
        shadowColor: '#000', 
    },
    supprimer: {
        backgroundColor: '#F44336', 
        padding: 10, 
        borderRadius: 5, 
        alignItems: 'center',
        justifyContent: 'center', 
        shadowColor: '#000', 
    },
    
});

export default Annonces;
