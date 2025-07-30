import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { Settings, Shield, Fingerprint, Bell, Info, LogOut, Trash2, Download } from 'lucide-react-native';

export default function SettingsScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'This will create an encrypted backup of your digital IDs and verification logs.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your stored IDs and logs. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete All', 
          style: 'destructive',
          onPress: () => console.log('Clearing all data...')
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out? You will need to authenticate again to access your digital IDs.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: () => console.log('Logging out...') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>
          Manage your security and privacy preferences
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Fingerprint size={20} color="#228B22" />
              <Text style={styles.settingLabel}>Biometric Authentication</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
              thumbColor={biometricEnabled ? '#228B22' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color="#228B22" />
              <Text style={styles.settingLabel}>Auto-Lock</Text>
            </View>
            <Switch
              value={autoLockEnabled}
              onValueChange={setAutoLockEnabled}
              trackColor={{ false: '#E5E7EB', true: '#BBF7D0' }}
              thumbColor={autoLockEnabled ? '#228B22' : '#9CA3AF'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Change PIN</Text>
            </View>
            <Text style={styles.settingValue}>•••••••••</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#F59E0B" />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#FEF3C7' }}
              thumbColor={notificationsEnabled ? '#F59E0B' : '#9CA3AF'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Notification Settings</Text>
            </View>
            <Text style={styles.settingValue}>Configure</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
            <View style={styles.settingInfo}>
              <Download size={20} color="#3B82F6" />
              <Text style={styles.settingLabel}>Export Data</Text>
            </View>
            <Text style={styles.settingValue}>Backup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
            <View style={styles.settingInfo}>
              <Trash2 size={20} color="#EF4444" />
              <Text style={styles.settingLabel}>Clear All Data</Text>
            </View>
            <Text style={[styles.settingValue, { color: '#EF4444' }]}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>App Version</Text>
            </View>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
            <Text style={styles.settingValue}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Terms of Service</Text>
            </View>
            <Text style={styles.settingValue}>View</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Digital Fayda Wallet v1.0.0{'\n'}
            Built for Ethiopian Digital Transformation
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 24,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
});