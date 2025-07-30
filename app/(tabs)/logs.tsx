import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { FileText, Check, X, Shield, Clock, Hash } from 'lucide-react-native';

interface VerificationLog {
  id: string;
  timestamp: Date;
  action: 'qr_generated' | 'qr_scanned' | 'consent_approved' | 'consent_denied' | 'auth_success' | 'auth_failed';
  requester?: string;
  hash: string;
  details: string;
  status: 'success' | 'failed' | 'pending';
}

export default function LogsScreen() {
  const [logs, setLogs] = useState<VerificationLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');

  useEffect(() => {
    loadVerificationLogs();
  }, []);

  const loadVerificationLogs = () => {
    // Mock verification logs with blockchain-style hashing
    const mockLogs: VerificationLog[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        action: 'qr_generated',
        hash: 'sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
        details: 'Secure QR code generated for identity verification',
        status: 'success',
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        action: 'consent_approved',
        requester: 'Commercial Bank of Ethiopia',
        hash: 'sha256:b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7',
        details: 'Data access approved for account opening verification',
        status: 'success',
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        action: 'auth_success',
        hash: 'sha256:c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8',
        details: 'Biometric authentication successful',
        status: 'success',
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        action: 'consent_denied',
        requester: 'Unknown Service Provider',
        hash: 'sha256:d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9',
        details: 'Data access denied - suspicious request',
        status: 'success',
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        action: 'auth_failed',
        hash: 'sha256:e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
        details: 'Failed biometric authentication attempt',
        status: 'failed',
      },
    ];

    setLogs(mockLogs);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'qr_generated': return <Shield size={16} color="#3B82F6" />;
      case 'qr_scanned': return <Shield size={16} color="#10B981" />;
      case 'consent_approved': return <Check size={16} color="#10B981" />;
      case 'consent_denied': return <X size={16} color="#EF4444" />;
      case 'auth_success': return <Check size={16} color="#10B981" />;
      case 'auth_failed': return <X size={16} color="#EF4444" />;
      default: return <FileText size={16} color="#6B7280" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'qr_generated': return '#3B82F6';
      case 'qr_scanned': return '#10B981';
      case 'consent_approved': return '#10B981';
      case 'consent_denied': return '#EF4444';
      case 'auth_success': return '#10B981';
      case 'auth_failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getActionTitle = (action: string) => {
    switch (action) {
      case 'qr_generated': return 'QR Code Generated';
      case 'qr_scanned': return 'QR Code Scanned';
      case 'consent_approved': return 'Consent Approved';
      case 'consent_denied': return 'Consent Denied';
      case 'auth_success': return 'Authentication Success';
      case 'auth_failed': return 'Authentication Failed';
      default: return 'Unknown Action';
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.status === filter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verification Logs</Text>
        <Text style={styles.headerSubtitle}>
          Blockchain-style tamper-proof activity records
        </Text>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filter by Status:</Text>
        <View style={styles.filterButtons}>
          {['all', 'success', 'failed'].map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={[
                styles.filterButton,
                filter === filterType && styles.filterButtonActive
              ]}
              onPress={() => setFilter(filterType as any)}
            >
              <Text style={[
                styles.filterButtonText,
                filter === filterType && styles.filterButtonTextActive
              ]}>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredLogs.map((log) => (
          <View key={log.id} style={styles.logCard}>
            <View style={styles.logHeader}>
              <View style={styles.actionInfo}>
                {getActionIcon(log.action)}
                <Text style={[styles.actionTitle, { color: getActionColor(log.action) }]}>
                  {getActionTitle(log.action)}
                </Text>
              </View>
              <View style={styles.timeInfo}>
                <Clock size={14} color="#9CA3AF" />
                <Text style={styles.timeText}>
                  {log.timestamp.toLocaleTimeString()}
                </Text>
              </View>
            </View>

            <Text style={styles.logDetails}>{log.details}</Text>

            {log.requester && (
              <Text style={styles.requesterText}>
                Requester: {log.requester}
              </Text>
            )}

            <View style={styles.hashSection}>
              <Hash size={14} color="#6B7280" />
              <Text style={styles.hashText}>
                {log.hash}
              </Text>
            </View>

            <View style={[
              styles.statusBadge,
              { backgroundColor: log.status === 'success' ? '#DCFCE7' : '#FEE2E2' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: log.status === 'success' ? '#166534' : '#991B1B' }
              ]}>
                {log.status === 'success' ? 'Verified' : 'Failed'}
              </Text>
            </View>
          </View>
        ))}

        {filteredLogs.length === 0 && (
          <View style={styles.emptyState}>
            <FileText size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No Logs Found</Text>
            <Text style={styles.emptySubtitle}>
              No verification logs match the selected filter
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.blockchainInfo}>
        <Text style={styles.blockchainTitle}>🔗 Blockchain Security</Text>
        <Text style={styles.blockchainText}>
          All activities are cryptographically hashed and stored in a tamper-proof ledger. 
          Each entry is linked to the previous one, ensuring complete audit trail integrity.
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
  filterSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#228B22',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  logDetails: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  requesterText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  hashSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  hashText: {
    fontSize: 10,
    color: '#6B7280',
    fontFamily: 'monospace',
    marginLeft: 6,
    flex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
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
  blockchainInfo: {
    margin: 24,
    padding: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  blockchainTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 8,
  },
  blockchainText: {
    fontSize: 12,
    color: '#0369A1',
    lineHeight: 16,
  },
});