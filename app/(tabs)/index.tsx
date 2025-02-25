import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventRegister } from 'react-native-event-listeners';
import { styles } from '@/constants/tabIndexStyles';
import TodosSection from '../../components/home/TodosSection';
import NotesSection from '../../components/home/NotesSection';
import NewNoteModal from '../../components/home/NewNoteModal';
import Header from '../../components/home/Header';
import TodoInput from '../../components/home/TodoInput';
import CalendarStrip from '../../components/home/CalendarStrip';
import { useHomeData } from '../../hooks/useHomeData';

const COLORS = ['#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc'];

export default function HomeScreen() {
  const {
    notes,
    todos,
    loadNotes,
    loadTodos,
    addNote,
    deleteNote,
    addTodo,
    toggleTodo,
    deleteTodo
  } = useHomeData();

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [newTodo, setNewTodo] = useState('');
  const [showTodoInput, setShowTodoInput] = useState(false);
  const todoInputRef = useRef<TextInput>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);

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
      () => setNoteModalVisible(true)
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

  const handleAddNote = async () => {
    await addNote(title, content, selectedColor);
    setNoteModalVisible(false);
    setTitle('');
    setContent('');
    setSelectedColor(COLORS[0]);
  };

  const handleAddTodo = async () => {
    await addTodo(newTodo);
    setNewTodo('');
    setShowTodoInput(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        date={selectedDate}
        onCalendarPress={() => setCalendarVisible(true)}
      />

      {calendarVisible && (
        <CalendarStrip
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setCalendarVisible(false);
          }}
        />
      )}

      {showTodoInput && (
        <TodoInput
          ref={todoInputRef}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmit={handleAddTodo}
          onBlur={() => !newTodo && setShowTodoInput(false)}
        />
      )}

      <ScrollView style={styles.content}>
        <TodosSection
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
        <NotesSection
          notes={notes}
          onDeleteNote={deleteNote}
        />
      </ScrollView>

      <NewNoteModal
        visible={noteModalVisible}
        title={title}
        content={content}
        selectedColor={selectedColor}
        colors={COLORS}
        onChangeTitle={setTitle}
        onChangeContent={setContent}
        onSelectColor={setSelectedColor}
        onSave={handleAddNote}
        onClose={() => setNoteModalVisible(false)}
      />
    </SafeAreaView>
  );
}
