import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Define the RootStackParamList type
type RootStackParamList = {
  TodoList: { isCreating?: boolean };
};

type TodoListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TodoList'>;
type TodoListScreenRouteProp = RouteProp<RootStackParamList, 'TodoList'>;

type TodoListScreenProps = {
  navigation: TodoListScreenNavigationProp;
  route: TodoListScreenRouteProp;
};

export default function TodoListScreen({ navigation, route }: TodoListScreenProps) {
    const DUMMY_TODOS: Todo[] = [
        { id: '1', text: 'Buy groceries', completed: false },
        { id: '2', text: 'Do laundry', completed: true },
        { id: '3', text: 'Exercise', completed: false },
    ];

    const [todos, setTodos] = useState(DUMMY_TODOS);

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const renderItem = ({ item }: { item: Todo }) => (
        <TouchableOpacity
            style={styles.todoItem}
            onPress={() => toggleTodo(item.id)}
        >
            <View style={styles.todoContent}>
                <View style={[styles.checkbox, item.completed && styles.checked]}>
                    {item.completed && <AntDesign name="check" size={16} color="white" />}
                </View>
                <Text style={[styles.todoText, item.completed && styles.completedText]}>
                    {item.text}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#444" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Todo List</Text>
            </View>

            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#444',
    },
    list: {
        padding: 20,
    },
    todoItem: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    todoContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#f3c988',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#f3c988',
    },
    todoText: {
        fontSize: 16,
        color: '#444',
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});