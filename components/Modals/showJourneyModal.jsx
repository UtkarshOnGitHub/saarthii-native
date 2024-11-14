import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Image, Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../CustomButton';

const ShowJourneyModal = ({ isVisible,closemodal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

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

  const handleCloseModal =()=>{
    closemodal(true)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.overlay} />

            <View style={styles.modalView}>
                <View style={styles.topbar}>
                    <FontAwesome onPress={() => handleCloseModal()}  name="close" size={24} color={theme.colors.primary}/>
                </View>
                <View style={{marginTop:"5px"}}>
                    <Text>Create a Journey Post</Text>
                </View>
              <View style={styles.messageContainer}>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Write your message here..."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={4}
                />
                 {image && <Image source={{ uri: image }} style={styles.image} />}
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                  <FontAwesome name="cloud-upload" size={24} color={theme.colors.primary} />
                  <Text style={styles.uploadText}>{ !image ? "Upload Image" : "Change Image"}</Text>
                </TouchableOpacity>

               
                <View>
                    <CustomButton title='Save'  btnStyle={{ marginHorizontal: wp(1), marginTop: hp(3) }}/>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: wp(90),
    height:hp(70),
    margin: 20,
    backgroundColor: 'white',
    borderRadius: theme.radius.md,
    padding: wp(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topbar:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageContainer: {
    marginTop: 10,
    width:"100%"
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
    justifyContent:"center",
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
});

export default ShowJourneyModal;
