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

type PrivacyNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'PrivacyPolicy'
>;

const SECTIONS = [
  {
    title: 'Information Collection',
    body: 'We collect account details such as your name, mobile number, email, and vehicle information to provide roadside assistance services.',
  },
  {
    title: 'Location',
    body: 'With your permission, RESQGo may use your approximate or precise location to find nearby providers, support SOS flows, and improve arrival estimates.',
  },
  {
    title: 'Authentication',
    body: 'We use mobile OTP verification to secure your account. Authentication data is used only to confirm your identity and protect access.',
  },
  {
    title: 'Security',
    body: 'We apply industry-standard safeguards to protect your information. No system is perfectly secure, so please keep your device and account details safe.',
  },
  {
    title: 'User Rights',
    body: 'You may request access, correction, or deletion of your personal information, subject to applicable law and operational requirements for safety records.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions, contact privacy@resqgo.app or write to RESQGo Technologies Pvt. Ltd., New Delhi, India.',
  },
] as const;

/**
 * PrivacyPolicyScreen
 * -------------------
 * Scrollable privacy policy page with dummy professional copy.
 */
export const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<PrivacyNavigationProp>();
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
              Privacy Policy
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

export default PrivacyPolicyScreen;
