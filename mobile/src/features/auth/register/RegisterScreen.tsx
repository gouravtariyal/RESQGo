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

/**
 * RegisterScreen
 * --------------
 * Modern account creation screen matching the teal hero + rounded white sheet design.
 * Collects name, phone, email, and password to register a new RESQGo account.
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
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isPhoneValid = phoneNumber.length === MAX_PHONE_DIGITS;
  const isFormValid =
    fullName.trim().length > 0 &&
    isPhoneValid &&
    password.trim().length >= 6 &&
    acceptedTerms;

  const handlePhoneChange = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);
    setPhoneNumber(digitsOnly);
  }, []);

  const handleRegister = useCallback(async () => {
    if (!fullName.trim()) {
      Alert.alert('Required Field', 'Please enter your full name.');
      return;
    }

    if (!isPhoneValid) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert('Password Too Short', 'Password must be at least 6 characters.');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Terms & Privacy', 'Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    try {
      setIsLoading(true);
      await register({
        fullName: fullName.trim(),
        phoneNumber,
        password: password.trim(),
        email: email.trim() || undefined,
      });

      Alert.alert('Account created', 'You can now log in with your account.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Registration failed',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [acceptedTerms, email, fullName, isPhoneValid, navigation, password, phoneNumber]);

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
                  <Text style={styles.sheetTitle}>Sign up</Text>
                  <View style={styles.subRow}>
                    <Text style={styles.subRowText}>Already Have An Account?</Text>
                    <Pressable
                      onPress={() => navigation.navigate('Login')}
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
                    ]}>
                    <Ionicons
                      name="person-outline"
                      size={19}
                      color={focusedField === 'fullName' ? '#0D9488' : '#9CA3AF'}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={fullName}
                      onChangeText={setFullName}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      style={styles.pillInput}
                      placeholder="Enter your full name"
                      placeholderTextColor="#9CA3AF"
                      accessibilityLabel="Full name input"
                    />
                  </View>

                  {/* Phone Number Pill Input */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'phone' && styles.pillInputWrapFocused,
                    ]}>
                    <Ionicons
                      name="call-outline"
                      size={19}
                      color={focusedField === 'phone' ? '#0D9488' : '#9CA3AF'}
                      style={styles.inputIcon}
                    />
                    <View style={styles.countryCodeBadge}>
                      <Text style={styles.countryCodeText}>{COUNTRY_CODE}</Text>
                    </View>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={handlePhoneChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      style={styles.pillInput}
                      keyboardType="number-pad"
                      maxLength={MAX_PHONE_DIGITS}
                      placeholder="Enter mobile number"
                      placeholderTextColor="#9CA3AF"
                      accessibilityLabel="Mobile number input"
                    />
                  </View>

                  {/* Email Pill Input (Optional) */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'email' && styles.pillInputWrapFocused,
                    ]}>
                    <Ionicons
                      name="mail-outline"
                      size={19}
                      color={focusedField === 'email' ? '#0D9488' : '#9CA3AF'}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      style={styles.pillInput}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="Enter your email address (optional)"
                      placeholderTextColor="#9CA3AF"
                      accessibilityLabel="Email input"
                    />
                  </View>

                  {/* Password Pill Input */}
                  <View
                    style={[
                      styles.pillInputWrap,
                      focusedField === 'password' && styles.pillInputWrapFocused,
                    ]}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={19}
                      color={focusedField === 'password' ? '#0D9488' : '#9CA3AF'}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      style={styles.pillInput}
                      secureTextEntry={!showPassword}
                      placeholder="Create a password"
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
                    accessibilityLabel="Sign up"
                    style={[
                      styles.primaryButton,
                      (!isFormValid || isLoading) && styles.primaryButtonDisabled,
                    ]}>
                    <LinearGradient
                      colors={[...CTA_GRADIENT_COLORS]}
                      start={CTA_GRADIENT_START}
                      end={CTA_GRADIENT_END}
                      style={styles.primaryGradient}>
                      <Text style={styles.primaryButtonText}>Sign up</Text>
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
