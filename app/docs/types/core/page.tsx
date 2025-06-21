'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  CheckCircle, 
  Copy, 
  Database,
  MessageSquare,
  Users,
  Shield,
  Bot
} from 'lucide-react';
import { useState } from 'react';

export default function CoreTypesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const userType = `interface User {
  id: string;
  email: string;
  displayName: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLoginAt?: Date;
  avatar?: string;
  contacts?: User[];
}`;

  const organizationType = `interface Organization {
  id: string;
  name: string;
  email: string;
  description?: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  logo?: string;
  website?: string;
  userCount?: number;
}`;

  const messageType = `interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  chatId: string;
  type: 'text' | 'image' | 'file';
  createdAt: Date;
  updatedAt: Date;
  isEncrypted: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isRead: boolean;
  isDelivered: boolean;
}`;

  const chatType = `interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  messagingMode: 'normal' | 'encrypted';
  unreadCount: number;
}

interface ChatResource {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatDetailsResource {
  id: string;
  participants: User[];
  messages: Message[];
  messagingMode: 'normal' | 'encrypted';
  createdAt: Date;
  updatedAt: Date;
}`;

  const chatbotType = `interface Chatbot {
  id: string;
  name: string;
  description?: string;
  model: string;
  systemPrompt: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  avatar?: string;
  responseTime?: number;
  totalMessages?: number;
  lastUsedAt?: Date;
}`;

  const signalType = `interface PreKeyBundle {
  identityKey: string;
  signedPreKey: {
    keyId: number;
    publicKey: string;
    signature: string;
  };
  oneTimePreKeys: Array<{
    keyId: number;
    publicKey: string;
  }>;
}

interface SignedPreKey {
  keyId: number;
  publicKey: string;
  signature: string;
  timestamp?: Date;
}

interface OneTimePreKey {
  keyId: number;
  publicKey: string;
  used?: boolean;
  createdAt?: Date;
}`;

  const authType = `interface AuthenticationResourceUser {
  token: string;
  data: User;
}

interface AuthenticationResourceOrganization {
  token: string;
  data: Organization;
}`;

  const utilityTypes = `// Types utilitaires pour les réponses API
type ApiResponse<T> = {
  data: T;
  message?: string;
  status: 'success' | 'error';
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Types pour les erreurs
interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Types pour les événements WebSocket
type SocketEvent = 
  | 'connect'
  | 'disconnect'
  | 'message-send'
  | 'new-connection'
  | 'new-disconnection';

interface SocketEventData {
  type: SocketEvent;
  payload: any;
  timestamp: Date;
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Types Core</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Types TypeScript principaux du SDK Yow Talk. Interfaces et types pour tous les modèles de données, 
          réponses API et structures utilisées dans le SDK.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="outline">Interfaces</Badge>
          <Badge variant="outline">Types</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-blue-200 bg-blue-50">
        <Code className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Types complets :</strong> Le SDK fournit des types TypeScript stricts pour toutes les structures de données, 
          garantissant une expérience de développement optimale avec autocomplétion et validation.
        </AlertDescription>
      </Alert>

      {/* Core Types */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Types principaux</h2>
        
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            <TabsTrigger value="signal">Signal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Interface User</CardTitle>
                    <CardDescription>Représente un utilisateur dans le système</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(userType, 'user')}
                  >
                    {copiedCode === 'user' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{userType}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Propriétés requises</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li><code>id</code> - Identifiant unique</li>
                      <li><code>email</code> - Adresse email (unique)</li>
                      <li><code>displayName</code> - Nom d&apos;affichage</li>
                      <li><code>projectId</code> - ID du projet/organisation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Propriétés optionnelles</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li><code>avatar</code> - URL de l&apos;avatar</li>
                      <li><code>lastLoginAt</code> - Dernière connexion</li>
                      <li><code>contacts</code> - Liste des contacts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="organization" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Interface Organization</CardTitle>
                    <CardDescription>Représente une organisation dans le système multi-tenant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(organizationType, 'organization')}
                  >
                    {copiedCode === 'organization' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{organizationType}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Database className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Chaque organisation a son propre <code>projectId</code> qui isole ses données des autres organisations.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="message" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Interface Message</CardTitle>
                    <CardDescription>Représente un message dans une conversation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(messageType, 'message')}
                  >
                    {copiedCode === 'message' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{messageType}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-semibold text-green-800">text</div>
                    <div className="text-green-600">Message texte simple</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-semibold text-blue-800">image</div>
                    <div className="text-blue-600">Image ou photo</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                    <div className="font-semibold text-purple-800">file</div>
                    <div className="text-purple-600">Fichier quelconque</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle>Interfaces Chat</CardTitle>
                    <CardDescription>Types pour les conversations et leurs détails</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatType, 'chat')}
                  >
                    {copiedCode === 'chat' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatType}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="font-semibold text-yellow-800">ChatResource</div>
                    <div className="text-yellow-600">Vue simplifiée pour les listes</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <div className="font-semibold text-orange-800">ChatDetailsResource</div>
                    <div className="text-orange-600">Vue complète avec messages</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chatbot" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle>Interface Chatbot</CardTitle>
                    <CardDescription>Représente un assistant IA dans le système</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatbotType, 'chatbot')}
                  >
                    {copiedCode === 'chatbot' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatbotType}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Bot className="h-4 w-4 text-indigo-600" />
                  <AlertDescription>
                    Le <code>systemPrompt</code> définit la personnalité et le comportement du chatbot IA.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signal" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>Types Signal Protocol</CardTitle>
                    <CardDescription>Types pour le chiffrement end-to-end avec Signal</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(signalType, 'signal')}
                  >
                    {copiedCode === 'signal' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{signalType}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <div className="font-semibold text-red-800">Identity Key</div>
                    <div className="text-red-600">Clé d&apos;identité long terme</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <div className="font-semibold text-orange-800">Signed Pre Key</div>
                    <div className="text-orange-600">Clé pré-signée renouvelable</div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="font-semibold text-yellow-800">One Time Pre Keys</div>
                    <div className="text-yellow-600">Clés à usage unique</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Authentication Types */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            Types d&apos;authentification
          </CardTitle>
          <CardDescription>
            Types pour les réponses d&apos;authentification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(authType, 'auth')}
            >
              {copiedCode === 'auth' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{authType}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="font-semibold text-green-800">AuthenticationResourceUser</div>
              <div className="text-green-600">Réponse d&apos;authentification utilisateur</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">AuthenticationResourceOrganization</div>
              <div className="text-blue-600">Réponse d&apos;authentification organisation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Utility Types */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-purple-600 mr-2" />
            Types utilitaires
          </CardTitle>
          <CardDescription>
            Types génériques pour les réponses API et la gestion d&apos;erreurs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(utilityTypes, 'utility')}
            >
              {copiedCode === 'utility' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{utilityTypes}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Types de réponse</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><code>ApiResponse&lt;T&gt;</code> - Réponse API générique</li>
                <li><code>PaginatedResponse&lt;T&gt;</code> - Réponse paginée</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Types d&apos;erreur</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><code>ApiError</code> - Erreur API générique</li>
                <li><code>ValidationError</code> - Erreur de validation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle>Exemples d&apos;utilisation</CardTitle>
          <CardDescription>
            Comment utiliser ces types dans votre code TypeScript
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// Utilisation des types dans votre code
import { User, Message, ChatResource } from 'yow-talk-sdk';

// Fonction typée pour traiter les messages
function processMessage(message: Message): void {
  console.log(\`Message de \${message.senderId}: \${message.content}\`);
  
  if (message.type === 'image' && message.fileUrl) {
    console.log('Image reçue:', message.fileUrl);
  }
}

// Fonction typée pour gérer les utilisateurs
function displayUser(user: User): string {
  return \`\${user.displayName} (\${user.email})\`;
}

// Gestion des chats avec types
function getChatTitle(chat: ChatResource): string {
  if (chat.participants.length === 2) {
    const otherUser = chat.participants.find(p => p.id !== currentUserId);
    return otherUser?.displayName || 'Chat';
  }
  return \`Groupe (\${chat.participants.length} participants)\`;
}`}</code>
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">✅ Avantages du typage</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Autocomplétion intelligente dans l&apos;IDE</li>
                  <li>• Détection d&apos;erreurs à la compilation</li>
                  <li>• Documentation intégrée</li>
                  <li>• Refactoring sécurisé</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">🔧 Bonnes pratiques</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Utilisez toujours les types fournis</li>
                  <li>• Évitez <code>any</code> et <code>unknown</code></li>
                  <li>• Créez des types personnalisés si nécessaire</li>
                  <li>• Validez les données à l&apos;exécution</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}