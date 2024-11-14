import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme'; // Adjust this path as needed
import { hp } from '../../helpers/common';
import PostCard from '../../components/JourneyPost/JourneyPostCard';
import { useNavigation } from '@react-navigation/native';

const journeyData = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://picsum.photos/id/1018/400/250',
    journeyFrom: 'New York',
    journeyTo: 'Los Angeles',
    date: '2024-10-26',
    travelMessage: "Hey everyone! I'm excited to travel from New York to Los Angeles soon!",
    interests: ['Photography', 'Guitar', 'Running'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    image: null, // No image
    journeyFrom: 'Chicago',
    journeyTo: 'Miami',
    date: '2024-10-27',
    travelMessage: "Looking for travel buddies from Chicago to Miami. Let’s connect!",
    interests: ['Dancing', 'Cooking', 'Movies'],
  },
  {
    id: '3',
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    image: 'https://picsum.photos/id/1016/400/250',
    journeyFrom: 'San Francisco',
    journeyTo: 'Seattle',
    date: '2024-10-28',
    travelMessage: "Hey! Traveling from San Francisco to Seattle. Anyone interested?",
    bringingItems: ['Chess Board', 'Playing Cards'],
    interests: ['Reading', 'Hiking'],
  },
  {
    id: '4',
    name: 'Bob Brown',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    image: null, // No image
    journeyFrom: 'Austin',
    journeyTo: 'Denver',
    date: '2024-10-29',
    travelMessage: "On my way from Austin to Denver! Who’s joining?",
    bringingItems: ['Chess Board', 'Playing Cards'],
    interests: ['Chess', 'Cycling'],
  },
  {
    id: '5',
    name: 'Charlie Green',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    image: 'https://picsum.photos/id/1024/400/250',
    journeyFrom: 'Boston',
    journeyTo: 'New Orleans',
    date: '2024-10-30',
    travelMessage: "Excited for my trip from Boston to New Orleans. Let’s connect over meals!",
    interests: ['Cooking', 'Travel Blogging'],
  },
];

const IndexPage = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // await getAllJourneys();
    setRefreshing(false);
  };

  const navigation = useNavigation();
  const handleMessagePress = () => {
    navigation.navigate('chat');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <View style={styles.avatarContainer}>
          <TouchableOpacity>
            <Image style={styles.avatarImg} resizeMode='contain' source={require("../../assets/images/avatar.png")} />
          </TouchableOpacity>
      </View>
        <Text style={styles.appName}>SAARTHII</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={hp(3.2)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMessagePress}>
            <AntDesign name="message1" size={hp(3.2)} color={theme.colors.textDark} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
          data={journeyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard journeyDetails={item} />}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column'
    // backgroundColor: theme.colors.grayLightBlue,
  },
  avatarContainer:{
    width:hp(6),
    height:hp(6),
    borderRadius:50,
    borderWidth:1,
    borderColor:theme.colors.gray
  },
  avatarImg:{
    width:'100%',
    height:'100%',
    borderRadius:50
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    
  },
  appName: {
    color: theme.colors.textDark,
    fontSize: theme.fontsSize.sm * 1.8,
    fontWeight: theme.fonts.extraBold,
    flex:4,
    textAlign:'center',
  },
  iconContainer: {
    flex:1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.sm,
    padding: 16,
    marginBottom: 12,
  },
  postText: {
    color: theme.colors.text,
    fontSize: theme.fontsSize.sm,
    fontWeight: theme.fonts.semiBold,
  },
});

export default IndexPage;
