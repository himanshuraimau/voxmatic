import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/constants/analyticsStyles';

export default function AnalyticsScreen() {
  const stats = {
    totalNotes: 12,
    totalTodos: 8,
    completedTodos: 5,
    activeNotes: 7,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color="#f4b400" />
            <Text style={styles.statNumber}>{stats.totalNotes}</Text>
            <Text style={styles.statLabel}>Total Notes</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="checkbox" size={24} color="#f4b400" />
            <Text style={styles.statNumber}>{stats.totalTodos}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>{stats.completedTodos}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="bookmark" size={24} color="#f4b400" />
            <Text style={styles.statNumber}>{stats.activeNotes}</Text>
            <Text style={styles.statLabel}>Active Notes</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Activity Overview</Text>
          <View style={styles.placeholderChart}>
            <Text style={styles.placeholderText}>Activity Chart Coming Soon</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

