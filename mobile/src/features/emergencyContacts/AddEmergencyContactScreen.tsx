import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
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

import type { AppStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { getEmergencyContactById, useEmergencyContacts } from './contactsStore';
import {
  RELATIONSHIP_OPTIONS,
  createEmptyContactForm,
  validateContactForm,
  type EmergencyContactFormValues,
} from './data';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type AddContactNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'AddEmergencyContact'
>;
type AddContactRouteProp = RouteProp<AppStackParamList, 'AddEmergencyContact'>;

/**
 * AddEmergencyContactScreen
 * -------------------------
 * Create or edit a personal emergency contact with local validation.
 */
export const AddEmergencyContactScreen: React.FC = () => {
  const navigation = useNavigation<AddContactNavigationProp>();
  const route = useRoute<AddContactRouteProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { addContact, updateContact } = useEmergencyContacts();

  const editingId = route.params?.contactId;
  const existing = editingId ? getEmergencyContactById(editingId) : undefined;
  const isEditing = Boolean(existing);

  const [form, setForm] = useState<EmergencyContactFormValues>(() => {
    if (!existing) {
      return createEmptyContactForm();
    }

    return {
      name: existing.name,
      relationship: existing.relationship,
      phoneNumber: existing.phoneNumber,
      isPrimary: existing.isPrimary,
    };
  });

  const [errors, setErrors] = useState<ReturnType<typeof validateContactForm>>({});
  const [focusedField, setFocusedField] = useState<'name' | 'phoneNumber' | null>(null);

  const updateField = useCallback(
    <K extends keyof EmergencyContactFormValues>(
      key: K,
      value: EmergencyContactFormValues[K],
    ) => {
      setForm(current => ({ ...current, [key]: value }));
      setErrors(current => {
        if (!(key in current)) {
          return current;
        }
        const next = { ...current };
        delete next[key as keyof typeof next];
        return next;
      });
    },
    [],
  );

  const handleSave = useCallback(() => {
    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      Alert.alert('Check the form', 'Please fix the highlighted fields.');
      return;
    }

    const payload: EmergencyContactFormValues = {
      ...form,
      name: form.name.trim(),
      relationship: form.relationship.trim(),
      phoneNumber: form.phoneNumber.trim(),
    };

    if (isEditing && editingId) {
      updateContact(editingId, payload);
      Alert.alert('Contact updated', 'Emergency contact saved successfully.');
    } else {
      addContact(payload);
      Alert.alert('Contact added', 'Emergency contact saved successfully.');
    }

    navigation.goBack();
  }, [addContact, editingId, form, isEditing, navigation, updateContact]);

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
            contentContainerStyle={styles.formScrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
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
                  {isEditing ? 'Edit Contact' : 'Add Contact'}
                </Text>
                <Text style={styles.headerSubtitle}>
                  Save someone we can reach in an emergency.
                </Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={form.name}
                  onChangeText={value => updateField('name', value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter full name"
                  placeholderTextColor="#9CA3AF"
                  style={[
                    styles.input,
                    focusedField === 'name' && styles.inputFocused,
                    Boolean(errors.name) && styles.inputError,
                  ]}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Relationship</Text>
                <View style={styles.chipRow}>
                  {RELATIONSHIP_OPTIONS.map(option => {
                    const selected = form.relationship === option;

                    return (
                      <Pressable
                        key={option}
                        onPress={() => updateField('relationship', option)}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        style={[styles.chip, selected && styles.chipSelected]}>
                        <Text
                          style={[
                            styles.chipText,
                            selected && styles.chipTextSelected,
                          ]}>
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                {errors.relationship ? (
                  <Text style={styles.errorText}>{errors.relationship}</Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  value={form.phoneNumber}
                  onChangeText={value => updateField('phoneNumber', value)}
                  onFocus={() => setFocusedField('phoneNumber')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+91 98765 43210"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  style={[
                    styles.input,
                    focusedField === 'phoneNumber' && styles.inputFocused,
                    Boolean(errors.phoneNumber) && styles.inputError,
                  ]}
                />
                {errors.phoneNumber ? (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                ) : null}
              </View>

              <View style={styles.toggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Primary Contact</Text>
                  <Text style={styles.metaText}>
                    Primary contacts are notified first during SOS.
                  </Text>
                </View>
                <Switch
                  value={form.isPrimary}
                  onValueChange={value => updateField('isPrimary', value)}
                  trackColor={{ false: colors.border, true: '#93C5FD' }}
                  thumbColor={form.isPrimary ? colors.primary : colors.surface}
                />
              </View>
            </View>

            <Pressable
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save contact"
              style={styles.saveButton}>
              <LinearGradient
                colors={[...CTA_GRADIENT_COLORS]}
                start={CTA_GRADIENT_START}
                end={CTA_GRADIENT_END}
                style={styles.saveGradient}>
                <Text style={styles.saveText}>
                  {isEditing ? 'Update Contact' : 'Save Contact'}
                </Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddEmergencyContactScreen;
