import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type NoteCardProps = {
  title: string;
  content: string;
  timestamp: string;
  color: string;
  onPress: () => void;
  onDelete: () => void;
};

export default function NoteCard({ title, content, timestamp, color, onPress, onDelete }: NoteCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#666" />
          </Pressable>
        </View>
        <Text style={styles.content} numberOfLines={3}>{content}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
});