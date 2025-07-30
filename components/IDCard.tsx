import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Eye, EyeOff, QrCode, Calendar } from 'lucide-react-native';

interface IDCardProps {
  data: {
    id: string;
    type: 'fayda' | 'driver' | 'passport' | 'other';
    name: string;
    idNumber: string;
    issuedDate: string;
    expiryDate: string;
    photo?: string;
  };
  isVisible: boolean;
}

export function IDCard({ data, isVisible }: IDCardProps) {
  const getCardColor = (type: string) => {
    switch (type) {
      case 'fayda': return '#228B22';
      case 'driver': return '#3B82F6';
      case 'passport': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  const getCardTitle = (type: string) => {
    switch (type) {
      case 'fayda': return 'Ethiopian Fayda ID';
      case 'driver': return 'Driver License';
      case 'passport': return 'Ethiopian Passport';
      default: return 'Identity Document';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ET', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const maskIDNumber = (idNumber: string) => {
    if (!isVisible) {
      return idNumber.replace(/.(?=.{4})/g, '•');
    }
    return idNumber;
  };

  return (
    <View style={[styles.card, { borderColor: getCardColor(data.type) }]}>
      <View style={[styles.cardHeader, { backgroundColor: getCardColor(data.type) }]}>
        <Text style={styles.cardTitle}>{getCardTitle(data.type)}</Text>
        <TouchableOpacity style={styles.qrButton}>
          <QrCode size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.mainInfo}>
          {data.photo && (
            <Image source={{ uri: data.photo }} style={styles.photo} />
          )}
          <View style={styles.nameSection}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.idNumber}>{maskIDNumber(data.idNumber)}</Text>
          </View>
        </View>

        <View style={styles.dateInfo}>
          <View style={styles.dateItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.dateLabel}>Issued</Text>
            <Text style={styles.dateValue}>{formatDate(data.issuedDate)}</Text>
          </View>
          <View style={styles.dateItem}>
            <Calendar size={14} color="#6B7280" />
            <Text style={styles.dateLabel}>Expires</Text>
            <Text style={styles.dateValue}>{formatDate(data.expiryDate)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.securityText}>🔒 Secured with biometric protection</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  qrButton: {
    padding: 4,
  },
  cardContent: {
    padding: 20,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  idNumber: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#6B7280',
    fontWeight: '500',
  },
  dateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    marginRight: 8,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  cardFooter: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  securityText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});