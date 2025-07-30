import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Camera, Scan } from 'lucide-react-native';

interface QRScannerProps {
  onScanResult: (data: string) => void;
}

export function QRScanner({ onScanResult }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockQRData = JSON.stringify({
        userId: 'FYD-2024-001234',
        timestamp: new Date().toISOString(),
        hash: `sha256_${Date.now()}_${Math.random().toString(36)}`,
        expiry: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        verificationId: `VER-${Date.now()}`,
      });
      
      setIsScanning(false);
      onScanResult(mockQRData);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scannerFrame}>
        <View style={styles.scannerOverlay}>
          {isScanning ? (
            <View style={styles.scanningIndicator}>
              <Text style={styles.scanningText}>Scanning...</Text>
              <View style={styles.scanLine} />
            </View>
          ) : (
            <View style={styles.scanPrompt}>
              <Camera size={48} color="#228B22" />
              <Text style={styles.promptText}>Position QR code within frame</Text>
            </View>
          )}
        </View>
        
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>

      <TouchableOpacity 
        style={styles.scanButton}
        onPress={simulateScan}
        disabled={isScanning}
      >
        <Scan size={20} color="#FFFFFF" />
        <Text style={styles.scanButtonText}>
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Align the QR code within the frame to scan and verify identity
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  scannerFrame: {
    width: 250,
    height: 250,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 32,
  },
  scannerOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningIndicator: {
    alignItems: 'center',
  },
  scanningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#228B22',
    marginBottom: 16,
  },
  scanLine: {
    width: 200,
    height: 2,
    backgroundColor: '#228B22',
    borderRadius: 1,
  },
  scanPrompt: {
    alignItems: 'center',
  },
  promptText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    maxWidth: 180,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#228B22',
    borderTopLeftRadius: 4,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#228B22',
    borderTopRightRadius: 4,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#228B22',
    borderBottomLeftRadius: 4,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#228B22',
    borderBottomRightRadius: 4,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  instructions: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 280,
  },
});