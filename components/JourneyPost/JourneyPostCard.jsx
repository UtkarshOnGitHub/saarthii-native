import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { hp } from '../../helpers/common';

const PostCard = ({ journeyDetails }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={{ uri: journeyDetails.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{journeyDetails.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <AntDesign name='adduser' size={hp(2.8)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='fast-food-outline' size={hp(2.8)} />
          </TouchableOpacity>
        </View>
      </View>
      {journeyDetails.image ? (
        <View style={styles.imageContainer}>
          <Text style={styles.message}>{journeyDetails.travelMessage}</Text>
          <Image source={{ uri: journeyDetails.image }} style={styles.postImage} resizeMode="cover" />
        </View>
      ): <Text style={styles.message}>{journeyDetails.travelMessage}</Text>}
      

      <View style={styles.interestsContainer}>
        {journeyDetails.interests?.map((interest, index) => (
          <View key={index} style={styles.pill}>
            <Text style={styles.pillText}>{interest}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.journeyDetails}>
          Traveling from {journeyDetails.journeyFrom} to {journeyDetails.journeyTo} on {journeyDetails.date}
        </Text>
        <Entypo name='dots-three-vertical'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.textDark,
  },
  imageContainer: {
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  pill: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginTop: 6,
    borderRadius:theme.radius.md
  },
  pillText: {
    color: '#fff',
    fontSize: 12,
  },
  footer: {
    marginTop: 8,
    flexDirection:'row',
    justifyContent:"space-between"
  },
  journeyDetails: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
});

export default PostCard;
