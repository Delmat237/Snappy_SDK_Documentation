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
  Globe,
  Users,
  Code,
  AlertCircle,
  Activity,
  Smartphone
} from 'lucide-react';
import { useState } from 'react';
import  basicWebSocketExample from '@/public/examples/websocket/basicWebSocketExample';
import reactWebSocketHook from '@/public/examples/websocket/reactWebSocketHook';
import presenceSystemExample from '@/public/examples/websocket/presenceSystemExample';
import reactPresenceComponent from '@/public/examples/websocket/reactPresenceComponent';
import connectionMonitorExample from '@/public/examples/websocket/connectionMonitorExample';

export default function WebSocketExamplePage() {
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
          <Zap className="w-6 h-6 text-yellow-600" />
          <h1 className="text-4xl font-bold text-gray-900">Exemple : WebSocket Avancé</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Implémentation avancée du client WebSocket avec reconnexion automatique, système de présence, 
          monitoring de connexion et gestion robuste des événements.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">WebSocket</Badge>
          <Badge variant="outline">Reconnexion</Badge>
          <Badge variant="outline">Présence</Badge>
          <Badge variant="outline">Monitoring</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <Zap className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>WebSocket avancé :</strong> Ces exemples montrent comment créer un système WebSocket 
          robuste avec toutes les fonctionnalités nécessaires pour une application de production.
        </AlertDescription>
      </Alert>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Exemples d&apos;implémentation</h2>
        
        <Tabs defaultValue="manager" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="manager">Gestionnaire avancé</TabsTrigger>
            <TabsTrigger value="hook">Hook React</TabsTrigger>
            <TabsTrigger value="presence">Système de présence</TabsTrigger>
            <TabsTrigger value="monitor">Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manager" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle>Gestionnaire WebSocket avancé</CardTitle>
                    <CardDescription>Classe complète avec reconnexion automatique et heartbeat</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(basicWebSocketExample, 'manager')}
                  >
                    {copiedCode === 'manager' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{basicWebSocketExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Fonctionnalités</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Reconnexion automatique avec backoff
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Heartbeat pour maintenir la connexion
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Gestion des événements de présence
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Système de listeners modulaire
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Avantages</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Résistance aux coupures réseau</li>
                      <li>• Monitoring de l&apos;état de connexion</li>
                      <li>• Interface standardisée</li>
                      <li>• Gestion d&apos;erreurs robuste</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hook" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Hook React pour WebSocket</CardTitle>
                    <CardDescription>Hook personnalisé pour intégration facile dans React</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(reactWebSocketHook, 'hook')}
                  >
                    {copiedCode === 'hook' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{reactWebSocketHook}</code>
                  </pre>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Utilisation du hook :</h4>
                  <div className="bg-gray-900 rounded p-3">
                    <pre className="text-sm text-gray-300">
                      <code>{`const {
  isConnected,
  connectionStatus,
  messages,
  onlineUsers,
  sendMessage
} = useWebSocket(serverUrl, projectId, userId);`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="presence" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Système de présence</CardTitle>
                    <CardDescription>Gestion complète de la présence des utilisateurs en temps réel</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(presenceSystemExample, 'presence')}
                  >
                    {copiedCode === 'presence' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{presenceSystemExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-semibold text-green-800">En ligne</div>
                    <div className="text-green-600">Utilisateur actif</div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                    <div className="font-semibold text-gray-800">Hors ligne</div>
                    <div className="text-gray-600">Dernière activité connue</div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="font-semibold text-yellow-800">Inconnu</div>
                    <div className="text-yellow-600">État indéterminé</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monitor" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Monitoring de connexion</CardTitle>
                    <CardDescription>Métriques et surveillance de la qualité de connexion</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(connectionMonitorExample, 'monitor')}
                  >
                    {copiedCode === 'monitor' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{connectionMonitorExample}</code>
                  </pre>
                </div>
                
                <Alert className="border-purple-200 bg-purple-50">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>Métriques collectées :</strong> Nombre de connexions/déconnexions, temps de connexion moyen, 
                    stabilité de la connexion et historique des événements.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Presence Component Example */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>Composant de présence React Native</CardTitle>
              <CardDescription>Interface utilisateur pour afficher la présence des utilisateurs</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => copyToClipboard(reactPresenceComponent, 'presence-component')}
            >
              {copiedCode === 'presence-component' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{reactPresenceComponent}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Fonctionnalités UI</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Indicateurs de statut colorés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Séparation en ligne/hors ligne
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Formatage intelligent des dates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Avatars avec badges de statut
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Mise à jour temps réel</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Synchronisation automatique avec WebSocket</li>
                <li>• Mise à jour instantanée des statuts</li>
                <li>• Gestion des changements de présence</li>
                <li>• Optimisation des re-rendus React</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Guide */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-yellow-600 mr-2" />
            Guide d&apos;intégration
          </CardTitle>
          <CardDescription>
            Étapes pour intégrer le système WebSocket avancé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">1. Configuration de base</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Implémenter AdvancedWebSocketManager</li>
                  <li>• Configurer les paramètres de reconnexion</li>
                  <li>• Ajouter le système de heartbeat</li>
                  <li>• Tester la robustesse de connexion</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">2. Fonctionnalités avancées</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Intégrer le système de présence</li>
                  <li>• Ajouter le monitoring de connexion</li>
                  <li>• Créer les composants UI</li>
                  <li>• Implémenter les hooks React</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2">Architecture recommandée :</h5>
              <pre className="text-sm text-gray-300">
                <code>{`src/
├── websocket/
│   ├── AdvancedWebSocketManager.ts
│   ├── PresenceManager.ts
│   ├── ConnectionMonitor.ts
│   └── types.ts
├── hooks/
│   ├── useWebSocket.ts
│   ├── usePresence.ts
│   └── useConnectionMonitor.ts
├── components/
│   ├── PresenceList.tsx
│   ├── ConnectionStatus.tsx
│   └── MetricsDashboard.tsx
└── utils/
    ├── websocketUtils.ts
    └── presenceUtils.ts`}</code>
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
            Recommandations pour un système WebSocket robuste et performant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🔧 Robustesse</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Reconnexion intelligente</strong> - Utilisez un backoff exponentiel
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Heartbeat régulier</strong> - Maintenez la connexion active
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion d&apos;erreurs</strong> - Capturez et gérez toutes les erreurs
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
                    <strong>Listeners optimisés</strong> - Évitez les fuites mémoire
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Debouncing</strong> - Limitez les mises à jour UI fréquentes
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Monitoring</strong> - Surveillez les métriques de connexion
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