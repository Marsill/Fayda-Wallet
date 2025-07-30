import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { X, Upload, Camera } from 'lucide-react-native';

interface AddIDModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (idData: any) => void;
}

export function AddIDModal({ visible, onClose, onAdd }: AddIDModalProps) {
  const [selectedType, setSelectedType] = useState<string>('fayda');
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const idTypes = [
    { value: 'fayda', label: 'Ethiopian Fayda ID', color: '#228B22' },
    { value: 'driver', label: 'Driver License', color: '#3B82F6' },
    { value: 'passport', label: 'Ethiopian Passport', color: '#7C3AED' },
    { value: 'other', label: 'Other Document', color: '#6B7280' },
  ];

  const handleSubmit = () => {
    if (!name || !idNumber || !issuedDate || !expiryDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newID = {
      type: selectedType as 'fayda' | 'driver' | 'passport' | 'other',
      name,
      idNumber,
      issuedDate,
      expiryDate,
      photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    };

    onAdd(newID);
    
    // Reset form
    setName('');
    setIdNumber('');
    setIssuedDate('');
    setExpiryDate('');
    setSelectedType('fayda');
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New ID</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Document Type</Text>
            <View style={styles.typeSelector}>
              {idTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.typeOption,
                    selectedType === type.value && {
                      backgroundColor: type.color,
                      borderColor: type.color,
                    }
                  ]}
                  onPress={() => setSelectedType(type.value)}
                >
                  <Text style={[
                    styles.typeText,
                    selectedType === type.value && styles.typeTextActive
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ID Number *</Text>
              <TextInput
                style={styles.textInput}
                value={idNumber}
                onChangeText={setIdNumber}
                placeholder="Enter ID number"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Document Dates</Text>
            
            <View style={styles.dateRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Issued Date *</Text>
                <TextInput
                  style={styles.textInput}
                  value={issuedDate}
                  onChangeText={setIssuedDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Expiry Date *</Text>
                <TextInput
                  style={styles.textInput}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photo (Optional)</Text>
            <View style={styles.photoOptions}>
              <TouchableOpacity style={styles.photoButton}>
                <Camera size={20} color="#6B7280" />
                <Text style={styles.photoButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoButton}>
                <Upload size={20} color="#6B7280" />
                <Text style={styles.photoButtonText}>Upload Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>Add ID</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  typeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    marginBottom: 12,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  dateRow: {
    flexDirection: 'row',
  },
  photoOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 8,
  },
  photoButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  addButton: {
    flex: 1,
    paddingVertical: 16,
    marginLeft: 8,
    backgroundColor: '#228B22',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});