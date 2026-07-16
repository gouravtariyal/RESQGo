import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type TermsNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Terms'>;

const SECTIONS = [
  {
    title: 'Acceptance',
    body: 'By using RESQGo, you agree to these Terms & Conditions. If you do not agree, please discontinue use of the application.',
  },
  {
    title: 'Eligibility',
    body: 'You must be legally capable of entering into a binding agreement and provide accurate account information to use RESQGo services.',
  },
  {
    title: 'User Responsibilities',
    body: 'You are responsible for providing correct vehicle and location details, using emergency features appropriately, and complying with local laws while requesting assistance.',
  },
  {
    title: 'Emergency Disclaimer',
    body: 'RESQGo is a coordination and assistance platform. In life-threatening situations, always contact official emergency services such as Police (112) or Ambulance (108) immediately.',
  },
  {
    title: 'Payments',
    body: 'Service fees displayed in the app are estimates or agreed amounts for provider services. Payment and refund handling may depend on provider policies and completed service status.',
  },
  {
    title: 'Privacy',
    body: 'Your use of RESQGo is also governed by our Privacy Policy, which explains how we collect and use personal information.',
  },
  {
    title: 'Termination',
    body: 'We may suspend or terminate access if we detect misuse, fraudulent activity, or violations of these terms, with or without prior notice where required for safety.',
  },
  {
    title: 'Contact',
    body: 'For questions about these terms, contact legal@resqgo.app or RESQGo Technologies Pvt. Ltd., New Delhi, India.',
  },
] as const;

/**
 * TermsScreen
 * -----------
 * Scrollable Terms & Conditions page with dummy professional copy.
 */
export const TermsScreen: React.FC = () => {
  const navigation = useNavigation<TermsNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}>
              <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>
            <Text style={styles.headerTitle} accessibilityRole="header">
              Terms & Conditions
            </Text>
          </View>

          <Text style={styles.effectiveDate}>Effective Date: 01 January 2026</Text>

          <View style={styles.card}>
            {SECTIONS.map(section => (
              <View key={section.title} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionBody}>{section.body}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TermsScreen;
