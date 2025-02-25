import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';

type CalendarStripProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function CalendarStrip({ selectedDate, onSelectDate }: CalendarStripProps) {
  const generateCalendarDays = () => {
    const days = [];
    for (let i = -15; i <= 15; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <ScrollView horizontal style={styles.calendarStrip}>
      {generateCalendarDays().map((date, index) => (
        <Pressable
          key={index}
          style={[
            styles.dateButton,
            date.toDateString() === selectedDate.toDateString() && styles.selectedDate
          ]}
          onPress={() => onSelectDate(date)}
        >
          <Text style={[
            styles.dateText,
            date.toDateString() === selectedDate.toDateString() && styles.selectedDateText
          ]}>
            {date.getDate()}
          </Text>
          <Text style={[
            styles.dayText,
            date.toDateString() === selectedDate.toDateString() && styles.selectedDateText
          ]}>
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarStrip: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dateButton: {
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedDate: {
    backgroundColor: '#f4b400',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectedDateText: {
    color: '#fff',
  },
});
