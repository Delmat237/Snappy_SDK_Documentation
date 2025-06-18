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
  Key,
  User,
  Building,
  Code,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

export default function AuthApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const orgAuthCode = `// Authentification d'une organisation
const authResult = await httpClient.authenticateOrganization({
  email: 'admin@company.com',
  password: 'securepassword'
});

// Le token est automatiquement stocké
console.log('Token:', authResult.token);
console.log('Organization:', authResult.data);`;

  const userAuthCode = `// Authentification d'un utilisateur
const authResult = await httpClient.authenticateUser({
  email: 'user@company.com',
  password: 'userpassword'
});

// L'utilisateur est automatiquement stocké
console.log('Token:', authResult.token);
console.log('User:', authResult.data);`;

  const createOrgCode = `// Créer une nouvelle organisation
const newOrg = await httpClient.createOrganization({
  name: 'Ma Company',
  email: 'admin@company.com',
  password: 'securepassword',
  description: 'Description de mon organisation'
});

console.log('Organization créée:', newOrg.data);`;

  const tokenManagementCode = `// Gestion manuelle des tokens
httpClient.setBearerToken('your-custom-token');

// Sauvegarder le token localement
await httpClient.saveBearerToken();

// Charger le token depuis le stockage local
await httpClient.loadBearerToken();

// Obtenir l'utilisateur actuel
const currentUser = httpClient.getUser();`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">API Authentification</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Système d'authentification complet avec support des organisations et utilisateurs. 
          Gestion automatique des tokens JWT avec persistance locale.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">JWT Tokens</Badge>
          <Badge variant="outline">Auto-persist</Badge>
          <Badge variant="outline">Refresh automatique</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-blue-200 bg-blue-50">
        <Key className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important :</strong> Tous les tokens sont automatiquement gérés par le SDK. 
          Les tokens sont stockés localement et appliqués automatiquement aux requêtes suivantes.
        </AlertDescription>
      </Alert>

      {/* Main API Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Méthodes disponibles</h2>
        
        <Tabs defaultValue="org-auth" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="org-auth">Auth Organisation</TabsTrigger>
            <TabsTrigger value="user-auth">Auth Utilisateur</TabsTrigger>
            <TabsTrigger value="create-org">Créer Org</TabsTrigger>
            <TabsTrigger value="token-mgmt">Gestion Tokens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="org-auth" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>authenticateOrganization</CardTitle>
                      <CardDescription>Authentifie une organisation avec email/mot de passe</CardDescription>
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
                    onClick={() => copyToClipboard(orgAuthCode, 'org-auth')}
                  >
                    {copiedCode === 'org-auth' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{orgAuthCode}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Paramètres (AuthenticateOrganizationDto)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">email</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">password</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Réponse (AuthenticationResourceOrganization)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">token</span>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">data</span>
                        <Badge variant="secondary" className="text-xs">Organization</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="user-auth" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>authenticateUser</CardTitle>
                      <CardDescription>Authentifie un utilisateur avec email/mot de passe</CardDescription>
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
                    onClick={() => copyToClipboard(userAuthCode, 'user-auth')}
                  >
                    {copiedCode === 'user-auth' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{userAuthCode}</code>
                  </pre>
                </div>
                
                <Alert>
                  <User className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    L'utilisateur authentifié est automatiquement stocké et accessible via <code>httpClient.getUser()</code>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create-org" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>createOrganization</CardTitle>
                      <CardDescription>Crée une nouvelle organisation</CardDescription>
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
                    onClick={() => copyToClipboard(createOrgCode, 'create-org')}
                  >
                    {copiedCode === 'create-org' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{createOrgCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres (CreateOrganizationDto)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">name</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">email</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">password</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">description</span>
                      <Badge variant="outline" className="text-xs">optional</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="token-mgmt" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Gestion des tokens</CardTitle>
                    <CardDescription>Méthodes utilitaires pour gérer les tokens manuellement</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(tokenManagementCode, 'token-mgmt')}
                  >
                    {copiedCode === 'token-mgmt' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{tokenManagementCode}</code>
                  </pre>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Ces méthodes sont principalement utiles pour des cas d'usage avancés. 
                    La gestion automatique des tokens est recommandée dans la plupart des cas.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Error Handling */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            Gestion des erreurs
          </CardTitle>
          <CardDescription>
            Comment gérer les erreurs d'authentification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`try {
  const authResult = await httpClient.authenticateUser({
    email: 'user@company.com',
    password: 'wrongpassword'
  });
} catch (error) {
  if (error.response?.status === 401) {
    console.log('Identifiants incorrects');
  } else if (error.response?.status === 422) {
    console.log('Données invalides:', error.response.data);
  } else {
    console.log('Erreur réseau:', error.message);
  }
}`}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="font-semibold text-red-800">401 Unauthorized</div>
              <div className="text-red-600">Identifiants incorrects</div>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="font-semibold text-yellow-800">422 Validation Error</div>
              <div className="text-yellow-600">Données invalides</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">Network Error</div>
              <div className="text-blue-600">Problème de connexion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notes */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            Notes de sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <strong>Tokens JWT sécurisés</strong> - Tous les tokens utilisent JWT avec expiration automatique
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <strong>Stockage local chiffré</strong> - Les tokens sont stockés de manière sécurisée avec AsyncStorage
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <strong>Auto-refresh</strong> - Les tokens sont automatiquement renouvelés avant expiration
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <strong>Validation côté serveur</strong> - Toutes les requêtes sont validées côté serveur
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}