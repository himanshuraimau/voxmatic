import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../_layout';
import { styles } from '@/constants/settingsStyles';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function SettingsScreen() {
  const { setIsAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      router.replace('/sign-up');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
              value={userData?.name || 'Loading...'}
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
            <SettingItem
              icon="log-out"
              title="Logout"
              onPress={() => {

                Alert.alert(
                  "Logout",
                  "Are you sure you want to logout?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Logout", onPress: handleLogout, style: "destructive" }
                  ]
                );
              }}
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
