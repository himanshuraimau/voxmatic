import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import { Link } from 'expo-router';
import NoteCard from '../../components/NoteCard';
import TodoItem from '../../components/TodoItem';
import { styles } from '@/constants/tabIndexStyles';
import { useAddModal } from './_layout';

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
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const saveTodos = async (updatedTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addNote = () => {
    if (title.trim() === '' && content.trim() === '') return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      timestamp: new Date().toLocaleString(),
      color: selectedColor,
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNoteModalVisible(false);
    setTitle('');
    setContent('');
    setSelectedColor(COLORS[0]);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };

    const updatedTodos = [todo, ...todos];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setNewTodo('');
    setShowTodoInput(false);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
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
