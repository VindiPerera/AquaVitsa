import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Animated } from 'react-native';
import { db } from '@/firebaseConfig'; // Adjust the import path as needed
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have installed this library
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for history items
interface HistoryItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional if some items may not have an image
  addedAt: string; // ISO string format
}

// Define the type for your StackNavigator
type RootStackParamList = {
  History: undefined;
  MusicPlayer: { trackId: string }; // Pass track ID or other parameters as needed
};

// Define the typed navigation prop for the History screen
type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

const MusicHistory: React.FC = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>(); // Use typed navigation
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity of 0

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyCollection = collection(db, 'musicTracks');
        const historySnapshot = await getDocs(historyCollection);
        const historyList = historySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as HistoryItem[]; // Cast to HistoryItem[]
        setHistory(historyList);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  // Navigate to MusicPlayer when a card is clicked
  const handleCardPress = (item: HistoryItem) => {
    navigation.navigate('MusicPlayer', { trackId: item.id });
  };

  const handleDownload = (item: HistoryItem) => {
    setSelectedItem(item);
    setModalVisible(true);
    fadeIn(); // Start fade-in animation
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const renderHistory = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.card}>
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
         
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="musical-notes" size={32} color="#fff" />
        <Text style={styles.header}>History</Text>
        <Text style={styles.subHeader}>Your music listening history</Text>
      </View>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No history available yet.</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistory}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal for upgrade message */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none" // Disable default animation
        onRequestClose={() => {
          fadeOut();
        }}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
            <Text style={styles.modalText}>
              Upgrade your plan to download "{selectedItem?.title}"!
            </Text>
            <Pressable style={styles.button} onPress={() => fadeOut()}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#6C9EE5',
    borderBottomLeftRadius: 20, // Rounded corners for the header
    borderBottomRightRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 7,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    marginVertical: 4,
  },
  downloadButton: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6C9EE5',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MusicHistory;
