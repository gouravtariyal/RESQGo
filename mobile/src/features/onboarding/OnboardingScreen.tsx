import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AuthStackParamList } from '../../navigation/types';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  HERO_GRADIENT_COLORS,
  HERO_GRADIENT_END,
  HERO_GRADIENT_START,
  createStyles,
} from './styles';

type OnboardingNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

/**
 * OnboardingScreen
 * ----------------
 * Premium first-run screen that introduces RESQGo value props and routes users to Login.
 */
export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  // Navigation handlers are kept stable to avoid unnecessary rerenders.
  const goToLogin = useCallback(() => navigation.navigate('Login'), [navigation]);

  return (
    <LinearGradient
      colors={[...HERO_GRADIENT_COLORS]}
      start={HERO_GRADIENT_START}
      end={HERO_GRADIENT_END}
      style={styles.heroGradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}>
          {/* Top / hero content */}
          <View style={styles.top}>
            <View
              style={styles.logoWrap}
              accessibilityRole="image"
              accessibilityLabel="RESQGo logo">
              <Text style={styles.logoEmoji}>🚗</Text>
            </View>

            <Text style={styles.title} accessibilityRole="header">
            India's Smartest Roadside Assistance
            </Text>

            <Text style={styles.subtitle}>AI Powered Roadside Assistance</Text>

            <Text style={styles.description}>
              Get instant roadside help anywhere in India using AI and nearby verified service
              providers.
            </Text>
          </View>

          {/* Premium feature highlights */}
          <View style={styles.features}>
            <FeatureCard
              icon="🧠"
              title="AI Vehicle Diagnosis"
              subtitle="Quickly understand what’s wrong and what to do next."
            />
            <FeatureCard
              icon="🛠️"
              title="Nearby Mechanics & Fuel Assistance"
              subtitle="Connect to verified help around you in minutes."
            />
            <FeatureCard
              icon="📍"
              title="Live GPS Tracking & Emergency SOS"
              subtitle="Share your live location and raise SOS when needed."
            />

            <FeatureCard
              icon="�"
              title="24x7 Emergency Assistance"
              subtitle="Get instant help anytime, anywhere. Our team is always ready to assist you."
            />
          </View>

          {/* Bottom actions */}
          <View style={styles.bottom}>
            <Pressable
              onPress={goToLogin}
              accessibilityRole="button"
              accessibilityLabel="Get Started"
              style={styles.ctaPressable}>
              <LinearGradient
                colors={[...CTA_GRADIENT_COLORS]}
                start={CTA_GRADIENT_START}
                end={CTA_GRADIENT_END}
                style={styles.ctaGradient}>
                <Text style={styles.ctaText}>Let's Rescue</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.loginRow}>
              <Text style={styles.loginHint}>Already have an account?</Text>
              <Pressable
                onPress={goToLogin}
                accessibilityRole="button"
                accessibilityLabel="Login">
                <Text style={styles.loginLink}>Login</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

type FeatureCardProps = {
  icon: string;
  title: string;
  subtitle: string;
};

/**
 * FeatureCard
 * -----------
 * Small reusable row-card used by onboarding to present premium features consistently.
 */
const FeatureCard: React.FC<FeatureCardProps> = memo(({ icon, title, subtitle }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <View style={styles.featureCard} accessibilityRole="text">
      <View style={styles.featureIconWrap} accessibilityRole="image" accessibilityLabel={title}>
        <Text style={styles.featureIcon}>{icon}</Text>
      </View>

      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
});
FeatureCard.displayName = 'FeatureCard';

export default OnboardingScreen;
