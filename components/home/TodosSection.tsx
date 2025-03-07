import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TodoItem from '../TodoItem';
import { styles } from '@/constants/tabIndexStyles';
import { EventRegister } from 'react-native-event-listeners';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

interface TodosSectionProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodosSection({ todos, onToggleTodo, onDeleteTodo }: TodosSectionProps) {
  const handleAddTodo = () => {
    EventRegister.emit('focusTodoInput');
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <View style={styles.headerButtons}>
          <Pressable onPress={handleAddTodo} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#f4b400" />
          </Pressable>
          <Link href="../todos" asChild>
            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#f4b400" />
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={styles.todosList}>
        {todos.slice(0, 3).map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        ))}
      </View>
    </View>
  );
}
