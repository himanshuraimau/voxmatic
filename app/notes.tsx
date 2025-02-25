import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/constants/notesStyles';
import NoteCard from '../components/NoteCard';
import { homeService } from '@/services/homeService';
import type { Note } from '@/types/database.types';
import { asyncStorageUtils } from '@/utils/asyncStorage';

const COLORS = ['#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc'];

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      // First load from AsyncStorage for immediate display
      const cachedNotes = await asyncStorageUtils.loadNotes();
      setNotes(cachedNotes);

      // Then fetch from backend and update if different
      const backendNotes = await homeService.loadAllNotes();
      if (JSON.stringify(backendNotes) !== JSON.stringify(cachedNotes)) {
        setNotes(backendNotes);
        await asyncStorageUtils.saveNotes(backendNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = async () => {
    if (title.trim() === '' && content.trim() === '') return;

    try {
      // Optimistically update local state and AsyncStorage
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        color: selectedColor,
        user_id: 'current-user', // Replace with actual user ID
        created_at: new Date().toISOString(),
        timestamp: ''
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      await asyncStorageUtils.saveNotes(updatedNotes);

      // Update backend
      await homeService.addNote(title, content, selectedColor);
      loadNotes();
      setNoteModalVisible(false);
      setTitle('');
      setContent('');
      setSelectedColor(COLORS[0]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      // Optimistically update local state and AsyncStorage
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      await asyncStorageUtils.saveNotes(updatedNotes);

      // Update backend
      await homeService.deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Notes</Text>
        <Pressable onPress={() => setNoteModalVisible(true)} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#f4b400" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.notesList}>
          {notes.map(note => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              timestamp={note.created_at}
              color={note.color}
              onPress={() => { }}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={noteModalVisible}
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: selectedColor }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Note</Text>
              <Pressable onPress={() => setNoteModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.contentInput}
              placeholder="Note content"
              value={content}
              onChangeText={setContent}
              multiline
            />

            <View style={styles.colorPicker}>
              {COLORS.map(color => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <Pressable style={styles.saveButton} onPress={addNote}>
              <Text style={styles.saveButtonText}>Save Note</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
