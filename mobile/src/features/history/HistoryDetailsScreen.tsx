import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import { formatAmount, getHistoryById } from './data';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type HistoryDetailsRouteProp = RouteProp<AppStackParamList, 'HistoryDetails'>;
type HistoryDetailsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'HistoryDetails'
>;

type DetailRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

/**
 * DetailRow
 * ---------
 * Small reusable label/value pair for the details card.
 */
const DetailRow: React.FC<DetailRowProps> = ({ label, value, strong = false }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <View style={styles.detailBlock}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={strong ? styles.detailValueStrong : styles.detailValue}>{value}</Text>
    </View>
  );
};

/**
 * HistoryDetailsScreen
 * --------------------
 * Full booking details for a selected service history item.
 */
export const HistoryDetailsScreen: React.FC = () => {
  const navigation = useNavigation<HistoryDetailsNavigationProp>();
  const route = useRoute<HistoryDetailsRouteProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const item = getHistoryById(route.params.historyId);

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        {!item ? (
          <View style={styles.missingState}>
            <Text style={styles.emptyTitle}>Booking not found</Text>
            <Text style={styles.emptySubtitle}>
              This service history item is no longer available.
            </Text>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={[styles.detailsButton, { marginTop: 20 }]}>
              <Text style={styles.detailsButtonText}>Go Back</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.detailsScrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.detailsHeaderRow}>
              <Pressable
                onPress={() => navigation.goBack()}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
              </Pressable>

              <View style={styles.detailsHeaderText}>
                <Text style={styles.detailsTitle} accessibilityRole="header">
                  Booking Details
                </Text>
                <Text style={styles.detailsSubtitle}>{item.serviceType}</Text>
              </View>
            </View>

            {/* Details card */}
            <View style={styles.detailsCard}>
              <DetailRow label="Booking ID" value={item.bookingId} strong />
              <DetailRow label="Service Type" value={item.serviceType} />
              <DetailRow label="Provider" value={item.providerName} />
              <DetailRow label="Date & Time" value={`${item.date} · ${item.time}`} />
              <DetailRow label="Address" value={item.address} />
              <DetailRow label="Amount" value={formatAmount(item.amount)} strong />
              <DetailRow label="Payment Status" value={item.paymentStatus} />
              <DetailRow label="Status" value={item.status} />
              <DetailRow label="Notes" value={item.notes} />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HistoryDetailsScreen;
