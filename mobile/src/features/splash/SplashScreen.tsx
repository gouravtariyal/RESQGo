import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../navigation/types';
import { restoreAuthSession } from '../../services/authService';
import {
  SPLASH_GRADIENT_COLORS,
  SPLASH_GRADIENT_END,
  SPLASH_GRADIENT_START,
  createStyles,
} from './styles';

/** Time on splash before advancing based on auth state */
const SPLASH_HOLD_MS = 2000;

/** Intro fade + scale duration */
const INTRO_DURATION_MS = 1200;

/** Logo entrance scale range */
const LOGO_SCALE_FROM = 0.8;
const LOGO_SCALE_TO = 1;

const APP_NAME = 'RESQGo';
const APP_SUBTITLE = '24x7 Emergency Assistance';
const APP_TAGLINE = 'Fast • Smart • Reliable';
const APP_VERSION_LABEL = 'Version 1.0.0';
const APP_CREDIT = 'Made with ❤️ in India';

type SplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

/**
 * Premium splash — branded intro, then routes by stored JWT session.
 */
export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const opacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(LOGO_SCALE_FROM)).current;

  const contentAnimatedStyle = useMemo(
    () => ({
      opacity,
    }),
    [opacity],
  );

  const logoAnimatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ scale: logoScale }],
    }),
    [logoScale, opacity],
  );

  useEffect(() => {
    let isMounted = true;

    // Soft entrance — keep content visible (opacity never 0) to avoid blank splash.
    opacity.setValue(0.35);
    const intro = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: INTRO_DURATION_MS,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: LOGO_SCALE_TO,
        duration: INTRO_DURATION_MS,
        useNativeDriver: true,
      }),
    ]);

    intro.start();

    const navigationTimer = setTimeout(async () => {
      let isAuthenticated = false;

      try {
        isAuthenticated = await restoreAuthSession();
      } catch (error) {
        console.warn('[Splash] Auth restore failed', error);
        isAuthenticated = false;
      }

      if (!isMounted) {
        return;
      }

      try {
        if (isAuthenticated) {
          navigation.replace('App', {
            screen: 'MainTabs',
            params: { screen: 'Home' },
          });
          return;
        }

        navigation.replace('Auth', { screen: 'Onboarding' });
      } catch (navError) {
        console.warn('[Splash] Navigation failed', navError);
      }
    }, SPLASH_HOLD_MS);

    return () => {
      isMounted = false;
      intro.stop();
      clearTimeout(navigationTimer);
    };
  }, [logoScale, navigation, opacity]);

  return (
    <LinearGradient
      colors={[...SPLASH_GRADIENT_COLORS]}
      start={SPLASH_GRADIENT_START}
      end={SPLASH_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.container}>
          <Animated.View style={[styles.hero, contentAnimatedStyle]}>
            <Animated.View
              style={[styles.logoWrap, logoAnimatedStyle]}
              accessibilityRole="image"
              accessibilityLabel={`${APP_NAME} logo`}>
              <Text style={styles.logoEmoji}>🚗</Text>
            </Animated.View>

            <Text style={styles.appName} accessibilityRole="header">
              {APP_NAME}
            </Text>

            <Text style={styles.subtitle}>{APP_SUBTITLE}</Text>
            <Text style={styles.tagline}>{APP_TAGLINE}</Text>
          </Animated.View>

          <Animated.View style={[styles.footer, contentAnimatedStyle]}>
            <Text style={styles.version}>{APP_VERSION_LABEL}</Text>
            <Text style={styles.credit}>{APP_CREDIT}</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SplashScreen;
