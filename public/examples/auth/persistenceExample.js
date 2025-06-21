const persistenceExample = `// Gestion de la persistance et auto-login
class AuthPersistenceManager {
  private httpClient: SnappyHTTPClient;

  constructor() {
    this.httpClient = new SnappyHTTPClient(
      process.env.REACT_APP_API_URL!
    );
  }

  async initializeFromStorage(): Promise<User | null> {
    try {
      // Charger le token et l'utilisateur depuis le stockage
      await this.httpClient.loadBearerToken();
      await this.httpClient.loadUser();

      const user = this.httpClient.getUser();
      
      if (user && this.httpClient.bearerToken) {
        // Vérifier que le token est toujours valide
        const isValid = await this.validateToken();
        
        if (isValid) {
          return user;
        } else {
          // Token expiré, nettoyer
          await this.clearStoredAuth();
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error('Erreur lors de l\\'initialisation:', error);
      await this.clearStoredAuth();
      return null;
    }
  }

  private async validateToken(): Promise<boolean> {
    try {
      // Faire une requête simple pour vérifier le token
      await this.httpClient.home();
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        return false;
      }
      // Pour les autres erreurs, on considère le token comme valide
      return true;
    }
  }

  async saveAuthData(user: User, token: string) {
    try {
      this.httpClient.setUser(user);
      this.httpClient.setBearerToken(token);
      
      await this.httpClient.saveUser();
      await this.httpClient.saveBearerToken();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }

  async clearStoredAuth() {
    try {
      await AsyncStorage.removeItem('bearer');
      await AsyncStorage.removeItem('user');
      
      this.httpClient.setBearerToken('');
      this.httpClient.setUser(undefined);
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
    }
  }

  // Méthode pour rafraîchir le token (si supporté par l'API)
  async refreshToken(): Promise<boolean> {
    try {
      // Si votre API supporte le refresh token
      // const refreshResult = await this.httpClient.refreshToken();
      // await this.saveAuthData(refreshResult.user, refreshResult.token);
      // return true;
      
      // Pour l'instant, retourner false
      return false;
    } catch (error) {
      console.error('Erreur lors du refresh:', error);
      return false;
    }
  }
}`;

export default persistenceExample;