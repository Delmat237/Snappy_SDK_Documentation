  const basicChatExample = `// Service de chat de base
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { SnappySocketClient } from "@/lib/SnappySocketClient"; 

class ChatService {
  private httpClient: SnappyHTTPClient;
  private socketClient: SnappySocketClient;
  private messageListeners: Array<(message: Message) => void> = [];

  constructor(apiUrl: string, socketUrl: string, projectId: string, userId: string) {
    this.httpClient = new SnappyHTTPClient(apiUrl);
    this.socketClient = new SnappySocketClient(socketUrl, projectId, userId);
    
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socketClient.onConnect = () => {
      console.log('Chat connecté');
    };

    this.socketClient.onMessageReceivedListener = (message: Message) => {
      // Notifier tous les listeners
      this.messageListeners.forEach(listener => listener(message));
    };

    this.socketClient.newConnectionListener = (userId: string) => {
      console.log(\`Utilisateur \${userId} connecté\`);
    };

    this.socketClient.newDisconnectionListener = (userId: string) => {
      console.log(\`Utilisateur \${userId} déconnecté\`);
    };
  }

  async initialize() {
    this.socketClient.initialize();
  }

  async sendMessage(content: string, recipientId: string, type: 'text' | 'image' | 'file' = 'text') {
    try {
      const message = await this.httpClient.sendMessage({
        content,
        recipientId,
        type
      });

      return message;
    } catch (error) {
      console.error('Erreur envoi message:', error);
      throw error;
    }
  }

  async sendImageMessage(imageUri: string, recipientId: string, caption?: string) {
    try {
      const formData = new FormData();
      formData.append('content', caption || 'Image');
      formData.append('recipientId', recipientId);
      formData.append('type', 'image');
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg'
      } as any);

      const message = await this.httpClient.sendMessage(formData);
      return message;
    } catch (error) {
      console.error('Erreur envoi image:', error);
      throw error;
    }
  }

  async getChatHistory(chatId: string) {
    try {
      const chatDetails = await this.httpClient.getChatDetails({
        chatId,
        projectId: this.socketClient.projectId
      });

      return chatDetails.messages;
    } catch (error) {
      console.error('Erreur récupération historique:', error);
      throw error;
    }
  }

  onMessageReceived(listener: (message: Message) => void) {
    this.messageListeners.push(listener);
  }

  removeMessageListener(listener: (message: Message) => void) {
    this.messageListeners = this.messageListeners.filter(l => l !== listener);
  }

  disconnect() {
    if (this.socketClient.socket) {
      this.socketClient.socket.disconnect();
    }
  }
}`;


export default basicChatExample;