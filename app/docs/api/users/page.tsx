'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  CheckCircle, 
  Copy, 
  User,
  UserPlus,
  Search,
  Building,
  Code,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

export default function UsersApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const createUserCode = `// Créer un nouvel utilisateur
const newUser = await httpClient.createUser({
  email: 'user@example.com',
  password: 'securepassword',
  displayName: 'John Doe',
  projectId: 'project-123'
});

console.log('Utilisateur créé:', newUser);`;

  const getUserContactsCode = `// Récupérer les contacts d'un utilisateur
const contacts = await httpClient.getUserContacts({
  userId: 'user-123',
  projectId: 'project-456'
});

console.log('Contacts:', contacts);`;

  const addContactCode = `// Ajouter un contact
const updatedContacts = await httpClient.addContact({
  userId: 'user-123',
  contactId: 'contact-456',
  projectId: 'project-789'
});

console.log('Contacts mis à jour:', updatedContacts);`;

  const searchUserCode = `// Rechercher un utilisateur par nom d'affichage
const users = await httpClient.filterUserByDisplayName({
  displayName: 'John',
  projectId: 'project-123'
});

console.log('Utilisateurs trouvés:', users);`;

  const findOrgUsersCode = `// Trouver tous les utilisateurs d'une organisation
const orgUsers = await httpClient.findOrganizationUsers('project-123');

console.log('Utilisateurs de l\'organisation:', orgUsers);`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">API Utilisateurs</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Gestion complète des utilisateurs, contacts et recherche. Toutes les méthodes pour créer, 
          gérer et rechercher des utilisateurs dans votre application.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Users API</Badge>
          <Badge variant="outline">Contacts</Badge>
          <Badge variant="outline">Recherche</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-purple-200 bg-purple-50">
        <Users className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>API Utilisateurs :</strong> Permet de gérer les utilisateurs, leurs contacts, 
          et de rechercher des utilisateurs par nom d&apos;affichage dans une organisation.
        </AlertDescription>
      </Alert>

      {/* Main API Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Méthodes disponibles</h2>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="create">Créer</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="add-contact">Ajouter Contact</TabsTrigger>
            <TabsTrigger value="search">Recherche</TabsTrigger>
            <TabsTrigger value="org-users">Org Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>createUser</CardTitle>
                      <CardDescription>Crée un nouvel utilisateur dans le projet</CardDescription>
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
                    onClick={() => copyToClipboard(createUserCode, 'create')}
                  >
                    {copiedCode === 'create' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{createUserCode}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Paramètres (CreateUserDto)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">email</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">password</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">displayName</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">projectId</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Réponse (User)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">id</span>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">email</span>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">displayName</span>
                        <Badge variant="secondary" className="text-xs">string</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">createdAt</span>
                        <Badge variant="secondary" className="text-xs">Date</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contacts" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>getUserContacts</CardTitle>
                      <CardDescription>Récupère la liste des contacts d&apos;un utilisateur</CardDescription>
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
                    onClick={() => copyToClipboard(getUserContactsCode, 'contacts')}
                  >
                    {copiedCode === 'contacts' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getUserContactsCode}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Users className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Retourne un tableau d&apos;objets User représentant tous les contacts de l&apos;utilisateur spécifié.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="add-contact" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>addContact</CardTitle>
                      <CardDescription>Ajoute un contact à la liste d&apos;un utilisateur</CardDescription>
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
                    onClick={() => copyToClipboard(addContactCode, 'add-contact')}
                  >
                    {copiedCode === 'add-contact' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{addContactCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres (AddContactDto)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">userId</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">contactId</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-mono">projectId</span>
                      <Badge variant="destructive" className="text-xs">required</Badge>
                    </div>
                  </div>
                </div>
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
                      <CardTitle>filterUserByDisplayName</CardTitle>
                      <CardDescription>Recherche des utilisateurs par nom d&apos;affichage</CardDescription>
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
                    onClick={() => copyToClipboard(searchUserCode, 'search')}
                  >
                    {copiedCode === 'search' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{searchUserCode}</code>
                  </pre>
                </div>
                
                <Alert className="border-purple-200 bg-purple-50">
                  <Search className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    La recherche est insensible à la casse et supporte la recherche partielle.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="org-users" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle>findOrganizationUsers</CardTitle>
                      <CardDescription>Trouve tous les utilisateurs d&apos;une organisation</CardDescription>
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
                    onClick={() => copyToClipboard(findOrgUsersCode, 'org-users')}
                  >
                    {copiedCode === 'org-users' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{findOrgUsersCode}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Building className="h-4 w-4 text-orange-600" />
                  <AlertDescription>
                    Retourne tous les utilisateurs appartenant au projet/organisation spécifié.
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
            Comment gérer les erreurs courantes de l&apos;API utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`try {
  const newUser = await httpClient.createUser({
    email: 'user@example.com',
    password: 'password123',
    displayName: 'John Doe',
    projectId: 'project-123'
  });
} catch (error) {
  if (error.response?.status === 409) {
    console.log('Utilisateur déjà existant');
  } else if (error.response?.status === 422) {
    console.log('Données invalides:', error.response.data);
  } else if (error.response?.status === 403) {
    console.log('Permissions insuffisantes');
  } else {
    console.log('Erreur réseau:', error.message);
  }
}`}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="font-semibold text-red-800">409 Conflict</div>
              <div className="text-red-600">Utilisateur déjà existant</div>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="font-semibold text-yellow-800">422 Validation Error</div>
              <div className="text-yellow-600">Données invalides</div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">403 Forbidden</div>
              <div className="text-blue-600">Permissions insuffisantes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Model */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-purple-600 mr-2" />
            Modèle User
          </CardTitle>
          <CardDescription>
            Structure de l&apos;objet User retourné par l&apos;API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`interface User {
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
}`}</code>
            </pre>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Propriétés principales</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>id</code> - Identifiant unique de l&apos;utilisateur</li>
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
                <li><code>isActive</code> - Statut actif/inactif</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}