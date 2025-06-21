
  const connectionMonitorExample = `// Moniteur de connexion avec métriques
class ConnectionMonitor {
  private wsManager: AdvancedWebSocketManager;
  private metrics: ConnectionMetrics = {
    totalConnections: 0,
    totalDisconnections: 0,
    totalReconnections: 0,
    averageConnectionTime: 0,
    lastConnectionTime: null,
    lastDisconnectionTime: null,
    connectionHistory: []
  };
  private connectionStartTime: Date | null = null;
  private metricsListeners: Array<(metrics: ConnectionMetrics) => void> = [];

  constructor(wsManager: AdvancedWebSocketManager) {
    this.wsManager = wsManager;
    this.setupMonitoring();
  }

  private setupMonitoring() {
    this.wsManager.addConnectionListener((connected: boolean) => {
      if (connected) {
        this.handleConnection();
      } else {
        this.handleDisconnection();
      }
    });
  }

  private handleConnection() {
    this.connectionStartTime = new Date();
    this.metrics.totalConnections++;
    this.metrics.lastConnectionTime = this.connectionStartTime;
    
    // Si c'est une reconnexion
    if (this.metrics.totalDisconnections > 0) {
      this.metrics.totalReconnections++;
    }

    this.addToHistory('connected');
    this.notifyMetricsListeners();
  }

  private handleDisconnection() {
    const disconnectionTime = new Date();
    this.metrics.totalDisconnections++;
    this.metrics.lastDisconnectionTime = disconnectionTime;

    // Calculer la durée de connexion
    if (this.connectionStartTime) {
      const connectionDuration = disconnectionTime.getTime() - this.connectionStartTime.getTime();
      this.updateAverageConnectionTime(connectionDuration);
      this.connectionStartTime = null;
    }

    this.addToHistory('disconnected');
    this.notifyMetricsListeners();
  }

  private updateAverageConnectionTime(newDuration: number) {
    const totalConnections = this.metrics.totalConnections;
    if (totalConnections === 1) {
      this.metrics.averageConnectionTime = newDuration;
    } else {
      this.metrics.averageConnectionTime = 
        (this.metrics.averageConnectionTime * (totalConnections - 1) + newDuration) / totalConnections;
    }
  }

  private addToHistory(event: 'connected' | 'disconnected') {
    const historyEntry: ConnectionHistoryEntry = {
      timestamp: new Date(),
      event,
      duration: event === 'disconnected' && this.connectionStartTime 
        ? new Date().getTime() - this.connectionStartTime.getTime()
        : undefined
    };

    this.metrics.connectionHistory.push(historyEntry);

    // Garder seulement les 100 derniers événements
    if (this.metrics.connectionHistory.length > 100) {
      this.metrics.connectionHistory = this.metrics.connectionHistory.slice(-100);
    }
  }

  private notifyMetricsListeners() {
    this.metricsListeners.forEach(listener => listener({ ...this.metrics }));
  }

  // Méthodes publiques
  getMetrics(): ConnectionMetrics {
    return { ...this.metrics };
  }

  getConnectionStability(): number {
    const total = this.metrics.totalConnections + this.metrics.totalDisconnections;
    if (total === 0) return 1;
    return this.metrics.totalConnections / total;
  }

  getAverageConnectionTimeFormatted(): string {
    const avgMs = this.metrics.averageConnectionTime;
    if (avgMs === 0) return 'N/A';

    const minutes = Math.floor(avgMs / (1000 * 60));
    const seconds = Math.floor((avgMs % (1000 * 60)) / 1000);

    if (minutes > 0) {
      return \`\${minutes}m \${seconds}s\`;
    } else {
      return \`\${seconds}s\`;
    }
  }

  addMetricsListener(listener: (metrics: ConnectionMetrics) => void) {
    this.metricsListeners.push(listener);
  }

  removeMetricsListener(listener: (metrics: ConnectionMetrics) => void) {
    this.metricsListeners = this.metricsListeners.filter(l => l !== listener);
  }

  reset() {
    this.metrics = {
      totalConnections: 0,
      totalDisconnections: 0,
      totalReconnections: 0,
      averageConnectionTime: 0,
      lastConnectionTime: null,
      lastDisconnectionTime: null,
      connectionHistory: []
    };
    this.connectionStartTime = null;
    this.notifyMetricsListeners();
  }
}

interface ConnectionMetrics {
  totalConnections: number;
  totalDisconnections: number;
  totalReconnections: number;
  averageConnectionTime: number;
  lastConnectionTime: Date | null;
  lastDisconnectionTime: Date | null;
  connectionHistory: ConnectionHistoryEntry[];
}

interface ConnectionHistoryEntry {
  timestamp: Date;
  event: 'connected' | 'disconnected';
  duration?: number;
}`;


export default connectionMonitorExample;