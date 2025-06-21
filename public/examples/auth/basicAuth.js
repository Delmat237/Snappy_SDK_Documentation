const basicAuthExample = `// Exemple d'authentification de base
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';

class AuthService {
  private httpClient: SnappyHTTPClient;

  constructor() {
    this.httpClient = new SnappyHTTPClient(
      process.env.REACT_APP_API_URL!
    );
  }

  async loginUser(email: string, password: string) {
    try {
      const authResult = await this.httpClient.authenticateUser({
        email,
        password
      });

      // Le token est automatiquement stocké
      console.log('Connexion réussie:', authResult.data);
      return authResult;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  }

  async loginOrganization(email: string, password: string) {
    try {
      const authResult = await this.httpClient.authenticateOrganization({
        email,
        password
      });

      console.log('Organisation connectée:', authResult.data);
      return authResult;
    } catch (error) {
      console.error('Erreur de connexion organisation:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.httpClient.getUser();
  }

  async logout() {
    // Nettoyer les données locales
    await AsyncStorage.removeItem('bearer');
    await AsyncStorage.removeItem('user');
    
    // Réinitialiser le client
    this.httpClient.setBearerToken('');
    this.httpClient.setUser(undefined);
  }
}`;

export default basicAuthExample;