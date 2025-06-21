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
  Key,
  Lock,
  Download,
  Upload,
  Code,
  AlertCircle,
  Zap
} from 'lucide-react';
import { useState } from 'react';

export default function SignalApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getPreKeyBundleCode = `// Récupérer le Pre-Key Bundle d'un utilisateur
const preKeyBundle = await httpClient.getPreKeyBundle('user-123');

console.log('Pre-Key Bundle:', preKeyBundle);
console.log('Identity Key:', preKeyBundle.identityKey);
console.log('Signed Pre Key:', preKeyBundle.signedPreKey);
console.log('One Time Pre Keys:', preKeyBundle.oneTimePreKeys);`;

  const savePreKeyBundleCode = `// Sauvegarder un Pre-Key Bundle
const preKeyBundle = {
  identityKey: 'base64-encoded-identity-key',
  signedPreKey: {
    keyId: 1,
    publicKey: 'base64-encoded-public-key',
    signature: 'base64-encoded-signature'
  },
  oneTimePreKeys: [
    {
      keyId: 1,
      publicKey: 'base64-encoded-one-time-key-1'
    },
    {
      keyId: 2,
      publicKey: 'base64-encoded-one-time-key-2'
    }
  ]
};

const savedBundle = await httpClient.savePreKeyBundle('user-123', preKeyBundle);

console.log('Pre-Key Bundle sauvegardé:', savedBundle);`;

  const signalFlowCode = `// Flux complet d'établissement de session Signal
class SignalManager {
  async establishSession(recipientId: string) {
    try {
      // 1. Récupérer le Pre-Key Bundle du destinataire
      const preKeyBundle = await httpClient.getPreKeyBundle(recipientId);
      
      // 2. Créer une session Signal avec le bundle
      const session = await this.createSignalSession(preKeyBundle);
      
      // 3. Chiffrer le message
      const encryptedMessage = await session.encrypt('Hello, secure world!');
      
      // 4. Envoyer le message chiffré
      const message = await httpClient.sendMessage({
        content: encryptedMessage,
        recipientId: recipientId,
        type: 'text'
      });
      
      return message;
    } catch (error) {
      console.error('Erreur établissement session Signal:', error);
      throw error;
    }
  }
  
  private async createSignalSession(preKeyBundle: PreKeyBundle) {
    // Implémentation de la création de session Signal
    // Utilise la bibliothèque Signal Protocol
    return signalProtocol.createSession(preKeyBundle);
  }
}`;

  const keyGenerationCode = `// Génération des clés Signal (exemple conceptuel)
class SignalKeyManager {
  async generatePreKeyBundle(userId: string): Promise<PreKeyBundle> {
    // 1. Générer la clé d'identité (long terme)
    const identityKeyPair = await this.generateIdentityKey();
    
    // 2. Générer la clé pré-signée
    const signedPreKey = await this.generateSignedPreKey(identityKeyPair.private);
    
    // 3. Générer les clés à usage unique
    const oneTimePreKeys = await this.generateOneTimePreKeys(100);
    
    const preKeyBundle: PreKeyBundle = {
      identityKey: identityKeyPair.public,
      signedPreKey: {
        keyId: 1,
        publicKey: signedPreKey.public,
        signature: signedPreKey.signature
      },
      oneTimePreKeys: oneTimePreKeys.map((key, index) => ({
        keyId: index + 1,
        publicKey: key.public
      }))
    };
    
    // 4. Sauvegarder sur le serveur
    await httpClient.savePreKeyBundle(userId, preKeyBundle);
    
    return preKeyBundle;
  }
  
  private async generateIdentityKey() {
    // Génération de la paire de clés d'identité
    return await crypto.generateKeyPair('ECDH', { namedCurve: 'P-256' });
  }
  
  private async generateSignedPreKey(identityPrivateKey: CryptoKey) {
    // Génération et signature de la clé pré-signée
    const keyPair = await crypto.generateKeyPair('ECDH', { namedCurve: 'P-256' });
    const signature = await crypto.sign('ECDSA', identityPrivateKey, keyPair.public);
    
    return {
      public: keyPair.public,
      private: keyPair.private,
      signature: signature
    };
  }
  
  private async generateOneTimePreKeys(count: number) {
    // Génération des clés à usage unique
    const keys = [];
    for (let i = 0; i < count; i++) {
      const keyPair = await crypto.generateKeyPair('ECDH', { namedCurve: 'P-256' });
      keys.push(keyPair);
    }
    return keys;
  }
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">Protocole Signal</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl">
          Implémentation du protocole Signal pour le chiffrement end-to-end avec Perfect Forward Secrecy. 
          Gestion des Pre-Key Bundles et établissement de sessions sécurisées.
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Signal Protocol</Badge>
          <Badge variant="outline">End-to-End</Badge>
          <Badge variant="outline">Perfect Forward Secrecy</Badge>
          <Badge variant="outline">Pre-Key Bundles</Badge>
        </div>
      </div>

      {/* Overview */}
      <Alert className="border-red-200 bg-red-50">
        <Shield className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Protocole Signal :</strong> Assure un chiffrement end-to-end avec Perfect Forward Secrecy. 
          Chaque message est chiffré avec une clé unique qui ne peut pas être récupérée rétroactivement.
        </AlertDescription>
      </Alert>

      {/* Signal Concepts */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-5 h-5 text-red-600 mr-2" />
            Concepts clés du protocole Signal
          </CardTitle>
          <CardDescription>
            Comprendre les éléments fondamentaux du chiffrement Signal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🔑 Types de clés</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Key className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Identity Key</strong> - Clé d&apos;identité long terme de l&apos;utilisateur
                  </div>
                </li>
                <li className="flex items-start">
                  <Key className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Signed Pre Key</strong> - Clé pré-signée renouvelée périodiquement
                  </div>
                </li>
                <li className="flex items-start">
                  <Key className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                  <div>
                    <strong>One Time Pre Keys</strong> - Clés à usage unique pour chaque session
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🛡️ Propriétés de sécurité</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Perfect Forward Secrecy</strong> - Les clés passées ne peuvent pas être récupérées
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Future Secrecy</strong> - Compromission d&apos;une clé n&apos;affecte pas les futures
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Deniability</strong> - Impossibilité de prouver l&apos;authorship d&apos;un message
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main API Methods */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Méthodes disponibles</h2>
        
        <Tabs defaultValue="get" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="get">Récupérer Bundle</TabsTrigger>
            <TabsTrigger value="save">Sauvegarder Bundle</TabsTrigger>
            <TabsTrigger value="flow">Flux Complet</TabsTrigger>
            <TabsTrigger value="generation">Génération Clés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="get" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>getPreKeyBundle</CardTitle>
                      <CardDescription>Récupère le Pre-Key Bundle d&apos;un utilisateur pour établir une session</CardDescription>
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
                    onClick={() => copyToClipboard(getPreKeyBundleCode, 'get')}
                  >
                    {copiedCode === 'get' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{getPreKeyBundleCode}</code>
                  </pre>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Paramètres</h4>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <span className="font-mono">userId</span> - Identifiant de l&apos;utilisateur cible
                  </div>
                </div>
                
                <Alert>
                  <Download className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    Récupère le bundle nécessaire pour établir une session Signal sécurisée avec l&apos;utilisateur cible.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="save" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>savePreKeyBundle</CardTitle>
                      <CardDescription>Sauvegarde un Pre-Key Bundle sur le serveur</CardDescription>
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
                    onClick={() => copyToClipboard(savePreKeyBundleCode, 'save')}
                  >
                    {copiedCode === 'save' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{savePreKeyBundleCode}</code>
                  </pre>
                </div>
                
                <Alert className="border-green-200 bg-green-50">
                  <Upload className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Important :</strong> Sauvegardez toujours un nouveau bundle après génération des clés 
                    pour permettre aux autres utilisateurs d&apos;établir des sessions sécurisées.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="flow" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Flux d&apos;établissement de session</CardTitle>
                    <CardDescription>Exemple complet d&apos;utilisation du protocole Signal</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(signalFlowCode, 'flow')}
                  >
                    {copiedCode === 'flow' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{signalFlowCode}</code>
                  </pre>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Étapes du processus :</h4>
                  <ol className="space-y-2 text-blue-800 text-sm">
                    <li>1. Récupération du Pre-Key Bundle du destinataire</li>
                    <li>2. Création d&apos;une session Signal avec le bundle</li>
                    <li>3. Chiffrement du message avec la session</li>
                    <li>4. Envoi du message chiffré via l&apos;API</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="generation" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Génération des clés</CardTitle>
                    <CardDescription>Exemple de génération d&apos;un Pre-Key Bundle complet</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(keyGenerationCode, 'generation')}
                  >
                    {copiedCode === 'generation' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{keyGenerationCode}</code>
                  </pre>
                </div>
                
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Note :</strong> Cet exemple est conceptuel. En production, utilisez une bibliothèque 
                    Signal Protocol éprouvée comme libsignal-protocol-javascript.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* PreKeyBundle Model */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 text-red-600 mr-2" />
            Modèle PreKeyBundle
          </CardTitle>
          <CardDescription>
            Structure de l&apos;objet PreKeyBundle utilisé par le protocole Signal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`interface PreKeyBundle {
  identityKey: string;           // Clé d'identité publique (base64)
  signedPreKey: {
    keyId: number;               // ID de la clé pré-signée
    publicKey: string;           // Clé publique (base64)
    signature: string;           // Signature de la clé (base64)
  };
  oneTimePreKeys: Array<{
    keyId: number;               // ID de la clé à usage unique
    publicKey: string;           // Clé publique (base64)
  }>;
}

interface SignedPreKey {
  keyId: number;
  publicKey: string;
  signature: string;
  timestamp?: Date;
}

interface OneTimePreKey {
  keyId: number;
  publicKey: string;
  used?: boolean;
  createdAt?: Date;
}`}</code>
            </pre>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Clés principales</h4>
              <ul className="space-y-1 text-gray-600">
                <li><code>identityKey</code> - Identité cryptographique permanente</li>
                <li><code>signedPreKey</code> - Clé pré-signée avec l&apos;identity key</li>
                <li><code>oneTimePreKeys</code> - Clés éphémères à usage unique</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Propriétés de sécurité</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Toutes les clés sont en courbe elliptique (P-256)</li>
                <li>• Signature ECDSA pour l&apos;authentification</li>
                <li>• Encodage base64 pour le transport</li>
                <li>• Rotation périodique des clés pré-signées</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Best Practices */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 text-red-600 mr-2" />
            Bonnes pratiques de sécurité
          </CardTitle>
          <CardDescription>
            Recommandations pour une implémentation sécurisée du protocole Signal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">🔐 Gestion des clés</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Stockage sécurisé</strong> - Utilisez le Keychain/Keystore pour les clés privées
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Rotation régulière</strong> - Renouvelez les clés pré-signées périodiquement
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Génération aléatoire</strong> - Utilisez un générateur cryptographiquement sûr
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">⚠️ Précautions</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Validation des bundles</strong> - Vérifiez toujours les signatures
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Gestion des erreurs</strong> - Ne jamais exposer les clés privées
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <strong>Audit régulier</strong> - Surveillez l&apos;utilisation des clés
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