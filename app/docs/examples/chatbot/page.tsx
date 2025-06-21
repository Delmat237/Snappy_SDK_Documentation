'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  CheckCircle, 
  Copy, 
  Brain,
  Settings,
  Code,
  AlertCircle,
  Zap,
  Smartphone
} from 'lucide-react';
import { useState } from 'react';
import  basicChatbotExample from '@/public/examples/chatbot/basicChatbotExample';
import chatbotIntegrationExample from '@/public/examples/chatbot/chatbotIntegrationExample';
import chatbotUIExample from '@/public/examples/chatbot/chatbotUIExample';
import chatbotCreationExample from '@/public/examples/chatbot/chatbotCreationExample';


export default function ChatbotExamplePage() {
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
          <Bot className="w-6 h-6 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">Exemple : Chatbot Intelligent</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Implémentation complète d&apos;un système de chatbots IA avec création, gestion, intégration dans le chat 
          et interface utilisateur intuitive.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Chatbots IA</Badge>
            <Badge variant="outline">MISTRAL</Badge>
            <Badge variant="outline">GEMINI</Badge>
          <Badge variant="outline">GPT-4</Badge>
          <Badge variant="outline">Claude</Badge>
          <Badge variant="outline">Interface UI</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-purple-200 bg-purple-50">
        <Bot className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>Chatbots intelligents :</strong> Ces exemples montrent comment créer et intégrer des assistants IA 
          avec différents modèles de langage et personnalités personnalisées.
        </AlertDescription>
      </Alert>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Exemples d&apos;implémentation</h2>
        
        <Tabs defaultValue="service" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="service">Service de base</TabsTrigger>
            <TabsTrigger value="integration">Intégration Chat</TabsTrigger>
            <TabsTrigger value="ui">Interface Chatbot</TabsTrigger>
            <TabsTrigger value="creation">Création UI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="service" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Service de gestion des chatbots</CardTitle>
                    <CardDescription>Classe principale pour créer et gérer les chatbots IA</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(basicChatbotExample, 'service')}
                  >
                    {copiedCode === 'service' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{basicChatbotExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Fonctionnalités</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Création de chatbots personnalisés
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Gestion des modèles IA
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Prompts système prédéfinis
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Support multi-projets
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Modèles supportés</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                    <li>• MISTRAL- Le plus avancé</li>
                    <li>• GEMINI - Le plus avancé</li>
                      <li>• GPT-4 - Le plus avancé</li>
                      <li>• GPT-3.5 Turbo - Rapide et efficace</li>
                      <li>• Claude-3 - Excellent pour l&apos;analyse</li>
                      <li>• Llama-2 - Open source</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Intégration dans le système de chat</CardTitle>
                    <CardDescription>Extension du service de chat pour inclure les chatbots</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatbotIntegrationExample, 'integration')}
                  >
                    {copiedCode === 'integration' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatbotIntegrationExample}</code>
                  </pre>
                </div>
                
                <Alert>
                  <Zap className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Cette intégration permet aux chatbots de participer naturellement aux conversations 
                    avec un contexte de conversation et des réponses intelligentes.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ui" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Interface de chat avec chatbot</CardTitle>
                    <CardDescription>Composant React Native pour converser avec un chatbot</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatbotUIExample, 'ui')}
                  >
                    {copiedCode === 'ui' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatbotUIExample}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-semibold text-green-800">Message de bienvenue</div>
                    <div className="text-green-600">Accueil automatique</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="font-semibold text-blue-800">Indicateur de frappe</div>
                    <div className="text-blue-600">Feedback visuel</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                    <div className="font-semibold text-purple-800">Avatar du bot</div>
                    <div className="text-purple-600">Identification visuelle</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="creation" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Interface de création de chatbot</CardTitle>
                    <CardDescription>Formulaire complet pour créer et configurer un nouveau chatbot</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(chatbotCreationExample, 'creation')}
                  >
                    {copiedCode === 'creation' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{chatbotCreationExample}</code>
                  </pre>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Interface complète :</strong> Formulaire avec validation, sélection de modèles, 
                    prompts prédéfinis et compteur de caractères pour une expérience utilisateur optimale.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chatbot Types */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="w-5 h-5 text-purple-600 mr-2" />
            Types de chatbots prédéfinis
          </CardTitle>
          <CardDescription>
            Exemples de chatbots spécialisés avec leurs prompts système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🎧 Support Client</h4>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-sm text-gray-600 mb-3">
                  Assistant spécialisé dans l&apos;aide aux utilisateurs et la résolution de problèmes.
                </p>
                <ul className="space-y-1 text-xs text-gray-500">
                  <li>• Réponses empathiques et professionnelles</li>
                  <li>• Solutions concrètes aux problèmes</li>
                  <li>• Escalade vers un humain si nécessaire</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">💼 Assistant Vente</h4>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-sm text-gray-600 mb-3">
                  Chatbot commercial pour qualifier les prospects et présenter les produits.
                </p>
                <ul className="space-y-1 text-xs text-gray-500">
                  <li>• Qualification des besoins clients</li>
                  <li>• Présentation des avantages produits</li>
                  <li>• Guide vers la conversion</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">📚 Tuteur Éducatif</h4>
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-sm text-gray-600 mb-3">
                  Assistant pédagogique pour l&apos;apprentissage et la formation.
                </p>
                <ul className="space-y-1 text-xs text-gray-500">
                  <li>• Explications simples et claires</li>
                  <li>• Exemples concrets et exercices</li>
                  <li>• Adaptation au niveau de l&apos;apprenant</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Guide */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-blue-600 mr-2" />
            Guide d&apos;intégration
          </CardTitle>
          <CardDescription>
            Étapes pour intégrer les chatbots dans votre application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">1. Configuration backend</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Configurer l&apos;API des modèles IA (OpenAI, Claude, etc.)</li>
                  <li>• Implémenter l&apos;endpoint de traitement IA</li>
                  <li>• Gérer les quotas et limitations</li>
                  <li>• Sécuriser les clés API</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">2. Intégration frontend</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Implémenter le service de chatbots</li>
                  <li>• Créer les interfaces de création/gestion</li>
                  <li>• Intégrer dans le système de chat</li>
                  <li>• Ajouter les indicateurs visuels</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4">
              <h5 className="text-white font-semibold mb-2">Structure de fichiers recommandée :</h5>
              <pre className="text-sm text-gray-300">
                <code>{`src/
├── services/
│   ├── ChatbotService.ts
│   ├── ChatbotIntegratedService.ts
│   └── AIService.ts
├── components/
│   ├── ChatbotScreen.tsx
│   ├── CreateChatbotScreen.tsx
│   ├── ChatbotList.tsx
│   └── ChatbotSettings.tsx
├── types/
│   ├── chatbot.types.ts
│   └── ai.types.ts
└── utils/
    ├── promptUtils.ts
    └── aiUtils.ts`}</code>
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
            Recommandations pour créer des chatbots efficaces et sécurisés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🎯 Conception des prompts</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Soyez spécifique</strong> - Définissez clairement le rôle et les limites
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Incluez des exemples</strong> - Montrez le style de réponse attendu
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Définissez les limites</strong> - Précisez ce que le bot ne doit pas faire
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🔒 Sécurité et performance</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Limitez les tokens</strong> - Contrôlez la longueur des réponses
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Filtrez le contenu</strong> - Implémentez des filtres de sécurité
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Surveillez les coûts</strong> - Monitorer l&apos;utilisation des API IA
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