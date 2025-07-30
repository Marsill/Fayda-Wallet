import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Plus, Shield, Eye, EyeOff, Fingerprint } from 'lucide-react-native';
import { AuthService } from '@/services/AuthService';
import { IDCard } from '@/components/IDCard';
import { AddIDModal } from '@/components/AddIDModal';

interface StoredID {
  id: string;
  type: 'fayda' | 'driver' | 'passport' | 'other';
  name: string;
  idNumber: string;
  issuedDate: string;
  expiryDate: string;
  photo?: string;
  additionalData?: any;
}

export default function WalletScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storedIDs, setStoredIDs] = useState<StoredID[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(false);

  useEffect(() => {
    loadStoredIDs();
  }, []);

  const loadStoredIDs = async () => {
    // Load stored IDs from secure storage
    const mockIDs: StoredID[] = [
      {
        id: '1',
        type: 'fayda',
        name: 'Marsilas Wondimagegnehu',
        idNumber: 'FYD-2024-001234',
        issuedDate: '2024-01-15',
        expiryDate: '2034-01-15',
        photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
    ];
    setStoredIDs(mockIDs);
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    try {
      const result = await AuthService.authenticateWithBiometrics();
      if (result.success) {
        setIsAuthenticated(true);
        setIsDataVisible(true);
      } else {
        Alert.alert('Authentication Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddID = (newID: Omit<StoredID, 'id'>) => {
    const id = Date.now().toString();
    setStoredIDs(prev => [...prev, { ...newID, id }]);
    setShowAddModal(false);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authContent}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }}
            style={styles.logo}
          />
          <Text style={styles.authTitle}>Digital Fayda Wallet</Text>
          <Text style={styles.authSubtitle}>Secure your identity with biometric protection</Text>
          
          <TouchableOpacity 
            style={styles.biometricButton}
            onPress={handleBiometricAuth}
            disabled={isLoading}
          >
            <Fingerprint size={24} color="#FFFFFF" />
            <Text style={styles.biometricButtonText}>
              {isLoading ? 'Authenticating...' : 'Authenticate with Biometrics'}
            </Text>
          </TouchableOpacity>

          <View style={styles.securityNotice}>
            <Shield size={16} color="#228B22" />
            <Text style={styles.securityText}>Your data is protected with end-to-end encryption</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Digital IDs</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setIsDataVisible(!isDataVisible)}
          >
            {isDataVisible ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {storedIDs.map((id) => (
          <IDCard 
            key={id.id} 
            data={id} 
            isVisible={isDataVisible}
          />
        ))}

        {storedIDs.length === 0 && (
          <View style={styles.emptyState}>
            <Shield size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No IDs Added Yet</Text>
            <Text style={styles.emptySubtitle}>Add your first digital ID to get started</Text>
          </View>
        )}
      </ScrollView>

      <AddIDModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 24,
  },
  authContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 24,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    minWidth: 280,
    justifyContent: 'center',
  },
  biometricButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  securityText: {
    fontSize: 14,
    color: '#0369A1',
    marginLeft: 8,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityButton: {
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#228B22',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});