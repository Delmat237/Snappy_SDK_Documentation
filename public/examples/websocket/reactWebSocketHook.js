  const reactWebSocketHook = `// Hook React pour WebSocket
import { useState, useEffect, useRef, useCallback } from 'react';
import { AdvancedWebSocketManager } from './AdvancedWebSocketManager';
import {  Message } from "@/lib/models"';


interface UseWebSocketReturn {
  isConnected: boolean;
  connectionStatus: string;
  messages: Message[];
  onlineUsers: string[];
  sendMessage: (content: string, recipientId: string) => Promise<void>;
  clearMessages: () => void;
}

export const useWebSocket = (
  serverUrl: string,
  projectId: string,
  userId: string
): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Déconnecté');
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  
  const wsManagerRef = useRef<AdvancedWebSocketManager | null>(null);
  const httpClientRef = useRef<SnappyHTTPClient | null>(null);

  // Initialisation
  useEffect(() => {
    if (!wsManagerRef.current) {
      wsManagerRef.current = new AdvancedWebSocketManager(serverUrl, projectId, userId);
      httpClientRef.current = new SnappyHTTPClient(
        serverUrl.replace('ws', 'http').replace(':3001', ':3000')
      );
    }

    const wsManager = wsManagerRef.current;

    // Listeners
    const handleConnection = (connected: boolean) => {
      setIsConnected(connected);
      setConnectionStatus(wsManager.getConnectionStatus());
    };

    const handleMessage = (message: Message) => {
      setMessages(prev => [...prev, message]);
    };

    const handlePresence = (userId: string, online: boolean) => {
      setOnlineUsers(prev => {
        if (online) {
          return prev.includes(userId) ? prev : [...prev, userId];
        } else {
          return prev.filter(id => id !== userId);
        }
      });
    };

    // Ajouter les listeners
    wsManager.addConnectionListener(handleConnection);
    wsManager.addMessageListener(handleMessage);
    wsManager.addPresenceListener(handlePresence);

    // Initialiser la connexion
    wsManager.initialize();

    // Cleanup
    return () => {
      wsManager.removeConnectionListener(handleConnection);
      wsManager.removeMessageListener(handleMessage);
      wsManager.removePresenceListener(handlePresence);
      wsManager.disconnect();
    };
  }, [serverUrl, projectId, userId]);

  // Mise à jour du statut de connexion
  useEffect(() => {
    const interval = setInterval(() => {
      if (wsManagerRef.current) {
        setConnectionStatus(wsManagerRef.current.getConnectionStatus());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = useCallback(async (content: string, recipientId: string) => {
    if (!httpClientRef.current) {
      throw new Error('Client HTTP non initialisé');
    }

    try {
      await httpClientRef.current.sendMessage({
        content,
        recipientId,
        type: 'text'
      });
    } catch (error) {
      console.error('Erreur envoi message:', error);
      throw error;
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected,
    connectionStatus,
    messages,
    onlineUsers,
    sendMessage,
    clearMessages
  };
};`;


export default reactWebSocketHook;