import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '@/constants/notesStyles';
import NoteCard from '../components/NoteCard';
import { supabase } from '../utils/supabase';
import type { Note } from '../types/database.types';

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = async () => {
    if (title.trim() === '' && content.trim() === '') return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user); // Debug log

      if (!user) {
        console.error('No user found');
        return;
      }

      const newNote = {
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
        color: selectedColor,
        timestamp: new Date().toLocaleString(), // Add timestamp
      };

      console.log('Attempting to add note:', newNote); // Debug log

      const { data, error } = await supabase
        .from('notes')
        .insert([newNote])
        .select()
        .single();

      if (error) {
        console.error('Error inserting note:', error); // Debug log
        throw error;
      }

      console.log('Note added successfully:', data); // Debug log
      loadNotes();
      setNoteModalVisible(false);
      setTitle('');
      setContent('');
      setSelectedColor(COLORS[0]);
    } catch (error) {
      console.error('Error in addNote:', error);
      // Optionally show error to user
      Alert.alert('Error', 'Failed to add note. Please try again.');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadNotes(); // Reload notes after deletion
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
              timestamp={note.timestamp}
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
