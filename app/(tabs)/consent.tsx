import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Shield, Check, X, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface ConsentRequest {
  id: string;
  requester: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'denied';
  dataRequested: string[];
  purpose: string;
  expiryDate: Date;
}

export default function ConsentScreen() {
  const [requests, setRequests] = useState<ConsentRequest[]>([]);
  const [activeRequests, setActiveRequests] = useState<ConsentRequest[]>([]);

  useEffect(() => {
    loadConsentRequests();
  }, []);

  const loadConsentRequests = () => {
    // Mock consent requests
    const mockRequests: ConsentRequest[] = [
      {
        id: '1',
        requester: 'Commercial Bank of Ethiopia',
        timestamp: new Date(Date.now() - 30000), // 30 seconds ago
        status: 'pending',
        dataRequested: ['Full Name', 'ID Number', 'Date of Birth'],
        purpose: 'Account Opening Verification',
        expiryDate: new Date(Date.now() + 300000), // 5 minutes from now
      },
      {
        id: '2',
        requester: 'Ethio Telecom Service Center',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'approved',
        dataRequested: ['Full Name', 'ID Number'],
        purpose: 'SIM Card Registration',
        expiryDate: new Date(Date.now() + 86400000), // 24 hours
      },
      {
        id: '3',
        requester: 'Ministry of Transport - License Office',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        status: 'denied',
        dataRequested: ['Full Name', 'ID Number', 'Address', 'Photo'],
        purpose: 'Driver License Application',
        expiryDate: new Date(Date.now() - 3600000), // Expired 1 hour ago
      },
    ];

    setRequests(mockRequests);
    setActiveRequests(mockRequests.filter(req => req.status === 'pending'));
  };

  const handleConsent = (requestId: string, approved: boolean) => {
    Alert.alert(
      approved ? 'Approve Access' : 'Deny Access',
      `Are you sure you want to ${approved ? 'approve' : 'deny'} this data access request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: approved ? 'Approve' : 'Deny',
          style: approved ? 'default' : 'destructive',
          onPress: () => {
            setRequests(prev =>
              prev.map(req =>
                req.id === requestId
                  ? { ...req, status: approved ? 'approved' : 'denied' }
                  : req
              )
            );
            setActiveRequests(prev => prev.filter(req => req.id !== requestId));
            
            // Log the consent decision
            console.log(`Consent ${approved ? 'approved' : 'denied'} for request ${requestId}`);
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'denied': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check size={16} color="#FFFFFF" />;
      case 'denied': return <X size={16} color="#FFFFFF" />;
      case 'pending': return <Clock size={16} color="#FFFFFF" />;
      default: return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Consent</Text>
        <Text style={styles.headerSubtitle}>
          Manage data access permissions for your digital identity
        </Text>
      </View>

      {activeRequests.length > 0 && (
        <View style={styles.alertSection}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color="#F59E0B" />
            <Text style={styles.alertTitle}>
              {activeRequests.length} Pending Request{activeRequests.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Text style={styles.alertText}>
            You have access requests waiting for your approval
          </Text>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {requests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <Text style={styles.requesterName}>{request.requester}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(request.status) }]}>
                {getStatusIcon(request.status)}
                <Text style={styles.statusText}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </Text>
              </View>
            </View>

            <Text style={styles.purpose}>{request.purpose}</Text>

            <View style={styles.dataSection}>
              <Text style={styles.dataTitle}>Requested Data:</Text>
              {request.dataRequested.map((data, index) => (
                <Text key={index} style={styles.dataItem}>• {data}</Text>
              ))}
            </View>

            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>
                Requested: {request.timestamp.toLocaleString()}
              </Text>
              <Text style={[
                styles.timeText,
                request.expiryDate < new Date() && styles.expiredText
              ]}>
                Expires: {request.expiryDate.toLocaleString()}
              </Text>
            </View>

            {request.status === 'pending' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.denyButton]}
                  onPress={() => handleConsent(request.id, false)}
                >
                  <X size={16} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Deny</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => handleConsent(request.id, true)}
                >
                  <Check size={16} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Approve</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {requests.length === 0 && (
          <View style={styles.emptyState}>
            <Shield size={48} color="#CCCCCC" />
            <Text style={styles.emptyTitle}>No Consent Requests</Text>
            <Text style={styles.emptySubtitle}>
              When institutions request access to your data, they'll appear here
            </Text>
          </View>
        )}
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
  alertSection: {
    margin: 24,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#92400E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  requesterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  purpose: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  dataSection: {
    marginBottom: 16,
  },
  dataTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  dataItem: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  timeInfo: {
    marginBottom: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  expiredText: {
    color: '#EF4444',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  denyButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
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