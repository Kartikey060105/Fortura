import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Card } from '../../components/Card';
import { useThemeColor } from '../../hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { text, background, primary, card } = useThemeColor();
  const router = useRouter();

  const handleMenuPress = (action: string) => {
    switch (action) {
      case 'edit-profile':
        Alert.alert('Edit Profile', 'Profile editing will be available soon!');
        break;
      case 'notifications':
        Alert.alert('Notifications', 'Notification settings will be available soon!');
        break;
      case 'linked-accounts':
        Alert.alert('Linked Accounts', 'Account linking will be available soon!');
        break;
      case 'currency':
        Alert.alert('Currency', 'Currency settings will be available soon!');
        break;
      case 'theme':
        Alert.alert('Theme', 'Theme settings will be available soon!');
        break;
      case 'language':
        Alert.alert('Language', 'Language settings will be available soon!');
        break;
      case 'password':
        Alert.alert('Change Password', 'Password change will be available soon!');
        break;
      case '2fa':
        Alert.alert('Two-Factor Auth', '2FA setup will be available soon!');
        break;
      case 'logout':
        router.replace('/login');
        break;
    }
  };

  return (
    <LinearGradient colors={['#000000', '#1a237e']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/029/364/950/small_2x/3d-carton-of-boy-going-to-school-ai-photo.jpg' }}
            style={styles.avatar}
          />
          <Text style={[styles.name, { color: 'white' }]}>Pratyush Mohanty</Text>
          <Text style={[styles.email, { color: 'rgba(255, 255, 255, 0.7)' }]}>
            pratyush.24bcs10238@sst.scaler.com
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: 'white' }]}>Account Settings</Text>
          
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('edit-profile')}>
              <MaterialCommunityIcons name="account-edit" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Edit Profile</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('notifications')}>
              <MaterialCommunityIcons name="bell" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Notifications</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('linked-accounts')}>
              <MaterialCommunityIcons name="bank" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Linked Accounts</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: 'white' }]}>Preferences</Text>
          
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('currency')}>
              <MaterialCommunityIcons name="currency-usd" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Currency</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('theme')}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Theme</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('language')}>
              <MaterialCommunityIcons name="translate" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Language</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: 'white' }]}>Security</Text>
          
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('password')}>
              <MaterialCommunityIcons name="lock" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Change Password</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('2fa')}>
              <MaterialCommunityIcons name="shield-check" size={24} color={primary} />
              <Text style={[styles.menuText, { color: text }]}>Two-Factor Auth</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
            </TouchableOpacity>
          </Card>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: card }]}
            onPress={() => handleMenuPress('logout')}>
            <Text style={[styles.logoutText, { color: primary }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  logoutButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});