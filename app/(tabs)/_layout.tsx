import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Modal, Pressable, Text, StyleSheet, Platform } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

type AddModalContextType = {
  showAddModal: () => void;
  hideAddModal: () => void;
  setActiveTab: (tab: 'notes' | 'todos') => void;
  activeTab: 'notes' | 'todos';
};

export const AddModalContext = createContext<AddModalContextType>({
  showAddModal: () => {},
  hideAddModal: () => {},
  setActiveTab: () => {},
  activeTab: 'notes',
});

export function useAddModal() {
  return useContext(AddModalContext);
}

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'todos'>('notes');

  const showAddModal = () => setModalVisible(true);
  const hideAddModal = () => setModalVisible(false);

  return (
    <AddModalContext.Provider value={{ showAddModal, hideAddModal, setActiveTab, activeTab }}>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarActiveTintColor: '#f4b400',
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
              listeners: {
                tabPress: () => setActiveTab('notes'),
              },
            }}
          />
          <Tabs.Screen
            name="todos"
            options={{
              title: 'Tasks',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="checkbox" size={size} color={color} />
              ),
              listeners: {
                tabPress: () => setActiveTab('todos'),
              },
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="bar-chart" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="settings-sharp" size={size} color={color} />
              ),
            }}
          />
        </Tabs>

        <Pressable
          style={styles.fab}
          onPress={showAddModal}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideAddModal}>
          <Pressable
            style={styles.modalOverlay}
            onPress={hideAddModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New</Text>
              <Pressable
                style={styles.option}
                onPress={() => {
                  hideAddModal();
                  setActiveTab('notes');
                  EventRegister.emit('showNoteModal');
                }}>
                <Ionicons name="document-text" size={24} color="#f4b400" />
                <Text style={styles.optionText}>New Note</Text>
              </Pressable>
              <Pressable
                style={styles.option}
                onPress={() => {
                  hideAddModal();
                  setActiveTab('todos');
                  EventRegister.emit('focusTodoInput');
                }}>
                <Ionicons name="checkbox" size={24} color="#f4b400" />
                <Text style={styles.optionText}>New Todo</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </AddModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#f4b400',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});