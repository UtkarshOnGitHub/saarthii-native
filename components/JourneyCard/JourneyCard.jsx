import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import MapView, { Marker } from 'react-native-maps';

const JourneyCard = ({ journeyData }) => {
  const boardingLocation = {
    latitude: 16.075836, 
    longitude: 77.037434, 
  };

  const renderPassenger = ({ item }) => (
    <View style={styles.passengerRow}>
      <Text style={styles.passengerName}>
        Passenger {item.passengerSerialNumber}: {item.passengerNationality}
      </Text>
      <View style={styles.berthContainer}>
        <Text style={styles.passengerStatus}>
          Status: {item.bookingStatus}
        </Text>
        <Text style={styles.berthInfo}>
          Berth: {item.bookingBerthNo} ({item.bookingBerthCode})
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Journey Details</Text>

      <View style={styles.infoRow}>
        <FontAwesome style={{width:20}} name="train" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>{journeyData.trainName} ({journeyData.trainNumber})</Text>
      </View>


      <View style={styles.infoRow}>
        <FontAwesome style={{width:20}} name="map-marker" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>
          {journeyData.sourceStation} to {journeyData.destinationStation}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{width:20}} name="calendar" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>
          {journeyData.dateOfJourney}
        </Text>
      </View>

            <View style={styles.infoRow}>
        <FontAwesome style={{width:20}} name="list" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>
          {journeyData.quota}
        </Text>
      </View>
      
      {/* Display Boarding Point with Map */}


      <View style={styles.infoRow}>
        <FontAwesome style={{width:20}} name="user" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>Passengers: {journeyData.numberOfpassenger}</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{width:20}} name="money" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>Fare: ₹{journeyData.bookingFare}</Text>
      </View>
      <Text style={styles.passengerTitle}>Passenger List:</Text>
      <FlatList
        data={journeyData?.passengerList}
        keyExtractor={(item) => item.passengerSerialNumber.toString()}
        renderItem={renderPassenger}
        contentContainerStyle={styles.passengerList}
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.mapTitle}>Boarding Point:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...boardingLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={boardingLocation} title="Boarding Point" />
      </MapView>
    </View>
  );
};
// 4825811619
const styles = StyleSheet.create({
  card: {
    // flex:1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.primary,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#333',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  chartStatus: {
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    backgroundColor: theme.colors.lightGray,
  },
  chartText: {
    fontSize: 14,
    color: theme.colors.darkGray,
    textAlign: 'center',
  },
  passengerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    // marginBottom: 1,
  },
  passengerList: {
    paddingBottom: 2,
  },
  passengerRow: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 8,
    padding: 10,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passengerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  passengerStatus: {
    fontSize: 14,
    color: '#666',
  },
  berthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  berthInfo: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default JourneyCard;
