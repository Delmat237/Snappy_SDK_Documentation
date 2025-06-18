'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Download,
  Code,
  Play,
  ArrowRight,
  Terminal
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function QuickStartPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCode = `git clone --branch v2-sdk --single-branch https://github.com/PacomeKFP/snappy.git
copy src/lib in your project`;

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

  const authExampleCode = `// Authentification d'une organisation
const authOrg = await httpClient.authenticateOrganization({
  email: 'admin@company.com',
  password: 'securepassword'
});

// Authentification d'un utilisateur
const authUser = await httpClient.authenticateUser({
  email: 'user@company.com',
  password: 'userpassword'
});

console.log('Token:', authUser.token);
console.log('User:', authUser.data);`;

  const chatExampleCode = `// Envoyer un message
const message = await httpClient.sendMessage({
  content: 'Hello, world!',
  recipientId: 'user-123',
  type: 'text'
});

// Écouter les messages en temps réel
socketClient.onMessageReceivedListener = (message) => {
  console.log('Nouveau message:', message.content);
  console.log('De:', message.senderId);
};

// Initialiser la connexion WebSocket
socketClient.initialize();`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">Démarrage rapide</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Configurez et utilisez le SDK Yow Talk en moins de 5 minutes. Ce guide vous accompagne étape par étape pour votre première intégration.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Temps estimé: 5 min</Badge>
          <Badge variant="outline">React Native</Badge>
        </div>
      </div>

      {/* Prerequisites */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Prérequis :</strong> React Native 0.60+, Node.js 14+, et un projet React Native configuré.
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
                  Installation
                </CardTitle>
                <CardDescription>
                  Installez le SDK via npm ou yarn
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
              <pre className="text-sm text-gray-300">
                <code>{installCode}</code>
              </pre>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Le SDK inclut toutes les dépendances nécessaires pour HTTP et WebSocket.
            </p>
          </CardContent>
        </Card>

        {/* Step 2: Basic Setup */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">2</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 text-purple-600 mr-2" />
                  Configuration de base
                </CardTitle>
                <CardDescription>
                  Initialisez les clients HTTP et WebSocket
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
                onClick={() => copyToClipboard(basicSetupCode, 'setup')}
              >
                {copiedCode === 'setup' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{basicSetupCode}</code>
              </pre>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Conseil :</strong> Stockez votre configuration dans des variables d&#39;environnement pour plus de sécurité.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Authentication */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">3</span>
              </div>
              <div>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 text-green-600 mr-2" />
                  Premier exemple : Authentification
                </CardTitle>
                <CardDescription>
                  Authentifiez un utilisateur ou une organisation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="auth" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auth">Authentification</TabsTrigger>
                <TabsTrigger value="chat">Chat temps réel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="auth" className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(authExampleCode, 'auth')}
                  >
                    {copiedCode === 'auth' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{authExampleCode}</code>
                  </pre>
                </div>
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    Les tokens sont automatiquement stockés et gérés par le SDK. La configuration est persistée localement.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="chat" className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatExampleCode, 'chat')}
                  >
                    {copiedCode === 'chat' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatExampleCode}</code>
                  </pre>
                </div>
                <Alert>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    Les messages sont chiffrés automatiquement avec le protocole Signal avant l&#39;envoi.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle>✅ Félicitations ! Vous avez configuré le SDK</CardTitle>
            <CardDescription>
              Voici ce que vous pouvez faire maintenant avec votre configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Fonctionnalités disponibles :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Authentification utilisateurs/organisations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Envoi/réception de messages
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion des contacts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Chiffrement end-to-end
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Prochaines étapes :</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link href="/docs/examples/chat">
                      <Terminal className="w-4 h-4 mr-2" />
                      Exemple de chat complet
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="w-full justify-start">
                    <Link href="/docs/api/auth">
                      <Code className="w-4 h-4 mr-2" />
                      Explorer l&#39;API complète
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Approfondir</CardTitle>
              <CardDescription>
                Explorez les fonctionnalités avancées du SDK
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
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/docs/api/chatbots">
                  Intégration Chatbots
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Exemples pratiques</CardTitle>
              <CardDescription>
                Cas d&#39;usage concrets et exemples complets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/docs/examples/auth">
                  Authentification complète
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/docs/examples/websocket">
                  WebSocket avancé
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href="/docs/examples/chatbot">
                  Chatbot intelligent
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}