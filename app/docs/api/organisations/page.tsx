'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  CheckCircle, 
  Copy, 
  Plus,
  Search,
  Trash2,
  Eye,
  Code,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

export default function OrganizationsApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const createOrgCode = `// Créer une nouvelle organisation
const newOrg = await httpClient.createOrganization({
  name: 'Ma Company',
  email: 'admin@company.com',
  password: 'securepassword',
  description: 'Description de mon organisation'
});

// L'organisation est automatiquement authentifiée
console.log('Token:', newOrg.token);
console.log('Organization:', newOrg.data);`;

  const getOrgCode = `// Récupérer une organisation par ID
const organization = await httpClient.getOrganization('org-123');

console.log('Organization:', organization);`;

  const getAllOrgsCode = `// Rechercher des organisations
const organizations = await httpClient.getAllOrganizations('search-key');

console.log('Organizations trouvées:', organizations);`;

  const deleteOrgCode = `// Supprimer une organisation
await httpClient.deleteOrganization('org-123');

console.log('Organisation supprimée');`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Building className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">API Organisations</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Gestion complète des organisations avec création, récupération, recherche et suppression. 
          Support multi-tenant pour vos applications d&apos;entreprise.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Organizations API</Badge>
          <Badge variant="outline">Multi-tenant</Badge>
          <Badge variant="outline">CRUD</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-blue-200 bg-blue-50">
        <Building className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>API Organisations :</strong> Permet de gérer les organisations dans un environnement multi-tenant. 
          Chaque organisation a son propre projet ID et peut gérer ses utilisateurs indépendamment.
        </AlertDescription>
      </Alert>

      {/* Main API Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Méthodes disponibles</h2>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Créer</TabsTrigger>
            <TabsTrigger value="get">Récupérer</TabsTrigger>
            <TabsTrigger value="search">Rechercher</TabsTrigger>
            <TabsTrigger value="delete">Supprimer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>createOrganization</CardTitle>
                      <CardDescription>Crée une nouvelle organisation et l&apos;authentifie automatiquement</CardDescription>
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
                    onClick={() => copyToClipboard(createOrgCode, 'create')}
                  >
                    {copiedCode === 'create' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{createOrgCode}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Paramètres (CreateOrganizationDto)</h4>
                    <div className="space-y-2 text-sm">
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
                
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Auto-authentification :</strong> Après création, l&apos;organisation est automatiquement authentifiée 
                    et le token est stocké pour les requêtes suivantes.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="get" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>getOrganization</CardTitle>
                      <CardDescription>Récupère les détails d&apos;une organisation par son ID</CardDescription>
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
                    onClick={() => copyToClipboard(getOrgCode, 'get')}
                  >
                    {copiedCode === 'get' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getOrgCode}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Eye className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Nécessite une authentification valide. Retourne l&apos;objet Organization complet avec tous ses détails.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>getAllOrganizations</CardTitle>
                      <CardDescription>Recherche des organisations par clé de recherche</CardDescription>
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
                    onClick={() => copyToClipboard(getAllOrgsCode, 'search')}
                  >
                    {copiedCode === 'search' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getAllOrgsCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres</h4>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <span className="font-mono">key</span> - Clé de recherche pour filtrer les organisations
                  </div>
                </div>
                
                <Alert className="border-purple-200 bg-purple-50">
                  <Search className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    La recherche s&apos;effectue sur le nom et la description des organisations. 
                    Retourne un tableau d&apos;organisations correspondant aux critères.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delete" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle>deleteOrganization</CardTitle>
                      <CardDescription>Supprime définitivement une organisation</CardDescription>
                    </div>
                  </div>
                  <Badge variant="destructive">DELETE</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(deleteOrgCode, 'delete')}
                  >
                    {copiedCode === 'delete' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{deleteOrgCode}</code>
                  </pre>
                </div>
                
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Attention :</strong> Cette action est irréversible. Tous les utilisateurs et données 
                    associés à l&apos;organisation seront également supprimés.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Organization Model */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-blue-600 mr-2" />
            Modèle Organization
          </CardTitle>
          <CardDescription>
            Structure de l&apos;objet Organization retourné par l&apos;API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`interface Organization {
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
}`}</code>
            </pre>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Propriétés principales</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>id</code> - Identifiant unique de l&apos;organisation</li>
                <li><code>name</code> - Nom de l&apos;organisation</li>
                <li><code>email</code> - Email administrateur</li>
                <li><code>projectId</code> - ID du projet associé</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Propriétés optionnelles</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>description</code> - Description de l&apos;organisation</li>
                <li><code>logo</code> - URL du logo</li>
                <li><code>website</code> - Site web</li>
                <li><code>userCount</code> - Nombre d&apos;utilisateurs</li>
              </ul>
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
            Recommandations pour l&apos;utilisation de l&apos;API organisations
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
                    <strong>Validation des données</strong> - Validez toujours les données avant création
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion des tokens</strong> - Stockez et gérez correctement les tokens d&apos;authentification
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Isolation des données</strong> - Respectez l&apos;isolation multi-tenant
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">❌ À éviter</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Suppression sans confirmation</strong> - Toujours demander confirmation avant suppression
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Emails en dur</strong> - Ne pas coder les emails en dur dans l&apos;application
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Accès cross-tenant</strong> - Ne jamais accéder aux données d&apos;autres organisations
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