import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import NoteCard from '../NoteCard';
import { styles } from '@/constants/tabIndexStyles';

type Note = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  color: string;
};

interface NotesSectionProps {
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

export default function NotesSection({ notes, onDeleteNote }: NotesSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Link href="../notes" asChild>
          <Pressable style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#f4b400" />
          </Pressable>
        </Link>
      </View>
      <View style={styles.notesList}>
        {notes.slice(0, 2).map(note => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            timestamp={note.timestamp}
            color={note.color}
            onPress={() => {}}
            onDelete={() => onDeleteNote(note.id)}
          />
        ))}
      </View>
    </View>
  );
}
