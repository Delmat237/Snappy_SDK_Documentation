  const reactAuthComponent = `// Composant React d'authentification
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SnappyHTTPClient } from "@/lib/SnappyHTTPClient"';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [httpClient] = useState(() => new SnappyHTTPClient(
    process.env.REACT_APP_API_URL!
  ));

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      await httpClient.loadBearerToken();
      await httpClient.loadUser();
      
      const user = httpClient.getUser();
      if (user) {
        // Utilisateur déjà connecté, rediriger
        navigation.navigate('Chat');
      }
    } catch (error) {
      console.log('Aucune session existante');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const authResult = await httpClient.authenticateUser({
        email: email.toLowerCase(),
        password
      });

      Alert.alert('Succès', 'Connexion réussie !');
      navigation.navigate('Chat');
    } catch (error) {
      let errorMessage = 'Erreur de connexion';
      
      if (error.response?.status === 401) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.response?.status === 422) {
        errorMessage = 'Données invalides';
      }
      
      Alert.alert('Erreur', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});`;

export default reactAuthComponent;