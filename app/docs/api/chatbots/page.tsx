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
  Bot,
  List,
  Building,
  Settings,
  Code,
  AlertCircle,
  Brain
} from 'lucide-react';
import { useState } from 'react';

export default function ChatbotsApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const createChatbotCode = `// Créer un nouveau chatbot
const formData = new FormData();
formData.append('name', 'Assistant IA');
formData.append('description', 'Chatbot pour le support client');
formData.append('model', 'MISTRAL');
formData.append('systemPrompt', 'Tu es un assistant IA serviable...');
formData.append('projectId', 'project-123');
formData.append('avatar', avatarFile); // Optionnel

const newChatbot = await httpClient.createChatbot(formData);

console.log('Chatbot créé:', newChatbot);`;

  const getAllChatbotsCode = `// Récupérer tous les chatbots
const chatbots = await httpClient.getAllChatbots();

console.log('Chatbots disponibles:', chatbots);`;

  const getProjectChatbotsCode = `// Récupérer les chatbots d'un projet
const projectChatbots = await httpClient.getChatbotsForProject('project-123');

console.log('Chatbots du projet:', projectChatbots);`;

  const getAvailableModelsCode = `// Récupérer les modèles IA disponibles
const models = await httpClient.getAvailableModels();

console.log('Modèles disponibles:', models);
// Exemple: ['MISTRAL', 'GEMINI']`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-yellow-600" />
          <h1 className="text-4xl font-bold text-gray-900">API Chatbots</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Créez et gérez des chatbots IA intelligents avec différents modèles de langage. 
          Intégration transparente avec votre système de chat existant.
        </p>
        <div className="flex items-center space-x-4">
      
            <Badge variant="outline">MISTRAL</Badge>
            <Badge variant="outline">GEMINI</Badge>
     
          <Badge variant="outline">Interface UI</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <Zap className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>API Chatbots :</strong> Permet de créer des assistants IA personnalisés avec différents modèles 
          de langage et de les intégrer dans vos conversations.
        </AlertDescription>
      </Alert>

      {/* Main API Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Méthodes disponibles</h2>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Créer</TabsTrigger>
            <TabsTrigger value="list">Lister</TabsTrigger>
            <TabsTrigger value="project">Par Projet</TabsTrigger>
            <TabsTrigger value="models">Modèles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>createChatbot</CardTitle>
                      <CardDescription>Crée un nouveau chatbot IA avec modèle personnalisé</CardDescription>
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
                    onClick={() => copyToClipboard(createChatbotCode, 'create')}
                  >
                    {copiedCode === 'create' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{createChatbotCode}</code>
                  </pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Paramètres (CreateChatbotDto)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">name</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">model</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">systemPrompt</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">projectId</span>
                        <Badge variant="destructive" className="text-xs">required</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">description</span>
                        <Badge variant="outline" className="text-xs">optional</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-mono">avatar</span>
                        <Badge variant="outline" className="text-xs">optional</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Modèles populaires</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                        <Brain className="w-4 h-4 text-blue-600" />
                        <span>gpt-4 - Le plus avancé</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                        <Brain className="w-4 h-4 text-green-600" />
                        <span>gpt-3.5-turbo - Rapide et efficace</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded">
                        <Brain className="w-4 h-4 text-purple-600" />
                        <span>claude-3 - Excellent pour l&apos;analyse</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
                        <Brain className="w-4 h-4 text-orange-600" />
                        <span>llama-2 - Open source</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Alert className="border-green-200 bg-green-50">
                  <Bot className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>System Prompt :</strong> Définit la personnalité et le comportement du chatbot. 
                    Soyez précis dans vos instructions pour obtenir les meilleurs résultats.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <List className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>getAllChatbots</CardTitle>
                      <CardDescription>Récupère tous les chatbots disponibles</CardDescription>
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
                    onClick={() => copyToClipboard(getAllChatbotsCode, 'list')}
                  >
                    {copiedCode === 'list' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getAllChatbotsCode}</code>
                  </pre>
                </div>
                
                <Alert>
                  <List className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Retourne un tableau de tous les chatbots avec leurs informations de base et statuts.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="project" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>getChatbotsForProject</CardTitle>
                      <CardDescription>Récupère les chatbots d&apos;un projet spécifique</CardDescription>
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
                    onClick={() => copyToClipboard(getProjectChatbotsCode, 'project')}
                  >
                    {copiedCode === 'project' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getProjectChatbotsCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres</h4>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <span className="font-mono">projectId</span> - Identifiant du projet
                  </div>
                </div>
                
                <Alert className="border-purple-200 bg-purple-50">
                  <Building className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    Filtre les chatbots par projet pour une gestion multi-tenant efficace.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="models" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle>getAvailableModels</CardTitle>
                      <CardDescription>Récupère la liste des modèles IA disponibles</CardDescription>
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
                    onClick={() => copyToClipboard(getAvailableModelsCode, 'models')}
                  >
                    {copiedCode === 'models' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getAvailableModelsCode}</code>
                  </pre>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <Settings className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Utilisez cette méthode pour construire dynamiquement votre interface de sélection de modèles.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chatbot Model */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-yellow-600 mr-2" />
            Modèle Chatbot
          </CardTitle>
          <CardDescription>
            Structure de l&apos;objet Chatbot retourné par l&apos;API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`interface Chatbot {
  id: string;
  name: string;
  description?: string;
  model: string;
  systemPrompt: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  avatar?: string;
  responseTime?: number;
  totalMessages?: number;
  lastUsedAt?: Date;
}`}</code>
            </pre>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Configuration</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>name</code> - Nom du chatbot</li>
                <li><code>model</code> - Modèle IA utilisé</li>
                <li><code>systemPrompt</code> - Instructions système</li>
                <li><code>projectId</code> - Projet associé</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Statistiques</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>responseTime</code> - Temps de réponse moyen</li>
                <li><code>totalMessages</code> - Messages traités</li>
                <li><code>lastUsedAt</code> - Dernière utilisation</li>
                <li><code>isActive</code> - Statut actif/inactif</li>
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
            Conseils pour créer des chatbots efficaces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">✅ System Prompts efficaces</h4>
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
                    <strong>Donnez des exemples</strong> - Incluez des exemples de réponses attendues
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Définissez le ton</strong> - Précisez le style de communication souhaité
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">⚡ Optimisation</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Choisissez le bon modèle</strong> - GPT-4 pour la complexité, GPT-3.5 pour la vitesse
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Testez régulièrement</strong> - Vérifiez les réponses et ajustez le prompt
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Surveillez les coûts</strong> - Les modèles avancés consomment plus de tokens
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-900 rounded-lg p-4">
            <h5 className="text-white font-semibold mb-2">Exemple de System Prompt efficace :</h5>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`Tu es un assistant IA spécialisé dans le support client pour une application de chat.

Règles importantes :
- Réponds toujours en français
- Sois poli et professionnel
- Si tu ne connais pas la réponse, dis-le clairement
- Propose des solutions concrètes quand possible
- Limite tes réponses à 200 mots maximum

Ton rôle est d'aider les utilisateurs avec :
- Les problèmes de connexion
- L'utilisation des fonctionnalités de chat
- Les questions sur la sécurité et le chiffrement`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}