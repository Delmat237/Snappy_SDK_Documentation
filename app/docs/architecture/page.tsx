'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  CheckCircle, 
  Smartphone,
  MessageSquare,
  Shield,
  Users,
  Database,
  Globe,
  Zap,
  ArrowRight,
  Code,
  Settings
} from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Architecture du SDK</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Vue d&apos;ensemble de l&#39;architecture modulaire du SDK Yow Talk, ses composants principaux et leurs interactions.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Architecture</Badge>
          <Badge variant="outline">Modulaire</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </div>
      </div>

      {/* Architecture Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Vue d&#39;ensemble</CardTitle>
          <CardDescription>
            Le SDK Yow Talk est construit autour d&#39;une architecture modulaire et extensible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Client Layer</h3>
                <p className="text-sm text-gray-600">HTTP & WebSocket clients pour la communication</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Service Layer</h3>
                <p className="text-sm text-gray-600">Services métier et logique applicative</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Layer</h3>
                <p className="text-sm text-gray-600">Modèles de données et DTOs TypeScript</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Components */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Composants principaux</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>SnappyHTTPClient</CardTitle>
                  <CardDescription>Client HTTP principal pour les requêtes API</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Classe principale pour toutes les interactions HTTP avec l&#39;API. Gère l&#39;authentification, 
                les intercepteurs, et la persistance des tokens.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Fonctionnalités clés :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Authentification automatique
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion des tokens JWT
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Intercepteurs de requêtes/réponses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Persistance locale avec AsyncStorage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion d&#39;erreurs centralisée
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-sm text-gray-800">
                  extends BaseService → utilise ApiConfig → Axios
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>SnappySocketClient</CardTitle>
                  <CardDescription>Client WebSocket pour la communication temps réel</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Gère les connexions WebSocket pour les messages temps réel, les notifications 
                de présence et les événements de chat.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Fonctionnalités clés :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Messages temps réel
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Événements de connexion/déconnexion
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion de la présence utilisateur
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Reconnexion automatique
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Interface ISnappySocketClient
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-sm text-gray-800">
                  implements ISnappySocketClient → Socket.IO
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>BaseService</CardTitle>
                  <CardDescription>Classe de base pour tous les services HTTP</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Classe abstraite qui fournit les méthodes HTTP de base (GET, POST, PUT, DELETE) 
                et la gestion de l&#39;instance Axios.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Méthodes disponibles :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <code>get&lt;T&gt;(path: string): Promise&lt;T&gt;</code>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <code>post&lt;T, R&gt;(data: T, path: string): Promise&lt;R&gt;</code>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <code>put&lt;T, R&gt;(path: string, data: T): Promise&lt;R&gt;</code>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <code>delete(path: string): Promise&lt;void&gt;</code>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-sm text-gray-800">
                  abstract class → ApiConfig → Axios
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle>ApiConfig</CardTitle>
                  <CardDescription>Configuration et gestion des instances Axios</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Singleton qui gère la configuration Axios, les intercepteurs et la gestion 
                centralisée des erreurs avec notifications toast.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Responsabilités :</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Création d&#39;instances Axios configurées
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion des headers d&#39;authentification
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Intercepteurs de réponse pour les erreurs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Notifications d&#39;erreur automatiques
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-sm text-gray-800">
                  Singleton Pattern → Axios Instance
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Flow */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRight className="w-5 h-5 text-blue-600 mr-2" />
            Flux de données
          </CardTitle>
          <CardDescription>
            Comment les données circulent dans le SDK
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Flux HTTP (Requêtes API)</h3>
              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div className="font-semibold">Application</div>
                  <div className="text-gray-600">Appel méthode</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-purple-600">2</span>
                  </div>
                  <div className="font-semibold">SnappyHTTPClient</div>
                  <div className="text-gray-600">Traitement</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-green-600">3</span>
                  </div>
                  <div className="font-semibold">BaseService</div>
                  <div className="text-gray-600">HTTP Method</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-orange-600">4</span>
                  </div>
                  <div className="font-semibold">ApiConfig</div>
                  <div className="text-gray-600">Axios Instance</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-red-600">5</span>
                  </div>
                  <div className="font-semibold">API Server</div>
                  <div className="text-gray-600">Réponse</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Flux WebSocket (Temps réel)</h3>
              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-green-600">1</span>
                  </div>
                  <div className="font-semibold">SnappySocketClient</div>
                  <div className="text-gray-600">Connexion</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div className="font-semibold">Socket.IO</div>
                  <div className="text-gray-600">Transport</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-purple-600">3</span>
                  </div>
                  <div className="font-semibold">WebSocket Server</div>
                  <div className="text-gray-600">Événements</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-orange-600">4</span>
                  </div>
                  <div className="font-semibold">Event Listeners</div>
                  <div className="text-gray-600">Callbacks</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-red-600">5</span>
                  </div>
                  <div className="font-semibold">Application</div>
                  <div className="text-gray-600">UI Update</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features by Domain */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Domaines fonctionnels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Authentification</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Authentification organisation</li>
                <li>• Authentification utilisateur</li>
                <li>• Gestion des tokens JWT</li>
                <li>• Persistance sécurisée</li>
                <li>• Refresh automatique</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Gestion utilisateurs</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Création d&#39;utilisateurs</li>
                <li>• Gestion des contacts</li>
                <li>• Recherche par nom d&#39;affichage</li>
                <li>• Profils utilisateur</li>
                <li>• Organisations multi-tenant</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Messagerie</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Envoi de messages</li>
                <li>• Messages temps réel</li>
                <li>• Support multimédia</li>
                <li>• Chats de groupe</li>
                <li>• Historique des conversations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Chatbots IA</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Création de chatbots</li>
                <li>• Modèles IA personnalisés</li>
                <li>• Configuration flexible</li>
                <li>• Intégration transparente</li>
                <li>• Gestion des modèles</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Protocole Signal</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Chiffrement end-to-end</li>
                <li>• Pre-Key Bundles</li>
                <li>• Perfect Forward Secrecy</li>
                <li>• Gestion des clés</li>
                <li>• Sécurité cryptographique</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Organisations</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Création d&#39;organisations</li>
                <li>• Gestion multi-tenant</li>
                <li>• Utilisateurs d&#39;organisation</li>
                <li>• Projets et espaces</li>
                <li>• Administration</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Specifications */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-blue-50">
        <CardHeader>
          <CardTitle>Spécifications techniques</CardTitle>
          <CardDescription>
            Détails techniques et dépendances du SDK
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Technologies utilisées</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>TypeScript</strong> - Typage statique complet
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>Axios</strong> - Client HTTP avec intercepteurs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>Socket.IO</strong> - WebSocket avec fallbacks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>AsyncStorage</strong> - Persistance locale sécurisée
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Patterns architecturaux</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>Singleton</strong> - Configuration centralisée
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>Observer</strong> - Événements WebSocket
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>Factory</strong> - Création d&#39;instances
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <strong>Strategy</strong> - Gestion des erreurs
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}