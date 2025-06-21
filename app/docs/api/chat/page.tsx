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
  Send,
  Eye,
  List,
  Settings,
  Code,
  AlertCircle,
  Image,
  File
} from 'lucide-react';
import { useState } from 'react';

export default function ChatApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sendMessageCode = `// Envoyer un message texte
const message = await httpClient.sendMessage({
  content: 'Hello, world!',
  recipientId: 'user-123',
  type: 'text'
});

console.log('Message envoyé:', message);

// Envoyer un message avec fichier
const formData = new FormData();
formData.append('content', 'Voici une image');
formData.append('recipientId', 'user-123');
formData.append('type', 'image');
formData.append('file', imageFile);

const messageWithFile = await httpClient.sendMessage(formData);`;

  const getChatDetailsCode = `// Récupérer les détails d'un chat
const chatDetails = await httpClient.getChatDetails({
  chatId: 'chat-123',
  projectId: 'project-456'
});

console.log('Messages:', chatDetails.messages);
console.log('Participants:', chatDetails.participants);`;

  const getUserChatsCode = `// Récupérer tous les chats d'un utilisateur
const userChats = await httpClient.getUserChats('user-123', 'project-456');

console.log('Chats de l\'utilisateur:', userChats);`;

  const changeMessagingModeCode = `// Changer le mode de messagerie
const updatedChat = await httpClient.changeMessagingMode({
  chatId: 'chat-123',
  mode: 'encrypted', // ou 'normal'
  projectId: 'project-456'
});

console.log('Mode de chat mis à jour:', updatedChat.messagingMode);`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">API Chat</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          API complète pour la messagerie temps réel avec support des messages texte, multimédia, 
          chiffrement end-to-end et gestion des conversations.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Chat API</Badge>
          <Badge variant="outline">Temps réel</Badge>
          <Badge variant="outline">Multimédia</Badge>
          <Badge variant="outline">Chiffrement</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-green-200 bg-green-50">
        <MessageSquare className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>API Chat :</strong> Permet d&apos;envoyer des messages, gérer les conversations et configurer 
          les modes de messagerie. Support complet pour les fichiers et le chiffrement Signal.
        </AlertDescription>
      </Alert>

      {/* Main API Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Méthodes disponibles</h2>
        
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="send">Envoyer</TabsTrigger>
            <TabsTrigger value="details">Détails Chat</TabsTrigger>
            <TabsTrigger value="list">Liste Chats</TabsTrigger>
            <TabsTrigger value="mode">Mode Messagerie</TabsTrigger>
          </TabsList>
          
          <TabsContent value="send" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Send className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>sendMessage</CardTitle>
                      <CardDescription>Envoie un message texte ou multimédia avec chiffrement automatique</CardDescription>
                    </div>
                  </div>
                  <Badge>POST</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(sendMessageCode, 'send')}
                  >
                    {copiedCode === 'send' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{sendMessageCode}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Paramètres (SendMessageDto)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">content</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">recipientId</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">type</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">file</span>
                        <Badge variant="outline" className="text-xs">optional</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Types de messages</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span>text - Message texte</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                        <Image className="w-4 h-4 text-green-600" />
                        <span>image - Image/Photo</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded">
                        <File className="w-4 h-4 text-purple-600" />
                        <span>file - Fichier quelconque</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Chiffrement automatique :</strong> Tous les messages sont automatiquement chiffrés 
                    avec le protocole Signal avant l&apos;envoi.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>getChatDetails</CardTitle>
                      <CardDescription>Récupère l&apos;historique complet d&apos;une conversation</CardDescription>
                    </div>
                  </div>
                  <Badge>POST</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(getChatDetailsCode, 'details')}
                  >
                    {copiedCode === 'details' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getChatDetailsCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres (GetChatDetailsDto)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">chatId</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">projectId</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <Eye className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Retourne un objet ChatDetailsResource contenant tous les messages, participants et métadonnées du chat.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <List className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>getUserChats</CardTitle>
                      <CardDescription>Récupère tous les chats d&apos;un utilisateur</CardDescription>
                    </div>
                  </div>
                  <Badge>GET</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(getUserChatsCode, 'list')}
                  >
                    {copiedCode === 'list' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getUserChatsCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono">user</span> - ID de l&apos;utilisateur
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <span className="font-mono">projectId</span> - ID du projet
                    </div>
                  </div>
                </div>
                
                <Alert className="border-purple-200 bg-purple-50">
                  <List className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    Retourne un tableau de ChatResource avec les informations de base de chaque conversation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mode" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle>changeMessagingMode</CardTitle>
                      <CardDescription>Change le mode de messagerie d&apos;un chat</CardDescription>
                    </div>
                  </div>
                  <Badge>POST</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(changeMessagingModeCode, 'mode')}
                  >
                    {copiedCode === 'mode' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{changeMessagingModeCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Modes disponibles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="font-semibold text-green-800">encrypted</div>
                      <div className="text-green-600">Chiffrement end-to-end activé</div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="font-semibold text-blue-800">normal</div>
                      <div className="text-blue-600">Mode standard sans chiffrement</div>
                    </div>
                  </div>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Le changement de mode affecte tous les messages futurs dans cette conversation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Model */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-green-600 mr-2" />
            Modèle Message
          </CardTitle>
          <CardDescription>
            Structure de l&apos;objet Message retourné par l&apos;API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`interface Message {
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
}`}</code>
            </pre>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Propriétés principales</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>id</code> - Identifiant unique du message</li>
                <li><code>content</code> - Contenu du message</li>
                <li><code>senderId</code> - ID de l&apos;expéditeur</li>
                <li><code>recipientId</code> - ID du destinataire</li>
                <li><code>type</code> - Type de message</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Métadonnées</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>isEncrypted</code> - Message chiffré</li>
                <li><code>isRead</code> - Message lu</li>
                <li><code>isDelivered</code> - Message livré</li>
                <li><code>fileUrl</code> - URL du fichier (si applicable)</li>
                <li><code>fileSize</code> - Taille du fichier</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Guidelines */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <File className="w-5 h-5 text-purple-600 mr-2" />
            Upload de fichiers
          </CardTitle>
          <CardDescription>
            Guidelines pour l&apos;envoi de fichiers et médias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Types supportés</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Image className="w-4 h-4 text-green-500 mr-2" />
                  Images: JPG, PNG, GIF, WebP
                </li>
                <li className="flex items-center">
                  <File className="w-4 h-4 text-blue-500 mr-2" />
                  Documents: PDF, DOC, TXT
                </li>
                <li className="flex items-center">
                  <File className="w-4 h-4 text-purple-500 mr-2" />
                  Archives: ZIP, RAR
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Limitations</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Taille max: 10 MB par fichier</li>
                <li>• Format multipart/form-data requis</li>
                <li>• Chiffrement automatique des fichiers</li>
                <li>• URLs temporaires pour l&apos;accès</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`// Exemple d'upload de fichier
const formData = new FormData();
formData.append('content', 'Voici le document');
formData.append('recipientId', 'user-123');
formData.append('type', 'file');
formData.append('file', selectedFile);

const message = await httpClient.sendMessage(formData);`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}