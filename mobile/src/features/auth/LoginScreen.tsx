import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoadingOverlay } from '../../components/loaders/LoadingOverlay';
import { AuthHeroGraphic } from '../../components/common/AuthHeroGraphic';
import { ServerConfigModal } from '../../components/common/ServerConfigModal';
import { getCurrentServerUrlSync } from '../../config/serverConfig';
import type {
  AuthStackParamList,
  RootStackParamList,
} from '../../navigation/types';
import { checkUser, login } from '../../services/authService';
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
type LoginRouteProp = RouteProp<AuthStackParamList, 'Login'>;

const MAX_PHONE_DIGITS = 10;
const COUNTRY_CODE = '+91';

/**
 * LoginScreen
 * -----------
 * Modern mobile login matching the teal hero + rounded white sheet design.
 * Supports both Phone OTP login and Password login for registered users.
 * Routes new users seamlessly to Register screen.
 */
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const route = useRoute<LoginRouteProp>();
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width, height), [width, height]);

  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp');
  const [mobileNumber, setMobileNumber] = useState(route.params?.phoneNumber ?? '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState<string | null>(null);
  const [showValidationState, setShowValidationState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showServerConfig, setShowServerConfig] = useState(false);

  const handleNetworkError = useCallback((errorMessage: string) => {
    Alert.alert(
      'Unable to reach server',
      `${errorMessage}\n\nEndpoint: ${getCurrentServerUrlSync()}\n\nMake sure your backend is running or update the server address.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Configure Server',
          onPress: () => setShowServerConfig(true),
        },
      ],
    );
  }, []);

  useEffect(() => {
    if (route.params?.phoneNumber) {
      setMobileNumber(route.params.phoneNumber);
      setShowValidationState(true);
    }
  }, [route.params?.phoneNumber]);

  const isPhoneValid = mobileNumber.length === MAX_PHONE_DIGITS;
  const isPasswordValid = password.length >= 6;
  const isFormValid = loginMode === 'otp' ? isPhoneValid : isPhoneValid && isPasswordValid;

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

    if (loginMode === 'password') {
      if (!password || password.length < 6) {
        Alert.alert('Please enter your password (at least 6 characters)');
        return;
      }

      try {
        setIsLoading(true);
        await login({
          phoneNumber: mobileNumber,
          password: password.trim(),
        });

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
        const errorMessage =
          error instanceof Error ? error.message : 'Invalid credentials. Please try again.';
        const isNetwork =
          errorMessage.toLowerCase().includes('server') ||
          errorMessage.toLowerCase().includes('network') ||
          errorMessage.toLowerCase().includes('timed out');

        if (isNetwork) {
          handleNetworkError(errorMessage);
        } else {
          Alert.alert('Login failed', errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // OTP mode
    try {
      setIsLoading(true);
      const response = await checkUser({ phoneNumber: mobileNumber });

      if (!response.exists) {
        Alert.alert(
          'Account Not Found',
          'No account was found with this mobile number. Would you like to create one?',
          [
            {
              text: 'Register',
              onPress: () => navigation.navigate('Register', { phoneNumber: mobileNumber }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
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

      const errorMessage =
        error instanceof Error ? error.message : 'Please try again.';
      const isNetwork =
        errorMessage.toLowerCase().includes('server') ||
        errorMessage.toLowerCase().includes('network') ||
        errorMessage.toLowerCase().includes('timed out');

      if (isNetwork) {
        handleNetworkError(errorMessage);
      } else {
        Alert.alert('Unable to continue', errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleNetworkError, isPhoneValid, loginMode, mobileNumber, navigation, password]);

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
    Alert.alert(
      'Need Assistance?',
      'Choose how we can help:',
      [
        { text: 'Support Screen', onPress: () => navigation.navigate('Support') },
        { text: 'Server Settings (IP)', onPress: () => setShowServerConfig(true) },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }, [navigation]);

  const phoneInputWrapStyle = useMemo(() => {
    if (showValidationState && mobileNumber.length > 0 && !isPhoneValid) {
      return styles.pillInputWrapError;
    }
    if (isInputFocused === 'phone') {
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
          {/* Top navigation back button */}
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardView}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              {/* Top Hero Banner with Headline & Decorative Graphics */}
              <Pressable
                onLongPress={() => setShowServerConfig(true)}
                delayLongPress={600}
                style={styles.heroHeader}>
                <AuthHeroGraphic type="login" />
                <Text style={styles.heroTitle}>
                  Log in to stay on{' '}
                  <Text style={styles.heroTitleHighlight}>top of</Text> your emergency assistance.
                </Text>
              </Pressable>

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

                {/* Login Method Tab Selector */}
                <View style={styles.tabRow}>
                  <Pressable
                    onPress={() => setLoginMode('otp')}
                    style={[styles.tabButton, loginMode === 'otp' && styles.tabButtonActive]}>
                    <Text style={[styles.tabText, loginMode === 'otp' && styles.tabTextActive]}>
                      OTP Login
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setLoginMode('password')}
                    style={[styles.tabButton, loginMode === 'password' && styles.tabButtonActive]}>
                    <Text style={[styles.tabText, loginMode === 'password' && styles.tabTextActive]}>
                      Password Login
                    </Text>
                  </Pressable>
                </View>

                {/* Form Controls */}
                <View style={styles.formGroup}>
                  {/* Phone Input Pill */}
                  <View style={[styles.pillInputWrap, phoneInputWrapStyle]}>
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={isInputFocused === 'phone' ? '#0D9488' : '#9CA3AF'}
                      style={styles.inputIcon}
                    />

                    {/* Country Code Badge */}
                    <View style={styles.countryCodeBadge}>
                      <Text style={styles.countryCodeText}>{COUNTRY_CODE}</Text>
                    </View>

                    <TextInput
                      value={mobileNumber}
                      onChangeText={handleMobileChange}
                      onFocus={() => setIsInputFocused('phone')}
                      onBlur={() => {
                        setIsInputFocused(null);
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

                  {/* Password Pill Input (shown when loginMode === 'password') */}
                  {loginMode === 'password' && (
                    <View
                      style={[
                        styles.pillInputWrap,
                        isInputFocused === 'password' && styles.pillInputWrapFocused,
                      ]}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={isInputFocused === 'password' ? '#0D9488' : '#9CA3AF'}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setIsInputFocused('password')}
                        onBlur={() => setIsInputFocused(null)}
                        style={styles.pillInput}
                        secureTextEntry={!showPassword}
                        placeholder="Enter your password"
                        placeholderTextColor="#9CA3AF"
                        accessibilityLabel="Password input"
                      />
                      <Pressable
                        onPress={() => setShowPassword(prev => !prev)}
                        style={styles.eyeIconButton}
                        accessibilityRole="button"
                        accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                        <Ionicons
                          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={19}
                          color="#9CA3AF"
                        />
                      </Pressable>
                    </View>
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
                    disabled={!isFormValid || isLoading}
                    accessibilityRole="button"
                    accessibilityLabel={loginMode === 'password' ? 'Login with Password' : 'Send OTP'}
                    style={[
                      styles.primaryButton,
                      (!isFormValid || isLoading) && styles.primaryButtonDisabled,
                    ]}>
                    <LinearGradient
                      colors={[...CTA_GRADIENT_COLORS]}
                      start={CTA_GRADIENT_START}
                      end={CTA_GRADIENT_END}
                      style={styles.primaryGradient}>
                      <Text style={styles.primaryButtonText}>
                        {isLoading
                          ? 'Please wait...'
                          : loginMode === 'password'
                          ? 'Login'
                          : 'Continue with OTP'}
                      </Text>
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

      <ServerConfigModal
        visible={showServerConfig}
        onClose={() => setShowServerConfig(false)}
      />

      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default LoginScreen;
