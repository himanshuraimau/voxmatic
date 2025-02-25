import React from 'react';
import { View, Text, Pressable, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/constants/tabIndexStyles';

interface NewNoteModalProps {
  visible: boolean;
  title: string;
  content: string;
  selectedColor: string;
  colors: string[];
  onChangeTitle: (text: string) => void;
  onChangeContent: (text: string) => void;
  onSelectColor: (color: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function NewNoteModal({
  visible,
  title,
  content,
  selectedColor,
  colors,
  onChangeTitle,
  onChangeContent,
  onSelectColor,
  onSave,
  onClose,
}: NewNoteModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: selectedColor }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Note</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable>
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={onChangeTitle}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="Note content"
            value={content}
            onChangeText={onChangeContent}
            multiline
          />

          <View style={styles.colorPicker}>
            {colors.map(color => (
              <Pressable
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => onSelectColor(color)}
              />
            ))}
          </View>

          <Pressable style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save Note</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
