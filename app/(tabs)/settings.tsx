import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../_layout';
import { styles } from '@/constants/settingsStyles';
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { useTheme } from '../../context/ThemeContext';
import { theme } from '../../constants/theme';

export default function SettingsScreen() {
  const { setIsAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [userData, setUserData] = React.useState<any>(null);
  
  const currentTheme = isDarkMode ? theme.dark : theme.light;

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

  const SettingItem = ({ icon, title, value, onPress, showToggle = false, showArrow = true }: SettingItemProps) => {
    const { isDarkMode } = useTheme();
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    return (
      <Pressable style={styles.settingItem} onPress={onPress}>
        <View style={styles.settingIcon}>
          <Ionicons name={icon} size={22} color={currentTheme.icon} />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: currentTheme.text }]}>{title}</Text>
          {value && <Text style={[styles.settingValue, { color: currentTheme.icon }]}>{value}</Text>}
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
          <Ionicons name="chevron-forward" size={20} color={currentTheme.icon} />
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.headerBackground }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Settings</Text>
      </View>

      <ScrollView style={[styles.content, { backgroundColor: currentTheme.background }]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Preferences</Text>
          <View style={[styles.sectionContent, { backgroundColor: currentTheme.sectionBackground }]}>
            <SettingItem
              icon="moon"
              title="Dark Mode"
              value={isDarkMode}
              onPress={toggleTheme}
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
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Account</Text>
          <View style={[styles.sectionContent, { backgroundColor: currentTheme.sectionBackground }]}>
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
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>About</Text>
          <View style={[styles.sectionContent, { backgroundColor: currentTheme.sectionBackground }]}>
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
