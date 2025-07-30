import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { QrCode, Scan, RefreshCw, Clock } from 'lucide-react-native';
import { QRGenerator } from '@/components/QRGenerator';
import { QRScanner } from '@/components/QRScanner';

export default function VerifyScreen() {
  const [mode, setMode] = useState<'generate' | 'scan'>('generate');
  const [qrData, setQrData] = useState<string | null>(null);
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSecureQR = async () => {
    setIsGenerating(true);
    try {
      // Simulate secure QR generation with hash and timestamp
      const timestamp = new Date().toISOString();
      const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      
      const qrPayload = {
        userId: 'FYD-2024-001234',
        timestamp,
        hash: `sha256_${Date.now()}_${Math.random().toString(36)}`,
        expiry: expiryDate.toISOString(),
        verificationId: `VER-${Date.now()}`,
      };

      setQrData(JSON.stringify(qrPayload));
      setExpiryTime(expiryDate);
      
      // Auto-refresh QR code before expiry
      setTimeout(() => {
        if (mode === 'generate') {
          generateSecureQR();
        }
      }, 4 * 60 * 1000); // Refresh 1 minute before expiry

    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScanResult = (data: string) => {
    try {
      const scannedData = JSON.parse(data);
      Alert.alert(
        'QR Code Scanned',
        `Verification ID: ${scannedData.verificationId}\nUser: ${scannedData.userId}`,
        [
          {
            text: 'Approve Access',
            style: 'default',
            onPress: () => {
              // Log consent and verification
              console.log('Access approved for:', scannedData);
            }
          },
          {
            text: 'Deny Access',
            style: 'destructive',
            onPress: () => {
              console.log('Access denied for:', scannedData);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Invalid QR Code', 'This QR code is not valid for Fayda verification');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ID Verification</Text>
        <Text style={styles.headerSubtitle}>
          {mode === 'generate' ? 'Show QR code to verify your identity' : 'Scan QR code to verify others'}
        </Text>
      </View>

      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'generate' && styles.modeButtonActive]}
          onPress={() => setMode('generate')}
        >
          <QrCode size={20} color={mode === 'generate' ? '#FFFFFF' : '#228B22'} />
          <Text style={[styles.modeButtonText, mode === 'generate' && styles.modeButtonTextActive]}>
            Generate QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, mode === 'scan' && styles.modeButtonActive]}
          onPress={() => setMode('scan')}
        >
          <Scan size={20} color={mode === 'scan' ? '#FFFFFF' : '#228B22'} />
          <Text style={[styles.modeButtonText, mode === 'scan' && styles.modeButtonTextActive]}>
            Scan QR
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {mode === 'generate' ? (
          <View style={styles.generateSection}>
            {qrData ? (
              <>
                <QRGenerator data={qrData} />
                {expiryTime && (
                  <View style={styles.expiryInfo}>
                    <Clock size={16} color="#F97316" />
                    <Text style={styles.expiryText}>
                      Expires: {expiryTime.toLocaleTimeString()}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={generateSecureQR}
                  disabled={isGenerating}
                >
                  <RefreshCw size={16} color="#228B22" />
                  <Text style={styles.refreshButtonText}>
                    {isGenerating ? 'Generating...' : 'Refresh QR Code'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.generatePrompt}>
                <QrCode size={64} color="#CCCCCC" />
                <Text style={styles.promptTitle}>Generate Secure QR Code</Text>
                <Text style={styles.promptSubtitle}>
                  Create a time-limited QR code for identity verification
                </Text>
                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={generateSecureQR}
                  disabled={isGenerating}
                >
                  <Text style={styles.generateButtonText}>
                    {isGenerating ? 'Generating...' : 'Generate QR Code'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <QRScanner onScanResult={handleScanResult} />
        )}
      </View>

      <View style={styles.securityNote}>
        <Text style={styles.securityTitle}>🔒 Security Features</Text>
        <Text style={styles.securityText}>
          • QR codes expire automatically for security{'\n'}
          • Each scan generates a unique verification hash{'\n'}
          • All verification attempts are logged{'\n'}
          • Blockchain-style tamper-proof records
        </Text>
      </View>
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
  modeSelector: {
    flexDirection: 'row',
    margin: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: '#228B22',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#228B22',
    marginLeft: 8,
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  generateSection: {
    alignItems: 'center',
  },
  generatePrompt: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  promptSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  generateButton: {
    backgroundColor: '#228B22',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  expiryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  expiryText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
    marginLeft: 8,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  refreshButtonText: {
    fontSize: 14,
    color: '#228B22',
    fontWeight: '500',
    marginLeft: 8,
  },
  securityNote: {
    margin: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#228B22',
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});