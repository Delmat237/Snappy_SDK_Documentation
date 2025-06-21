  const basicChatbotExample = `// Service de gestion des chatbots
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';
import { Chatbot,CreateChatbotDto } from "@/lib/models"';

class ChatbotService {
  private httpClient: SnappyHTTPClient;

  constructor(apiUrl: string) {
    this.httpClient = new SnappyHTTPClient(apiUrl);
  }

  async createChatbot(
    name: string,
    model: string,
    systemPrompt: string,
    description?: string,
    avatarFile?: File
  ): Promise<Chatbot> {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('model', model);
      formData.append('systemPrompt', systemPrompt);
      formData.append('projectId', this.httpClient.projectId!);
      
      if (description) {
        formData.append('description', description);
      }
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const chatbot = await this.httpClient.createChatbot(formData);
      console.log('Chatbot créé:', chatbot);
      return chatbot;
    } catch (error) {
      console.error('Erreur création chatbot:', error);
      throw error;
    }
  }

  async getAllChatbots(): Promise<Chatbot[]> {
    try {
      const chatbots = await this.httpClient.getAllChatbots();
      return chatbots;
    } catch (error) {
      console.error('Erreur récupération chatbots:', error);
      throw error;
    }
  }

  async getProjectChatbots(projectId: string): Promise<Chatbot[]> {
    try {
      const chatbots = await this.httpClient.getChatbotsForProject(projectId);
      return chatbots;
    } catch (error) {
      console.error('Erreur récupération chatbots projet:', error);
      throw error;
    }
  }

  async getAvailableModels(): Promise<string[]> {
    try {
      const models = await this.httpClient.getAvailableModels();
      return models;
    } catch (error) {
      console.error('Erreur récupération modèles:', error);
      throw error;
    }
  }

  // Méthodes utilitaires pour les prompts
  generateSystemPrompt(role: string, personality: string, rules: string[]): string {
    return \`Tu es \${role} avec une personnalité \${personality}.

Règles importantes :
\${rules.map(rule => \`- \${rule}\`).join('\\n')}

Réponds toujours de manière utile et respectueuse.\`;
  }

  getPresetPrompts(): Record<string, string> {
    return {
      'support-client': \`Tu es un assistant de support client professionnel et serviable.

Règles importantes :
- Réponds toujours en français
- Sois poli et empathique
- Propose des solutions concrètes
- Si tu ne connais pas la réponse, dis-le clairement
- Limite tes réponses à 200 mots maximum

Ton rôle est d'aider les utilisateurs avec leurs questions et problèmes.\`,

      'assistant-vente': \`Tu es un assistant commercial expert et persuasif.

Règles importantes :
- Mets en avant les avantages produits
- Pose des questions pour qualifier les besoins
- Sois enthousiaste mais pas insistant
- Fournis des informations précises sur les prix
- Guide vers la conversion

Ton objectif est d'aider les clients à trouver la solution parfaite.\`,

      'tuteur-educatif': \`Tu es un tuteur éducatif patient et pédagogue.

Règles importantes :
- Explique de manière simple et claire
- Utilise des exemples concrets
- Encourage l'apprentissage progressif
- Pose des questions pour vérifier la compréhension
- Adapte ton niveau au public

Ton rôle est d'enseigner et d'accompagner l'apprentissage.\`
    };
  }
}`;


export default basicChatbotExample;