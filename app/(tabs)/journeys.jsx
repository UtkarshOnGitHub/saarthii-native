import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { getJourneyDataForUser, getJourneydataFromPNR } from "../../http/Journey";
import JourneyCard from "../../components/JourneyCard/JourneyCard";
import NoResultsCard from "../../components/NoResultCard/NoResult"; 
import { theme } from "../../constants/theme";
import { hp } from "../../helpers/common";

const Journeys = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [AllJourneyForUser, setAllJourneyForUser] = useState([]);
  const router = useRouter();

  const getAllJourneys = async () => {
    setIsLoading(true);
    try {
      let res = await getJourneyDataForUser();
      console.log(res.data.length)
      setAllJourneyForUser(res?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllJourneys();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    getJourneydataFromPNR(parseInt(query))
      .then((res) => {
        if (res.isSuccess) {
          getAllJourneys(); 
        }
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderJourneyCard = ({ item }) => {
    return <JourneyCard journeyData={item} />;
  };

  const renderEmptyList = () => <NoResultsCard />;
  if(error){
    <View style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter PNR..."
        value={query}
        placeholderTextColor={theme.colors.grayDark}
        onChangeText={setQuery}
        keyboardType='numeric'
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Add PNR</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Error loading journey data: {error.message}
          </Text>
        </View>
    </View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter PNR..."
          value={query}
          placeholderTextColor={theme.colors.grayDark}
          onChangeText={setQuery}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Add PNR</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading journey data...</Text>
        </View>
      ) :  (
        <FlatList
          data={AllJourneyForUser}
          keyExtractor={(item) => item?.pnrNumber}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderJourneyCard}
          ListEmptyComponent={renderEmptyList} 
        />
      )}
    </View>
  );
};

export default Journeys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: hp(1.8),
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: theme.colors.primary,
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
});
