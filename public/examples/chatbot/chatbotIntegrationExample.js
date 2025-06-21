
  const chatbotIntegrationExample = `// Intégration du chatbot dans le chat
class ChatbotIntegratedService extends ChatService {
  private chatbotService: ChatbotService;
  private activeChatbots = new Map<string, Chatbot>();

  constructor(apiUrl: string, socketUrl: string, projectId: string, userId: string) {
    super(apiUrl, socketUrl, projectId, userId);
    this.chatbotService = new ChatbotService(apiUrl);
  }

  async loadProjectChatbots() {
    try {
      const chatbots = await this.chatbotService.getProjectChatbots(
        this.socketClient.projectId
      );
      
      chatbots.forEach(chatbot => {
        this.activeChatbots.set(chatbot.id, chatbot);
      });

      console.log(\`\${chatbots.length} chatbots chargés\`);
      return chatbots;
    } catch (error) {
      console.error('Erreur chargement chatbots:', error);
      return [];
    }
  }

  async sendMessageToChatbot(
    content: string, 
    chatbotId: string, 
    conversationContext?: Message[]
  ): Promise<Message> {
    try {
      const chatbot = this.activeChatbots.get(chatbotId);
      if (!chatbot) {
        throw new Error('Chatbot non trouvé');
      }

      // Construire le contexte de conversation pour l'IA
      const contextMessages = conversationContext?.slice(-10) || []; // Derniers 10 messages
      const contextPrompt = this.buildContextPrompt(contextMessages, content);

      // Envoyer le message au chatbot (simulation d'API IA)
      const aiResponse = await this.callAIService(chatbot.model, contextPrompt);

      // Créer un message de réponse du chatbot
      const botMessage: Message = {
        id: \`bot-\${Date.now()}\`,
        content: aiResponse,
        senderId: chatbotId,
        recipientId: this.socketClient.user,
        chatId: \`chat-\${this.socketClient.user}-\${chatbotId}\`,
        type: 'text',
        createdAt: new Date(),
        updatedAt: new Date(),
        isEncrypted: false,
        isRead: false,
        isDelivered: true
      };

      // Notifier les listeners
      this.messageListeners.forEach(listener => listener(botMessage));

      return botMessage;
    } catch (error) {
      console.error('Erreur envoi message chatbot:', error);
      throw error;
    }
  }

  private buildContextPrompt(contextMessages: Message[], newMessage: string): string {
    let prompt = '';
    
    // Ajouter le contexte des messages précédents
    if (contextMessages.length > 0) {
      prompt += 'Contexte de la conversation:\\n';
      contextMessages.forEach(msg => {
        const role = msg.senderId === this.socketClient.user ? 'Utilisateur' : 'Assistant';
        prompt += \`\${role}: \${msg.content}\\n\`;
      });
      prompt += '\\n';
    }

    // Ajouter le nouveau message
    prompt += \`Utilisateur: \${newMessage}\\n\\nAssistant:\`;
    
    return prompt;
  }

  private async callAIService(model: string, prompt: string): Promise<string> {
    // Simulation d'appel à un service IA
    // En réalité, vous appelleriez OpenAI, Claude, etc.
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this.httpClient.bearerToken}\`
        },
        body: JSON.stringify({
          model,
          prompt,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.response || 'Désolé, je ne peux pas répondre pour le moment.';
    } catch (error) {
      console.error('Erreur service IA:', error);
      return 'Une erreur est survenue lors du traitement de votre demande.';
    }
  }

  getChatbot(chatbotId: string): Chatbot | undefined {
    return this.activeChatbots.get(chatbotId);
  }

  getAllActiveChatbots(): Chatbot[] {
    return Array.from(this.activeChatbots.values());
  }

  isChatbotMessage(senderId: string): boolean {
    return this.activeChatbots.has(senderId);
  }
}`;

export default chatbotIntegrationExample;