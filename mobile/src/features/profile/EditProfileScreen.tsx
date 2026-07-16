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

import type { AppStackParamList } from '../../navigation/types';
import { validateProfileForm } from './data';
import { useProfileStore } from './profileStore';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type EditProfileNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'EditProfile'
>;

/**
 * EditProfileScreen
 * -----------------
 * Lets users update name and email locally. Mobile number stays read-only.
 */
export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { profile, saveProfile } = useProfileStore();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [focusedField, setFocusedField] = useState<'name' | 'email' | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSave = useCallback(() => {
    const nextErrors = validateProfileForm({ name, email });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      Alert.alert('Check your details', 'Please fix the highlighted fields and try again.');
      return;
    }

    saveProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    Alert.alert('Profile updated', 'Your profile details were saved successfully.');
    navigation.goBack();
  }, [email, name, navigation, saveProfile]);

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.stackScrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* Header */}
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
                  Edit Profile
                </Text>
                <Text style={styles.headerSubtitle}>
                  Update your personal details below.
                </Text>
              </View>
            </View>

            {/* Form */}
            <View style={styles.formCard}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={value => {
                    setName(value);
                    if (errors.name) {
                      setErrors(current => ({ ...current, name: undefined }));
                    }
                  }}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  placeholderTextColor="#9CA3AF"
                  accessibilityLabel="Name"
                  style={[
                    styles.input,
                    focusedField === 'name' && styles.inputFocused,
                    Boolean(errors.name) && styles.inputError,
                  ]}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={value => {
                    setEmail(value);
                    if (errors.email) {
                      setErrors(current => ({ ...current, email: undefined }));
                    }
                  }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Email"
                  style={[
                    styles.input,
                    focusedField === 'email' && styles.inputFocused,
                    Boolean(errors.email) && styles.inputError,
                  ]}
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  value={profile.mobileNumber}
                  editable={false}
                  accessibilityLabel="Mobile number"
                  style={[styles.input, styles.inputReadonly]}
                />
                <Text style={styles.helperText}>
                  Mobile number is verified and cannot be edited here.
                </Text>
              </View>
            </View>

            {/* Save CTA */}
            <Pressable
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save profile"
              style={styles.saveButton}>
              <LinearGradient
                colors={[...CTA_GRADIENT_COLORS]}
                start={CTA_GRADIENT_START}
                end={CTA_GRADIENT_END}
                style={styles.saveGradient}>
                <Text style={styles.saveText}>Save</Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditProfileScreen;
