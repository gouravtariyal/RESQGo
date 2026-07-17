import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AuthStackParamList, RootStackParamList } from '../../../navigation/types';
import { handlePhoneAuthError } from '../../../services/firebase/phoneAuthErrors';
import { sendPhoneOtp, verifyPhoneOtp } from '../../../services/firebase/phoneAuth';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type OtpNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
type OtpRouteProp = RouteProp<AuthStackParamList, 'OTP'>;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

/**
 * Formats seconds into MM:SS for the resend countdown.
 */
const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

/**
 * OtpScreen
 * ---------
 * Premium OTP verification screen that handles digit entry, timer state,
 * and successful navigation into the authenticated Home flow.
 */
export const OtpScreen: React.FC = () => {
  const navigation = useNavigation<OtpNavigationProp>();
  const route = useRoute<OtpRouteProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  // Each OTP digit is stored separately so focus can move box-by-box.
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_SECONDS);
  const [showValidationState, setShowValidationState] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState(route.params.verificationId);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Refs let us programmatically move focus between the 6 OTP inputs.
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const otpValue = otpDigits.join('');
  const isOtpValid = otpValue.length === OTP_LENGTH;
  const hasCountdownCompleted = secondsRemaining === 0;

  // Keep the resend timer ticking once per second until it reaches zero.
  useEffect(() => {
    if (hasCountdownCompleted) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSecondsRemaining(currentValue => {
        if (currentValue <= 1) {
          return 0;
        }

        return currentValue - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [hasCountdownCompleted]);

  // Focus the first input when the screen loads to reduce friction for the user.
  useEffect(() => {
    const timerId = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  /**
   * Updates a specific digit and moves focus forward when the user enters a number.
   */
  const handleDigitChange = useCallback((value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);

    setOtpDigits(currentDigits => {
      const updatedDigits = [...currentDigits];
      updatedDigits[index] = digit;
      return updatedDigits;
    });

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!digit) {
      setShowValidationState(false);
    }

    setVerificationError(null);
  }, []);

  /**
   * Handles backspace so deleting an empty box moves focus to the previous input.
   */
  const handleKeyPress = useCallback((key: string, index: number) => {
    if (key !== 'Backspace') {
      return;
    }

    setOtpDigits(currentDigits => {
      const updatedDigits = [...currentDigits];

      if (updatedDigits[index]) {
        updatedDigits[index] = '';

        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }

        return updatedDigits;
      }

      if (index > 0) {
        updatedDigits[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }

      return updatedDigits;
    });
  }, []);

  /**
   * Resets the OTP state and restarts the resend countdown.
   */
  const handleResendOtp = useCallback(async () => {
    if (!hasCountdownCompleted || isResending) {
      return;
    }

    try {
      setIsResending(true);
      const nextVerificationId = await sendPhoneOtp(route.params.phoneNumber);

      setVerificationId(nextVerificationId);
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      setShowValidationState(false);
      setVerificationError(null);
      setSecondsRemaining(RESEND_SECONDS);
      setFocusedIndex(0);
      inputRefs.current[0]?.focus();
    } catch (error) {
      handlePhoneAuthError('resend', error);
    } finally {
      setIsResending(false);
    }
  }, [hasCountdownCompleted, isResending, route.params.phoneNumber]);

  /**
   * After a valid 6-digit OTP is entered, reset into the authenticated app flow.
   */
  const handleVerifyOtp = useCallback(async () => {
    if (!isOtpValid) {
      setShowValidationState(true);
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationError(null);
      await verifyPhoneOtp(verificationId, otpValue);

      // Reset the root stack into the authenticated Bottom Tabs (Home by default).
      navigation
        .getParent<NativeStackNavigationProp<RootStackParamList>>()
        ?.reset({
          index: 0,
          routes: [
            {
              name: 'App',
              params: {
                screen: 'MainTabs',
                params: { screen: 'Home' },
              },
            },
          ],
        });
    } catch (error) {
      const message = handlePhoneAuthError('verify', error);
      setVerificationError(message);
    } finally {
      setIsVerifying(false);
    }
  }, [isOtpValid, navigation, otpValue, verificationId]);

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              {/* Back navigation gives users a clear escape route to edit their phone number. */}
              <View style={styles.headerRow}>
                <Pressable
                  onPress={() => navigation.goBack()}
                  accessibilityRole="button"
                  accessibilityLabel="Go back"
                  style={styles.backButton}>
                  <Text style={styles.backButtonText}>{'<'}</Text>
                </Pressable>
              </View>

              {/* Brand and instructional copy explain what the user should do next. */}
              <View style={styles.hero}>
                <View
                  style={styles.logoWrap}
                  accessibilityRole="image"
                  accessibilityLabel="RESQGo logo">
                  <Text style={styles.logoEmoji}>🚗</Text>
                </View>

                <Text style={styles.title} accessibilityRole="header">
                  Verify OTP
                </Text>

                <Text style={styles.subtitle}>
                  Enter the 6-digit verification code sent to your mobile.
                </Text>

                <Text style={styles.phoneText}>{route.params.phoneNumber}</Text>
              </View>

              {/* The OTP card contains 6 single-digit fields for quick verification entry. */}
              <View style={styles.formCard}>
                <View style={styles.otpRow}>
                  {otpDigits.map((digit, index) => (
                    <TextInput
                      key={`otp-digit-${index}`}
                      ref={ref => {
                        inputRefs.current[index] = ref;
                      }}
                      value={digit}
                      onChangeText={value => handleDigitChange(value, index)}
                      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                      onFocus={() => setFocusedIndex(index)}
                      style={[
                        styles.otpBox,
                        focusedIndex === index && styles.otpBoxFocused,
                        digit.length > 0 && styles.otpBoxFilled,
                      ]}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      returnKeyType="done"
                      accessibilityLabel={`OTP digit ${index + 1}`}
                    />
                  ))}
                </View>

                {verificationError || (showValidationState && !isOtpValid) ? (
                  <Text style={styles.otpError}>
                    {verificationError ?? 'Please enter the complete 6-digit OTP.'}
                  </Text>
                ) : (
                  <Text style={styles.otpHelper}>Enter all 6 digits to continue securely.</Text>
                )}

                {/* Timer keeps resend behavior predictable and prevents repeated spam taps. */}
                <View style={styles.timerWrap}>
                  {hasCountdownCompleted ? (
                    <Pressable
                      onPress={handleResendOtp}
                      disabled={isResending}
                      accessibilityRole="button"
                      accessibilityLabel="Resend OTP"
                      style={styles.resendButton}>
                      <Text style={styles.resendText}>Resend OTP</Text>
                    </Pressable>
                  ) : (
                    <Text style={styles.timerText}>
                      {`Resend OTP in ${formatCountdown(secondsRemaining)}`}
                    </Text>
                  )}
                </View>
              </View>

              {/* Verification stays disabled until all 6 digits are entered. */}
              <View style={styles.footer}>
                <Pressable
                  onPress={handleVerifyOtp}
                  disabled={!isOtpValid || isVerifying}
                  accessibilityRole="button"
                  accessibilityLabel="Verify OTP"
                  style={[
                    styles.verifyButton,
                    (!isOtpValid || isVerifying) && styles.verifyButtonDisabled,
                  ]}>
                  <LinearGradient
                    colors={[...CTA_GRADIENT_COLORS]}
                    start={CTA_GRADIENT_START}
                    end={CTA_GRADIENT_END}
                    style={styles.verifyGradient}>
                    <Text style={styles.verifyText}>Verify OTP</Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtpScreen;
