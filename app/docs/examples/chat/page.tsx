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
  Users,
  Code,
  AlertCircle,
  Image,
  Smartphone
} from 'lucide-react';
import { useState } from 'react';
import basicChatExample from '@/public/examples/chat/basicChatExample';
import chatComponentExample from '@/public/examples/chat/chatComponentExample';
import chatListExample from '@/public/examples/chat/chatListExample';
import groupChatExample from '@/public/examples/chat/groupChatExample';
import  fileUploadExample from '@/public/examples/chat/fileUploadExample';

export default function ChatExamplePage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Exemple : Chat Simple</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Implémentation complète d&apos;un système de chat avec messages temps réel, support multimédia, 
          chats de groupe et gestion des fichiers.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Chat</Badge>
          <Badge variant="outline">Temps réel</Badge>
          <Badge variant="outline">Multimédia</Badge>
          <Badge variant="outline">Groupes</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-blue-200 bg-blue-50">
        <MessageSquare className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Chat complet :</strong> Ces exemples montrent comment créer un système de chat moderne 
          avec toutes les fonctionnalités essentielles : messages temps réel, médias, groupes et persistance.
        </AlertDescription>
      </Alert>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Exemples d&apos;implémentation</h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Service de base</TabsTrigger>
            <TabsTrigger value="component">Composant Chat</TabsTrigger>
            <TabsTrigger value="list">Liste des chats</TabsTrigger>
            <TabsTrigger value="media">Médias & Fichiers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Service de chat de base</CardTitle>
                    <CardDescription>Classe principale pour gérer les messages et connexions WebSocket</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(basicChatExample, 'basic')}
                  >
                    {copiedCode === 'basic' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{basicChatExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Fonctionnalités</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Messages temps réel
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Envoi d&apos;images
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Historique des messages
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Gestion des connexions
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Utilisation</h4>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <code className="text-gray-800">
                        {`const chatService = new ChatService(
  apiUrl, socketUrl, projectId, userId
);
await chatService.initialize();`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="component" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Composant de chat React Native</CardTitle>
                    <CardDescription>Interface utilisateur complète avec liste de messages et saisie</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatComponentExample, 'component')}
                  >
                    {copiedCode === 'component' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatComponentExample}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Smartphone className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    Ce composant inclut la gestion des états, le scroll automatique, l&apos;affichage des images et la saisie de messages.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Liste des conversations</CardTitle>
                    <CardDescription>Écran principal avec toutes les conversations de l&apos;utilisateur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatListExample, 'list')}
                  >
                    {copiedCode === 'list' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatListExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                    <div className="font-semibold text-purple-800">Avatars</div>
                    <div className="text-purple-600">Photos de profil des contacts</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-semibold text-blue-800">Dernier message</div>
                    <div className="text-blue-600">Aperçu du dernier échange</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-semibold text-green-800">Messages non lus</div>
                    <div className="text-green-600">Badge avec compteur</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Image className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Gestion des médias et fichiers</CardTitle>
                    <CardDescription>Envoi de photos, documents et gestion des fichiers</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(fileUploadExample, 'media')}
                  >
                    {copiedCode === 'media' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{fileUploadExample}</code>
                  </pre>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <Image className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Dépendances requises :</strong> react-native-image-picker, react-native-document-picker, 
                    react-native-image-resizer pour la compression.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Group Chat Example */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle>Chat de groupe</CardTitle>
              <CardDescription>Extension pour les conversations de groupe avec gestion des participants</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(groupChatExample, 'group')}
            >
              {copiedCode === 'group' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{groupChatExample}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Fonctionnalités groupe</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Création de groupes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Ajout/suppression de participants
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Messages avec nom de l&apos;expéditeur
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Événements de groupe
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Événements WebSocket</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <code>onParticipantJoined</code> - Nouveau membre</li>
                <li>• <code>onParticipantLeft</code> - Membre parti</li>
                <li>• <code>onGroupMessageReceived</code> - Message de groupe</li>
                <li>• <code>onGroupUpdated</code> - Infos du groupe modifiées</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Guide */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="w-5 h-5 text-blue-600 mr-2" />
            Guide d&apos;intégration
          </CardTitle>
          <CardDescription>
            Étapes pour intégrer le système de chat dans votre application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">1. Configuration</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Configurer les clients HTTP et WebSocket</li>
                  <li>• Implémenter l&apos;authentification</li>
                  <li>• Configurer les permissions de fichiers</li>
                  <li>• Tester la connexion WebSocket</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">2. Interface utilisateur</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Créer la liste des conversations</li>
                  <li>• Implémenter l&apos;écran de chat</li>
                  <li>• Ajouter la sélection de médias</li>
                  <li>• Configurer les notifications</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2">Structure recommandée :</h5>
              <pre className="text-sm text-gray-300">
                <code>{`src/
├── services/
│   ├── ChatService.js
│   ├── MediaChatService.js
│   └── GroupChatService.js
├── components/
│   ├── ChatScreen.js
│   ├── ChatListScreen.js
│   └── GroupChatScreen.js
├── utils/
│   ├── messageUtils.js
│   └── mediaUtils.js
└── types/
    └── chat.types.ts`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Bonnes pratiques
          </CardTitle>
          <CardDescription>
            Recommandations pour un système de chat performant et robuste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">✅ Performance</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Pagination des messages</strong> - Chargez les messages par petits lots
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Compression des images</strong> - Réduisez la taille avant envoi
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Cache local</strong> - Stockez les messages récents localement
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🔒 Sécurité</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Validation des fichiers</strong> - Vérifiez le type et la taille
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Chiffrement automatique</strong> - Utilisez le protocole Signal
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion des permissions</strong> - Vérifiez les droits d&apos;accès
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