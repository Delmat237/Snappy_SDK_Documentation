
  const chatbotCreationExample = `// Composant de création de chatbot
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Picker
} from 'react-native';
import { ChatbotService } from './ChatbotService';

const CreateChatbotScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [presetPrompts, setPresetPrompts] = useState<Record<string, string>>({});
  const [selectedPreset, setSelectedPreset] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [chatbotService] = useState(() => new ChatbotService(
    process.env.REACT_APP_API_URL!
  ));

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [models, prompts] = await Promise.all([
        chatbotService.getAvailableModels(),
        Promise.resolve(chatbotService.getPresetPrompts())
      ]);
      
      setAvailableModels(models);
      setPresetPrompts(prompts);
      
      if (models.length > 0) {
        setSelectedModel(models[0]);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les données');
    }
  };

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    if (presetKey && presetPrompts[presetKey]) {
      setSystemPrompt(presetPrompts[presetKey]);
    }
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom du chatbot est requis');
      return false;
    }
    
    if (!selectedModel) {
      Alert.alert('Erreur', 'Veuillez sélectionner un modèle IA');
      return false;
    }
    
    if (!systemPrompt.trim()) {
      Alert.alert('Erreur', 'Le prompt système est requis');
      return false;
    }
    
    if (systemPrompt.length < 50) {
      Alert.alert('Erreur', 'Le prompt système doit contenir au moins 50 caractères');
      return false;
    }
    
    return true;
  };

  const createChatbot = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const chatbot = await chatbotService.createChatbot(
        name.trim(),
        selectedModel,
        systemPrompt.trim(),
        description.trim() || undefined
      );
      
      Alert.alert(
        'Succès',
        \`Le chatbot "\${chatbot.name}" a été créé avec succès !\`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Retourner à l'écran précédent ou réinitialiser le formulaire
              resetForm();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer le chatbot');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSystemPrompt('');
    setSelectedPreset('');
  };

  const getModelDescription = (model: string): string => {
    const descriptions: Record<string, string> = {
      'gpt-4': 'Le plus avancé, excellent pour les tâches complexes',
      'gpt-3.5-turbo': 'Rapide et efficace, bon rapport qualité/prix',
      'claude-3': 'Excellent pour l\\'analyse et le raisonnement',
      'llama-2': 'Modèle open source, bon pour la confidentialité'
    };
    return descriptions[model] || 'Modèle de langage avancé';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Créer un nouveau chatbot</Text>
        
        {/* Nom du chatbot */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom du chatbot *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Assistant Support"
            maxLength={50}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez brièvement le rôle de ce chatbot..."
            multiline
            numberOfLines={3}
            maxLength={200}
          />
        </View>

        {/* Modèle IA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Modèle IA *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedModel}
              onValueChange={setSelectedModel}
              style={styles.picker}
            >
              {availableModels.map(model => (
                <Picker.Item
                  key={model}
                  label={\`\${model} - \${getModelDescription(model)}\`}
                  value={model}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Prompts prédéfinis */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Modèles de prompt</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPreset}
              onValueChange={handlePresetChange}
              style={styles.picker}
            >
              <Picker.Item label="Choisir un modèle..." value="" />
              <Picker.Item label="Support Client" value="support-client" />
              <Picker.Item label="Assistant Vente" value="assistant-vente" />
              <Picker.Item label="Tuteur Éducatif" value="tuteur-educatif" />
            </Picker>
          </View>
        </View>

        {/* Prompt système */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Prompt système *</Text>
          <TextInput
            style={[styles.input, styles.promptInput]}
            value={systemPrompt}
            onChangeText={setSystemPrompt}
            placeholder="Définissez le comportement et la personnalité de votre chatbot..."
            multiline
            numberOfLines={8}
            maxLength={2000}
          />
          <Text style={styles.characterCount}>
            {systemPrompt.length}/2000 caractères
          </Text>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetForm}
          >
            <Text style={styles.resetButtonText}>Réinitialiser</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.createButton, loading && styles.createButtonDisabled]}
            onPress={createChatbot}
            disabled={loading}
          >
            <Text style={styles.createButtonText}>
              {loading ? 'Création...' : 'Créer le chatbot'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  promptInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  resetButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  createButton: {
    flex: 2,
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 8,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default CreateChatbotScreen;`;


export default chatbotCreationExample;