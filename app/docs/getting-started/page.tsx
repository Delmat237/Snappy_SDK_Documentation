'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Rocket, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Download,
  Code,
  Play,
  ArrowRight,
  Terminal,
  Smartphone,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function GettingStartedPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCode = `git clone --branch v2-sdk --single-branch https://github.com/PacomeKFP/snappy.git
copy src/lib in your project

# Dépendances peer requises
npm install @react-native-async-storage/async-storage axios socket.io-client`;

  const basicSetupCode = `import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';
import { SnappySocketClient } from "@/lib/SnappySocketClient"'; 

// Configuration du client HTTP
const httpClient = new SnappyHTTPClient(
  'https://your-api-base-url.com',
  'your-bearer-token', // optionnel
  'your-project-id'    // optionnel
);

// Configuration du client WebSocket
const socketClient = new SnappySocketClient(
  'wss://your-websocket-url.com',
  'your-project-id',
  'your-user-id'
);`;

  const envConfigCode = `# .env
REACT_APP_API_BASE_URL=https://your-api-url.com
REACT_APP_WEBSOCKET_URL=wss://your-websocket-url.com
REACT_APP_PROJECT_ID=your-project-id

# Configuration avec variables d'environnement
const httpClient = new SnappyHTTPClient(
  process.env.REACT_APP_API_BASE_URL!,
  undefined, // Token sera chargé automatiquement
  process.env.REACT_APP_PROJECT_ID
);`;

  const firstAuthCode = `// Première authentification
const authResult = await httpClient.authenticateUser({
  email: 'user@example.com',
  password: 'password123'
});

// Le token est automatiquement stocké
console.log('Utilisateur connecté:', authResult.data);
console.log('Token:', authResult.token);

// Toutes les requêtes suivantes utilisent automatiquement le token
const contacts = await httpClient.getUserContacts({
  userId: authResult.data.id,
  projectId: process.env.REACT_APP_PROJECT_ID!
});`;

  const firstMessageCode = `// Initialiser la connexion WebSocket
socketClient.onConnect = () => {
  console.log('WebSocket connecté');
};

socketClient.onMessageReceivedListener = (message) => {
  console.log('Nouveau message:', message.content);
  console.log('De:', message.senderId);
};

socketClient.initialize();

// Envoyer votre premier message
const message = await httpClient.sendMessage({
  content: 'Hello, world!',
  recipientId: 'user-123',
  type: 'text'
});

console.log('Message envoyé:', message);`;

  const completeExampleCode = `// Exemple complet d'application de chat
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';
import { SnappySocketClient } from "@/lib/SnappySocketClient"'; 

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  const [httpClient] = useState(() => new SnappyHTTPClient(
    process.env.REACT_APP_API_BASE_URL!
  ));
  
  const [socketClient] = useState(() => new SnappySocketClient(
    process.env.REACT_APP_WEBSOCKET_URL!,
    process.env.REACT_APP_PROJECT_ID!,
    'current-user-id'
  ));

  useEffect(() => {
    initializeChat();
    return () => {
      if (socketClient.socket) {
        socketClient.socket.disconnect();
      }
    };
  }, []);

  const initializeChat = async () => {
    try {
      // Authentification
      await httpClient.authenticateUser({
        email: 'user@example.com',
        password: 'password123'
      });

      // Configuration WebSocket
      socketClient.onConnect = () => setIsConnected(true);
      socketClient.onDisconnect = () => setIsConnected(false);
      socketClient.onMessageReceivedListener = (message) => {
        setMessages(prev => [...prev, message]);
      };

      // Initialiser la connexion
      socketClient.initialize();
    } catch (error) {
      console.error('Erreur initialisation:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
      await httpClient.sendMessage({
        content: inputText.trim(),
        recipientId: 'recipient-user-id',
        type: 'text'
      });
      setInputText('');
    } catch (error) {
      console.error('Erreur envoi message:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={{ padding: 10, backgroundColor: '#f0f0f0', margin: 5, borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.senderId}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Chat Yow Talk
      </Text>
      
      <Text style={{ marginBottom: 10, color: isConnected ? 'green' : 'red' }}>
        Status: {isConnected ? 'Connecté' : 'Déconnecté'}
      </Text>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, marginBottom: 20 }}
      />

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginRight: 10,
            borderRadius: 5
          }}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez votre message..."
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            borderRadius: 5,
            justifyContent: 'center'
          }}
          onPress={sendMessage}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatApp;`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Rocket className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Guide de démarrage</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Configurez et utilisez le SDK Yow Talk en moins de 10 minutes. Ce guide vous accompagne étape par étape 
          pour créer votre première application de chat avec React Native.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Temps estimé: 10 min</Badge>
          <Badge variant="outline">React Native</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </div>
      </div>

      {/* Prerequisites */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Prérequis :</strong> React Native 0.60+, Node.js 14+, un projet React Native configuré, 
          et accès à une instance de l&apos;API Yow Talk.
        </AlertDescription>
      </Alert>

      {/* Step-by-step guide */}
      <div className="space-y-8">
        {/* Step 1: Installation */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 text-blue-600 mr-2" />
                  Installation du SDK
                </CardTitle>
                <CardDescription>
                  Installez le SDK et ses dépendances dans votre projet React Native
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(installCode, 'install')}
              >
                {copiedCode === 'install' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{installCode}</code>
              </pre>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="font-semibold text-blue-800">yow-talk-sdk</div>
                <div className="text-blue-600">SDK principal avec tous les clients</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-semibold text-green-800">AsyncStorage</div>
                <div className="text-green-600">Stockage local sécurisé</div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <div className="font-semibold text-purple-800">Socket.IO</div>
                <div className="text-purple-600">Communication temps réel</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Configuration */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">2</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 text-purple-600 mr-2" />
                  Configuration initiale
                </CardTitle>
                <CardDescription>
                  Configurez les clients HTTP et WebSocket avec vos paramètres
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Configuration de base</TabsTrigger>
                <TabsTrigger value="env">Variables d&apos;environnement</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(basicSetupCode, 'basic')}
                  >
                    {copiedCode === 'basic' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{basicSetupCode}</code>
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="env" className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(envConfigCode, 'env')}
                  >
                    {copiedCode === 'env' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{envConfigCode}</code>
                  </pre>
                </div>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Recommandé :</strong> Utilisez toujours des variables d&apos;environnement pour les URLs et tokens sensibles.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Step 3: First Authentication */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">3</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 text-green-600 mr-2" />
                  Première authentification
                </CardTitle>
                <CardDescription>
                  Authentifiez un utilisateur et récupérez ses données
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(firstAuthCode, 'auth')}
              >
                {copiedCode === 'auth' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{firstAuthCode}</code>
              </pre>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">✅ Ce qui se passe automatiquement :</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Le token JWT est stocké localement avec AsyncStorage</li>
                <li>• L&apos;utilisateur est sauvegardé pour les sessions futures</li>
                <li>• Toutes les requêtes suivantes utilisent automatiquement le token</li>
                <li>• La configuration du client est mise à jour</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: First Message */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-orange-600">4</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Terminal className="w-5 h-5 text-orange-600 mr-2" />
                  Premier message
                </CardTitle>
                <CardDescription>
                  Configurez WebSocket et envoyez votre premier message
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(firstMessageCode, 'message')}
              >
                {copiedCode === 'message' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{firstMessageCode}</code>
              </pre>
            </div>
            
            <Alert>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Les messages sont automatiquement chiffrés avec le protocole Signal avant l&apos;envoi et déchiffrés à la réception.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 5: Complete Example */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-red-600">5</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 text-red-600 mr-2" />
                  Application complète
                </CardTitle>
                <CardDescription>
                  Exemple d&apos;une application de chat fonctionnelle
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(completeExampleCode, 'complete')}
              >
                {copiedCode === 'complete' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{completeExampleCode}</code>
              </pre>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 Fonctionnalités incluses :</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                <div>• Authentification automatique</div>
                <div>• Connexion WebSocket temps réel</div>
                <div>• Envoi et réception de messages</div>
                <div>• Interface utilisateur React Native</div>
                <div>• Gestion des états de connexion</div>
                <div>• Nettoyage automatique des ressources</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle>🎉 Félicitations ! Votre première app de chat est prête</CardTitle>
          <CardDescription>
            Vous avez maintenant une application de chat fonctionnelle avec le SDK Yow Talk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">✅ Ce que vous avez accompli :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Installation et configuration du SDK
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Authentification sécurisée
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Communication temps réel
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Interface utilisateur fonctionnelle
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">🚀 Prochaines étapes :</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link href="/docs/examples/chat">
                      <Code className="w-4 h-4 mr-2" />
                      Exemple de chat avancé
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link href="/docs/api/auth">
                      <Terminal className="w-4 h-4 mr-2" />
                      Explorer l&apos;API complète
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link href="/docs/examples/chatbot">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Ajouter des chatbots IA
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            Résolution de problèmes
          </CardTitle>
          <CardDescription>
            Solutions aux problèmes courants lors de la configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">🔧 Problèmes d&apos;installation</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <div className="font-semibold text-red-800">Erreur de dépendances peer</div>
                    <div className="text-red-600">Installez AsyncStorage, Axios et Socket.IO manuellement</div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="font-semibold text-yellow-800">Metro bundler cache</div>
                    <div className="text-yellow-600">Exécutez <code>npx react-native start --reset-cache</code></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">🌐 Problèmes de connexion</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-semibold text-blue-800">WebSocket ne se connecte pas</div>
                    <div className="text-blue-600">Vérifiez l&apos;URL et les paramètres de projet</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                    <div className="font-semibold text-purple-800">Erreur 401 Unauthorized</div>
                    <div className="text-purple-600">Vérifiez vos identifiants d&apos;authentification</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2">🆘 Commandes de débogage utiles :</h5>
              <pre className="text-sm text-gray-300">
                <code>{`# Nettoyer le cache
npx react-native start --reset-cache

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifier la configuration
console.log('API URL:', process.env.REACT_APP_API_BASE_URL);
console.log('Socket URL:', process.env.REACT_APP_WEBSOCKET_URL);`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">📚 Approfondir</CardTitle>
            <CardDescription>
              Explorez les fonctionnalités avancées
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/docs/architecture">
                Architecture du SDK
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/docs/api/signal">
                Protocole Signal
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">🎯 Exemples</CardTitle>
            <CardDescription>
              Cas d&apos;usage concrets et complets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/docs/examples/auth">
                Authentification avancée
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/docs/examples/websocket">
                WebSocket robuste
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">🔧 Configuration</CardTitle>
            <CardDescription>
              Personnalisez votre installation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/docs/configuration">
                Configuration avancée
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link href="/docs/base-service">
                Services personnalisés
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}