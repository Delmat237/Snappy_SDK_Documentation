'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  Code, 
  Rocket, 
  Users, 
  CheckCircle,
  ArrowRight,
  Github,
  BookOpen,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Yow Talk SDK</h1>
                <p className="text-sm text-gray-500">Documentation officielle</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden md:inline-flex">
                v1.0.0
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-8">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            SDK Yow Talk
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              React Native
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            SDK complet pour intégrer les fonctionnalités de chat temps réel, gestion des utilisateurs et des organisations dans vos applications React Native.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/docs/getting-started">
                <Rocket className="w-5 h-5 mr-2" />
                Commencer
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/docs/api-reference">
                <Code className="w-5 h-5 mr-2" />
                Référence API
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Méthodes API</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">Real-time</div>
              <div className="text-gray-600">WebSocket</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">TypeScript</div>
              <div className="text-gray-600">Support complet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour créer une application de chat moderne et sécurisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Messagerie temps réel</CardTitle>
                <CardDescription>
                  Envoi et réception de messages en temps réel avec WebSocket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Messages texte et multimédia
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Statuts de livraison
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Chats de groupe
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Système complet de gestion des utilisateurs et contacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Authentification sécurisée
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion des contacts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Profils utilisateur
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Sécurité avancée</CardTitle>
                <CardDescription>
                  Chiffrement end-to-end avec protocole Signal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Protocole Signal
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Pre-Key Bundles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Chiffrement bout à bout
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Chatbots IA</CardTitle>
                <CardDescription>
                  Intégration de chatbots intelligents avec IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Modèles IA personnalisés
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Configuration flexible
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Réponses automatiques
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>TypeScript</CardTitle>
                <CardDescription>
                  Support complet TypeScript avec types stricts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Types complets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Autocomplétion IDE
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Validation à la compilation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Architecture moderne</CardTitle>
                <CardDescription>
                  Architecture modulaire et extensible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Clients HTTP/WebSocket
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Services modulaires
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Gestion d&apos;erreurs avancée
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Suivez notre guide de démarrage rapide pour intégrer le SDK dans votre application React Native en quelques minutes.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 text-left max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Installation rapide</h3>
              <Badge>npm</Badge>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 mb-6">
              <div className="mb-2"># Installation du SDK</div>
              <div className="text-white">npm install yow-talk-sdk</div>
              <div className="mt-4 mb-2 text-green-400"># Configuration</div>
              <div className="text-white">import &#123; SnappyHTTPClient, SnappySocketClient &#125; from &apos;yow-talk-sdk&apos;</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" asChild>
                <Link href="/docs/getting-started">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Guide complet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/docs/examples">
                  <Code className="w-4 h-4 mr-2" />
                  Voir les exemples
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Yow Talk SDK</span>
              </div>
              <p className="text-gray-600 max-w-md">
                SDK complet pour les applications de chat temps réel avec React Native. 
                Sécurisé, moderne et facile à intégrer.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Documentation</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/docs/getting-started" className="hover:text-blue-600 transition-colors">Guide de démarrage</Link></li>
                <li><Link href="/docs/api-reference" className="hover:text-blue-600 transition-colors">Référence API</Link></li>
                <li><Link href="/docs/examples" className="hover:text-blue-600 transition-colors">Exemples</Link></li>
                <li><Link href="/docs/types" className="hover:text-blue-600 transition-colors">Types TypeScript</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Ressources</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/changelog" className="hover:text-blue-600 transition-colors">Changelog</Link></li>
                <li><Link href="/migration" className="hover:text-blue-600 transition-colors">Guide de migration</Link></li>
                <li><Link href="/support" className="hover:text-blue-600 transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between text-gray-600">
            <p>&copy; 2025 Yow Talk SDK. Tous droits réservés.</p>
            <p className="text-sm">Version 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}