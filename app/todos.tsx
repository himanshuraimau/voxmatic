import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TodoItem from '../components/TodoItem';
import { styles } from '@/constants/todosStyles';
import { homeService } from '@/services/homeService';
import type { Todo } from '@/types/database.types';
import { asyncStorageUtils } from '@/utils/asyncStorage';

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoModalVisible, setTodoModalVisible] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      // First load from AsyncStorage for immediate display
      const cachedTodos = await asyncStorageUtils.loadTodos();
      setTodos(cachedTodos);

      // Then fetch from backend and update if different
      const backendTodos = await homeService.loadAllTodos();
      if (JSON.stringify(backendTodos) !== JSON.stringify(cachedTodos)) {
        setTodos(backendTodos);
        await asyncStorageUtils.saveTodos(backendTodos);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const addTodo = async () => {
    if (newTodoText.trim() === '') return;

    try {
      // Optimistically update local state and AsyncStorage
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText,
        completed: false,
        user_id: 'current-user', // Replace with actual user ID from your auth system
        created_at: new Date().toISOString()
      };
      const updatedTodos: Todo[] = [...todos, newTodo];
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);
      
      // Update backend
      await homeService.addNewTodo(newTodoText);
      loadTodos(); // Refresh to sync with backend
      setTodoModalVisible(false);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      // Optimistically update local state and AsyncStorage
      const updatedTodos: Todo[] = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);

      // Update backend
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      await homeService.toggleTodo(id, todo.completed);
      loadTodos(); // Refresh to sync with backend
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      // Optimistically update local state and AsyncStorage
      const updatedTodos: Todo[] = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);

      // Update backend
      await homeService.deleteTodo(id);
      loadTodos(); // Refresh to sync with backend
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Todo List</Text>
        <Pressable onPress={() => setTodoModalVisible(true)} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#f4b400" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={todoModalVisible}
        onRequestClose={() => setTodoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Todo</Text>
              <Pressable onPress={() => setTodoModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
            </View>

            <TextInput
              style={styles.todoInput}
              placeholder="What needs to be done?"
              value={newTodoText}
              onChangeText={setNewTodoText}
            />

            <Pressable style={styles.addTodoButton} onPress={addTodo}>
              <Text style={styles.addTodoButtonText}>Add Todo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

