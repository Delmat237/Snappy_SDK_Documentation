  const basicWebSocketExample = `// Gestionnaire WebSocket avancé
import {  Message } from "@/lib/models"';
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';
import { ISnappySocketClient } from "@/lib/ISnappySocketClient"';

class AdvancedWebSocketManager implements ISnappySocketClient {
  private socketClient: SnappySocketClient;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private heartbeatInterval?: NodeJS.Timeout;
  private connectionListeners: Array<(connected: boolean) => void> = [];
  private messageListeners: Array<(message: Message) => void> = [];
  private presenceListeners: Array<(userId: string, online: boolean) => void> = [];

  constructor(serverUrl: string, projectId: string, userId: string) {
    this.socketClient = new SnappySocketClient(serverUrl, projectId, userId);
  }

  async initialize() {
    try {
      this.socketClient.initialize(this);
      this.startHeartbeat();
    } catch (error) {
      console.error('Erreur initialisation WebSocket:', error);
      this.handleReconnection();
    }
  }

  // Implémentation de ISnappySocketClient
  onConnect() {
    console.log('WebSocket connecté');
    this.reconnectAttempts = 0;
    this.notifyConnectionListeners(true);
    this.startHeartbeat();
  }

  onDisconnect() {
    console.log('WebSocket déconnecté');
    this.notifyConnectionListeners(false);
    this.stopHeartbeat();
    this.handleReconnection();
  }

  newConnectionListener(userId: string) {
    console.log(\`Utilisateur \${userId} en ligne\`);
    this.notifyPresenceListeners(userId, true);
  }

  newDisconnectionListener(userId: string) {
    console.log(\`Utilisateur \${userId} hors ligne\`);
    this.notifyPresenceListeners(userId, false);
  }

  onMessageReceivedListener(message: Message) {
    console.log('Message reçu:', message);
    this.notifyMessageListeners(message);
  }

  // Gestion de la reconnexion automatique
  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(\`Tentative de reconnexion \${this.reconnectAttempts}/\${this.maxReconnectAttempts} dans \${delay}ms\`);
      
      setTimeout(() => {
        this.socketClient.initialize(this, true);
      }, delay);
    } else {
      console.error('Impossible de se reconnecter après', this.maxReconnectAttempts, 'tentatives');
      this.notifyConnectionListeners(false);
    }
  }

  // Heartbeat pour maintenir la connexion
  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.socketClient.socket?.connected) {
        this.socketClient.socket.emit('ping');
      }
    }, 30000); // Ping toutes les 30 secondes
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  // Méthodes pour les listeners
  addConnectionListener(listener: (connected: boolean) => void) {
    this.connectionListeners.push(listener);
  }

  removeConnectionListener(listener: (connected: boolean) => void) {
    this.connectionListeners = this.connectionListeners.filter(l => l !== listener);
  }

  addMessageListener(listener: (message: Message) => void) {
    this.messageListeners.push(listener);
  }

  removeMessageListener(listener: (message: Message) => void) {
    this.messageListeners = this.messageListeners.filter(l => l !== listener);
  }

  addPresenceListener(listener: (userId: string, online: boolean) => void) {
    this.presenceListeners.push(listener);
  }

  removePresenceListener(listener: (userId: string, online: boolean) => void) {
    this.presenceListeners = this.presenceListeners.filter(l => l !== listener);
  }

  // Méthodes de notification
  private notifyConnectionListeners(connected: boolean) {
    this.connectionListeners.forEach(listener => listener(connected));
  }

  private notifyMessageListeners(message: Message) {
    this.messageListeners.forEach(listener => listener(message));
  }

  private notifyPresenceListeners(userId: string, online: boolean) {
    this.presenceListeners.forEach(listener => listener(userId, online));
  }

  // Méthodes utilitaires
  isConnected(): boolean {
    return this.socketClient.socket?.connected || false;
  }

  getConnectionStatus(): string {
    if (this.isConnected()) {
      return 'Connecté';
    } else if (this.reconnectAttempts > 0) {
      return \`Reconnexion... (\${this.reconnectAttempts}/\${this.maxReconnectAttempts})\`;
    } else {
      return 'Déconnecté';
    }
  }

  disconnect() {
    this.stopHeartbeat();
    if (this.socketClient.socket) {
      this.socketClient.socket.disconnect();
    }
  }
}`;

export  default basicWebSocketExample;