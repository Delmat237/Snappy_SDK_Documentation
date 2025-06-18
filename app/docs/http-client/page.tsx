'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Code,
  Database,
  Key,
  Settings
} from 'lucide-react';
import { useState } from 'react';

export default function HttpClientPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const basicUsage = `import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';

// Initialisation
const httpClient = new SnappyHTTPClient(
  'https://your-api-base-url.com',
  'your-bearer-token', // optionnel
  'your-project-id'    // optionnel
);

// Utilisation
const organizations = await httpClient.getAllOrganizations('search-key');
console.log('Organizations:', organizations);`;

  const authExample = `// Authentification et gestion automatique des tokens
const authResult = await httpClient.authenticateUser({
  email: 'user@example.com',
  password: 'password123'
});

// Le token est automatiquement stocké et utilisé
console.log('User:', authResult.data);
console.log('Token:', authResult.token);

// Toutes les requêtes suivantes utilisent automatiquement le token
const contacts = await httpClient.getUserContacts({
  userId: authResult.data.id,
  projectId: 'project-123'
});`;

  const tokenManagement = `// Gestion manuelle des tokens
httpClient.setBearerToken('new-token');
await httpClient.saveBearerToken(); // Sauvegarde locale

// Chargement automatique au démarrage
await httpClient.loadBearerToken();

// Gestion des utilisateurs
const currentUser = httpClient.getUser();
httpClient.setUser(newUser);
await httpClient.saveUser();`;

  const errorHandling = `// Gestion d'erreurs avec try/catch
try {
  const result = await httpClient.authenticateUser({
    email: 'user@example.com',
    password: 'wrong-password'
  });
} catch (error) {
  if (error.response?.status === 401) {
    console.log('Identifiants incorrects');
  } else if (error.response?.status === 422) {
    console.log('Erreur de validation:', error.response.data);
  } else {
    console.log('Erreur réseau:', error.message);
  }
}`;

  const advancedUsage = `// Configuration avancée avec refresh d'instance
class ChatService {
  private httpClient: SnappyHTTPClient;

  constructor() {
    this.httpClient = new SnappyHTTPClient(
      process.env.REACT_APP_API_URL!
    );
  }

  async sendMessage(messageData: SendMessageDto) {
    try {
      // Refresh de l'instance avec auth si nécessaire
      this.httpClient.refreshApiInstance(
        process.env.REACT_APP_API_URL!,
        true,
        this.httpClient.bearerToken
      );

      const message = await this.httpClient.sendMessage(messageData);
      return message;
    } catch (error) {
      console.error('Erreur envoi message:', error);
      throw error;
    }
  }

  async getChatHistory(chatId: string) {
    const chatDetails = await this.httpClient.getChatDetails({
      chatId,
      projectId: this.httpClient.projectId!
    });
    return chatDetails;
  }
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">HTTP Client</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Guide complet du SnappyHTTPClient, le client HTTP principal du SDK pour toutes les interactions avec l&#39;API.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">SnappyHTTPClient</Badge>
          <Badge variant="outline">HTTP</Badge>
          <Badge variant="outline">Authentification</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-blue-200 bg-blue-50">
        <Smartphone className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>SnappyHTTPClient</strong> est la classe principale pour toutes les requêtes HTTP. 
          Elle gère automatiquement l&#39;authentification, la persistance des tokens et la configuration des requêtes.
        </AlertDescription>
      </Alert>

      {/* Basic Usage */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Utilisation de base</CardTitle>
              <CardDescription>Comment initialiser et utiliser le client HTTP</CardDescription>
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
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">baseUrl</div>
              <div className="text-blue-600">URL de base de votre API</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="font-semibold text-green-800">bearerToken</div>
              <div className="text-green-600">Token d&#39;authentification (optionnel)</div>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <div className="font-semibold text-purple-800">projectId</div>
              <div className="text-purple-600">Identifiant du projet (optionnel)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Authentification automatique</CardTitle>
              <CardDescription>Gestion automatique des tokens et de l&#39;authentification</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(authExample, 'auth')}
            >
              {copiedCode === 'auth' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{authExample}</code>
            </pre>
          </div>
          
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Après une authentification réussie, le token est automatiquement stocké et utilisé pour toutes les requêtes suivantes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Token Management */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Gestion des tokens</CardTitle>
              <CardDescription>Méthodes pour gérer manuellement les tokens et utilisateurs</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(tokenManagement, 'token')}
            >
              {copiedCode === 'token' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{tokenManagement}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Méthodes de token</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">setBearerToken()</span>
                  <Badge variant="secondary" className="text-xs">setter</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">saveBearerToken()</span>
                  <Badge variant="secondary" className="text-xs">async</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">loadBearerToken()</span>
                  <Badge variant="secondary" className="text-xs">async</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Méthodes utilisateur</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">setUser()</span>
                  <Badge variant="secondary" className="text-xs">setter</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">getUser()</span>
                  <Badge variant="secondary" className="text-xs">getter</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">saveUser()</span>
                  <Badge variant="secondary" className="text-xs">async</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle>Gestion des erreurs</CardTitle>
              <CardDescription>Comment gérer les erreurs HTTP et les cas d&#39;échec</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="font-semibold text-red-800">401 Unauthorized</div>
              <div className="text-red-600">Identifiants incorrects ou token expiré</div>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="font-semibold text-yellow-800">422 Validation Error</div>
              <div className="text-yellow-600">Données invalides ou manquantes</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">Network Error</div>
              <div className="text-blue-600">Problème de connexion réseau</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Usage */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>Utilisation avancée</CardTitle>
              <CardDescription>Patterns avancés et bonnes pratiques</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(advancedUsage, 'advanced')}
            >
              {copiedCode === 'advanced' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{advancedUsage}</code>
            </pre>
          </div>
          
          <Alert className="border-orange-200 bg-orange-50">
            <Settings className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Conseil :</strong> Encapsulez le client HTTP dans des services métier pour une meilleure organisation du code.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* API Methods Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Méthodes disponibles</CardTitle>
          <CardDescription>
            Vue d&#39;ensemble de toutes les méthodes du SnappyHTTPClient
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="auth" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="auth">Auth</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="other">Autres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auth" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="font-mono font-semibold">authenticateOrganization()</div>
                  <div className="text-gray-600">Authentifie une organisation</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="font-mono font-semibold">authenticateUser()</div>
                  <div className="text-gray-600">Authentifie un utilisateur</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="font-mono font-semibold">createOrganization()</div>
                  <div className="text-gray-600">Crée une nouvelle organisation</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-mono font-semibold">setBearerToken()</div>
                  <div className="text-gray-600">Définit le token d&#39;authentification</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-mono font-semibold">createUser()</div>
                  <div className="text-gray-600">Crée un nouvel utilisateur</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-mono font-semibold">getUserContacts()</div>
                  <div className="text-gray-600">Récupère les contacts d&#39;un utilisateur</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-mono font-semibold">addContact()</div>
                  <div className="text-gray-600">Ajoute un contact</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="font-mono font-semibold">filterUserByDisplayName()</div>
                  <div className="text-gray-600">Recherche par nom d&#39;affichage</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="font-mono font-semibold">sendMessage()</div>
                  <div className="text-gray-600">Envoie un message</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="font-mono font-semibold">getChatDetails()</div>
                  <div className="text-gray-600">Récupère les détails d&#39;un chat</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="font-mono font-semibold">getUserChats()</div>
                  <div className="text-gray-600">Liste les chats d&#39;un utilisateur</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="font-mono font-semibold">changeMessagingMode()</div>
                  <div className="text-gray-600">Change le mode de messagerie</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="other" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="font-mono font-semibold">getAllChatbots()</div>
                  <div className="text-gray-600">Liste tous les chatbots</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="font-mono font-semibold">createChatbot()</div>
                  <div className="text-gray-600">Crée un nouveau chatbot</div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="font-mono font-semibold">getPreKeyBundle()</div>
                  <div className="text-gray-600">Récupère les clés Signal</div>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="font-mono font-semibold">savePreKeyBundle()</div>
                  <div className="text-gray-600">Sauvegarde les clés Signal</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}