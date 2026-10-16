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
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoadingOverlay } from '../../../components/loaders/LoadingOverlay';
import { AuthHeroGraphic } from '../../../components/common/AuthHeroGraphic';
import type {
  AuthStackParamList,
  RootStackParamList,
} from '../../../navigation/types';
import { register } from '../../../services/authService';
import {
  GoogleSignInCancelledError,
  signInWithGoogle,
} from '../../../services/firebase/googleAuth';
import { navigateToAppHome } from '../../../utils/navigation';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type RegisterNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;
type RegisterRouteProp = RouteProp<AuthStackParamList, 'Register'>;

const MAX_PHONE_DIGITS = 10;
const COUNTRY_CODE = '+91';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * RegisterScreen
 * --------------
 * Modern account creation screen matching the teal hero + rounded white sheet design.
 * Collects name, phone, optional email, password, and confirm password to register a new RESQGo account.
 */
export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const route = useRoute<RegisterRouteProp>();
  const { width, height } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width, height), [width, height]);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(route.params?.phoneNumber ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isNameValid = fullName.trim().length >= 2;
  const isPhoneValid = phoneNumber.length === MAX_PHONE_DIGITS;
  const isEmailValid = email.trim().length === 0 || EMAIL_REGEX.test(email.trim());
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid =
    confirmPassword.length >= 6 && confirmPassword === password;

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    acceptedTerms;

  const markTouched = useCallback((fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  const handlePhoneChange = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);
    setPhoneNumber(digitsOnly);
  }, []);

  const handleRegister = useCallback(async () => {
    // Mark all fields as touched for validation visibility
    setTouchedFields({
      fullName: true,
      phoneNumber: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (!fullName.trim() || fullName.trim().length < 2) {
      Alert.alert('Required Field', 'Please enter your full name (at least 2 characters).');
      return;
    }

    if (!isPhoneValid) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address or leave it blank.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password Too Short', 'Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords Do Not Match', 'Please ensure your passwords match.');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert(
        'Terms & Privacy',
        'Please agree to the Terms of Service and Privacy Policy to continue.',
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await register({
        fullName: fullName.trim(),
        phoneNumber,
        password: password.trim(),
        email: email.trim() || undefined,
      });

      if (response?.token) {
        Alert.alert(
          'Account Created! 🎉',
          'Welcome to RESQGo! Your account has been registered successfully.',
          [
            {
              text: 'Get Started',
              onPress: () => {
                const rootNavigation =
                  navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
                if (rootNavigation) {
                  navigateToAppHome(rootNavigation);
                  return;
                }
                navigation.navigate('Login', { phoneNumber });
              },
            },
          ],
        );
      } else {
        Alert.alert(
          'Account Created',
          'Your account has been registered. You can now log in.',
          [
            {
              text: 'Log In',
              onPress: () => navigation.navigate('Login', { phoneNumber }),
            },
          ],
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again.';
      if (message.toLowerCase().includes('already exists')) {
        Alert.alert(
          'Account Exists',
          'An account with this mobile number already exists. Please log in instead.',
          [
            {
              text: 'Log In',
              onPress: () => navigation.navigate('Login', { phoneNumber }),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      } else {
        Alert.alert('Registration Failed', message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    acceptedTerms,
    confirmPassword,
    email,
    fullName,
    isEmailValid,
    isPhoneValid,
    navigation,
    password,
    phoneNumber,
  ]);

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
              {/* Top Hero Banner */}
              <View style={styles.heroHeader}>
                <AuthHeroGraphic type="signup" />
                <Text style={styles.heroTitle}>
                  Create Your Account and Stay Protected Everywhere
                </Text>
              </View>

              {/* Bottom White Sheet Container */}
              <View style={styles.bottomSheet}>
                {/* Header: Title & Log in Link */}
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Create Account</Text>
                  <View style={styles.subRow}>
                    <Text style={styles.subRowText}>Already Have An Account?</Text>
                    <Pressable
                      onPress={() => navigation.navigate('Login', { phoneNumber: phoneNumber || undefined })}
                      accessibilityRole="button"
                      accessibilityLabel="Log in">
                      <Text style={styles.subRowLink}>Log in</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Form Controls */}
                <View style={styles.formGroup}>
                  {/* Full Name Pill Input */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'fullName' && styles.pillInputWrapFocused,
                      touchedFields.fullName && !isNameValid && styles.pillInputWrapError,
                    ]}>
                    <Ionicons
                      name="person-outline"
                      size={19}
                      color={
                        touchedFields.fullName && !isNameValid
                          ? '#EF4444'
                          : focusedField === 'fullName'
                          ? '#0D9488'
                          : '#9CA3AF'
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={fullName}
                      onChangeText={setFullName}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => {
                        setFocusedField(null);
                        markTouched('fullName');
                      }}
                      style={styles.pillInput}
                      placeholder="Enter your full name"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="words"
                      accessibilityLabel="Full name input"
                    />
                  </View>
                  {touchedFields.fullName && !isNameValid && (
                    <Text style={styles.fieldErrorText}>Full name must be at least 2 characters.</Text>
                  )}

                  {/* Phone Number Pill Input */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'phone' && styles.pillInputWrapFocused,
                      touchedFields.phoneNumber && !isPhoneValid && styles.pillInputWrapError,
                    ]}>
                    <Ionicons
                      name="call-outline"
                      size={19}
                      color={
                        touchedFields.phoneNumber && !isPhoneValid
                          ? '#EF4444'
                          : focusedField === 'phone'
                          ? '#0D9488'
                          : '#9CA3AF'
                      }
                      style={styles.inputIcon}
                    />
                    <View style={styles.countryCodeBadge}>
                      <Text style={styles.countryCodeText}>{COUNTRY_CODE}</Text>
                    </View>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={handlePhoneChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => {
                        setFocusedField(null);
                        markTouched('phoneNumber');
                      }}
                      style={styles.pillInput}
                      keyboardType="number-pad"
                      maxLength={MAX_PHONE_DIGITS}
                      placeholder="Enter mobile number"
                      placeholderTextColor="#9CA3AF"
                      accessibilityLabel="Mobile number input"
                    />
                  </View>
                  {touchedFields.phoneNumber && !isPhoneValid && (
                    <Text style={styles.fieldErrorText}>Please enter a valid 10-digit mobile number.</Text>
                  )}

                  {/* Email Pill Input (Optional) */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'email' && styles.pillInputWrapFocused,
                      touchedFields.email && !isEmailValid && styles.pillInputWrapError,
                    ]}>
                    <Ionicons
                      name="mail-outline"
                      size={19}
                      color={
                        touchedFields.email && !isEmailValid
                          ? '#EF4444'
                          : focusedField === 'email'
                          ? '#0D9488'
                          : '#9CA3AF'
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => {
                        setFocusedField(null);
                        markTouched('email');
                      }}
                      style={styles.pillInput}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="Enter your email address (optional)"
                      placeholderTextColor="#9CA3AF"
                      accessibilityLabel="Email input"
                    />
                  </View>
                  {touchedFields.email && !isEmailValid && (
                    <Text style={styles.fieldErrorText}>Please provide a valid email address.</Text>
                  )}

                  {/* Password Pill Input */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'password' && styles.pillInputWrapFocused,
                      touchedFields.password && !isPasswordValid && styles.pillInputWrapError,
                    ]}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={19}
                      color={
                        touchedFields.password && !isPasswordValid
                          ? '#EF4444'
                          : focusedField === 'password'
                          ? '#0D9488'
                          : '#9CA3AF'
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => {
                        setFocusedField(null);
                        markTouched('password');
                      }}
                      style={styles.pillInput}
                      secureTextEntry={!showPassword}
                      placeholder="Create a password (min 6 chars)"
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
                  {touchedFields.password && !isPasswordValid && (
                    <Text style={styles.fieldErrorText}>Password must be at least 6 characters.</Text>
                  )}

                  {/* Confirm Password Pill Input */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'confirmPassword' && styles.pillInputWrapFocused,
                      touchedFields.confirmPassword && !isConfirmPasswordValid && styles.pillInputWrapError,
                    ]}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={19}
                      color={
                        touchedFields.confirmPassword && !isConfirmPasswordValid
                          ? '#EF4444'
                          : focusedField === 'confirmPassword'
                          ? '#0D9488'
                          : '#9CA3AF'
                      }
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => {
                        setFocusedField(null);
                        markTouched('confirmPassword');
                      }}
                      style={styles.pillInput}
                      secureTextEntry={!showConfirmPassword}
                      placeholder="Confirm your password"
                      placeholderTextColor="#9CA3AF"
                      accessibilityLabel="Confirm password input"
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword(prev => !prev)}
                      style={styles.eyeIconButton}
                      accessibilityRole="button"
                      accessibilityLabel={showConfirmPassword ? 'Hide password' : 'Show password'}>
                      <Ionicons
                        name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={19}
                        color="#9CA3AF"
                      />
                    </Pressable>
                  </View>
                  {touchedFields.confirmPassword && !isConfirmPasswordValid && (
                    <Text style={styles.fieldErrorText}>
                      {confirmPassword.length === 0
                        ? 'Please confirm your password.'
                        : 'Passwords do not match.'}
                    </Text>
                  )}

                  {/* Terms & Privacy Agreement */}
                  <Pressable
                    onPress={() => setAcceptedTerms(current => !current)}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: acceptedTerms }}
                    style={styles.termsRow}>
                    <View
                      style={[
                        styles.checkbox,
                        acceptedTerms && styles.checkboxChecked,
                      ]}>
                      {acceptedTerms && (
                        <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                      )}
                    </View>
                    <View style={styles.termsTextWrap}>
                      <Text style={styles.termsText}>
                        I agree to the{' '}
                        <Text
                          style={styles.termsLink}
                          onPress={() => navigation.navigate('Support')}>
                          Terms of Service
                        </Text>{' '}
                        and{' '}
                        <Text
                          style={styles.termsLink}
                          onPress={() => navigation.navigate('Support')}>
                          Privacy Policy
                        </Text>
                        .
                      </Text>
                    </View>
                  </Pressable>

                  {/* Primary Sign Up / Create Account Button */}
                  <Pressable
                    onPress={handleRegister}
                    disabled={!isFormValid || isLoading}
                    accessibilityRole="button"
                    accessibilityLabel="Register Account"
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
                        {isLoading ? 'Creating Account...' : 'Register Account'}
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

      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default RegisterScreen;
