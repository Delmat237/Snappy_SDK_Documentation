  const chatListExample = `// Liste des conversations
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { SnappyHTTPClient  } from "@/lib/SnappyHTTPClient";
import {  ChatResource } from "@/lib/models";

interface ChatListScreenProps {
  currentUserId: string;
  onChatSelect: (chat: ChatResource) => void;
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({
  currentUserId,
  onChatSelect
}) => {
  const [chats, setChats] = useState<ChatResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [httpClient] = useState(() => new SnappyHTTPClient(
    process.env.REACT_APP_API_URL!
  ));

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const userChats = await httpClient.getUserChats(
        currentUserId,
        'project-id'
      );
      setChats(userChats);
    } catch (error) {
      console.error('Erreur chargement chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChatItem = ({ item }: { item: ChatResource }) => {
    const otherParticipant = item.participants.find(p => p.id !== currentUserId);
    const lastMessage = item.lastMessage;
    
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => onChatSelect(item)}
      >
        <Image
          source={{ 
            uri: otherParticipant?.avatar || 'https://via.placeholder.com/50' 
          }}
          style={styles.avatar}
        />
        
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>
            {otherParticipant?.displayName || 'Utilisateur'}
          </Text>
          
          {lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage.type === 'image' ? '📷 Image' : lastMessage.content}
            </Text>
          )}
        </View>
        
        <View style={styles.chatMeta}>
          {lastMessage && (
            <Text style={styles.timestamp}>
              {formatTime(lastMessage.createdAt)}
            </Text>
          )}
          
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const formatTime = (date: Date): string => {
    const now = new Date();
    const messageDate = new Date(date);
    
    if (now.toDateString() === messageDate.toDateString()) {
      return messageDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des conversations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatListScreen;`;

export default chatListExample;