import React, { forwardRef } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

type TodoInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onBlur: () => void;
};

const TodoInput = forwardRef<TextInput, TodoInputProps>(
  ({ value, onChangeText, onSubmit, onBlur }, ref) => {
    return (
      <View style={styles.todoInputContainer}>
        <TextInput
          ref={ref}
          style={styles.todoInput}
          placeholder="Add a new todo"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onBlur={onBlur}
        />
        <Pressable style={styles.todoAddButton} onPress={onSubmit}>
          <Text style={styles.todoAddButtonText}>Add</Text>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  todoInputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  todoInput: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  todoAddButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f4b400',
    justifyContent: 'center',
  },
  todoAddButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TodoInput;
