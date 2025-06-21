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
  Key,
  Code,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { useState } from 'react';

export default function AuthTypesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const authUserDto = `interface AuthenticateUserDto {
  email: string;
  password: string;
}`;

  const authOrgDto = `interface AuthenticateOrganizationDto {
  email: string;
  password: string;
}`;

  const createOrgDto = `interface CreateOrganizationDto {
  name: string;
  email: string;
  password: string;
  description?: string;
}`;

  const authResponses = `interface AuthenticationResourceUser {
  token: string;
  data: User;
}

interface AuthenticationResourceOrganization {
  token: string;
  data: Organization;
}`;

  const usageExample = `// Exemple d'utilisation des DTOs d'authentification
import { 
  AuthenticateUserDto, 
  AuthenticateOrganizationDto,
  CreateOrganizationDto 
} from 'yow-talk-sdk';

// Authentification utilisateur
const userCredentials: AuthenticateUserDto = {
  email: 'user@example.com',
  password: 'securepassword'
};

const userAuth = await httpClient.authenticateUser(userCredentials);
console.log('Token utilisateur:', userAuth.token);
console.log('Données utilisateur:', userAuth.data);

// Authentification organisation
const orgCredentials: AuthenticateOrganizationDto = {
  email: 'admin@company.com',
  password: 'adminpassword'
};

const orgAuth = await httpClient.authenticateOrganization(orgCredentials);
console.log('Token organisation:', orgAuth.token);
console.log('Données organisation:', orgAuth.data);

// Création d'organisation
const newOrgData: CreateOrganizationDto = {
  name: 'Ma Nouvelle Entreprise',
  email: 'admin@nouvelle-entreprise.com',
  password: 'motdepassesecurise',
  description: 'Description de mon entreprise'
};

const createdOrg = await httpClient.createOrganization(newOrgData);`;

  const validationExample = `// Validation des DTOs avec des fonctions utilitaires
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  // Au moins 8 caractères, une majuscule, une minuscule, un chiffre
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateAuthenticateUserDto(dto: AuthenticateUserDto): string[] {
  const errors: string[] = [];
  
  if (!dto.email) {
    errors.push('Email est requis');
  } else if (!validateEmail(dto.email)) {
    errors.push('Format d\\'email invalide');
  }
  
  if (!dto.password) {
    errors.push('Mot de passe est requis');
  } else if (dto.password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères');
  }
  
  return errors;
}

function validateCreateOrganizationDto(dto: CreateOrganizationDto): string[] {
  const errors: string[] = [];
  
  if (!dto.name || dto.name.trim().length < 2) {
    errors.push('Le nom de l\\'organisation doit contenir au moins 2 caractères');
  }
  
  if (!dto.email) {
    errors.push('Email est requis');
  } else if (!validateEmail(dto.email)) {
    errors.push('Format d\\'email invalide');
  }
  
  if (!dto.password) {
    errors.push('Mot de passe est requis');
  } else if (!validatePassword(dto.password)) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule et chiffre');
  }
  
  if (dto.description && dto.description.length > 500) {
    errors.push('La description ne peut pas dépasser 500 caractères');
  }
  
  return errors;
}`;

  const errorHandlingExample = `// Gestion des erreurs d'authentification avec types
interface AuthError {
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'ORGANIZATION_NOT_FOUND' | 'VALIDATION_ERROR';
  message: string;
  details?: Record<string, any>;
}

// Exemple d'utilisation avec gestion d'erreurs
try {
  const userAuth = await httpClient.authenticateUser(userCredentials);
  // Succès - utiliser le token
  localStorage.setItem('authToken', userAuth.token);
} catch (error) {
  const authError = error as AuthError;
  
  switch (authError.code) {
    case 'INVALID_CREDENTIALS':
      console.error('Identifiants invalides');
      break;
    case 'USER_NOT_FOUND':
      console.error('Utilisateur non trouvé');
      break;
    case 'VALIDATION_ERROR':
      console.error('Erreur de validation:', authError.details);
      break;
    default:
      console.error('Erreur inconnue:', authError.message);
  }
}`;

  const securityBestPractices = `// Bonnes pratiques de sécurité
class AuthService {
  private static readonly TOKEN_KEY = 'yow_talk_token';
  private static readonly REFRESH_TOKEN_KEY = 'yow_talk_refresh_token';

  // Stockage sécurisé du token
  static setAuthToken(token: string, refreshToken?: string): void {
    // Utiliser httpOnly cookies en production
    localStorage.setItem(this.TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  // Récupération du token avec validation
  static getAuthToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    
    // Vérifier l'expiration du token
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        this.clearAuthTokens();
        return null;
      }
      return token;
    } catch {
      this.clearAuthTokens();
      return null;
    }
  }

  // Nettoyage des tokens
  static clearAuthTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Middleware d'authentification pour les requêtes
  static getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    return token ? { Authorization: \`Bearer \${token}\` } : {};
  }
}`;

  const CodeBlock = ({ code, id, title }: { code: string; id: string; title: string }) => (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-2 rounded-t-lg">
        <span className="text-sm font-medium">{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="text-white hover:bg-gray-800 h-8 w-8 p-0"
        >
          {copiedCode === id ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="bg-gray-50 p-4 rounded-b-lg overflow-x-auto text-sm">
        <code className="text-gray-800">{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Types d&apos;Authentification
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Documentation complète des DTOs et interfaces pour l&apos;authentification dans YowTalk SDK
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Badge variant="default">
              <BookOpen className="h-3 w-3 mr-1" />
              Documentation
            </Badge>
            <Badge variant="default">
              <Code className="h-3 w-3 mr-1" />
              TypeScript
            </Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Utilisateurs</CardTitle>
              </div>
              <CardDescription>
                Authentification des utilisateurs individuels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="default">AuthenticateUserDto</Badge>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Organisations</CardTitle>
              </div>
              <CardDescription>
                Gestion des comptes d&apos;organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">AuthenticateOrganizationDto</Badge>
                <Badge variant="secondary">CreateOrganizationDto</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Sécurité</CardTitle>
              </div>
              <CardDescription>
                Validation et gestion des erreurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="default">Validation intégrée</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="interfaces" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="interfaces">Interfaces</TabsTrigger>
            <TabsTrigger value="usage">Utilisation</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="errors">Erreurs</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="interfaces">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    DTOs d&apos;Authentification Utilisateur
                  </CardTitle>
                  <CardDescription>
                    Interface pour l&apos;authentification des utilisateurs individuels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code={authUserDto} 
                    id="auth-user-dto" 
                    title="AuthenticateUserDto"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    DTOs d&apos;Authentification Organisation
                  </CardTitle>
                  <CardDescription>
                    Interfaces pour la gestion des organisations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CodeBlock 
                    code={authOrgDto} 
                    id="auth-org-dto" 
                    title="AuthenticateOrganizationDto"
                  />
                  <CodeBlock 
                    code={createOrgDto} 
                    id="create-org-dto" 
                    title="CreateOrganizationDto"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Réponses d&apos;Authentification
                  </CardTitle>
                  <CardDescription>
                    Interfaces des réponses retournées par l&apos;API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code={authResponses} 
                    id="auth-responses" 
                    title="Authentication Resources"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Exemples d&apos;Utilisation</CardTitle>
                <CardDescription>
                  Comment utiliser les DTOs d&apos;authentification dans votre application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock 
                  code={usageExample} 
                  id="usage-example" 
                  title="Exemples d'utilisation complète"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validation">
            <div className="space-y-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important :</strong> Toujours valider les données côté client ET côté serveur pour une sécurité optimale.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Validation des DTOs</CardTitle>
                  <CardDescription>
                    Fonctions utilitaires pour valider les données d&apos;authentification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code={validationExample} 
                    id="validation-example" 
                    title="Fonctions de validation"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Erreurs</CardTitle>
                <CardDescription>
                  Types d&apos;erreurs et stratégies de gestion pour l&apos;authentification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock 
                  code={errorHandlingExample} 
                  id="error-handling" 
                  title="Gestion des erreurs d'authentification"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Alert variant="destructive">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Sécurité Critique :</strong> Ne jamais stocker les mots de passe en plain text. Utilisez toujours HTTPS en production.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Bonnes Pratiques de Sécurité</CardTitle>
                  <CardDescription>
                    Implémentation sécurisée de l&apos;authentification avec gestion des tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock 
                    code={securityBestPractices} 
                    id="security-practices" 
                    title="Service d'authentification sécurisé"
                  />
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommandations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Utiliser HTTPS uniquement
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Implémenter la rotation des tokens
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Valider côté client et serveur
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Utiliser des cookies httpOnly
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">À Éviter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Stocker les mots de passe en clair
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Tokens sans expiration
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Validation uniquement côté client
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Logs contenant des credentials
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Pour plus d&apos;informations, consultez la documentation complète de YowTalk SDK
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Badge variant="default">v1.0.0</Badge>
                <Badge variant="secondary">TypeScript Ready</Badge>
                <Badge variant="default">Production Ready</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}