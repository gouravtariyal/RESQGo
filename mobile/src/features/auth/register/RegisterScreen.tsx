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
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoadingOverlay } from '../../../components/loaders/LoadingOverlay';
import type { AuthStackParamList } from '../../../navigation/types';
import { register } from '../../../services/authService';
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

/**
 * RegisterScreen
 * --------------
 * Account creation entry point connected to the backend register API.
 */
export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const route = useRoute<RegisterRouteProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(route.params?.phoneNumber ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
    if (!isFormValid) {
      Alert.alert('Please complete all required fields.');
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

      Alert.alert('Account created', 'You can now log in with your password.', [
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
  }, [email, fullName, isFormValid, navigation, password, phoneNumber]);

  return (
    <View style={{ flex: 1 }}>
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
                <View style={styles.hero}>
                  <View
                    style={styles.logoWrap}
                    accessibilityRole="image"
                    accessibilityLabel="RESQGo logo">
                    <Text style={styles.logoEmoji}>🚗</Text>
                  </View>

                  <Text style={styles.title} accessibilityRole="header">
                    Create Account
                  </Text>

                  <Text style={styles.subtitle}>
                    Set up your RESQGo profile to get roadside help faster.
                  </Text>
                </View>

                <View style={styles.formCard}>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputWrap}>
                      <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.textInput}
                        placeholder="Enter your full name"
                        placeholderTextColor="#9CA3AF"
                        accessibilityLabel="Full name input"
                      />
                    </View>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputWrap}>
                      <TextInput
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        style={styles.textInput}
                        keyboardType="number-pad"
                        maxLength={MAX_PHONE_DIGITS}
                        placeholder="Enter mobile number"
                        placeholderTextColor="#9CA3AF"
                        accessibilityLabel="Mobile number input"
                      />
                    </View>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>
                      Email <Text style={styles.optionalLabel}>(optional)</Text>
                    </Text>
                    <View style={styles.inputWrap}>
                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        accessibilityLabel="Email input"
                      />
                    </View>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrap}>
                      <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textInput}
                        secureTextEntry
                        placeholder="Create a password"
                        placeholderTextColor="#9CA3AF"
                        accessibilityLabel="Password input"
                      />
                    </View>
                    <Text style={styles.helperText}>Use at least 6 characters.</Text>
                  </View>

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
                      {acceptedTerms ? <Text style={styles.checkboxMark}>✓</Text> : null}
                    </View>
                    <View style={styles.termsTextWrap}>
                      <Text style={styles.termsText}>
                        I agree to the{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>.
                      </Text>
                    </View>
                  </Pressable>

                  <View style={styles.actions}>
                    <Pressable
                      onPress={handleRegister}
                      disabled={!isFormValid || isLoading}
                      accessibilityRole="button"
                      accessibilityLabel="Create Account"
                      style={[
                        styles.continueButton,
                        (!isFormValid || isLoading) && styles.continueButtonDisabled,
                      ]}>
                      <LinearGradient
                        colors={[...CTA_GRADIENT_COLORS]}
                        start={CTA_GRADIENT_START}
                        end={CTA_GRADIENT_END}
                        style={styles.continueGradient}>
                        <Text style={styles.continueText}>Create Account</Text>
                      </LinearGradient>
                    </Pressable>

                    <Pressable
                      onPress={() => navigation.navigate('Login')}
                      accessibilityRole="button"
                      accessibilityLabel="Back to Login"
                      style={styles.continueButton}>
                      <Text style={styles.termsLink}>Back to Login</Text>
                    </Pressable>
                  </View>
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
