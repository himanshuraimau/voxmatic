import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import { Link } from 'expo-router';
import NoteCard from '../../components/NoteCard';
import TodoItem from '../../components/TodoItem';
import { styles } from '@/constants/tabIndexStyles';
import { useAddModal } from './_layout';
import { supabase } from '../../utils/supabase';

type Note = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  color: string;
};

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const COLORS = ['#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc'];

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [newTodo, setNewTodo] = useState('');
  const [showTodoInput, setShowTodoInput] = useState(false);
  const todoInputRef = useRef<TextInput>(null);

  useEffect(() => {
    loadNotes();
    loadTodos();

    const showNoteModalListener = EventRegister.addEventListener('showNoteModal', () => {
      setNoteModalVisible(true);
    });

    const focusTodoInputListener = EventRegister.addEventListener('focusTodoInput', () => {
      setShowTodoInput(true);
      setTimeout(() => todoInputRef.current?.focus(), 100);
    });

    return () => {
      EventRegister.removeEventListener(showNoteModalListener as string);
      EventRegister.removeEventListener(focusTodoInputListener as string);
    };
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

  const loadTodos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const addNote = async () => {
    if (title.trim() === '' && content.trim() === '') return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newNote = {
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
        color: selectedColor,
      };

      const { error } = await supabase
        .from('notes')
        .insert([newNote]);

      if (error) throw error;
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
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const todo = {
        user_id: user.id,
        text: newTodo.trim(),
        completed: false,
      };

      const { error } = await supabase
        .from('todos')
        .insert([todo]);

      if (error) throw error;
      loadTodos();
      setNewTodo('');
      setShowTodoInput(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id);

      if (error) throw error;
      loadTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {showTodoInput && (
        <View style={styles.todoInputContainer}>
          <TextInput
            ref={todoInputRef}
            style={styles.todoInput}
            placeholder="Add a new todo"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={addTodo}
            onBlur={() => !newTodo && setShowTodoInput(false)}
          />
          <Pressable style={styles.todoAddButton} onPress={addTodo}>
            <Text style={styles.todoAddButtonText}>Add</Text>
          </Pressable>
        </View>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <Link href="../todos" asChild>
              <Pressable style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#f4b400" />
              </Pressable>
            </Link>
          </View>
          <View style={styles.todosList}>
            {todos.slice(0, 3).map(todo => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Link href="../notes" asChild>
              <Pressable style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color="#f4b400" />
              </Pressable>
            </Link>
          </View>
          <View style={styles.notesList}>
            {notes.slice(0, 2).map(note => (
              <NoteCard
                key={note.id}
                title={note.title}
                content={note.content}
                timestamp={note.timestamp}
                color={note.color}
                onPress={() => {}}
                onDelete={() => deleteNote(note.id)}
              />
            ))}
          </View>
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
