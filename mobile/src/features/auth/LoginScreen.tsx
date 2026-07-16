import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type {
  AuthStackParamList,
} from '../../navigation/types';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const MAX_PHONE_DIGITS = 10;
const COUNTRY_CODE = '+91';

/**
 * LoginScreen
 * -----------
 * Premium mobile-number login entry point for the auth flow.
 * Users enter a 10-digit Indian mobile number and continue to OTP verification.
 */
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showValidationState, setShowValidationState] = useState(false);

  // The phone number is valid only when exactly 10 digits have been entered.
  const isPhoneValid = mobileNumber.length === MAX_PHONE_DIGITS;

  // Sanitise user input so the field accepts only digits and never exceeds 10 numbers.
  const handleMobileChange = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);
    setMobileNumber(digitsOnly);
    setShowValidationState(digitsOnly.length > 0);
  }, []);

  // Validate the mobile number first, then move the user to OTP verification.
  const handleContinue = useCallback(() => {
    if (!mobileNumber) {
      Alert.alert('Please enter your mobile number');
      setShowValidationState(true);
      return;
    }

    if (!isPhoneValid) {
      Alert.alert('Please enter a valid 10-digit mobile number');
      setShowValidationState(true);
      return;
    }

    navigation.navigate('OTP', { phoneNumber: `${COUNTRY_CODE}${mobileNumber}` });
  }, [isPhoneValid, mobileNumber, navigation]);

  // Placeholder for the future federated auth flow.
  const handleGoogleContinue = useCallback(() => {
    // Intentionally left ready for Google Sign-In integration.
  }, []);

  const inputStateStyle = useMemo(() => {
    if (!showValidationState && !isInputFocused) {
      return undefined;
    }

    if (mobileNumber.length > 0 && !isPhoneValid) { 
      return styles.phoneInputWrapError;
    }

    if (isInputFocused) {
      return styles.phoneInputWrapFocused;
    }

    return undefined;
  }, [
    isInputFocused,
    isPhoneValid,
    mobileNumber.length,
    showValidationState,
    styles.phoneInputWrapError,
    styles.phoneInputWrapFocused,
  ]);

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
              {/* Brand and welcome section */}
              <View style={styles.hero}>
                <View
                  style={styles.logoWrap}
                  accessibilityRole="image"
                  accessibilityLabel="RESQGo logo">
                  <Text style={styles.logoEmoji}>🚗</Text>
                </View>

                <Text style={styles.title} accessibilityRole="header">
                  Welcome Back
                </Text>

                <Text style={styles.subtitle}>Enter your mobile number to continue.</Text>
              </View>

              {/* Mobile number form */}
              <View style={styles.formCard}>
                <Text style={styles.label}>Mobile Number</Text>

                <View style={styles.phoneRow}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Country code picker"
                    style={styles.countryCodeButton}>
                    <Text style={styles.countryCodeText}>{COUNTRY_CODE}</Text>
                    <Text style={styles.countryChevron}>▼</Text>
                  </Pressable>

                  <View style={[styles.phoneInputWrap, inputStateStyle]}>
                    <TextInput
                      value={mobileNumber}
                      onChangeText={handleMobileChange}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => {
                        setIsInputFocused(false);
                        setShowValidationState(true);
                      }}
                      style={styles.phoneInput}
                      keyboardType="number-pad"
                      maxLength={MAX_PHONE_DIGITS}
                      placeholder="Enter mobile number"
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="done"
                      accessibilityLabel="Mobile number input"
                    />
                  </View>
                </View>

                {mobileNumber.length > 0 && !isPhoneValid ? (
                  <Text style={styles.errorText}>
                    Please enter a valid 10-digit mobile number.
                  </Text>
                ) : (
                  <Text style={styles.helperText}>We will send a one-time password to verify you.</Text>
                )}

                {/* Primary and secondary authentication actions */}
                <View style={styles.actions}>
                  <Pressable
                    onPress={handleContinue}
                    accessibilityRole="button"
                    accessibilityLabel="Continue"
                    style={[
                      styles.continueButton,
                      !isPhoneValid && styles.continueButtonDisabled,
                    ]}>
                    <LinearGradient
                      colors={[...CTA_GRADIENT_COLORS]}
                      start={CTA_GRADIENT_START}
                      end={CTA_GRADIENT_END}
                      style={styles.continueGradient}>
                      <Text style={styles.continueText}>Continue</Text>
                    </LinearGradient>
                  </Pressable>
                  <Pressable
                    onPress={handleGoogleContinue}
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Google"
                    style={styles.googleButton}>
                    <Text style={styles.googleIcon}>G</Text>
                    <Text style={styles.googleText}>Continue with Google</Text>
                  </Pressable>
                </View>
              </View>

              {/* Footer assistance copy */}
              <View style={styles.footer}>
                <Text style={styles.helpText}>Need Help?</Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
