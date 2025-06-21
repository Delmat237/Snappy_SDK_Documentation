  const groupChatExample = `// Chat de groupe
class GroupChatService extends ChatService {
  async createGroupChat(participantIds: string[], groupName: string) {
    try {
      // Créer le groupe via l'API
      const groupChat = await this.httpClient.createGroupChat({
        name: groupName,
        participantIds,
        projectId: this.socketClient.projectId
      });

      return groupChat;
    } catch (error) {
      console.error('Erreur création groupe:', error);
      throw error;
    }
  }

  async addParticipant(chatId: string, userId: string) {
    try {
      const updatedChat = await this.httpClient.addParticipantToChat({
        chatId,
        userId,
        projectId: this.socketClient.projectId
      });

      return updatedChat;
    } catch (error) {
      console.error('Erreur ajout participant:', error);
      throw error;
    }
  }

  async removeParticipant(chatId: string, userId: string) {
    try {
      const updatedChat = await this.httpClient.removeParticipantFromChat({
        chatId,
        userId,
        projectId: this.socketClient.projectId
      });

      return updatedChat;
    } catch (error) {
      console.error('Erreur suppression participant:', error);
      throw error;
    }
  }

  async sendGroupMessage(content: string, chatId: string, type: 'text' | 'image' | 'file' = 'text') {
    try {
      const message = await this.httpClient.sendGroupMessage({
        content,
        chatId,
        type
      });

      return message;
    } catch (error) {
      console.error('Erreur envoi message groupe:', error);
      throw error;
    }
  }

  // Gestion des événements de groupe
  setupGroupListeners() {
    this.socketClient.onParticipantJoined = (chatId: string, userId: string) => {
      console.log(\`Participant \${userId} a rejoint le groupe \${chatId}\`);
    };

    this.socketClient.onParticipantLeft = (chatId: string, userId: string) => {
      console.log(\`Participant \${userId} a quitté le groupe \${chatId}\`);
    };

    this.socketClient.onGroupMessageReceived = (message: Message) => {
      // Traiter les messages de groupe
      this.messageListeners.forEach(listener => listener(message));
    };
  }
}

// Composant de chat de groupe
const GroupChatScreen: React.FC<{
  chatId: string;
  groupName: string;
  participants: User[];
  currentUserId: string;
}> = ({ chatId, groupName, participants, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [groupChatService] = useState(() => new GroupChatService(
    process.env.REACT_APP_API_URL!,
    process.env.REACT_APP_SOCKET_URL!,
    'project-id',
    currentUserId
  ));

  useEffect(() => {
    initializeGroupChat();
    return () => {
      groupChatService.disconnect();
    };
  }, []);

  const initializeGroupChat = async () => {
    try {
      await groupChatService.initialize();
      groupChatService.setupGroupListeners();

      const history = await groupChatService.getChatHistory(chatId);
      setMessages(history);

      groupChatService.onMessageReceived(handleNewMessage);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger le chat de groupe');
    }
  };

  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    setInputText('');

    try {
      await groupChatService.sendGroupMessage(messageText, chatId);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\\'envoyer le message');
      setInputText(messageText);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwnMessage = item.senderId === currentUserId;
    const sender = participants.find(p => p.id === item.senderId);
    
    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        {!isOwnMessage && (
          <Text style={styles.senderName}>
            {sender?.displayName || 'Utilisateur'}
          </Text>
        )}
        
        <Text style={[
          styles.messageText,
          isOwnMessage ? styles.ownMessageText : styles.otherMessageText
        ]}>
          {item.content}
        </Text>
        
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{groupName}</Text>
        <Text style={styles.participantCount}>
          {participants.length} participants
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Message au groupe..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};`;


export default groupChatExample;