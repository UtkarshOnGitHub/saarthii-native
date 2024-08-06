import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { hp, wp } from "../../helpers/common";
import CustomButton from "../../components/CustomButton";
import { theme } from "../../constants/theme";
import Toast from "react-native-toast-message";

const AllNews = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    articles: [
      {
        url: "https://example.com/article1",
        title: "Dummy Article 1",
        description: "This is a description for dummy article 1.",
        content: "Content for dummy article 1.",
        urlToImage: "https://via.placeholder.com/80",
      },
      {
        url: "https://example.com/article2",
        title: "Dummy Article 2",
        description: "This is a description for dummy article 2.",
        content: "Content for dummy article 2.",
        urlToImage: "https://via.placeholder.com/80",
      },
      {
        url: "https://example.com/article3",
        title: "Dummy Article 2",
        description: "This is a description for dummy article 2.",
        content: "Content for dummy article 2.",
        urlToImage: "https://via.placeholder.com/80",
      },
      {
        url: "https://example.com/article4",
        title: "Dummy Article 2",
        description: "This is a description for dummy article 2.",
        content: "Content for dummy article 2.",
        urlToImage: "https://via.placeholder.com/80",
      },
      {
        url: "https://example.com/article5",
        title: "Dummy Article 2",
        description: "This is a description for dummy article 2.",
        content: "Content for dummy article 2.",
        urlToImage: "https://via.placeholder.com/80",
      },
    ],
  });

  useEffect(()=>{
    Toast.show({
      type: 'success',
      text1: 'Welcome Back!',
      text2: 'Create Journey and Make Friends 👋'
    });
  },[])

  const router = useRouter();

  const handleSearch = () => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c669f" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading news: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journeys</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter PNR..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Add PNR</Text>
        </TouchableOpacity>
      </View>
      {data && data.articles ? (
        <FlatList
          data={data.articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.articleContainer}
              onPress={() =>
                router.push('news')
              }
            >
              {item.urlToImage && (
                <Image
                  source={{ uri: item.urlToImage }}
                  style={styles.articleImage}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No news articles found.</Text>
      )}
    </View>
  );
};

export default AllNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: hp(1.3),
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize:hp(2)
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width:wp(20)
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize:hp(1.8)
  },
  articleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  articleDescription: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#4c669f",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
