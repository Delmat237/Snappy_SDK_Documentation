  const errorHandlingExample = `// Gestion avancée des erreurs d'authentification
class AuthErrorHandler {
  static handleAuthError(error: any): string {
    if (!error.response) {
      return 'Erreur de connexion réseau';
    }

    switch (error.response.status) {
      case 401:
        return 'Email ou mot de passe incorrect';
      
      case 422:
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          return this.formatValidationErrors(validationErrors);
        }
        return 'Données invalides';
      
      case 429:
        return 'Trop de tentatives. Veuillez réessayer plus tard';
      
      case 500:
        return 'Erreur serveur. Veuillez réessayer';
      
      default:
        return 'Une erreur inattendue s\\'est produite';
    }
  }

  static formatValidationErrors(errors: Record<string, string[]>): string {
    const messages = Object.entries(errors)
      .map(([field, fieldErrors]) => \`\${field}: \${fieldErrors.join(', ')}\`)
      .join('\\n');
    
    return \`Erreurs de validation:\\n\${messages}\`;
  }
}

// Utilisation avec retry automatique
class RobustAuthService {
  private httpClient: SnappyHTTPClient;
  private maxRetries = 3;

  constructor() {
    this.httpClient = new SnappyHTTPClient(
      process.env.REACT_APP_API_URL!
    );
  }

  async authenticateWithRetry(
    email: string, 
    password: string, 
    retryCount = 0
  ): Promise<any> {
    try {
      return await this.httpClient.authenticateUser({
        email,
        password
      });
    } catch (error) {
      // Ne pas retry sur les erreurs client (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }

      // Retry sur les erreurs serveur ou réseau
      if (retryCount < this.maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return this.authenticateWithRetry(email, password, retryCount + 1);
      }

      throw error;
    }
  }
}`;

export default errorHandlingExample;