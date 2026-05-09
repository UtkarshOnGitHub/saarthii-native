import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Chat() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const chatData = [
    { id: '1', name: 'Aditya Patil', message: 'Why don’t scientists trust atoms? Because they make up everything!', },
    { id: '2', name: 'Smita Deshmukh', message: 'Why did the scarecrow win an award? He was outstanding in his field!', readStatus: 'delivered' },
    { id: '3', name: 'Rajesh Shinde', message: 'What do you call fake spaghetti? An impasta!', readStatus: 'read' },
    { id: '4', name: 'Neha Joshi', message: 'Why don’t skeletons fight each other? They don’t have the guts.', },
    { id: '5', name: 'Mangesh Sawant', message: 'What did the ocean say to the beach? Nothing, it just waved.', readStatus: 'read' },
    { id: '6', name: 'Anushka Kadam', message: 'Why can’t you hear a pterodactyl go to the bathroom? Because the “P” is silent.', },
    { id: '7', name: 'Amol Gawde', message: 'Why did the bicycle fall over? Because it was two-tired.', readStatus: 'read' },
    { id: '8', name: 'Vandana Tambe', message: 'Why do seagulls fly over the ocean? Because if they flew over the bay, they’d be bagels.', },
    { id: '9', name: 'Sachin Naik', message: 'What do you call cheese that isn’t yours? Nacho cheese.', },
    { id: '10', name: 'Anil More', message: 'Why did the math book look sad? Because it had too many problems.', readStatus: 'delivered' },
    { id: '11', name: 'Swati Chavan', message: 'Why are elevator jokes so classic and good? Because they work on so many levels.', readStatus: 'read' },
    { id: '12', name: 'Pranav Kulkarni', message: 'Why do cows have hooves instead of feet? Because they lactose.', readStatus: 'sent' },
    { id: '13', name: 'Pallavi Inamdar', message: 'Why did the golfer bring two pairs of pants? In case he got a hole in one.', readStatus: 'read' },
    { id: '14', name: 'Sunil Bhosale', message: 'Why did the coffee file a police report? It got mugged.', readStatus: 'delivered' },
    { id: '15', name: 'Ruchika Jagtap', message: 'Why don’t skeletons fight each other? They don’t have the guts.', },
    { id: '16', name: 'Siddharth Khedekar', message: 'What do you call an alligator in a vest? An investigator.', readStatus: 'sent' },
    { id: '17', name: 'Rekha Rane', message: 'What’s orange and sounds like a parrot? A carrot.', },
    { id: '18', name: 'Saurabh Phadke', message: 'Why don’t programmers like nature? It has too many bugs.', },
    { id: '19', name: 'Vaibhav Mahajan', message: 'Why did the computer go to the doctor? Because it had a virus!', readStatus: 'read' },
    { id: '20', name: 'Anita Sawant', message: 'Why did the banana go to the doctor? It wasn’t peeling well.', },
  ];

  const filteredChatData = useMemo(() => {
    if (!searchText.trim()) return chatData;
    
    return chatData.filter(chat => 
      chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, chatData]);

  const renderReadReceipt = (status) => {
    switch (status) {
      case 'sent':
        return <MaterialCommunityIcons name="check" size={16} color="#999" />;
      case 'delivered':
        return <MaterialCommunityIcons name="check-all" size={16} color="#999" />;
      case 'read':
        return <MaterialCommunityIcons name="check-all" size={16} color="#0084ff" />;
      default:
        return null;
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: `/chat/${item.id}`, params: { chatName: item.name } })}
    >
      <Image source={{ uri: 'https://i.pinimg.com/736x/4f/bb/a0/4fbba0b8ee601b66f3c88d1d2c80194e.jpg' }} style={styles.avatar} />
      <View style={styles.chatTextContainer}>
        <Text style={styles.chatName}>{item.name}</Text>
        <View style={styles.messageWithReceipt}>
          <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
          <View style={styles.receiptIcon}>
            {renderReadReceipt(item.readStatus)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search chats..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <MaterialCommunityIcons name="close" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>Chats</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setIsSearching(true)}
              >
                <Feather name="search" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                {/* <Ionicons name="md-ellipsis-vertical" size={24} color="black" /> */}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChatData}
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
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 4,
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
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  messageWithReceipt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  receiptIcon: {
    marginLeft: 6,
  }});
