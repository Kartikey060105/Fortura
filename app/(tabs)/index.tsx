import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Card } from '../../components/Card';
import { useThemeColor } from '../../hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory-native';

export default function OverviewScreen() {
  const { text, primary, background, success, warning, error } = useThemeColor();

  const cashFlowData = [
    { x: 'Jan', y: 20000 },
    { x: 'Feb', y: 45000 },
    { x: 'Mar', y: 28000 },
    { x: 'Apr', y: 80000 },
    { x: 'May', y: 99000 },
    { x: 'Jun', y: 43000 },
  ];


  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: text }]}>Welcome back,</Text>
          <Text style={[styles.name, { color: text }]}>Pratyush</Text>
        </View>
        <TouchableOpacity style={[styles.aiButton, { backgroundColor: primary }]}>
          <MaterialCommunityIcons name="robot" size={20} color="white" />
          <Text style={styles.aiButtonText}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$84,532.00</Text>
        <Text style={[styles.trend, { color: success }]}>↑ 2.3% from last month</Text>
        <View style={styles.aiInsightBadge}>
          <MaterialCommunityIcons name="trending-up" size={16} color={success} />
          <Text style={[styles.aiInsightText, { color: success }]}>
            Positive cash flow trend detected
          </Text>
        </View>
      </Card>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: text }]}>Cash Flow Forecast</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={[styles.moreButtonText, { color: primary }]}>Details</Text>
          </TouchableOpacity>
        </View>
        <Card>
          <View style={styles.chartContainer}>
            <VictoryChart
              theme={VictoryTheme.material}
              height={220}
              padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
              containerComponent={<VictoryContainer responsive={true} />}>
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
                  axis: { stroke: text },
                  tickLabels: { fill: text, fontSize: 10 },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `$${t/1000}k`}
                style={{
                  axis: { stroke: text },
                  tickLabels: { fill: text, fontSize: 10 },
                }}
              />
              <VictoryLine
                data={cashFlowData}
                style={{
                  data: { stroke: primary },
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
              />
            </VictoryChart>
          </View>
          <View style={[styles.aiAlert, { backgroundColor: warning + '20', borderColor: warning }]}>
            <MaterialCommunityIcons name="alert-circle" size={20} color={warning} />
            <Text style={[styles.aiAlertText, { color: warning }]}>
              Potential cash flow dip predicted in August. Consider adjusting expenses.
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: text }]}>AI Optimization Insights</Text>
        
        <Card style={[styles.insightCard, { borderLeftColor: success }]}>
          <View style={styles.insightHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={24} color={success} />
            <Text style={[styles.insightTitle, { color: success }]}>Cost Saving Opportunity</Text>
          </View>
          <Text style={styles.insightText}>
            Switch to annual software subscriptions to save $2,400/year. 5 subscriptions identified.
          </Text>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: success }]}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.insightCard, { borderLeftColor: primary }]}>
          <View style={styles.insightHeader}>
            <MaterialCommunityIcons name="chart-timeline-variant" size={24} color={primary} />
            <Text style={[styles.insightTitle, { color: primary }]}>Investment Opportunity</Text>
          </View>
          <Text style={styles.insightText}>
            Market conditions favorable for expanding investment portfolio. Expected ROI: 12-15%
          </Text>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: primary }]}>
            <Text style={styles.actionButtonText}>Analyze Options</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.insightCard, { borderLeftColor: error }]}>
          <View style={styles.insightHeader}>
            <MaterialCommunityIcons name="alert" size={24} color={error} />
            <Text style={[styles.insightTitle, { color: error }]}>Risk Alert</Text>
          </View>
          <Text style={styles.insightText}>
            Vendor payment clustering detected. Recommend spreading payments to optimize cash flow.
          </Text>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: error }]}>
            <Text style={styles.actionButtonText}>Optimize Schedule</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    opacity: 0.8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    gap: 8,
  },
  aiButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  balanceCard: {
    margin: 24,
    marginTop: 0,
  },
  balanceLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trend: {
    fontSize: 14,
    marginBottom: 12,
  },
  aiInsightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00B89420',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  aiInsightText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartContainer: {
    marginVertical: 8,
  },
  aiAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  aiAlertText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  insightCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  actionButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});