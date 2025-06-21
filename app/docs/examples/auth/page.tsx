'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  Copy, 
  User,
  Building,
  Code,
  AlertCircle,
  Key,
  Smartphone
} from 'lucide-react';
import { useState } from 'react';
import basicAuthExample from '@/public/examples/auth/basicAuth';
import reactAuthComponent from '@/public/examples/auth/reactAuthComponent';
import authContextExample from '@/public/examples/auth/authContextExample';
import errorHandlingExample from '@/public/examples/auth/errorHandlingExample';
import persistenceExample from '@/public/examples/auth/persistenceExample';

export default function AuthExamplePage() {
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
          <Shield className="w-6 h-6 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">Exemple : Authentification</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Exemples complets d&apos;implémentation de l&apos;authentification avec le SDK Yow Talk. 
          Gestion des utilisateurs, organisations, persistance et gestion d&apos;erreurs.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Authentification</Badge>
          <Badge variant="outline">React Native</Badge>
          <Badge variant="outline">Persistance</Badge>
          <Badge variant="outline">Gestion d&apos;erreurs</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Authentification complète :</strong> Ces exemples montrent comment implémenter 
          un système d&apos;authentification robuste avec gestion des sessions, persistance et récupération d\&apos;erreurs.
        </AlertDescription>
      </Alert>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Exemples d&apos;implémentation</h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Service de base</TabsTrigger>
            <TabsTrigger value="component">Composant React</TabsTrigger>
            <TabsTrigger value="context">Context Provider</TabsTrigger>
            <TabsTrigger value="errors">Gestion d&apos;erreurs</TabsTrigger>
            <TabsTrigger value="persistence">Persistance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Service d&apos;authentification de base</CardTitle>
                    <CardDescription>Implémentation simple pour commencer rapidement</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(basicAuthExample, 'basic')}
                  >
                    {copiedCode === 'basic' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{basicAuthExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Fonctionnalités incluses</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Authentification utilisateur
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Authentification organisation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Gestion automatique des tokens
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Déconnexion sécurisée
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Utilisation</h4>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <code className="text-gray-800">
                        {`const authService = new AuthService();
await authService.loginUser(email, password);`}
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
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Composant React Native</CardTitle>
                    <CardDescription>Interface utilisateur complète avec gestion d&apos;état</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(reactAuthComponent, 'component')}
                  >
                    {copiedCode === 'component' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{reactAuthComponent}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Smartphone className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Ce composant inclut la validation des champs, la gestion des états de chargement et la vérification des sessions existantes.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="context" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Context Provider React</CardTitle>
                    <CardDescription>Gestion globale de l&apos;état d&apos;authentification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(authContextExample, 'context')}
                  >
                    {copiedCode === 'context' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{authContextExample}</code>
                  </pre>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Utilisation du Context :</h4>
                  <div className="bg-gray-900 rounded p-3">
                    <pre className="text-sm text-gray-300">
                      <code>{`// Dans votre composant
const { user, login, logout, isAuthenticated } = useAuth();

// Dans votre App.js
<AuthProvider>
  <YourApp />
</AuthProvider>`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="errors" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>Gestion avancée des erreurs</CardTitle>
                    <CardDescription>Gestion robuste des erreurs avec retry automatique</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(errorHandlingExample, 'errors')}
                  >
                    {copiedCode === 'errors' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{errorHandlingExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <div className="font-semibold text-red-800">401 Unauthorized</div>
                    <div className="text-red-600">Identifiants incorrects</div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="font-semibold text-yellow-800">422 Validation</div>
                    <div className="text-yellow-600">Données invalides</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-semibold text-blue-800">429 Rate Limit</div>
                    <div className="text-blue-600">Trop de tentatives</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="persistence" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Gestion de la persistance</CardTitle>
                    <CardDescription>Auto-login et gestion des sessions avec validation</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(persistenceExample, 'persistence')}
                  >
                    {copiedCode === 'persistence' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{persistenceExample}</code>
                  </pre>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <Key className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Sécurité :</strong> Cette implémentation valide automatiquement les tokens stockés 
                    et nettoie les données expirées pour maintenir la sécurité.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Integration Guide */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 text-green-600 mr-2" />
            Guide d&apos;intégration
          </CardTitle>
          <CardDescription>
            Étapes pour intégrer l&apos;authentification dans votre application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">1. Configuration initiale</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Installer le SDK Yow Talk</li>
                  <li>• Configurer les variables d&apos;environnement</li>
                  <li>• Initialiser le SnappyHTTPClient</li>
                  <li>• Configurer AsyncStorage</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">2. Implémentation</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Créer le service d&apos;authentification</li>
                  <li>• Implémenter les composants UI</li>
                  <li>• Ajouter la gestion d&apos;erreurs</li>
                  <li>• Configurer la persistance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2">Ordre d&apos;implémentation recommandé :</h5>
              <pre className="text-sm text-gray-300">
                <code>{`1. Service de base (AuthService)
2. Gestion des erreurs (AuthErrorHandler)
3. Persistance (AuthPersistenceManager)
4. Context Provider (AuthProvider)
5. Composants UI (LoginScreen)
6. Navigation conditionnelle`}</code>
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
            Recommandations pour une authentification sécurisée et robuste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">✅ Sécurité</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Validation côté client</strong> - Validez les entrées avant envoi
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Stockage sécurisé</strong> - Utilisez AsyncStorage pour les tokens
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Validation des tokens</strong> - Vérifiez la validité au démarrage
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">⚡ Performance</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Auto-login</strong> - Restaurez les sessions automatiquement
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion d&apos;état</strong> - Utilisez Context pour l&apos;état global
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Retry intelligent</strong> - Implémentez un retry avec backoff
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