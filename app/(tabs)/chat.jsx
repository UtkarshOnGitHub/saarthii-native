import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Chat({ navigation }) {


  const chatData = [
    { id: '1', name: 'Aditya Patil', message: 'Why don’t scientists trust atoms? Because they make up everything!', },
    { id: '2', name: 'Smita Deshmukh', message: 'Why did the scarecrow win an award? He was outstanding in his field!', },
    { id: '3', name: 'Rajesh Shinde', message: 'What do you call fake spaghetti? An impasta!', },
    { id: '4', name: 'Neha Joshi', message: 'Why don’t skeletons fight each other? They don’t have the guts.', },
    { id: '5', name: 'Mangesh Sawant', message: 'What did the ocean say to the beach? Nothing, it just waved.', },
    { id: '6', name: 'Anushka Kadam', message: 'Why can’t you hear a pterodactyl go to the bathroom? Because the “P” is silent.', },
    { id: '7', name: 'Amol Gawde', message: 'Why did the bicycle fall over? Because it was two-tired.', },
    { id: '8', name: 'Vandana Tambe', message: 'Why do seagulls fly over the ocean? Because if they flew over the bay, they’d be bagels.', },
    { id: '9', name: 'Sachin Naik', message: 'What do you call cheese that isn’t yours? Nacho cheese.', },
    { id: '10', name: 'Anil More', message: 'Why did the math book look sad? Because it had too many problems.', },
    { id: '11', name: 'Swati Chavan', message: 'Why are elevator jokes so classic and good? Because they work on so many levels.', },
    { id: '12', name: 'Pranav Kulkarni', message: 'Why do cows have hooves instead of feet? Because they lactose.', },
    { id: '13', name: 'Pallavi Inamdar', message: 'Why did the golfer bring two pairs of pants? In case he got a hole in one.', },
    { id: '14', name: 'Sunil Bhosale', message: 'Why did the coffee file a police report? It got mugged.', },
    { id: '15', name: 'Ruchika Jagtap', message: 'Why don’t skeletons fight each other? They don’t have the guts.', },
    { id: '16', name: 'Siddharth Khedekar', message: 'What do you call an alligator in a vest? An investigator.', },
    { id: '17', name: 'Rekha Rane', message: 'What’s orange and sounds like a parrot? A carrot.', },
    { id: '18', name: 'Saurabh Phadke', message: 'Why don’t programmers like nature? It has too many bugs.', },
    { id: '19', name: 'Vaibhav Mahajan', message: 'Why did the computer go to the doctor? Because it had a virus!', },
    { id: '20', name: 'Anita Sawant', message: 'Why did the banana go to the doctor? It wasn’t peeling well.', },
  ];
  ;

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}
    // onPress={() => navigation.navigate('ChatScreen', { userId: item.id })}
    >
      <Image source={{ uri: 'https://i.pinimg.com/736x/4f/bb/a0/4fbba0b8ee601b66f3c88d1d2c80194e.jpg' }} style={styles.avatar} />
      <View style={styles.chatTextContainer}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* <Ionicons name="md-ellipsis-vertical" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatList}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  chatList: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessage: {
    fontSize: 14,
    color: '#555',
  },
});
