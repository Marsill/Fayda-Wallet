import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';

interface QRGeneratorProps {
  data: string;
  size?: number;
}

export function QRGenerator({ data, size = 200 }: QRGeneratorProps) {
  // For demo purposes, we'll show a placeholder QR code
  // In a real implementation, you would use a proper QR code library
  
  return (
    <View style={styles.container}>
      <View style={[styles.qrPlaceholder, { width: size, height: size }]}>
        <Text style={styles.qrText}>QR</Text>
        <Text style={styles.qrSubtext}>Secure Code</Text>
      </View>
      <Text style={styles.instructions}>
        Show this QR code to verification agents
      </Text>
      <Text style={styles.dataPreview}>
        Data: {data.substring(0, 50)}...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  qrPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#228B22',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // Create a pattern to simulate QR code appearance
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#228B22',
    marginBottom: 4,
  },
  qrSubtext: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  instructions: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  dataPreview: {
    fontSize: 10,
    color: '#9CA3AF',
    fontFamily: 'monospace',
    textAlign: 'center',
    maxWidth: 250,
  },
});