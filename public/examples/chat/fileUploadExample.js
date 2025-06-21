  const fileUploadExample = `// Gestion des fichiers et médias
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

class MediaChatService extends ChatService {
  async sendImageFromCamera(recipientId: string) {
    try {
      const result = await new Promise((resolve, reject) => {
        launchCamera(
          {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 1024,
            maxHeight: 1024,
          },
          (response) => {
            if (response.didCancel || response.errorMessage) {
              reject(new Error('Capture annulée'));
            } else {
              resolve(response);
            }
          }
        );
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        return await this.sendImageMessage(asset.uri!, recipientId);
      }
    } catch (error) {
      console.error('Erreur capture photo:', error);
      throw error;
    }
  }

  async sendImageFromGallery(recipientId: string) {
    try {
      const result = await new Promise((resolve, reject) => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 0.8,
            selectionLimit: 1,
          },
          (response) => {
            if (response.didCancel || response.errorMessage) {
              reject(new Error('Sélection annulée'));
            } else {
              resolve(response);
            }
          }
        );
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        return await this.sendImageMessage(asset.uri!, recipientId);
      }
    } catch (error) {
      console.error('Erreur sélection image:', error);
      throw error;
    }
  }

  async sendDocument(recipientId: string) {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });

      if (result && result[0]) {
        const document = result[0];
        
        const formData = new FormData();
        formData.append('content', document.name || 'Document');
        formData.append('recipientId', recipientId);
        formData.append('type', 'file');
        formData.append('file', {
          uri: document.fileCopyUri || document.uri,
          type: document.type,
          name: document.name,
        } as any);

        const message = await this.httpClient.sendMessage(formData);
        return message;
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Sélection annulée');
      } else {
        console.error('Erreur sélection document:', error);
        throw error;
      }
    }
  }

  // Compression d'image avant envoi
  async compressAndSendImage(imageUri: string, recipientId: string) {
    try {
      // Utiliser une bibliothèque de compression comme react-native-image-resizer
      const compressedImage = await ImageResizer.createResizedImage(
        imageUri,
        800, // largeur max
        600, // hauteur max
        'JPEG',
        80, // qualité
        0, // rotation
        undefined,
        false,
        { mode: 'contain', onlyScaleDown: true }
      );

      return await this.sendImageMessage(compressedImage.uri, recipientId);
    } catch (error) {
      console.error('Erreur compression image:', error);
      throw error;
    }
  }
}

// Composant avec sélection de médias
const MediaChatComponent: React.FC = () => {
  const [showMediaOptions, setShowMediaOptions] = useState(false);

  const handleMediaSelection = () => {
    Alert.alert(
      'Envoyer un média',
      'Choisissez une option',
      [
        { text: 'Appareil photo', onPress: () => sendFromCamera() },
        { text: 'Galerie', onPress: () => sendFromGallery() },
        { text: 'Document', onPress: () => sendDocument() },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const sendFromCamera = async () => {
    try {
      await mediaChatService.sendImageFromCamera(recipientId);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de prendre la photo');
    }
  };

  const sendFromGallery = async () => {
    try {
      await mediaChatService.sendImageFromGallery(recipientId);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de sélectionner l\\'image');
    }
  };

  const sendDocument = async () => {
    try {
      await mediaChatService.sendDocument(recipientId);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\\'envoyer le document');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        style={styles.mediaButton}
        onPress={handleMediaSelection}
      >
        <Text style={styles.mediaButtonText}>📎</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.textInput}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Tapez votre message..."
      />
      
      <TouchableOpacity
        style={styles.sendButton}
        onPress={sendMessage}
      >
        <Text style={styles.sendButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};`;


export default fileUploadExample;