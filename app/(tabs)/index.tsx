import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventRegister } from 'react-native-event-listeners';
import { styles } from '@/constants/tabIndexStyles';
import TodosSection from '../../components/home/TodosSection';
import NotesSection from '../../components/home/NotesSection';
import NewNoteModal from '../../components/home/NewNoteModal';
import { homeService, Note, Todo } from '../../services/homeService';

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
    const cleanup = setupEventListeners();
    return cleanup;
  }, []);

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
      const data = await homeService.loadNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const loadTodos = async () => {
    try {
      const data = await homeService.loadTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const addNote = async () => {
    if (title.trim() === '' && content.trim() === '') return;

    try {
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
      await homeService.deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    try {
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
