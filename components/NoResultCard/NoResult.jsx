// NoResultsCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NoResultsCard = () => {
    return (
        <View style={styles.card}>
            <FontAwesome name="exclamation-circle" size={50} color="#d9534f" />
            <Text style={styles.message}>No Journey Data Found</Text>
            <Text style={styles.subMessage}>Please enter a valid PNR number.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        margin: 20,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    subMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default NoResultsCard;
