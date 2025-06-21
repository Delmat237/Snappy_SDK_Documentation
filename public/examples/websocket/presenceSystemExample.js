  const presenceSystemExample = `// Système de présence en temps réel
class PresenceManager {
  private wsManager: AdvancedWebSocketManager;
  private presenceMap = new Map<string, UserPresence>();
  private presenceListeners: Array<(presences: Map<string, UserPresence>) => void> = [];

  constructor(wsManager: AdvancedWebSocketManager) {
    this.wsManager = wsManager;
    this.setupPresenceListeners();
  }

  private setupPresenceListeners() {
    this.wsManager.addPresenceListener((userId: string, online: boolean) => {
      this.updateUserPresence(userId, {
        userId,
        isOnline: online,
        lastSeen: online ? new Date() : this.presenceMap.get(userId)?.lastSeen || new Date(),
        status: online ? 'online' : 'offline'
      });
    });

    this.wsManager.addConnectionListener((connected: boolean) => {
      if (!connected) {
        // Marquer tous les utilisateurs comme potentiellement hors ligne
        this.presenceMap.forEach((presence, userId) => {
          if (presence.isOnline) {
            this.updateUserPresence(userId, {
              ...presence,
              status: 'unknown'
            });
          }
        });
      }
    });
  }

  private updateUserPresence(userId: string, presence: UserPresence) {
    this.presenceMap.set(userId, presence);
    this.notifyPresenceListeners();
  }

  private notifyPresenceListeners() {
    this.presenceListeners.forEach(listener => {
      listener(new Map(this.presenceMap));
    });
  }

  // Méthodes publiques
  getUserPresence(userId: string): UserPresence | undefined {
    return this.presenceMap.get(userId);
  }

  getAllPresences(): Map<string, UserPresence> {
    return new Map(this.presenceMap);
  }

  getOnlineUsers(): string[] {
    return Array.from(this.presenceMap.entries())
      .filter(([_, presence]) => presence.isOnline)
      .map(([userId, _]) => userId);
  }

  getOfflineUsers(): string[] {
    return Array.from(this.presenceMap.entries())
      .filter(([_, presence]) => !presence.isOnline)
      .map(([userId, _]) => userId);
  }

  addPresenceListener(listener: (presences: Map<string, UserPresence>) => void) {
    this.presenceListeners.push(listener);
  }

  removePresenceListener(listener: (presences: Map<string, UserPresence>) => void) {
    this.presenceListeners = this.presenceListeners.filter(l => l !== listener);
  }

  // Méthodes utilitaires
  isUserOnline(userId: string): boolean {
    return this.presenceMap.get(userId)?.isOnline || false;
  }

  getLastSeen(userId: string): Date | undefined {
    return this.presenceMap.get(userId)?.lastSeen;
  }

  formatLastSeen(userId: string): string {
    const lastSeen = this.getLastSeen(userId);
    if (!lastSeen) return 'Jamais vu';

    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (this.isUserOnline(userId)) {
      return 'En ligne';
    } else if (diffMinutes < 1) {
      return 'À l\\'instant';
    } else if (diffMinutes < 60) {
      return \`Il y a \${diffMinutes} min\`;
    } else if (diffHours < 24) {
      return \`Il y a \${diffHours}h\`;
    } else {
      return \`Il y a \${diffDays} jour\${diffDays > 1 ? 's' : ''}\`;
    }
  }
}

interface UserPresence {
  userId: string;
  isOnline: boolean;
  lastSeen: Date;
  status: 'online' | 'offline' | 'away' | 'unknown';
}`;

export default presenceSystemExample;