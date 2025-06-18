'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Shield,
  Globe,
  Key,
  Database
} from 'lucide-react';
import { useState } from 'react';

export default function ConfigurationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const basicConfig = `
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { SnappySocketClient } from "@/lib/SnappySocketClient"';

// Configuration HTTP Client
const httpClient = new SnappyHTTPClient(
  'https://your-api-base-url.com',  // Base URL de votre API
  'your-bearer-token',              // Token d'authentification (optionnel)
  'your-project-id'                 // ID du projet (optionnel)
);

// Configuration Socket Client
const socketClient = new SnappySocketClient(
  'wss://your-websocket-url.com',   // URL WebSocket
  'your-project-id',                // ID du projet
  'your-user-id'                    // ID de l'utilisateur
);`;

  const envConfig = `// Configuration avec variables d'environnement
const httpClient = new SnappyHTTPClient(
  process.env.REACT_APP_API_BASE_URL,
  process.env.REACT_APP_BEARER_TOKEN,
  process.env.REACT_APP_PROJECT_ID
);

const socketClient = new SnappySocketClient(
  process.env.REACT_APP_WEBSOCKET_URL,
  process.env.REACT_APP_PROJECT_ID,
  getCurrentUserId() // Fonction pour obtenir l'ID utilisateur
);`;

  const advancedConfig = `// Configuration avancée avec gestion d'erreurs
class YowTalkConfig {
  private httpClient: SnappyHTTPClient;
  private socketClient: SnappySocketClient;

  constructor() {
    this.initializeClients();
  }

  private initializeClients() {
    try {
      // Configuration HTTP
      this.httpClient = new SnappyHTTPClient(
        this.getApiBaseUrl(),
        this.getBearerToken(),
        this.getProjectId()
      );

      // Configuration WebSocket
      this.socketClient = new SnappySocketClient(
        this.getWebSocketUrl(),
        this.getProjectId(),
        this.getUserId()
      );

      this.setupEventListeners();
    } catch (error) {
      console.error('Erreur de configuration:', error);
    }
  }

  private getApiBaseUrl(): string {
    const url = process.env.REACT_APP_API_BASE_URL;
    if (!url) throw new Error('API_BASE_URL non configurée');
    return url;
  }

  private getBearerToken(): string | undefined {
    return process.env.REACT_APP_BEARER_TOKEN;
  }

  private getProjectId(): string {
    const id = process.env.REACT_APP_PROJECT_ID;
    if (!id) throw new Error('PROJECT_ID non configuré');
    return id;
  }

  private getWebSocketUrl(): string {
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    if (!url) throw new Error('WEBSOCKET_URL non configurée');
    return url;
  }

  private getUserId(): string {
    // Logique pour obtenir l'ID utilisateur
    return 'current-user-id';
  }

  private setupEventListeners() {
    this.socketClient.onConnect = () => {
      console.log('WebSocket connecté');
    };

    this.socketClient.onDisconnect = () => {
      console.log('WebSocket déconnecté');
    };
  }

  getHttpClient(): SnappyHTTPClient {
    return this.httpClient;
  }

  getSocketClient(): SnappySocketClient {
    return this.socketClient;
  }
}`;

  const contextConfig = `// Configuration avec React Context
import React, { createContext, useContext, ReactNode } from 'react';
import { SnappyHTTPClient, SnappySocketClient } from 'yow-talk-sdk';

interface YowTalkContextType {
  httpClient: SnappyHTTPClient;
  socketClient: SnappySocketClient;
}

const YowTalkContext = createContext<YowTalkContextType | undefined>(undefined);

export const YowTalkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const httpClient = new SnappyHTTPClient(
    process.env.REACT_APP_API_BASE_URL!,
    process.env.REACT_APP_BEARER_TOKEN,
    process.env.REACT_APP_PROJECT_ID
  );

  const socketClient = new SnappySocketClient(
    process.env.REACT_APP_WEBSOCKET_URL!,
    process.env.REACT_APP_PROJECT_ID!,
    'user-id' // À remplacer par l'ID utilisateur réel
  );

  return (
    <YowTalkContext.Provider value={{ httpClient, socketClient }}>
      {children}
    </YowTalkContext.Provider>
  );
};

export const useYowTalk = (): YowTalkContextType => {
  const context = useContext(YowTalkContext);
  if (!context) {
    throw new Error('useYowTalk doit être utilisé dans YowTalkProvider');
  }
  return context;
};`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">Configuration</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Guide complet pour configurer le SDK Yow Talk dans votre application React Native avec les meilleures pratiques.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Configuration</Badge>
          <Badge variant="outline">Sécurité</Badge>
          <Badge variant="outline">Best Practices</Badge>
        </div>
      </div>

      {/* Basic Configuration */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Configuration de base</CardTitle>
              <CardDescription>Configuration minimale pour démarrer avec le SDK</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(basicConfig, 'basic')}
            >
              {copiedCode === 'basic' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{basicConfig}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Paramètres HTTP Client</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">baseUrl</span>
                  <Badge variant="destructive" className="text-xs">required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">bearerToken</span>
                  <Badge variant="outline" className="text-xs">optional</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">projectId</span>
                  <Badge variant="outline" className="text-xs">optional</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Paramètres Socket Client</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">server</span>
                  <Badge variant="destructive" className="text-xs">required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">projectId</span>
                  <Badge variant="destructive" className="text-xs">required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">user</span>
                  <Badge variant="destructive" className="text-xs">required</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Variables d&#39;environnement</CardTitle>
              <CardDescription>Configuration sécurisée avec variables d&#39;environnement</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(envConfig, 'env')}
            >
              {copiedCode === 'env' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{envConfig}</code>
            </pre>
          </div>
          
          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Recommandé :</strong> Utilisez toujours des variables d&#39;environnement pour les URLs et tokens sensibles.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Advanced Configuration */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Configuration avancée</CardTitle>
              <CardDescription>Configuration avec gestion d&#39;erreurs et validation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="class" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="class">Classe de configuration</TabsTrigger>
              <TabsTrigger value="context">React Context</TabsTrigger>
            </TabsList>
            
            <TabsContent value="class" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(advancedConfig, 'advanced')}
                >
                  {copiedCode === 'advanced' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{advancedConfig}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="context" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(contextConfig, 'context')}
                >
                  {copiedCode === 'context' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{contextConfig}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Options HTTP Client</CardTitle>
                <CardDescription>Configuration du client HTTP</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-mono font-semibold">baseUrl</div>
                  <div className="text-gray-600">URL de base de l&#39;API</div>
                </div>
                <Badge variant="destructive">Required</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-mono font-semibold">bearerToken</div>
                  <div className="text-gray-600">Token d&#39;authentification</div>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-mono font-semibold">projectId</div>
                  <div className="text-gray-600">Identifiant du projet</div>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Options Socket Client</CardTitle>
                <CardDescription>Configuration du client WebSocket</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-mono font-semibold">server</div>
                  <div className="text-gray-600">URL du serveur WebSocket</div>
                </div>
                <Badge variant="destructive">Required</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-mono font-semibold">projectId</div>
                  <div className="text-gray-600">Identifiant du projet</div>
                </div>
                <Badge variant="destructive">Required</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <div className="font-mono font-semibold">user</div>
                  <div className="text-gray-600">Identifiant utilisateur</div>
                </div>
                <Badge variant="destructive">Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            Bonnes pratiques
          </CardTitle>
          <CardDescription>
            Recommandations pour une configuration sécurisée et maintenable
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
                    <strong>Variables d&#39;environnement</strong> - Utilisez des variables d&#39;environnement pour les URLs et tokens
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Validation des paramètres</strong> - Validez tous les paramètres de configuration
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion d&#39;erreurs</strong> - Implémentez une gestion d&#39;erreurs robuste
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
                    <strong>Tokens en dur</strong> - Ne jamais coder les tokens directement dans le code
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>URLs non sécurisées</strong> - Toujours utiliser HTTPS/WSS en production
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Configuration globale</strong> - Éviter les variables globales pour la configuration
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