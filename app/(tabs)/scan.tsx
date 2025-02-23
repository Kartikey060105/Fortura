import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';
import { Card } from '../../components/Card';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScanScreen() {
  const { text, background, primary, success } = useThemeColor();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScannedData(data);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setPaymentStatus('pending');
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      // Close modal after showing success
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentStatus(null);
        setScanned(false);
      }, 2000);
    }, 2000);
  };

  if (hasPermission === null) {
    return (
      <LinearGradient colors={['#000000', '#1a237e']} style={styles.container}>
        <Text style={[styles.text, { color: text }]}>Requesting camera permission...</Text>
      </LinearGradient>
    );
  }

  if (hasPermission === false) {
    return (
      <LinearGradient colors={['#000000', '#1a237e']} style={styles.container}>
        <Text style={[styles.text, { color: text }]}>No access to camera</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#000000', '#1a237e']} style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: 'white' }]}>Scan & Pay</Text>
        <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
          Quick and secure payments
        </Text>
      </View>

      <View style={styles.scannerContainer}>
        {Platform.OS !== 'web' ? (
          <Camera
            style={styles.scanner}
            type={Camera.Constants.Type.back}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.scannerOverlay}>
              <View style={[styles.scannerFrame, { borderColor: primary }]} />
            </View>
          </Camera>
        ) : (
          <View style={styles.webPlaceholder}>
            <Text style={styles.webPlaceholderText}>
              Camera access is not available on web.
              Please use a mobile device for scanning.
            </Text>
          </View>
        )}
      </View>

      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}>
        <View style={styles.modalOverlay}>
          <Card style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: text }]}>Payment Details</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowPaymentModal(false);
                  setScanned(false);
                }}
                style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color={text} />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentDetails}>
              <Text style={[styles.amount, { color: text }]}>
                {scannedData ? `Scanned: ${scannedData}` : '$0.00'}
              </Text>
            </View>

            {paymentStatus === 'pending' ? (
              <View style={styles.processingContainer}>
                <MaterialCommunityIcons name="loading" size={48} color={primary} />
                <Text style={[styles.processingText, { color: text }]}>
                  Processing Payment...
                </Text>
              </View>
            ) : paymentStatus === 'success' ? (
              <View style={styles.successContainer}>
                <MaterialCommunityIcons name="check-circle" size={48} color={success} />
                <Text style={[styles.successText, { color: success }]}>
                  Payment Successful!
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.payButton, { backgroundColor: primary }]}
                onPress={handlePayment}>
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            )}
          </Card>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  scannerContainer: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
  },
  scanner: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderRadius: 20,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    margin: 20,
    borderRadius: 20,
  },
  webPlaceholderText: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  paymentDetails: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  payButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  processingContainer: {
    alignItems: 'center',
    padding: 24,
  },
  processingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  successContainer: {
    alignItems: 'center',
    padding: 24,
  },
  successText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
});