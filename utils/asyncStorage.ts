import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo, Note } from '@/types/database.types';

const TODOS_KEY = '@todos';
const NOTES_KEY = '@notes';

export const asyncStorageUtils = {
  async saveTodos(todos: Todo[]) {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to AsyncStorage:', error);
    }
  },

  async loadTodos(): Promise<Todo[]> {
    try {
      const todosString = await AsyncStorage.getItem(TODOS_KEY);
      return todosString ? JSON.parse(todosString) : [];
    } catch (error) {
      console.error('Error loading todos from AsyncStorage:', error);
      return [];
    }
  },

  async saveNotes(notes: Note[]) {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes to AsyncStorage:', error);
    }
  },

  async loadNotes(): Promise<Note[]> {
    try {
      const notesString = await AsyncStorage.getItem(NOTES_KEY);
      return notesString ? JSON.parse(notesString) : [];
    } catch (error) {
      console.error('Error loading notes from AsyncStorage:', error);
      return [];
    }
  }
};
