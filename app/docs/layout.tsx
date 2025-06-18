'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Search, 
  MessageSquare, 
  BookOpen, 
  Code, 
  Zap, 
  Users, 
  Shield,
  Smartphone,
  Settings,
  FileText,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: 'Guide de démarrage',
    items: [
      { title: 'Introduction', href: '/docs', icon: BookOpen },
      { title: 'Installation', href: '/docs/installation', icon: Code },
      { title: 'Configuration', href: '/docs/configuration', icon: Settings },
      { title: 'Premier exemple', href: '/docs/quick-start', icon: Zap },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { title: 'Vue d\'ensemble', href: '/docs/architecture', icon: FileText },
      { title: 'HTTP Client', href: '/docs/http-client', icon: Smartphone },
      { title: 'Socket Client', href: '/docs/socket-client', icon: MessageSquare },
      { title: 'Base Service', href: '/docs/base-service', icon: Code },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Authentication', href: '/docs/api/auth', icon: Shield },
      { title: 'Users', href: '/docs/api/users', icon: Users },
      { title: 'Organizations', href: '/docs/api/organizations', icon: FileText },
      { title: 'Chat', href: '/docs/api/chat', icon: MessageSquare },
      { title: 'Chatbots', href: '/docs/api/chatbots', icon: Zap },
      { title: 'Signal Protocol', href: '/docs/api/signal', icon: Shield },
    ],
  },
  {
    title: 'Types & DTOs',
    items: [
      { title: 'Core Types', href: '/docs/types/core', icon: Code },
      { title: 'Auth DTOs', href: '/docs/types/auth', icon: Shield },
      { title: 'User DTOs', href: '/docs/types/users', icon: Users },
      { title: 'Chat DTOs', href: '/docs/types/chat', icon: MessageSquare },
    ],
  },
  {
    title: 'Exemples',
    items: [
      { title: 'Authentification', href: '/docs/examples/auth', icon: Shield },
      { title: 'Chat simple', href: '/docs/examples/chat', icon: MessageSquare },
      { title: 'WebSocket', href: '/docs/examples/websocket', icon: Zap },
      { title: 'Chatbot', href: '/docs/examples/chatbot', icon: Smartphone },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const filteredNavigation = navigation.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const Sidebar = () => (
    <div className="w-64 border-r bg-gray-50/50 h-full">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900">Yow Talk SDK</div>
            <div className="text-xs text-gray-500">Documentation</div>
          </div>
        </Link>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-6">
          {filteredNavigation.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm text-gray-900 mb-3 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                        isActive 
                          ? "bg-blue-50 text-blue-700 font-medium border border-blue-200" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4",
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                      )} />
                      <span>{item.title}</span>
                      {isActive && (
                        <ArrowRight className="w-3 h-3 text-blue-600 ml-auto" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">Yow Talk SDK</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">v1.0.0</Badge>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <main className="max-w-4xl mx-auto p-6 lg:p-8">
            {children}
          </main>
        </div>

        {/* Table of Contents - Desktop only */}
        <div className="hidden xl:block w-64 border-l bg-gray-50/30">
          <div className="sticky top-8 p-6">
            <h4 className="font-semibold text-sm text-gray-900 mb-4 uppercase tracking-wider">
              Sur cette page
            </h4>
            <div className="space-y-2 text-sm">
              <Link href="#overview" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Vue d'ensemble
              </Link>
              <Link href="#installation" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Installation
              </Link>
              <Link href="#examples" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Exemples
              </Link>
              <Link href="#api" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Référence API
              </Link>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2">Besoin d'aide ?</h5>
              <p className="text-sm text-blue-700 mb-3">
                Consultez nos exemples ou contactez le support.
              </p>
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link href="/support">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}