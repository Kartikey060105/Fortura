import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import { useThemeColor } from '../../hooks/useThemeColor';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function BudgetScreen() {
  const { text, background, primary, warning, error } = useThemeColor();
  const screenWidth = Dimensions.get('window').width;

  const budgetProgress = {
    labels: ['Food', 'Transport', 'Shopping'],
    data: [0.8, 0.6, 0.9],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: text }]}>Monthly Budget</Text>
        <Text style={styles.subtitle}>April 2025</Text>
      </View>

      <Card style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Budget</Text>
            <Text style={styles.summaryAmount}>$5,000.00</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.summaryLabel}>Spent</Text>
            <Text style={[styles.summaryAmount, { color: warning }]}>$3,240.50</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.summaryLabel}>Remaining</Text>
            <Text style={[styles.summaryAmount, { color: primary }]}>$1,759.50</Text>
          </View>
        </View>
      </Card>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: text }]}>Category Progress</Text>
        <Card>
          <ProgressChart
            data={budgetProgress}
            width={screenWidth - 48}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
            }}
            hideLegend={false}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: text }]}>Categories</Text>
        <Card style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>Food & Dining</Text>
            <Text style={[styles.categoryAmount, { color: error }]}>$800 / $1,000</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '80%', backgroundColor: error }]} />
          </View>
        </Card>

        <Card style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>Transportation</Text>
            <Text style={styles.categoryAmount}>$300 / $500</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '60%', backgroundColor: primary }]} />
          </View>
        </Card>

        <Card style={styles.categoryCard}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>Shopping</Text>
            <Text style={[styles.categoryAmount, { color: error }]}>$450 / $500</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '90%', backgroundColor: error }]} />
          </View>
        </Card>
      </View>
    </ScrollView>
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
    opacity: 0.7,
    marginTop: 4,
  },
  summaryCard: {
    margin: 24,
    marginTop: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E9ECEF',
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
  categoryCard: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});