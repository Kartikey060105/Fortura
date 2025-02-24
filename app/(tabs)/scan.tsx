import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Platform, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!data) {
      setErrorMessage('Error: Unable to scan. Please try again.');
      return;
    }
    setScanned(true);
    setScannedData(data);
    setShowPaymentModal(true);
    setErrorMessage(null); // Reset error if scan is successful
  };

  const handlePayment = () => {
    if (scannedData) {
      Linking.openURL(scannedData); // Open scanned URL (e.g., UPI link, payment gateway)
    }
    setShowPaymentModal(false);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <LinearGradient colors={['#000000', '#1a237e']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan & Pay</Text>
        <Text style={styles.subtitle}>Quick and secure payments</Text>
      </View>

      <View style={styles.scannerContainer}>
        {Platform.OS === 'web' ? (
          <Text>QR scanning is only supported on mobile.</Text>
        ) : (
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Payment Details</Text>
            <Text style={styles.paymentText}>{scannedData}</Text>
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Text style={styles.payButtonText}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 16, marginTop: 4, color: 'rgba(255, 255, 255, 0.8)' },
  scannerContainer: { flex: 1, marginTop: 20, overflow: 'hidden' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' },
  modalContent: { backgroundColor: 'white', padding: 24, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  paymentText: { marginVertical: 16, fontSize: 16, textAlign: 'center' },
  payButton: { backgroundColor: '#1a237e', padding: 16, borderRadius: 10 },
  payButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
