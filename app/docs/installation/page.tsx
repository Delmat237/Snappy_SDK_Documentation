'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Terminal,
  Package,
  Settings,
  Code
} from 'lucide-react';
import { useState } from 'react';

export default function InstallationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const gitInstall = `git clone --branch v2-sdk --single-branch https://github.com/PacomeKFP/snappy.git `;


  const peerDependencies = `npm install @react-native-async-storage/async-storage
npm install axios
npm install socket.io-client`;

  const basicImport = `import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";`;

  const envConfig = `# .env
REACT_APP_API_BASE_URL=https://your-api-url.com
REACT_APP_WEBSOCKET_URL=wss://your-websocket-url.com
REACT_APP_PROJECT_ID=your-project-id`;

  const metroConfig = `// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ajout du support pour les modules du SDK
config.resolver.alias = {
  ...config.resolver.alias,
  'yow-talk-sdk': require.resolve('yow-talk-sdk'),
};

module.exports = config;`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Download className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Installation</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Guide complet pour installer et configurer le SDK Yow Talk dans votre projet React Native.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">React Native 0.60+</Badge>
          <Badge variant="outline">Node.js 14+</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </div>
      </div>

      {/* Prerequisites */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Prérequis :</strong> Assurez-vous d&#39;avoir React Native 0.60+ et Node.js 14+ installés sur votre système.
        </AlertDescription>
      </Alert>

      {/* Installation Methods */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Installation du package</CardTitle>
              <CardDescription>Choisissez votre gestionnaire de packages préféré</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="git" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="git" className="flex items-center justify-center">
                git
              </TabsTrigger>
        
            
            </TabsList>
            
            <TabsContent value="git" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(gitInstall, 'git')}
                >
                  {copiedCode === 'git' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300">
                  <code>{gitInstall}</code><br />
                  <code>copy src/lib in your project </code>
                </pre>
              </div>
            </TabsContent>
            
    
          </Tabs>
        </CardContent>
      </Card>

      {/* Peer Dependencies */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Dépendances requises</CardTitle>
              <CardDescription>Installez les dépendances peer nécessaires</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(peerDependencies, 'peer')}
            >
              {copiedCode === 'peer' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{peerDependencies}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">AsyncStorage</div>
              <div className="text-blue-600">Stockage local sécurisé</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="font-semibold text-green-800">Axios</div>
              <div className="text-green-600">Client HTTP</div>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <div className="font-semibold text-purple-800">Socket.IO</div>
              <div className="text-purple-600">WebSocket client</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Import */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Import de base</CardTitle>
              <CardDescription>Comment importer les classes principales du SDK</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(basicImport, 'import')}
            >
              {copiedCode === 'import' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300">
              <code>{basicImport}</code>
            </pre>
          </div>
          
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Le SDK exporte automatiquement tous les types TypeScript nécessaires pour une expérience de développement optimale.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Environment Configuration */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>Configuration d&#39;environnement</CardTitle>
              <CardDescription>Variables d&#39;environnement recommandées</CardDescription>
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
          
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Sécurité :</strong> Ne jamais exposer vos clés API dans le code source. Utilisez toujours des variables d&#39;environnement.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Metro Configuration */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle>Configuration Metro (Optionnel)</CardTitle>
              <CardDescription>Configuration pour optimiser le bundling</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(metroConfig, 'metro')}
            >
              {copiedCode === 'metro' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{metroConfig}</code>
            </pre>
          </div>
          
          <p className="text-sm text-gray-600">
            Cette configuration est optionnelle mais recommandée pour optimiser la résolution des modules du SDK.
          </p>
        </CardContent>
      </Card>

      {/* Verification */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle>✅ Vérification de l&#39;installation</CardTitle>
          <CardDescription>
            Comment vérifier que l&#39;installation s&#39;est bien déroulée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// Test d'import simple
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";;

const client = new SnappyHTTPClient(REACT_APP_API_BASE_URL);
console.log('SDK installé avec succès !', client);`}</code>
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">✅ Installation réussie si :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Aucune erreur d&#39;import
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Classes disponibles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Types TypeScript reconnus
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">🔧 En cas de problème :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vérifiez la version de React Native</li>
                  <li>• Installez les peer dependencies</li>
                  <li>• Redémarrez Metro bundler</li>
                  <li>• Nettoyez le cache : <code>npx react-native start --reset-cache</code></li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}