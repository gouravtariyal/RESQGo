import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoadingOverlay } from '../../components/loaders/LoadingOverlay';
import { AuthHeroGraphic } from '../../components/common/AuthHeroGraphic';
import type {
  AuthStackParamList,
  RootStackParamList,
} from '../../navigation/types';
import { checkUser } from '../../services/authService';
import {
  GoogleSignInCancelledError,
  signInWithGoogle,
} from '../../services/firebase/googleAuth';
import { handlePhoneAuthError } from '../../services/firebase/phoneAuthErrors';
import { sendPhoneOtp } from '../../services/firebase/phoneAuth';
import { navigateToAppHome } from '../../utils/navigation';
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
 * Modern mobile-number login matching the teal hero + rounded white sheet design.
 * Existing users verify with Firebase OTP and enter Home.
 * New users route to Register screen.
 */
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width, height), [width, height]);

  const [mobileNumber, setMobileNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showValidationState, setShowValidationState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isPhoneValid = mobileNumber.length === MAX_PHONE_DIGITS;

  const handleMobileChange = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);
    setMobileNumber(digitsOnly);
    setShowValidationState(digitsOnly.length > 0);
  }, []);

  const handleContinue = useCallback(async () => {
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

    try {
      setIsLoading(true);
      const response = await checkUser({ phoneNumber: mobileNumber });

      if (!response.exists) {
        navigation.navigate('Register', { phoneNumber: mobileNumber });
        return;
      }

      const e164PhoneNumber = `${COUNTRY_CODE}${mobileNumber}`;
      const verificationId = await sendPhoneOtp(e164PhoneNumber);

      navigation.navigate('OTP', {
        phoneNumber: e164PhoneNumber,
        verificationId,
      });
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        String((error as { code?: string }).code || '').startsWith('auth/')
      ) {
        handlePhoneAuthError('send', error);
        return;
      }

      Alert.alert(
        'Unable to continue',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [isPhoneValid, mobileNumber, navigation]);

  const handleGoogleContinue = useCallback(async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();

      const rootNavigation =
        navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

      if (rootNavigation) {
        navigateToAppHome(rootNavigation);
        return;
      }

      navigation
        .getParent()
        ?.getParent<NativeStackNavigationProp<RootStackParamList>>()
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
      if (error instanceof GoogleSignInCancelledError) {
        return;
      }

      Alert.alert(
        'Google Sign-In failed',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  const handleAppleContinue = useCallback(() => {
    Alert.alert(
      'Apple Sign-In',
      Platform.OS === 'ios'
        ? 'Apple Sign-In is configured for iOS production builds.'
        : 'Apple Sign-In is only available on iOS devices.',
    );
  }, []);

  const handleCreateAccount = useCallback(() => {
    navigation.navigate('Register', {
      phoneNumber: mobileNumber || undefined,
    });
  }, [mobileNumber, navigation]);

  const handleNeedHelp = useCallback(() => {
    navigation.navigate('Support');
  }, [navigation]);

  const inputWrapStyle = useMemo(() => {
    if (showValidationState && mobileNumber.length > 0 && !isPhoneValid) {
      return styles.pillInputWrapError;
    }
    if (isInputFocused) {
      return styles.pillInputWrapFocused;
    }
    return undefined;
  }, [
    isInputFocused,
    isPhoneValid,
    mobileNumber.length,
    showValidationState,
    styles.pillInputWrapError,
    styles.pillInputWrapFocused,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#14B8A6" translucent />
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
              {/* Top Hero Banner with Headline & Decorative Graphics */}
              <View style={styles.heroHeader}>
                <AuthHeroGraphic type="login" />
                <Text style={styles.heroTitle}>
                  Log in to stay on{' '}
                  <Text style={styles.heroTitleHighlight}>top of</Text> your emergency assistance.
                </Text>
              </View>

              {/* Bottom White Sheet Container */}
              <View style={styles.bottomSheet}>
                {/* Header: Title & Sign Up Link */}
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Login</Text>
                  <View style={styles.subRow}>
                    <Text style={styles.subRowText}>Don&apos;t Have An Account?</Text>
                    <Pressable
                      onPress={handleCreateAccount}
                      accessibilityRole="button"
                      accessibilityLabel="Sign Up">
                      <Text style={styles.subRowLink}>Sign Up</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Form Controls */}
                <View style={styles.formGroup}>
                  {/* Phone Input Pill */}
                  <View style={[styles.pillInputWrap, inputWrapStyle]}>
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={isInputFocused ? '#0D9488' : '#9CA3AF'}
                      style={styles.inputIcon}
                    />

                    {/* Country Code Badge */}
                    <View style={styles.countryCodeBadge}>
                      <Text style={styles.countryCodeText}>{COUNTRY_CODE}</Text>
                    </View>

                    <TextInput
                      value={mobileNumber}
                      onChangeText={handleMobileChange}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => {
                        setIsInputFocused(false);
                        setShowValidationState(true);
                      }}
                      style={styles.pillInput}
                      keyboardType="number-pad"
                      maxLength={MAX_PHONE_DIGITS}
                      placeholder="Enter mobile number"
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="done"
                      accessibilityLabel="Mobile number input"
                    />
                  </View>

                  {mobileNumber.length > 0 && !isPhoneValid && (
                    <Text style={styles.errorText}>
                      Please enter a valid 10-digit mobile number.
                    </Text>
                  )}

                  {/* Options Row: Remember Me & Forgot Password / Need Help */}
                  <View style={styles.optionsRow}>
                    <Pressable
                      onPress={() => setRememberMe(prev => !prev)}
                      style={styles.rememberMeContainer}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: rememberMe }}>
                      <View
                        style={[
                          styles.checkbox,
                          rememberMe && styles.checkboxChecked,
                        ]}>
                        {rememberMe && (
                          <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                        )}
                      </View>
                      <Text style={styles.rememberMeText}>Remember Me</Text>
                    </Pressable>

                    <Pressable
                      onPress={handleNeedHelp}
                      accessibilityRole="button"
                      accessibilityLabel="Need Help">
                      <Text style={styles.forgotPasswordText}>Need Help?</Text>
                    </Pressable>
                  </View>

                  {/* Primary Login / Continue Button */}
                  <Pressable
                    onPress={handleContinue}
                    disabled={!isPhoneValid || isLoading}
                    accessibilityRole="button"
                    accessibilityLabel="Login"
                    style={[
                      styles.primaryButton,
                      (!isPhoneValid || isLoading) && styles.primaryButtonDisabled,
                    ]}>
                    <LinearGradient
                      colors={[...CTA_GRADIENT_COLORS]}
                      start={CTA_GRADIENT_START}
                      end={CTA_GRADIENT_END}
                      style={styles.primaryGradient}>
                      <Text style={styles.primaryButtonText}>Login</Text>
                    </LinearGradient>
                  </Pressable>
                </View>

                {/* Or Continue With Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or Continue With</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Login Options */}
                <View style={styles.socialRow}>
                  <Pressable
                    onPress={handleAppleContinue}
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Apple"
                    style={[styles.socialButton, styles.appleButton]}>
                    <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                    <Text style={styles.appleButtonText}>Apple</Text>
                  </Pressable>

                  <Pressable
                    onPress={handleGoogleContinue}
                    disabled={isLoading}
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Google"
                    style={[styles.socialButton, styles.googleButton]}>
                    <Ionicons name="logo-google" size={17} color="#EA4335" />
                    <Text style={styles.googleButtonText}>Google</Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>

      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default LoginScreen;
