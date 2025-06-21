

  const reactPresenceComponent = `// Composant React de présence
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PresenceManager, UserPresence } from './PresenceManager';

interface PresenceListProps {
  presenceManager: PresenceManager;
  users: User[];
}

const PresenceList: React.FC<PresenceListProps> = ({ presenceManager, users }) => {
  const [presences, setPresences] = useState<Map<string, UserPresence>>(new Map());

  useEffect(() => {
    const handlePresenceUpdate = (newPresences: Map<string, UserPresence>) => {
      setPresences(newPresences);
    };

    presenceManager.addPresenceListener(handlePresenceUpdate);

    return () => {
      presenceManager.removePresenceListener(handlePresenceUpdate);
    };
  }, [presenceManager]);

  const renderUserItem = ({ item }: { item: User }) => {
    const presence = presences.get(item.id);
    const isOnline = presence?.isOnline || false;
    const lastSeenText = presenceManager.formatLastSeen(item.id);

    return (
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
              style={styles.avatar}
            />
            <View style={[
              styles.statusIndicator,
              { backgroundColor: isOnline ? '#4CAF50' : '#9E9E9E' }
            ]} />
          </View>
          
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.displayName}</Text>
            <Text style={[
              styles.userStatus,
              { color: isOnline ? '#4CAF50' : '#9E9E9E' }
            ]}>
              {lastSeenText}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onlineUsers = users.filter(user => presenceManager.isUserOnline(user.id));
  const offlineUsers = users.filter(user => !presenceManager.isUserOnline(user.id));

  return (
    <View style={styles.container}>
      {onlineUsers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En ligne ({onlineUsers.length})</Text>
          <FlatList
            data={onlineUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      
      {offlineUsers.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hors ligne ({offlineUsers.length})</Text>
          <FlatList
            data={offlineUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
  },
  userItem: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  userStatus: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default PresenceList;`;


export default reactPresenceComponent;