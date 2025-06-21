
  const chatbotUIExample = `// Composant React Native pour chatbot
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { ChatbotIntegratedService } from './ChatbotIntegratedService';
import { Chatbot, Message } from '@/lib/models';

interface ChatbotScreenProps {
  chatbot: Chatbot;
  currentUserId: string;
}

const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ chatbot, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatService] = useState(() => new ChatbotIntegratedService(
    process.env.REACT_APP_API_URL!,
    process.env.REACT_APP_SOCKET_URL!,
    'project-id',
    currentUserId
  ));

  useEffect(() => {
    initializeChatbot();
    return () => {
      chatService.disconnect();
    };
  }, []);

  const initializeChatbot = async () => {
    try {
      await chatService.initialize();
      await chatService.loadProjectChatbots();

      // Message de bienvenue du chatbot
      const welcomeMessage: Message = {
        id: \`welcome-\${Date.now()}\`,
        content: \`Bonjour ! Je suis \${chatbot.name}. Comment puis-je vous aider aujourd'hui ?\`,
        senderId: chatbot.id,
        recipientId: currentUserId,
        chatId: \`chat-\${currentUserId}-\${chatbot.id}\`,
        type: 'text',
        createdAt: new Date(),
        updatedAt: new Date(),
        isEncrypted: false,
        isRead: false,
        isDelivered: true
      };

      setMessages([welcomeMessage]);

      // Écouter les nouveaux messages
      chatService.onMessageReceived(handleNewMessage);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger le chatbot');
    }
  };

  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: \`user-\${Date.now()}\`,
      content: inputText.trim(),
      senderId: currentUserId,
      recipientId: chatbot.id,
      chatId: \`chat-\${currentUserId}-\${chatbot.id}\`,
      type: 'text',
      createdAt: new Date(),
      updatedAt: new Date(),
      isEncrypted: false,
      isRead: false,
      isDelivered: true
    };

    // Ajouter le message utilisateur immédiatement
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Envoyer au chatbot avec le contexte
      await chatService.sendMessageToChatbot(
        userMessage.content,
        chatbot.id,
        messages
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\\'envoyer le message');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUserMessage = item.senderId === currentUserId;
    const isChatbotMessage = item.senderId === chatbot.id;
    
    return (
      <View style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessage : styles.botMessage
      ]}>
        {isChatbotMessage && (
          <View style={styles.botHeader}>
            <Image
              source={{ uri: chatbot.avatar || 'https://via.placeholder.com/30' }}
              style={styles.botAvatar}
            />
            <Text style={styles.botName}>{chatbot.name}</Text>
          </View>
        )}
        
        <Text style={[
          styles.messageText,
          isUserMessage ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.content}
        </Text>
        
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!loading) return null;
    
    return (
      <View style={[styles.messageContainer, styles.botMessage]}>
        <View style={styles.botHeader}>
          <Image
            source={{ uri: chatbot.avatar || 'https://via.placeholder.com/30' }}
            style={styles.botAvatar}
          />
          <Text style={styles.botName}>{chatbot.name}</Text>
        </View>
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>En train d'écrire...</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: chatbot.avatar || 'https://via.placeholder.com/40' }}
          style={styles.headerAvatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{chatbot.name}</Text>
          <Text style={styles.headerSubtitle}>
            Assistant IA • {chatbot.model}
          </Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        ListFooterComponent={renderTypingIndicator}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Posez votre question..."
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[styles.sendButton, loading && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={loading || !inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  botHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  botAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  botName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 6,
    opacity: 0.7,
  },
  typingIndicator: {
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatbotScreen;`;

export default chatbotUIExample;