'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  CheckCircle, 
  Copy, 
  AlertTriangle,
  Database,
  Settings,
  Zap,
  Shield
} from 'lucide-react';
import { useState } from 'react';

export default function BaseServicePage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const baseServiceOverview = `// BaseService - Classe abstraite pour les services HTTP
export abstract class BaseService {
    protected api: AxiosInstance;

    constructor(baseUrl: string) {
        this.api = ApiConfig.getInstance(false, baseUrl);
    }

    protected refreshApiInstance(baseUrl: string, withAuth: boolean = true, bearer?: string) {
        this.api = ApiConfig.getInstance(true, baseUrl, withAuth, bearer);
    }

    // Méthodes HTTP disponibles
    protected async get<T>(path: string = ''): Promise<T>
    protected async post<T, R>(data: T, path: string = '', headers?: Record<string, string>): Promise<R>
    protected async put<T, R>(path: string = '', data: T): Promise<R>
    protected async patch<T, R>(path: string, data: T): Promise<R>
    protected async delete(path: string): Promise<void>
}`;

  const httpMethods = `// Utilisation des méthodes HTTP dans BaseService

// GET - Récupération de données
protected async get<T>(path: string = ''): Promise<T> {
    const response = await this.api.get<T>(\`/\${path}\`);
    return Promise.resolve(response.data);
}

// POST - Création de ressources
protected async post<T, R>(data: T, path: string = '', headers?: Record<string, string>): Promise<R> {
    if (headers) {
        const response = await this.api.post<R>(\`\${path}\`, data, { headers });
        return Promise.resolve(response.data);
    }
    const response = await this.api.post<R>(\`\${path}\`, data);
    return Promise.resolve(response.data);
}

// PUT - Mise à jour complète
protected async put<T, R>(path: string = '', data: T): Promise<R> {
    const response = await this.api.put<R>(\`\${path}\`, data);
    return Promise.resolve(response.data);
}

// PATCH - Mise à jour partielle
protected async patch<T, R>(path: string, data: T): Promise<R> {
    const response = await this.api.patch<R>(\`\${path}\`, data);
    return Promise.resolve(response.data);
}

// DELETE - Suppression
protected async delete(path: string): Promise<void> {
    await this.api.delete(\`\${path}\`);
    return Promise.resolve();
}`;

  const customService = `// Exemple d'implémentation d'un service personnalisé
import { BaseService } from './BaseService';
import { User, CreateUserDto, UpdateUserDto } from './models';

export class UserService extends BaseService {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    // Récupérer tous les utilisateurs
    async getAllUsers(): Promise<User[]> {
        return this.get<User[]>('users');
    }

    // Récupérer un utilisateur par ID
    async getUserById(id: string): Promise<User> {
        return this.get<User>(\`users/\${id}\`);
    }

    // Créer un nouvel utilisateur
    async createUser(userData: CreateUserDto): Promise<User> {
        return this.post<CreateUserDto, User>(userData, 'users');
    }

    // Mettre à jour un utilisateur
    async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
        return this.put<UpdateUserDto, User>(\`users/\${id}\`, userData);
    }

    // Mise à jour partielle d'un utilisateur
    async patchUser(id: string, userData: Partial<UpdateUserDto>): Promise<User> {
        return this.patch<Partial<UpdateUserDto>, User>(\`users/\${id}\`, userData);
    }

    // Supprimer un utilisateur
    async deleteUser(id: string): Promise<void> {
        return this.delete(\`users/\${id}\`);
    }

    // Méthode avec headers personnalisés
    async uploadUserAvatar(id: string, formData: FormData): Promise<User> {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        return this.post<FormData, User>(formData, \`users/\${id}/avatar\`, headers);
    }

    // Méthode avec authentification spécifique
    async getAdminUsers(adminToken: string): Promise<User[]> {
        // Refresh de l'instance avec token admin
        this.refreshApiInstance(this.api.defaults.baseURL!, true, adminToken);
        return this.get<User[]>('admin/users');
    }
}`;

  const errorHandling = `// Gestion d'erreurs dans les services personnalisés
export class RobustUserService extends BaseService {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getUserWithErrorHandling(id: string): Promise<User | null> {
        try {
            const user = await this.get<User>(\`users/\${id}\`);
            return user;
        } catch (error: any) {
            if (error.response?.status === 404) {
                console.log('Utilisateur non trouvé');
                return null;
            } else if (error.response?.status === 403) {
                console.error('Accès refusé');
                throw new Error('Vous n\\'avez pas les permissions pour accéder à cet utilisateur');
            } else {
                console.error('Erreur lors de la récupération de l\\'utilisateur:', error);
                throw error;
            }
        }
    }

    async createUserWithValidation(userData: CreateUserDto): Promise<User> {
        try {
            // Validation côté client
            if (!userData.email || !userData.password) {
                throw new Error('Email et mot de passe sont requis');
            }

            const user = await this.post<CreateUserDto, User>(userData, 'users');
            console.log('Utilisateur créé avec succès:', user.id);
            return user;
        } catch (error: any) {
            if (error.response?.status === 422) {
                // Erreur de validation côté serveur
                const validationErrors = error.response.data.errors;
                console.error('Erreurs de validation:', validationErrors);
                throw new Error(\`Données invalides: \${Object.keys(validationErrors).join(', ')}\`);
            }
            throw error;
        }
    }

    async retryableRequest<T>(
        requestFn: () => Promise<T>,
        maxRetries: number = 3,
        delay: number = 1000
    ): Promise<T> {
        let lastError: any;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await requestFn();
            } catch (error: any) {
                lastError = error;
                
                // Ne pas retry sur les erreurs client (4xx)
                if (error.response?.status >= 400 && error.response?.status < 500) {
                    throw error;
                }
                
                if (attempt < maxRetries) {
                    console.log(\`Tentative \${attempt} échouée, retry dans \${delay}ms\`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    console.error(\`Toutes les tentatives ont échoué après \${maxRetries} essais\`);
                }
            }
        }
        
        throw lastError;
    }
}`;

  const advancedPatterns = `// Patterns avancés avec BaseService
export class AdvancedChatService extends BaseService {
    private cache = new Map<string, any>();
    private requestQueue: Array<() => Promise<any>> = [];
    private isProcessingQueue = false;

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    // Pattern Cache
    async getCachedUser(id: string): Promise<User> {
        const cacheKey = \`user_\${id}\`;
        
        if (this.cache.has(cacheKey)) {
            console.log('Utilisateur récupéré depuis le cache');
            return this.cache.get(cacheKey);
        }

        const user = await this.get<User>(\`users/\${id}\`);
        this.cache.set(cacheKey, user);
        
        // Expiration du cache après 5 minutes
        setTimeout(() => {
            this.cache.delete(cacheKey);
        }, 5 * 60 * 1000);

        return user;
    }

    // Pattern Queue pour éviter les requêtes simultanées
    async queuedRequest<T>(requestFn: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.requestQueue.push(async () => {
                try {
                    const result = await requestFn();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

            this.processQueue();
        });
    }

    private async processQueue() {
        if (this.isProcessingQueue || this.requestQueue.length === 0) {
            return;
        }

        this.isProcessingQueue = true;

        while (this.requestQueue.length > 0) {
            const request = this.requestQueue.shift();
            if (request) {
                await request();
                // Délai entre les requêtes pour éviter le rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        this.isProcessingQueue = false;
    }

    // Pattern Batch pour les requêtes multiples
    async batchGetUsers(ids: string[]): Promise<User[]> {
        const batchSize = 10;
        const results: User[] = [];

        for (let i = 0; i < ids.length; i += batchSize) {
            const batch = ids.slice(i, i + batchSize);
            const batchPromises = batch.map(id => this.getCachedUser(id));
            
            try {
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults);
            } catch (error) {
                console.error(\`Erreur dans le batch \${i / batchSize + 1}:\`, error);
                // Continuer avec les autres batches
            }
        }

        return results;
    }

    // Pattern Observer pour les mises à jour
    private observers: Array<(data: any) => void> = [];

    subscribe(callback: (data: any) => void) {
        this.observers.push(callback);
    }

    unsubscribe(callback: (data: any) => void) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }

    private notifyObservers(data: any) {
        this.observers.forEach(callback => callback(data));
    }

    async createUserWithNotification(userData: CreateUserDto): Promise<User> {
        const user = await this.post<CreateUserDto, User>(userData, 'users');
        
        // Notifier tous les observateurs
        this.notifyObservers({ type: 'USER_CREATED', data: user });
        
        return user;
    }
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Code className="w-6 h-6 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">Base Service</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Guide complet de la classe BaseService, la classe abstraite qui fournit les méthodes HTTP de base pour tous les services du SDK.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">BaseService</Badge>
          <Badge variant="outline">Abstract Class</Badge>
          <Badge variant="outline">HTTP Methods</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-green-200 bg-green-50">
        <Code className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>BaseService</strong> est une classe abstraite qui fournit les méthodes HTTP de base (GET, POST, PUT, PATCH, DELETE) 
          et gère la configuration des instances Axios via ApiConfig.
        </AlertDescription>
      </Alert>

      {/* Class Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Vue d'ensemble de la classe</CardTitle>
              <CardDescription>Structure et méthodes de la classe BaseService</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(baseServiceOverview, 'overview')}
            >
              {copiedCode === 'overview' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{baseServiceOverview}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Propriétés protégées</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">api: AxiosInstance</span>
                  <Badge variant="secondary" className="text-xs">protected</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Méthodes disponibles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">refreshApiInstance()</span>
                  <Badge variant="outline" className="text-xs">protected</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-mono">HTTP Methods</span>
                  <Badge variant="outline" className="text-xs">protected</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HTTP Methods */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>Méthodes HTTP</CardTitle>
              <CardDescription>Détail des méthodes HTTP disponibles dans BaseService</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(httpMethods, 'methods')}
            >
              {copiedCode === 'methods' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{httpMethods}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800">GET</div>
              <div className="text-blue-600">Récupération de données</div>
              <div className="font-mono text-xs mt-1">get&lt;T&gt;(path)</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="font-semibold text-green-800">POST</div>
              <div className="text-green-600">Création de ressources</div>
              <div className="font-mono text-xs mt-1">post&lt;T,R&gt;(data, path)</div>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="font-semibold text-yellow-800">PUT</div>
              <div className="text-yellow-600">Mise à jour complète</div>
              <div className="font-mono text-xs mt-1">put&lt;T,R&gt;(path, data)</div>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <div className="font-semibold text-purple-800">PATCH</div>
              <div className="text-purple-600">Mise à jour partielle</div>
              <div className="font-mono text-xs mt-1">patch&lt;T,R&gt;(path, data)</div>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="font-semibold text-red-800">DELETE</div>
              <div className="text-red-600">Suppression</div>
              <div className="font-mono text-xs mt-1">delete(path)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Service Implementation */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Service personnalisé</CardTitle>
              <CardDescription>Exemple d'implémentation d'un service héritant de BaseService</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(customService, 'custom')}
            >
              {copiedCode === 'custom' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{customService}</code>
            </pre>
          </div>
          
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              En héritant de BaseService, vous obtenez automatiquement toutes les méthodes HTTP avec gestion d'erreurs et configuration Axios.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Advanced Usage */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>Utilisation avancée</CardTitle>
              <CardDescription>Patterns avancés et gestion d'erreurs robuste</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="error" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="error">Gestion d'erreurs</TabsTrigger>
              <TabsTrigger value="patterns">Patterns avancés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="error" className="space-y-4">
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
            </TabsContent>
            
            <TabsContent value="patterns" className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(advancedPatterns, 'patterns')}
                >
                  {copiedCode === 'patterns' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{advancedPatterns}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Method Signatures */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Signatures des méthodes</CardTitle>
          <CardDescription>
            Détail des signatures TypeScript pour chaque méthode HTTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="font-mono font-semibold text-blue-800 mb-2">
                  protected async get&lt;T&gt;(path: string = ''): Promise&lt;T&gt;
                </div>
                <div className="text-blue-600">
                  <strong>Paramètres :</strong> path (optionnel) - Chemin de l'endpoint<br/>
                  <strong>Retour :</strong> Promise avec les données typées T
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="font-mono font-semibold text-green-800 mb-2">
                  protected async post&lt;T, R&gt;(data: T, path: string = '', headers?: Record&lt;string, string&gt;): Promise&lt;R&gt;
                </div>
                <div className="text-green-600">
                  <strong>Paramètres :</strong> data (T), path (optionnel), headers (optionnel)<br/>
                  <strong>Retour :</strong> Promise avec la réponse typée R
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <div className="font-mono font-semibold text-yellow-800 mb-2">
                  protected async put&lt;T, R&gt;(path: string = '', data: T): Promise&lt;R&gt;
                </div>
                <div className="text-yellow-600">
                  <strong>Paramètres :</strong> path, data (T)<br/>
                  <strong>Retour :</strong> Promise avec la réponse typée R
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                <div className="font-mono font-semibold text-purple-800 mb-2">
                  protected async patch&lt;T, R&gt;(path: string, data: T): Promise&lt;R&gt;
                </div>
                <div className="text-purple-600">
                  <strong>Paramètres :</strong> path, data (T)<br/>
                  <strong>Retour :</strong> Promise avec la réponse typée R
                </div>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <div className="font-mono font-semibold text-red-800 mb-2">
                  protected async delete(path: string): Promise&lt;void&gt;
                </div>
                <div className="text-red-600">
                  <strong>Paramètres :</strong> path<br/>
                  <strong>Retour :</strong> Promise&lt;void&gt;
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Bonnes pratiques
          </CardTitle>
          <CardDescription>
            Recommandations pour utiliser BaseService efficacement
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
                    <strong>Typage strict</strong> - Utilisez toujours les types TypeScript pour les paramètres et retours
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion d'erreurs</strong> - Implémentez une gestion d'erreurs appropriée dans vos services
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Méthodes métier</strong> - Créez des méthodes métier claires qui encapsulent la logique
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
                    <strong>Logique dans les composants</strong> - Ne mettez pas la logique HTTP directement dans les composants
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Types any</strong> - Évitez d'utiliser 'any' pour les types de données
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Instances multiples</strong> - Ne créez pas plusieurs instances du même service
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