import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export function SomeComponent() {
  const [searchParams, setSearchParams] = useLocalSearchParams();
  // ...
}

import { Feather } from '@expo/vector-icons';

const ChatDetail = () => {
  const router = useRouter();
  const { id, chatName } = useLocalSearchParams();

  const messages = [
    {
      id: 'm1',
      text: `Hi ${chatName || 'Friend'}, how are you doing today?`,
      sender: 'other',
    },
    {
      id: 'm2',
      text: 'I wanted to share a quick update about our travel plan.',
      sender: 'me',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.chatTitle}>{chatName ? chatName : `Chat ${id}`}</Text>
          <Text style={styles.chatSubtitle}>Last seen today</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          editable={false}
        />
        <TouchableOpacity style={styles.sendButton} disabled>
          <Feather name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  backButton: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  chatSubtitle: {
    marginTop: 4,
    color: '#777',
    fontSize: 14,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 90,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    backgroundColor: '#0084ff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 15,
    color: '#111',
  },
  inputWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#f1f1f1',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatDetail;
