import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import MainTabs from './MainTabs';
import TodoListScreen from '../screens/TodoListScreen';
import JournalListScreen from '../screens/JournalListScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { ParamListBase } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// Define props for TodoListScreen
type TodoListScreenProps = {
  navigation: any;
  route: any;
};

// Define props for JournalListScreen
type JournalListScreenProps = {
  navigation: any;
  route: any;
};

// Define props for NotFoundScreen
type NotFoundScreenProps = {
  navigation: any;
  route: any;
};

export default function RootStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TodoList" component={(props: TodoListScreenProps) => <TodoListScreen {...props} />} />
      <Stack.Screen name="JournalList" component={(props: JournalListScreenProps) => <JournalListScreen {...props} />} />
      <Stack.Screen name="NotFound" component={(props: NotFoundScreenProps) => <NotFoundScreen {...props} />} />
    </Stack.Navigator>
  );
}
