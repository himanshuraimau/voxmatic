import { supabase } from '../utils/supabase';
import type { Note, Todo } from '../types/database.types';

// Remove the local type definitions and use the imported ones
export { Note, Todo };

export const homeService = {
  async loadNotes(): Promise<Note[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async loadTodos(): Promise<Todo[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addNote(title: string, content: string, color: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newNote = {
      user_id: user.id,
      title: title.trim(),
      content: content.trim(),
      color,
    };

    const { error } = await supabase
      .from('notes')
      .insert([newNote]);

    if (error) throw error;
  },

  async deleteNote(id: string): Promise<void> {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async addTodo(text: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const todo = {
      user_id: user.id,
      text: text.trim(),
      completed: false,
    };

    const { error } = await supabase
      .from('todos')
      .insert([todo]);

    if (error) throw error;
  },

  async toggleTodo(id: string, completed: boolean): Promise<void> {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id);

    if (error) throw error;
  },

  async deleteTodo(id: string): Promise<void> {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async loadAllNotes(): Promise<Note[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async loadAllTodos(): Promise<Todo[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addNewTodo(text: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newTodo = {
      user_id: user.id,
      text: text.trim(),
      completed: false,
    };

    const { error } = await supabase
      .from('todos')
      .insert([newTodo])
      .select()
      .single();

    if (error) throw error;
  }
};
