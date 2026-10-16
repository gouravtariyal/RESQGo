import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthHeroGraphic } from '../../components/common/AuthHeroGraphic';
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
 * Modern welcome screen matching the teal hero + rounded bottom sheet aesthetic.
 * Showcases RESQGo roadside assistance value and directs user to Login/Register.
 */
export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width, height), [width, height]);

  const goToLogin = useCallback(() => navigation.navigate('Login'), [navigation]);
  const goToRegister = useCallback(() => navigation.navigate('Register'), [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#14B8A6" translucent />
      <LinearGradient
        colors={[...HERO_GRADIENT_COLORS]}
        start={HERO_GRADIENT_START}
        end={HERO_GRADIENT_END}
        style={styles.heroGradient}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {/* Top Teal Hero with Graphic */}
            <View style={styles.heroSection}>
              <AuthHeroGraphic type="onboarding" />
            </View>

            {/* Bottom Rounded White Sheet Card */}
            <View style={styles.bottomCard}>
              {/* Brand Name Logo */}
              <Text style={styles.brandTitle} accessibilityRole="header">
                RESQGO
              </Text>

              {/* Main Headline */}
              <Text style={styles.headline}>
                Let&apos;s Get You Set Up for Success
              </Text>

              <Text style={styles.subHeadline}>
                India&apos;s Smartest Roadside Assistance
              </Text>

              {/* Description */}
              <Text style={styles.description}>
                Organize roadside assistance, live tracking, and emergency SOS all in
                one simple, powerful app.
              </Text>

              {/* Feature Chips */}
              <View style={styles.featuresRow}>
                <View style={styles.featureChip}>
                  <Ionicons name="sparkles" size={13} color="#0D9488" />
                  <Text style={styles.featureChipText}>AI Vehicle Diagnosis</Text>
                </View>
                <View style={styles.featureChip}>
                  <Ionicons name="location" size={13} color="#0D9488" />
                  <Text style={styles.featureChipText}>Live GPS Tracking</Text>
                </View>
                <View style={styles.featureChip}>
                  <Ionicons name="shield-checkmark" size={13} color="#0D9488" />
                  <Text style={styles.featureChipText}>Emergency SOS</Text>
                </View>
              </View>

              {/* Call to action buttons */}
              <View style={styles.ctaContainer}>
                <Pressable
                  onPress={goToRegister}
                  accessibilityRole="button"
                  accessibilityLabel="Get Started"
                  style={styles.ctaPressable}>
                  <LinearGradient
                    colors={[...CTA_GRADIENT_COLORS]}
                    start={CTA_GRADIENT_START}
                    end={CTA_GRADIENT_END}
                    style={styles.ctaGradient}>
                    <Text style={styles.ctaText}>Get Started</Text>
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default OnboardingScreen;
