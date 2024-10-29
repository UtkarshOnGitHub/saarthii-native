import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
  Keyboard
} from "react-native";
import { useRouter } from "expo-router";
import { addJourneyDataForUser, getJourneyDataForUser } from "../../http/Journey";
import JourneyCard from "../../components/JourneyCard/JourneyCard";
import NoResultsCard from "../../components/NoResultCard/NoResult"; 
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import Toast from 'react-native-toast-message';
import { toastConfig } from "../../helpers/ToastConfi";


const Journeys = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [AllJourneyForUser, setAllJourneyForUser] = useState([]);
  const router = useRouter();

  const getAllJourneys = async () => {
    setIsLoading(true);
    try {
      let res = await getJourneyDataForUser();
      console.log(res.data.length);
      setAllJourneyForUser(res?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getAllJourneys();
    setRefreshing(false);
  };

  useEffect(() => {
    getAllJourneys();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    Keyboard.dismiss();
    addJourneyDataForUser({ pnrNumber: query })
      .then((res) => {
        console.log(res)
        if (res.isSuccess) {
          getAllJourneys(); 
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Journey Has Been Added!',
            visibilityTime:1000
          });
        }else{
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res.message,
            position:'bottom'
          });
        }
        setError(null);
      })
      .catch((err) => {
        setError(err);
        console.log(err)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderJourneyCard = ({ item }) => {
    return <JourneyCard journeyData={item} />;
  };

  const renderEmptyList = () => <NoResultsCard />;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter PNR..."
          value={query}
          placeholderTextColor={theme.colors.grayDark}
          onChangeText={setQuery}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Add PNR</Text>
        </TouchableOpacity>
      </View>

      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Creating Journey...</Text>
        </View>
      ) : (
        <FlatList
          data={AllJourneyForUser}
          keyExtractor={(item) => item?.pnrNumber}
          showsVerticalScrollIndicator={false}
          renderItem={renderJourneyCard}
          ListEmptyComponent={renderEmptyList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
      <Toast swipeable={true} config={toastConfig} />
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
