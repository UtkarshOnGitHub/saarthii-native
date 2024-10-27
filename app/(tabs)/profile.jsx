import { router, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../Context/AuthContext";


export default function Profile() {
  const { token, deleteToken } = useAuth();
  const router = useRouter()

  const handleLogout = async() => {
    await deleteToken()
    router.replace("signin")

  };

  return (
    // <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        {true ? (
          <>
            <Text style={styles.text}>Email: utkarsh@gmail.com</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>No user logged in</Text>
        )}
      </View>
    // </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});











