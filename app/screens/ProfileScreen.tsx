import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


export default function ProfileScreen({ navigation }:any) {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
      </View>

      <View style={[styles.profileSection, { borderBottomColor: colors.border }]}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=profile%20picture%20minimal%20abstract&aspect=1:1' }}
            style={styles.avatar}
          />
        </View>
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={[styles.menuItem, { borderBottomColor: colors.border }]}
          onPress={toggleTheme}
        >
          <Feather name={theme === 'dark' ? 'moon' : 'sun'} size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <View style={styles.themeToggle}>
            <View style={[
              styles.toggleIndicator, 
              { backgroundColor: theme === 'dark' ? colors.primary : colors.textSecondary }
            ]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Feather name="settings" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
          <Feather name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Feather name="bell" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Notifications</Text>
          <Feather name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.border }]}>
          <Feather name="help-circle" size={24} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
          <Feather name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutButton]}
          onPress={() => navigation.navigate('Auth')}
        >
          <Feather name="log-out" size={24} color="#ff4444" />
          <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#f3c988',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ff4444',
  },
  themeToggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#eee',
    padding: 2,
    justifyContent: 'center',
  },
  toggleIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    alignSelf: 'flex-start',
  },
});