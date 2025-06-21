# Documentation SDK Snappy

## Table des matières

1. [Installation et Configuration](#installation-et-configuration)
2. [Guide de Démarrage Rapide](#guide-de-démarrage-rapide)
3. [Configuration de l'API](#configuration-de-lapi)
4. [Authentification](#authentification)
5. [Gestion des Utilisateurs](#gestion-des-utilisateurs)
6. [Gestion des Organisations](#gestion-des-organisations)
7. [Chat et Messagerie](#chat-et-messagerie)
8. [WebSocket et Temps Réel](#websocket-et-temps-réel)
9. [Chatbots et IA](#chatbots-et-ia)
10. [Sécurité et Chiffrement](#sécurité-et-chiffrement)
11. [Exemples d'Usage](#exemples-dusage)
12. [API Reference](#api-reference)

---

## Installation et Configuration

### Prérequis

- React Native 0.64+
- Node.js 14+
- TypeScript (recommandé)

### Installation

```bash
npm install @snappy/sdk
# ou
yarn add @snappy/sdk
```

### Dépendances requises

```bash
npm install axios socket.io-client @react-native-async-storage/async-storage sonner
```

---

## Guide de Démarrage Rapide

### 1. Configuration initiale

```typescript
import { SnappyHTTPClient, SnappySocketClient } from '@snappy/sdk';

const API_URL = "http://88.198.150.195:8613";
const PROJECT_ID = "81997082-7e88-464a-9af1-b790fdd454f8";

// Initialisation du client HTTP
const httpClient = new SnappyHTTPClient(API_URL, undefined, PROJECT_ID);

// Initialisation du client WebSocket
const socketClient = new SnappySocketClient(API_URL, PROJECT_ID, "user_id");
```

### 2. Authentification rapide

```typescript
// Authentification utilisateur
const loginUser = async (email: string, password: string) => {
  try {
    const result = await httpClient.authenticateUser({
      email,
      password,
      projectId: PROJECT_ID
    });
    console.log('Utilisateur connecté:', result.data);
    return result;
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};
```

### 3. Envoi d'un message simple

```typescript
const sendMessage = async (content: string, recipientId: string) => {
  try {
    const message = await httpClient.sendMessage({
      content,
      recipientId,
      type: 'text'
    });
    console.log('Message envoyé:', message);
  } catch (error) {
    console.error('Erreur envoi message:', error);
  }
};
```

---

## Configuration de l'API

### ApiConfig

La classe `ApiConfig` gère la configuration globale des requêtes HTTP avec Axios.

```typescript
import { ApiConfig } from '@snappy/sdk';

// Obtenir une instance configurée
const apiInstance = ApiConfig.getInstance(
  false,        // recreate
  API_URL,      // baseUrl
  true,         // withAuth
  bearerToken   // bearer token
);
```

### Gestion des erreurs automatique

Le SDK inclut une gestion automatique des erreurs avec notifications toast :

- **422** : Erreurs de validation
- **403** : Accès interdit
- **404** : Ressource non trouvée

---

## Authentification

### Authentification Utilisateur

```typescript
interface AuthenticateUserDto {
  email: string;
  password: string;
  projectId: string;
}

const authenticateUser = async (credentials: AuthenticateUserDto) => {
  const result = await httpClient.authenticateUser(credentials);
  // Le token est automatiquement sauvegardé
  return result;
};
```

### Authentification Organisation

```typescript
interface AuthenticateOrganizationDto {
  organizationKey: string;
  password: string;
}

const authenticateOrganization = async (credentials: AuthenticateOrganizationDto) => {
  const result = await httpClient.authenticateOrganization(credentials);
  return result;
};
```

### Gestion automatique des tokens

Le SDK gère automatiquement :
- Sauvegarde du token dans AsyncStorage
- Ajout automatique du header Authorization
- Rechargement du token au démarrage

---

## Gestion des Utilisateurs

### Création d'utilisateur

```typescript
interface CreateUserDto {
  displayName: string;
  email: string;
  password: string;
  projectId: string;
}

const createUser = async (userData: CreateUserDto) => {
  const user = await httpClient.createUser(userData);
  return user;
};
```

### Recherche d'utilisateurs

```typescript
// Recherche par nom d'affichage
const searchUsers = async (displayName: string) => {
  const users = await httpClient.filterUserByDisplayName({
    displayName,
    projectId: PROJECT_ID
  });
  return users;
};

// Obtenir les contacts d'un utilisateur
const getUserContacts = async (userId: string) => {
  const contacts = await httpClient.getUserContacts({
    userId,
    projectId: PROJECT_ID
  });
  return contacts;
};
```

### Ajout de contacts

```typescript
const addContact = async (contactId: string) => {
  const contacts = await httpClient.addContact({
    contactId,
    projectId: PROJECT_ID
  });
  return contacts;
};
```

---

## Gestion des Organisations

### Création d'organisation

```typescript
interface CreateOrganizationDto {
  name: string;
  email: string;
  password: string;
}

const createOrganization = async (orgData: CreateOrganizationDto) => {
  const organization = await httpClient.createOrganization(orgData);
  return organization;
};
```

### Gestion des organisations

```typescript
// Obtenir une organisation
const getOrganization = async (id: string) => {
  const org = await httpClient.getOrganization(id);
  return org;
};

// Obtenir tous les utilisateurs d'une organisation
const getOrganizationUsers = async (projectId: string) => {
  const users = await httpClient.findOrganizationUsers(projectId);
  return users;
};

// Supprimer une organisation
const deleteOrganization = async (id: string) => {
  await httpClient.deleteOrganization(id);
};
```

---

## Chat et Messagerie

### Envoi de messages

```typescript
interface SendMessageDto {
  content: string;
  recipientId: string;
  type: 'text' | 'image' | 'file';
  chatId?: string;
  file?: File; // Pour les fichiers
}

const sendMessage = async (messageData: SendMessageDto) => {
  const message = await httpClient.sendMessage(messageData);
  return message;
};
```

### Récupération des chats

```typescript
// Obtenir tous les chats d'un utilisateur
const getUserChats = async (userId: string) => {
  const chats = await httpClient.getUserChats(userId, PROJECT_ID);
  return chats;
};

// Obtenir les détails d'un chat
const getChatDetails = async (chatId: string) => {
  const details = await httpClient.getChatDetails({
    chatId,
    projectId: PROJECT_ID
  });
  return details;
};
```

### Changement de mode de messagerie

```typescript
const changeMessagingMode = async (chatId: string, mode: 'normal' | 'encrypted') => {
  const chat = await httpClient.changeMessagingMode({
    chatId,
    mode,
    projectId: PROJECT_ID
  });
  return chat;
};
```

---

## WebSocket et Temps Réel

### Configuration du client WebSocket

```typescript
import { SnappySocketClient, ISnappySocketClient } from '@snappy/sdk';

class ChatSocketHandler implements ISnappySocketClient {
  onConnect() {
    console.log('Connecté au serveur WebSocket');
  }

  onDisconnect() {
    console.log('Déconnecté du serveur WebSocket');
  }

  newConnectionListener(user: string) {
    console.log(`Nouvel utilisateur connecté: ${user}`);
  }

  newDisconnectionListener(user: string) {
    console.log(`Utilisateur déconnecté: ${user}`);
  }

  onMessageReceivedListener(message: Message) {
    console.log('Nouveau message reçu:', message);
    // Traiter le message reçu
  }
}

// Utilisation
const socketHandler = new ChatSocketHandler();
const socketClient = new SnappySocketClient(API_URL, PROJECT_ID, userId);
socketClient.initialize(socketHandler);
```

### Gestion des événements temps réel

```typescript
// Le client WebSocket écoute automatiquement ces événements :
// - connect/disconnect
// - new-connection/new-disconnection
// - message-send

// Pour personnaliser le comportement, implémentez ISnappySocketClient
```

---

## Chatbots et IA

### Création de chatbot

```typescript
interface CreateChatbotDto {
  name: string;
  description: string;
  model: string;
  instructions: string;
  file?: File; // Fichier de formation optionnel
}

const createChatbot = async (chatbotData: CreateChatbotDto) => {
  const chatbot = await httpClient.createChatbot(chatbotData);
  return chatbot;
};
```

### Gestion des chatbots

```typescript
// Obtenir tous les chatbots
const getAllChatbots = async () => {
  const chatbots = await httpClient.getAllChatbots();
  return chatbots;
};

// Obtenir les chatbots d'un projet
const getProjectChatbots = async (projectId: string) => {
  const chatbots = await httpClient.getChatbotsForProject(projectId);
  return chatbots;
};

// Obtenir les modèles disponibles
const getAvailableModels = async () => {
  const models = await httpClient.getAvailableModels();
  return models;
};
```

---

## Sécurité et Chiffrement

### Protocole Signal

Le SDK utilise le protocole Signal pour le chiffrement end-to-end.

```typescript
// Obtenir le bundle de clés pré-partagées
const getPreKeyBundle = async (userId: string) => {
  const bundle = await httpClient.getPreKeyBundle(userId);
  return bundle;
};

// Sauvegarder le bundle de clés
const savePreKeyBundle = async (userId: string, bundle: PreKeyBundle) => {
  await httpClient.savePreKeyBundle(userId, bundle);
};
```

### Bonnes pratiques de sécurité

1. **Stockage sécurisé** : Les tokens sont automatiquement stockés dans AsyncStorage
2. **Chiffrement automatique** : Messages chiffrés selon le mode du chat
3. **Validation côté serveur** : Toutes les requêtes sont validées
4. **Gestion des erreurs** : Erreurs d'authentification gérées automatiquement

---

## Exemples d'Usage

### Exemple 1 : Application de chat complète

```typescript
import React, { useState, useEffect } from 'react';
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient";
import { SnappySocketClient } from "@/lib/SnappySocketClient";

const ChatApp = () => {
  const [httpClient] = useState(new SnappyHTTPClient(API_URL));
  const [socketClient, setSocketClient] = useState<SnappySocketClient>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    // Initialisation après authentification
    if (currentUser) {
      const socket = new SnappySocketClient(API_URL, PROJECT_ID, currentUser.id);
      
      socket.onMessageReceivedListener = (message: Message) => {
        setMessages(prev => [...prev, message]);
      };
      
      socket.initialize();
      setSocketClient(socket);
    }
  }, [currentUser]);

  const login = async (email: string, password: string) => {
    try {
      const result = await httpClient.authenticateUser({
        email,
        password,
        projectId: PROJECT_ID
      });
      setCurrentUser(result.data);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const sendMessage = async (content: string, recipientId: string) => {
    try {
      await httpClient.sendMessage({
        content,
        recipientId,
        type: 'text'
      });
    } catch (error) {
      console.error('Erreur envoi message:', error);
    }
  };

  return (
    // Interface utilisateur du chat
  );
};
```

### Exemple 2 : Intégration chatbot

```typescript
const ChatbotIntegration = () => {
  const [httpClient] = useState(new SnappyHTTPClient(API_URL));
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);

  useEffect(() => {
    loadChatbots();
  }, []);

  const loadChatbots = async () => {
    try {
      const bots = await httpClient.getAllChatbots();
      setChatbots(bots);
    } catch (error) {
      console.error('Erreur chargement chatbots:', error);
    }
  };

  const createNewChatbot = async (name: string, model: string) => {
    try {
      const newBot = await httpClient.createChatbot({
        name,
        description: `Chatbot ${name}`,
        model,
        instructions: 'Tu es un assistant utile.'
      });
      setChatbots(prev => [...prev, newBot]);
    } catch (error) {
      console.error('Erreur création chatbot:', error);
    }
  };

  return (
    // Interface de gestion des chatbots
  );
};
```

---

## API Reference

### Types TypeScript

```typescript
// Utilisateur
interface User {
  id: string;
  displayName: string;
  email: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

// Message
interface Message {
  id: string;
  content: string;
  senderId: string;
  recipientId: string;
  chatId: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
  encrypted?: boolean;
}

// Chat
interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  mode: 'normal' | 'encrypted';
  createdAt: string;
  updatedAt: string;
}

// Chatbot
interface Chatbot {
  id: string;
  name: string;
  description: string;
  model: string;
  instructions: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

// Organisation
interface Organization {
  id: string;
  name: string;
  email: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
```

### Méthodes principales

#### SnappyHTTPClient

| Méthode | Description | Paramètres | Retour |
|---------|-------------|------------|--------|
| `authenticateUser` | Authentifie un utilisateur | `AuthenticateUserDto` | `AuthenticationResourceUser` |
| `authenticateOrganization` | Authentifie une organisation | `AuthenticateOrganizationDto` | `AuthenticationResourceOrganization` |
| `createUser` | Crée un nouvel utilisateur | `CreateUserDto` | `User` |
| `sendMessage` | Envoie un message | `SendMessageDto` | `Message` |
| `getUserChats` | Récupère les chats d'un utilisateur | `userId, projectId` | `ChatResource[]` |
| `createChatbot` | Crée un nouveau chatbot | `CreateChatbotDto` | `Chatbot` |
| `getAllChatbots` | Récupère tous les chatbots | - | `Chatbot[]` |

#### SnappySocketClient

| Méthode | Description | Paramètres |
|---------|-------------|------------|
| `initialize` | Initialise la connexion WebSocket | `client?, force?` |
| `onConnect` | Callback de connexion | - |
| `onDisconnect` | Callback de déconnexion | - |
| `onMessageReceivedListener` | Callback de réception de message | `message: Message` |

---

## Configuration Avancée

### Variables d'environnement

```typescript
// constants.ts
export const API_URL = process.env.REACT_APP_API_URL || "http://88.198.150.195:8613";
export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID || "81997082-7e88-464a-9af1-b790fdd454f8";
```

### Gestion des erreurs personnalisée

```typescript
import { ApiConfig } from '@snappy/sdk';

// Personnaliser la gestion des erreurs
const customApi = ApiConfig.getInstance();
customApi.interceptors.response.use(
  response => response,
  error => {
    // Gestion personnalisée des erreurs
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion
    }
    return Promise.reject(error);
  }
);
```

---

## Support et Contribution

### Support

- Documentation : [https://snappy-sdk-documentation-zdwn.vercel.app/](https://snappy-sdk-documentation-zdwn.vercel.app/)
- Issues : Signalez les problèmes sur le repository GitHub
- Email : support@snappy-sdk.com

### Contribution

1. Fork le repository
2. Créez une branche pour votre feature
3. Ajoutez des tests pour vos modifications
4. Soumettez une pull request

### Licence

SDK Snappy est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

*Documentation mise à jour le 20 juin 2025*