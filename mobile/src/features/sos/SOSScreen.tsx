import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import {
  DUMMY_LOCATION,
  EMERGENCY_CONTACTS,
  SOS_HOLD_DURATION_MS,
  type EmergencyContact,
} from './data';
import { EmergencyContactCard } from './EmergencyContactCard';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  SOS_GRADIENT_COLORS,
  SOS_GRADIENT_END,
  SOS_GRADIENT_START,
  createStyles,
} from './styles';

type SOSNavigationProp = NativeStackNavigationProp<AppStackParamList, 'EmergencySOS'>;

/**
 * SOSScreen
 * ---------
 * Premium emergency assistance screen.
 * The SOS button must be pressed and held for 3 seconds before activation.
 */
export const SOSScreen: React.FC = () => {
  const navigation = useNavigation<SOSNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [isActivated, setIsActivated] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  // Progress grows from 0 → 1 while the user holds the button.
  const holdProgress = useRef(new Animated.Value(0)).current;
  const holdAnimationRef = useRef<Animated.CompositeAnimation | null>(null);
  const holdCompletedRef = useRef(false);

  // Keep a pulse animation after SOS is activated for visual urgency.
  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isActivated) {
      return undefined;
    }

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.04,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [isActivated, pulseScale]);

  const resetHoldProgress = useCallback(() => {
    holdAnimationRef.current?.stop();
    holdAnimationRef.current = null;
    holdCompletedRef.current = false;
    holdProgress.setValue(0);
    setIsHolding(false);
  }, [holdProgress]);

  // Start the 3-second hold countdown when the finger presses down.
  const handlePressIn = useCallback(() => {
    if (isActivated) {
      return;
    }

    setIsHolding(true);
    holdCompletedRef.current = false;
    holdProgress.setValue(0);

    const animation = Animated.timing(holdProgress, {
      toValue: 1,
      duration: SOS_HOLD_DURATION_MS,
      useNativeDriver: false,
    });

    holdAnimationRef.current = animation;

    animation.start(({ finished }) => {
      if (!finished || holdCompletedRef.current) {
        return;
      }

      holdCompletedRef.current = true;
      setIsHolding(false);
      setIsActivated(true);
    });
  }, [holdProgress, isActivated]);

  // Cancel activation if the user releases before 3 seconds.
  const handlePressOut = useCallback(() => {
    if (isActivated || holdCompletedRef.current) {
      return;
    }

    resetHoldProgress();
  }, [isActivated, resetHoldProgress]);

  // Simulated call only — no real dialer is opened.
  const handleCall = useCallback((contact: EmergencyContact) => {
    Alert.alert(
      `Call ${contact.name}`,
      `This is a simulated call to ${contact.phoneNumber}. Real dialing is disabled in this preview.`,
    );
  }, []);

  const progressWidth = holdProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

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
          {/* Top header */}
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}>
              <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>

            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle} accessibilityRole="header">
                Emergency Assistance
              </Text>
              <Text style={styles.headerSubtitle}>
                Hold the SOS button for 3 seconds to activate help.
              </Text>
            </View>
          </View>

          {/* Large circular hold-to-activate SOS button */}
          <View style={styles.sosSection}>
            <Animated.View style={{ transform: [{ scale: isActivated ? pulseScale : 1 }] }}>
              <View style={[styles.sosRing, (isHolding || isActivated) && styles.sosRingActive]}>
                <Pressable
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  disabled={isActivated}
                  accessibilityRole="button"
                  accessibilityLabel="Hold to activate emergency SOS"
                  style={({ pressed }) => [
                    styles.sosButton,
                    pressed && !isActivated && styles.sosButtonPressed,
                  ]}>
                  <LinearGradient
                    colors={[...SOS_GRADIENT_COLORS]}
                    start={SOS_GRADIENT_START}
                    end={SOS_GRADIENT_END}
                    style={styles.sosGradient}>
                    <Text style={styles.sosButtonLabel}>SOS</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </Animated.View>

            {!isActivated ? (
              <>
                <Text style={styles.sosHint}>
                  {isHolding
                    ? 'Keep holding to activate emergency alert...'
                    : 'Press and hold for 3 seconds'}
                </Text>

                <View style={styles.holdProgressTrack}>
                  <Animated.View style={[styles.holdProgressFill, { width: progressWidth }]} />
                </View>
              </>
            ) : null}
          </View>

          {/* Success state after the hold completes */}
          {isActivated ? (
            <View style={styles.activatedBanner}>
              <Text style={styles.activatedIcon}>🚨</Text>
              <Text style={styles.activatedTitle}>Emergency Alert Activated</Text>
              <Text style={styles.activatedSubtitle}>
                Nearby help options and emergency contacts are ready below.
              </Text>
            </View>
          ) : null}

          {/* Emergency contacts list */}
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.contactsList}>
            {EMERGENCY_CONTACTS.map(contact => (
              <EmergencyContactCard
                key={contact.id}
                contact={contact}
                onCall={handleCall}
              />
            ))}
          </View>

          {/* Dummy current location block */}
          <Text style={styles.sectionTitle}>Current Location</Text>
          <View style={styles.locationCard}>
            <Text style={styles.locationLabel}>Approx. area</Text>
            <Text style={styles.locationValue}>{DUMMY_LOCATION.label}</Text>

            <View style={styles.coordRow}>
              <View style={styles.coordBlock}>
                <Text style={styles.coordLabel}>Latitude</Text>
                <Text style={styles.coordValue}>{DUMMY_LOCATION.latitude.toFixed(4)}</Text>
              </View>

              <View style={styles.coordBlock}>
                <Text style={styles.coordLabel}>Longitude</Text>
                <Text style={styles.coordValue}>{DUMMY_LOCATION.longitude.toFixed(4)}</Text>
              </View>
            </View>
          </View>

          {/* Footer reassurance message */}
          <Text style={styles.footerMessage}>
            Your live location will be shared with emergency contacts.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SOSScreen;
