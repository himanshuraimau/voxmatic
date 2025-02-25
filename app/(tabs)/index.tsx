import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventRegister } from 'react-native-event-listeners';
import { styles } from '@/constants/tabIndexStyles';
import TodosSection from '../../components/home/TodosSection';
import NotesSection from '../../components/home/NotesSection';
import NewNoteModal from '../../components/home/NewNoteModal';
import { homeService, Note, Todo } from '../../services/homeService';
import { asyncStorageUtils } from '@/utils/asyncStorage';

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
    const cleanup = setupEventListeners();
    return cleanup;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
      loadTodos();
    }, [])
  );

  const setupEventListeners = () => {
    const showNoteModalListener = EventRegister.addEventListener(
      'showNoteModal',
      () => {
        setNoteModalVisible(true);
      }
    );

    const focusTodoInputListener = EventRegister.addEventListener(
      'focusTodoInput',
      () => {
        setShowTodoInput(true);
        setTimeout(() => todoInputRef.current?.focus(), 100);
      }
    );

    return () => {
      EventRegister.removeEventListener(showNoteModalListener as string);
      EventRegister.removeEventListener(focusTodoInputListener as string);
    };
  };

  const loadNotes = async () => {
    try {
      // First load from AsyncStorage for immediate display
      const cachedNotes = await asyncStorageUtils.loadNotes();
      setNotes(cachedNotes);

      // Then fetch from backend and update if different
      const backendNotes = await homeService.loadNotes();
      if (JSON.stringify(backendNotes) !== JSON.stringify(cachedNotes)) {
        setNotes(backendNotes);
        await asyncStorageUtils.saveNotes(backendNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const loadTodos = async () => {
    try {
      // First load from AsyncStorage for immediate display
      const cachedTodos = await asyncStorageUtils.loadTodos();
      setTodos(cachedTodos);

      // Then fetch from backend and update if different
      const backendTodos = await homeService.loadTodos();
      if (JSON.stringify(backendTodos) !== JSON.stringify(cachedTodos)) {
        setTodos(backendTodos);
        await asyncStorageUtils.saveTodos(backendTodos);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
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
        user_id: 'current-user',
        created_at: new Date().toISOString(),
        timestamp: new Date().toISOString() // Add the required timestamp property
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

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
      // Optimistically update local state and AsyncStorage
      const newTodoItem = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        user_id: 'current-user',
        created_at: new Date().toISOString()
      };
      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);

      // Update backend
      await homeService.addTodo(newTodo);
      loadTodos();
      setNewTodo('');
      setShowTodoInput(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      // Optimistically update local state and AsyncStorage
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);

      // Update backend
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      await homeService.toggleTodo(id, todo.completed);
      loadTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      // Optimistically update local state and AsyncStorage
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);

      // Update backend
      await homeService.deleteTodo(id);
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

      {
    showTodoInput && (
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
    )
  }

      <><ScrollView style={styles.content}>
    <TodosSection
      todos={todos}
      onToggleTodo={toggleTodo}
      onDeleteTodo={deleteTodo} />
    <NotesSection
      notes={notes}
      onDeleteNote={deleteNote} />
  </ScrollView><NewNoteModal
      visible={noteModalVisible}
      title={title}
      content={content}
      selectedColor={selectedColor}
      colors={COLORS}
      onChangeTitle={setTitle}
      onChangeContent={setContent}
      onSelectColor={setSelectedColor}
      onSave={addNote}
      onClose={() => setNoteModalVisible(false)} /></>
    </SafeAreaView >
  );
}
