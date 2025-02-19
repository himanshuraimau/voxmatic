import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    value?: boolean | string;
    onPress: () => void;
    showToggle?: boolean;
    showArrow?: boolean;
  }

  const SettingItem = ({ icon, title, value, onPress, showToggle = false, showArrow = true }: SettingItemProps) => (
    <Pressable style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={22} color="#666" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {showToggle && (
        <Switch
          value={typeof value === 'boolean' ? value : false}
          onValueChange={onPress}
          trackColor={{ false: '#ddd', true: '#f4b400' }}
          thumbColor="#fff"
        />
      )}
      {showArrow && !showToggle && (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="moon"
              title="Dark Mode"
              value={isDarkMode}
              onPress={() => setIsDarkMode(!isDarkMode)}
              showToggle
            />
            <SettingItem
              icon="notifications"
              title="Notifications"
              value={notifications}
              onPress={() => setNotifications(!notifications)}
              showToggle
            />
            <SettingItem
              icon="color-palette"
              title="Theme"
              value="Yellow"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="person"
              title="Profile"
              value="John Doe"
              onPress={() => {}}
            />
            <SettingItem
              icon="cloud-upload"
              title="Backup"
              value="Last backup: Today"
              onPress={() => {}}
            />
            <SettingItem
              icon="lock-closed"
              title="Privacy"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="information-circle"
              title="Version"
              value="1.0.0"
              showArrow={false}
              onPress={() => {}}
            />
            <SettingItem
              icon="help-circle"
              title="Help & Support"
              onPress={() => {}}
            />
            <SettingItem
              icon="document-text"
              title="Terms of Service"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});