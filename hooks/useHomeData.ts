import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { Note, Todo, homeService } from '../services/homeService';
import { asyncStorageUtils } from '@/utils/asyncStorage';

export function useHomeData() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadNotes = async () => {
    try {
      const cachedNotes = await asyncStorageUtils.loadNotes();
      setNotes(cachedNotes);

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
      const cachedTodos = await asyncStorageUtils.loadTodos();
      setTodos(cachedTodos);

      const backendTodos = await homeService.loadTodos();
      if (JSON.stringify(backendTodos) !== JSON.stringify(cachedTodos)) {
        setTodos(backendTodos);
        await asyncStorageUtils.saveTodos(backendTodos);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const addNote = async (title: string, content: string, selectedColor: string) => {
    if (title.trim() === '' && content.trim() === '') return;

    try {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        color: selectedColor,
        user_id: 'current-user',
        created_at: new Date().toISOString(),
        timestamp: new Date().toISOString()
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      await asyncStorageUtils.saveNotes(updatedNotes);
      await homeService.addNote(title, content, selectedColor);
      await loadNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      await asyncStorageUtils.saveNotes(updatedNotes);
      await homeService.deleteNote(id);
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const addTodo = async (text: string) => {
    if (text.trim() === '') return;

    try {
      const newTodoItem = {
        id: Date.now().toString(),
        text,
        completed: false,
        user_id: 'current-user',
        created_at: new Date().toISOString()
      };
      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);
      await homeService.addTodo(text);
      await loadTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);
      
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      await homeService.toggleTodo(id, todo.completed);
      await loadTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      await asyncStorageUtils.saveTodos(updatedTodos);
      await homeService.deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return {
    notes,
    todos,
    loadNotes,
    loadTodos,
    addNote,
    deleteNote,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}
