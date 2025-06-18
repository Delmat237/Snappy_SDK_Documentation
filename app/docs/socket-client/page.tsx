'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Zap,
  Users,
  Globe,
  Settings
} from 'lucide-react';
import { useState } from 'react';

export default function SocketClientPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const basicUsage = `import { SnappySocketClient } from "@/lib/SnappySocketClient"'; 

// Initialisation
const socketClient = new SnappySocketClient(
  'wss://your-websocket-url.com',  // URL WebSocket
  'your-project-id',               // ID du projet
  'your-user-id'                   // ID de l'utilisateur
);

// Initialisation de la connexion
socketClient.initialize();`;

  const eventListeners = `// Configuration des event listeners
socketClient.onConnect = () => {
  console.log('WebSocket connecté');
  // Logique de connexion réussie
};

socketClient.onDisconnect = () => {
  console.log('WebSocket déconnecté');
  // Logique de déconnexion
};

socketClient.newConnectionListener = (userId: string) => {
  console.log('Nouvel utilisateur connecté:', userId);
  // Mettre à jour la liste des utilisateurs en ligne
};

socketClient.newDisconnectionListener = (userId: string) => {
  console.log('Utilisateur déconnecté:', userId);
  // Mettre à jour la liste des utilisateurs en ligne
};

socketClient.onMessageReceivedListener = (message: Message) => {
  console.log('Nouveau message reçu:', message);
  // Traiter le nouveau message
  // Mettre à jour l'interface utilisateur
};`;

  const customImplementation = `// Implémentation personnalisée avec interface
import { ISnappySocketClient } from "@/lib/ISnappySocketClient"'; 
import { Message } from "@/lib/Message"'; 

class CustomSocketHandler implements ISnappySocketClient {
  onConnect() {
    console.log('Connexion établie');
    // Logique personnalisée de connexion
    this.updateConnectionStatus(true);
  }

  onDisconnect() {
    console.log('Connexion fermée');
    // Logique personnalisée de déconnexion
    this.updateConnectionStatus(false);
    this.attemptReconnection();
  }

  newConnectionListener(userId: string) {
    console.log(\`Utilisateur \${userId} est maintenant en ligne\`);
    // Ajouter à la liste des utilisateurs en ligne
    this.addUserToOnlineList(userId);
  }

  newDisconnectionListener(userId: string) {
    console.log(\`Utilisateur \${userId} est maintenant hors ligne\`);
    // Retirer de la liste des utilisateurs en ligne
    this.removeUserFromOnlineList(userId);
  }

  onMessageReceivedListener(message: Message) {
    console.log('Message reçu:', message.content);
    // Traitement personnalisé du message
    this.processIncomingMessage(message);
    this.updateChatInterface(message);
  }

  private updateConnectionStatus(isConnected: boolean) {
    // Mettre à jour l'état de connexion dans l'UI
  }

  private attemptReconnection() {
    // Logique de reconnexion automatique
  }

  private addUserToOnlineList(userId: string) {
    // Ajouter utilisateur à la liste en ligne
  }

  private removeUserFromOnlineList(userId: string) {
    // Retirer utilisateur de la liste en ligne
  }

  private processIncomingMessage(message: Message) {
    // Traitement du message (déchiffrement, validation, etc.)
  }

  private updateChatInterface(message: Message) {
    // Mise à jour de l'interface de chat
  }
}

// Utilisation
const customHandler = new CustomSocketHandler();
const socketClient = new SnappySocketClient(
  'wss://your-websocket-url.com',
  'project-id',
  'user-id'
);

socketClient.initialize(customHandler);`;

  const reactIntegration = `// Intégration avec React et hooks
import React, { useEffect, useState, useCallback } from 'react';
import { SnappySocketClient, Message } from 'yow-talk-sdk';

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socketClient] = useState(() => new SnappySocketClient(
    process.env.REACT_APP_WEBSOCKET_URL!,
    'project-id',
    'current-user-id'
  ));

  const handleNewMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleUserConnection = useCallback((userId: string) => {
    setOnlineUsers(prev => [...prev, userId]);
  }, []);

  const handleUserDisconnection = useCallback((userId: string) => {
    setOnlineUsers(prev => prev.filter(id => id !== userId));
  }, []);

  useEffect(() => {
    // Configuration des event listeners
    socketClient.onConnect = () => setIsConnected(true);
    socketClient.onDisconnect = () => setIsConnected(false);
    socketClient.onMessageReceivedListener = handleNewMessage;
    socketClient.newConnectionListener = handleUserConnection;
    socketClient.newDisconnectionListener = handleUserDisconnection;

    // Initialisation de la connexion
    socketClient.initialize();

    // Cleanup
    return () => {
      if (socketClient.socket) {
        socketClient.socket.disconnect();
      }
    };
  }, [socketClient, handleNewMessage, handleUserConnection, handleUserDisconnection]);

  return (
    <div className="chat-container">
      <div className="connection-status">
        Status: {isConnected ? 'Connecté' : 'Déconnecté'}
      </div>
      
      <div className="online-users">
        Utilisateurs en ligne: {onlineUsers.length}
      </div>
      
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.senderId}:</strong> {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};`;

  const errorHandling = `// Gestion d'erreurs et reconnexion
class RobustSocketClient {
  private socketClient: SnappySocketClient;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(url: string, projectId: string, userId: string) {
    this.socketClient = new SnappySocketClient(url, projectId, userId);
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.socketClient.onConnect = () => {
      console.log('WebSocket connecté');
      this.reconnectAttempts = 0; // Reset counter on successful connection
    };

    this.socketClient.onDisconnect = () => {
      console.log('WebSocket déconnecté');
      this.handleReconnection();
    };

    this.socketClient.onMessageReceivedListener = (message: Message) => {
      try {
        this.processMessage(message);
      } catch (error) {
        console.error('Erreur traitement message:', error);
      }
    };
  }

  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(\`Tentative de reconnexion \${this.reconnectAttempts}/\${this.maxReconnectAttempts}\`);
      
      setTimeout(() => {
        this.socketClient.initialize(undefined, true); // Force reconnection
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Impossible de se reconnecter après', this.maxReconnectAttempts, 'tentatives');
      // Notifier l'utilisateur ou implémenter une logique de fallback
    }
  }

  private processMessage(message: Message) {
    // Validation du message
    if (!message.content || !message.senderId) {
      throw new Error('Message invalide');
    }

    // Traitement du message
    console.log('Message traité:', message);
  }

  public connect() {
    this.socketClient.initialize();
  }

  public disconnect() {
    if (this.socketClient.socket) {
      this.socketClient.socket.disconnect();
    }
  }
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">Socket Client</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Guide complet du SnappySocketClient pour la communication temps réel via WebSocket avec Socket.IO.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">SnappySocketClient</Badge>
          <Badge variant="outline">WebSocket</Badge>
          <Badge variant="outline">Temps réel</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-purple-200 bg-purple-50">
        <MessageSquare className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>SnappySocketClient</strong> gère les connexions WebSocket pour les messages temps réel, 
          les notifications de présence et tous les événements de chat en direct.
        </AlertDescription>
      </Alert>

      {/* Basic Usage */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Utilisation de base</CardTitle>
              <CardDescription>Comment initialiser et utiliser le client WebSocket</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(basicUsage, 'basic')}
            >
              {copiedCode === 'basic' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{basicUsage}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <div className="font-semibold text-purple-800">server</div>
              <div className="text-purple-600">URL du serveur WebSocket</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">projectId</div>
              <div className="text-blue-600">Identifiant du projet</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="font-semibold text-green-800">user</div>
              <div className="text-green-600">Identifiant de l&#39;utilisateur</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Listeners */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Event Listeners</CardTitle>
              <CardDescription>Configuration des écouteurs d&#39;événements WebSocket</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(eventListeners, 'events')}
            >
              {copiedCode === 'events' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{eventListeners}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Événements de connexion</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">onConnect</span>
                  <Badge variant="secondary" className="text-xs">callback</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">onDisconnect</span>
                  <Badge variant="secondary" className="text-xs">callback</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Événements utilisateur</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">newConnectionListener</span>
                  <Badge variant="secondary" className="text-xs">string</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">newDisconnectionListener</span>
                  <Badge variant="secondary" className="text-xs">string</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Usage */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Implémentation personnalisée</CardTitle>
              <CardDescription>Utilisation de l&#39;interface ISnappySocketClient pour une logique personnalisée</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="custom" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="custom">Interface personnalisée</TabsTrigger>
              <TabsTrigger value="react">Intégration React</TabsTrigger>
              <TabsTrigger value="error">Gestion d&#39;erreurs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(customImplementation, 'custom')}
                >
                  {copiedCode === 'custom' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{customImplementation}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="react" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(reactIntegration, 'react')}
                >
                  {copiedCode === 'react' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{reactIntegration}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="error" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(errorHandling, 'error')}
                >
                  {copiedCode === 'error' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{errorHandling}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* WebSocket Events */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            Événements WebSocket
          </CardTitle>
          <CardDescription>
            Liste complète des événements gérés par le client
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Événements entrants</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="font-mono font-semibold">connect</div>
                  <div className="text-gray-600">Connexion WebSocket établie</div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="font-mono font-semibold">disconnect</div>
                  <div className="text-gray-600">Connexion WebSocket fermée</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="font-mono font-semibold">message-send</div>
                  <div className="text-gray-600">Nouveau message reçu</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-mono font-semibold">new-connection</div>
                  <div className="text-gray-600">Nouvel utilisateur connecté</div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                  <div className="font-mono font-semibold">new-disconnection</div>
                  <div className="text-gray-600">Utilisateur déconnecté</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Callbacks disponibles</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="font-mono font-semibold">onConnect()</div>
                  <div className="text-gray-600">Appelé lors de la connexion</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="font-mono font-semibold">onDisconnect()</div>
                  <div className="text-gray-600">Appelé lors de la déconnexion</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="font-mono font-semibold">onMessageReceivedListener()</div>
                  <div className="text-gray-600">Traite les messages reçus</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="font-mono font-semibold">newConnectionListener()</div>
                  <div className="text-gray-600">Gère les nouvelles connexions</div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="font-mono font-semibold">newDisconnectionListener()</div>
                  <div className="text-gray-600">Gère les déconnexions</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
            Bonnes pratiques
          </CardTitle>
          <CardDescription>
            Recommandations pour une utilisation optimale du client WebSocket
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">✅ À faire</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion des erreurs</strong> - Implémentez une gestion robuste des erreurs et reconnexions
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Cleanup</strong> - Fermez les connexions WebSocket lors du démontage des composants
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>État de connexion</strong> - Affichez l&#39;état de connexion à l&#39;utilisateur
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">❌ À éviter</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Connexions multiples</strong> - Évitez de créer plusieurs connexions simultanées
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Listeners non nettoyés</strong> - N&#39;oubliez pas de nettoyer les event listeners
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Traitement synchrone</strong> - Évitez les traitements longs dans les callbacks
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}