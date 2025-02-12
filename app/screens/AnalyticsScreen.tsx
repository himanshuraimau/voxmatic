import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalyticsScreen() {
  // Mock data for analytics
  const stats = {
    totalTodos: 15,
    completedTodos: 10,
    totalJournals: 8,
    thisWeekEntries: 5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Analytics</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalTodos}</Text>
            <Text style={styles.statLabel}>Total Todos</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.completedTodos}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalJournals}</Text>
            <Text style={styles.statLabel}>Journal Entries</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.thisWeekEntries}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(stats.completedTodos / stats.totalTodos) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round((stats.completedTodos / stats.totalTodos) * 100)}% Tasks Completed
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    color: '#444',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#f3c988',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressSection: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f3c988',
  },
  progressText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666',
  },
});