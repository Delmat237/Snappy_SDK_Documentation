'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Code, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Users,
  Shield,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function DocsHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Documentation Yow Talk SDK</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          SDK complet pour intégrer les fonctionnalités de chat temps réel, gestion des utilisateurs et des organisations dans vos applications React Native.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Version 1.0.0</Badge>
          <Badge variant="outline">React Native</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </div>
      </div>

      <Separator />

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Démarrage rapide</CardTitle>
            <CardDescription>
              Configurez et utilisez le SDK en moins de 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/docs/quick-start">
                Commencer maintenant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Référence API</CardTitle>
            <CardDescription>
              Documentation complète de toutes les méthodes disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/docs/api/auth">
                Explorer l&#39;API
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Exemples</CardTitle>
            <CardDescription>
              Exemples pratiques pour tous les cas d&#39;usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="w-full">
              <Link href="/docs/examples/auth">
                Voir les exemples
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* What's New */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Nouveau :</strong> Support complet du protocole Signal pour le chiffrement end-to-end et intégration des chatbots IA.
        </AlertDescription>
      </Alert>

      {/* Architecture Overview */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Architecture du SDK</h2>
        <p className="text-gray-600 text-lg">
          Le SDK Yow Talk est construit autour de plusieurs composants clés qui travaillent ensemble pour fournir une expérience de chat complète et sécurisée.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>SnappyHTTPClient</CardTitle>
                  <CardDescription>Client HTTP principal</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Gère toutes les requêtes HTTP vers l&#39;API, l&#39;authentification, et la gestion des tokens.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Authentification automatique
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Gestion des erreurs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Intercepteurs de requêtes
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>SnappySocketClient</CardTitle>
                  <CardDescription>Client WebSocket temps réel</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Permet la communication temps réel via WebSocket pour les messages instantanés.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Messages temps réel
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Événements de présence
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Reconnexion automatique
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Protocole Signal</CardTitle>
                  <CardDescription>Chiffrement end-to-end</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Implémentation du protocole Signal pour assurer la sécurité des communications.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Pre-Key Bundles
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Perfect Forward Secrecy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Chiffrement bout à bout
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>Système complet d&#39;utilisateurs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Gestion complète des utilisateurs, contacts, et organisations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Authentification JWT
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Gestion des contacts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Organisations multi-tenant
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Fonctionnalités principales</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
              Messagerie temps réel
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <strong>Messages instantanés</strong> - Envoi et réception en temps réel via WebSocket
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <strong>Support multimédia</strong> - Images, vidéos, fichiers avec upload sécurisé
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <strong>Statuts de livraison</strong> - Suivi des messages envoyés, livrés et lus
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              Sécurité avancée
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <strong>Protocole Signal</strong> - Chiffrement end-to-end avec Perfect Forward Secrecy
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <strong>Authentification JWT</strong> - Tokens sécurisés avec refresh automatique
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <strong>Validation stricte</strong> - Validation des données côté client et serveur
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prochaines étapes</h2>
        <p className="text-gray-600 mb-6">
          Choisissez votre parcours selon votre niveau d&#39;expérience avec le SDK.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button asChild className="justify-start h-auto p-4">
            <Link href="/docs/quick-start">
              <div className="text-left">
                <div className="font-semibold">Je débute</div>
                <div className="text-sm opacity-90">Guide de démarrage rapide avec exemples</div>
              </div>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="justify-start h-auto p-4">
            <Link href="/docs/api/auth">
              <div className="text-left">
                <div className="font-semibold">Je connais les bases</div>
                <div className="text-sm text-gray-600">Directement vers la référence API</div>
              </div>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Community */}
      <div className="border rounded-lg p-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Besoin d&#39;aide ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" asChild>
            <Link href="/docs/examples/auth">
              <Code className="w-4 h-4 mr-2" />
              Voir les exemples
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/support">
              <ExternalLink className="w-4 h-4 mr-2" />
              Support technique
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/changelog">
              <BookOpen className="w-4 h-4 mr-2" />
              Changelog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}