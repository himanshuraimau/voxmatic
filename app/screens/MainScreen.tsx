import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function MainScreen({ navigation }:any) {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Notes</Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('TodoList')}
        >
          <AntDesign name="checkcircleo" size={40} color="#444" />
          <Text style={styles.cardTitle}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('JournalList')}
        >
          <Feather name="book" size={40} color="#444" />
          <Text style={styles.cardTitle}>Journal</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New</Text>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('TodoList', { isCreating: true });
              }}
            >
              <AntDesign name="checkcircleo" size={24} color="#444" />
              <Text style={styles.modalOptionText}>New Todo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('JournalList', { isCreating: true });
              }}
            >
              <Feather name="book" size={24} color="#444" />
              <Text style={styles.modalOptionText}>New Journal Entry</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    color: '#444',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    gap: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#f3c988',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#f3c988',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalOptionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#444',
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
});