import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HeaderProps = {
  date: Date;
  onCalendarPress: () => void;
};

export default function Header({ date, onCalendarPress }: HeaderProps) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onCalendarPress} style={styles.calendarButton}>
        <Ionicons name="calendar" size={24} color="#666" />
      </Pressable>
      <Text style={styles.headerDate}>{formatDate(date)}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  calendarButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
});
