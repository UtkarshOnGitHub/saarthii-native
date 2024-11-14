import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Switch, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../helpers/ToastConfi';
import ShowJourneyModal from '../Modals/showJourneyModal';
import CustomButton from '../CustomButton';
// import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const JourneyCard = ({ journeyData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const richText = useRef();
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const closemodal = (value)=>{
    setIsVisible(!value)
  }

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (!Toast) {
      return;
    }
    if (isEnabled) {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Journey Archived',
        visibilityTime: 1000,
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'tomatoToast',
        text1: 'Journey Unarchived',
        text2: 'Enjoy Ride For Home',
        visibilityTime: 1000,
        position: 'bottom',
      });
    }
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
    <View style={[styles.card]}>
      <View style={styles.topCardCont}>
        <Text style={styles.title}>{journeyData.pnrNumber}</Text>
        <View>
          <Switch
            style={styles.switch}
            trackColor={{ false: '#767577', true: '#a6d487' }}
            thumbColor={isEnabled ? theme.colors.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{ width: 20 }} name="train" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>{journeyData.trainName} ({journeyData.trainNumber})</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{ width: 20 }} name="map-marker" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>
          {journeyData.sourceStation} to {journeyData.destinationStation}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{ width: 20 }} name="calendar" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>
          {journeyData.dateOfJourney}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{ width: 20 }} name="list" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>
          {journeyData.quota}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{ width: 20 }} name="user" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>Passengers: {journeyData.numberOfpassenger}</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome style={{ width: 20 }} name="money" size={20} color={theme.colors.primary} />
        <Text style={styles.infoText}>Fare: ₹{journeyData.bookingFare}</Text>
      </View>

      <ShowJourneyModal isVisible={isVisible} closemodal={closemodal}/>

      <Text style={styles.passengerTitle}>Passenger List:</Text>
      <FlatList
        data={journeyData?.passengerList}
        keyExtractor={(item) => item.passengerSerialNumber.toString()}
        renderItem={renderPassenger}
        contentContainerStyle={styles.passengerList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <CustomButton onPress={handleToggleVisibility}
        title="Make Journey Public"
        // isLoading={isLoading}
        btnStyle={{ marginHorizontal: wp(3), marginTop: hp(3) }}/>
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  topCardCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switch: {
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  messageContainer: {
    marginTop: 10,
  },
  messageInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.primary,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
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
  passengerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
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
