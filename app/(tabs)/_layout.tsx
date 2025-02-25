import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Modal, Pressable, Text, StyleSheet, Platform } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { styles } from '@/constants/tabslayoutStyles';

type AddModalContextType = {
  showAddModal: () => void;
  hideAddModal: () => void;
};

export const AddModalContext = createContext<AddModalContextType>({
  showAddModal: () => {},
  hideAddModal: () => {},
});

export function useAddModal() {
  return useContext(AddModalContext);
}

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  const showAddModal = () => setModalVisible(true);
  const hideAddModal = () => setModalVisible(false);

  return (
    <AddModalContext.Provider value={{ showAddModal, hideAddModal }}>
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
                  EventRegister.emit('showNoteModal');
                }}>
                <Ionicons name="document-text" size={24} color="#f4b400" />
                <Text style={styles.optionText}>New Note</Text>
              </Pressable>
              <Pressable
                style={styles.option}
                onPress={() => {
                  hideAddModal();
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

