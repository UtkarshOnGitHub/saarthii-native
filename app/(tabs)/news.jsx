import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Saarthii</Text>
      <Text style={styles.subtitle}>Discover Your Travel Buddies Online!</Text>
      <View style={styles.techList}>
        <LinearGradient colors={["#61DBFB", "#35AFC2"]} style={styles.techItem}>
        <FontAwesome name="search" size={30} color="#fff" />
          <Text style={styles.techText}>Search Buddies</Text>
        </LinearGradient>
        <LinearGradient colors={["#764ABC", "#543B9A"]} style={styles.techItem}>
          <FontAwesome name="train" size={30} color="#fff" />
          <Text style={styles.techText}>Create Journey</Text>
        </LinearGradient>
        <LinearGradient colors={["#FF4154", "#D12B3A"]} style={styles.techItem}>
          <FontAwesome name="comments" size={30} color="#fff" />
          <Text style={styles.techText}>Chat</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  techList: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  techItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  techText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
});