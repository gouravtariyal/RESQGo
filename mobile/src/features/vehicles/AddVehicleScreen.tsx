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

import type { AppStackParamList } from '../../navigation/types';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';
import { FUEL_TYPES, type FuelType, type VehicleFormValues } from './types';
import {
  createEmptyVehicleForm,
  normalizeRegistrationNumber,
  validateVehicleForm,
} from './validation';
import { getVehicleById, useVehicles } from './vehiclesStore';

type AddVehicleNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'AddVehicle'
>;
type AddVehicleRouteProp = RouteProp<AppStackParamList, 'AddVehicle'>;

/**
 * AddVehicleScreen
 * ----------------
 * Form screen used to create or edit a vehicle with local validation.
 */
export const AddVehicleScreen: React.FC = () => {
  const navigation = useNavigation<AddVehicleNavigationProp>();
  const route = useRoute<AddVehicleRouteProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { addVehicle, updateVehicle } = useVehicles();

  const editingVehicleId = route.params?.vehicleId;
  const editingVehicle = editingVehicleId
    ? getVehicleById(editingVehicleId)
    : undefined;

  const [formValues, setFormValues] = useState<VehicleFormValues>(() => {
    if (!editingVehicle) {
      return createEmptyVehicleForm();
    }

    return {
      name: editingVehicle.name,
      manufacturer: editingVehicle.manufacturer,
      model: editingVehicle.model,
      registrationNumber: editingVehicle.registrationNumber,
      fuelType: editingVehicle.fuelType,
      color: editingVehicle.color,
      year: editingVehicle.year,
    };
  });

  const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormValues, string>>>(
    {},
  );
  const [focusedField, setFocusedField] = useState<keyof VehicleFormValues | null>(
    null,
  );

  const isEditing = Boolean(editingVehicleId);

  const updateField = useCallback(
    <K extends keyof VehicleFormValues>(key: K, value: VehicleFormValues[K]) => {
      setFormValues(current => ({ ...current, [key]: value }));
      setErrors(current => {
        if (!current[key]) {
          return current;
        }

        const next = { ...current };
        delete next[key];
        return next;
      });
    },
    [],
  );

  // Validate every required field, then save into the local store.
  const handleSave = useCallback(() => {
    const normalizedValues: VehicleFormValues = {
      ...formValues,
      name: formValues.name.trim(),
      manufacturer: formValues.manufacturer.trim(),
      model: formValues.model.trim(),
      registrationNumber: normalizeRegistrationNumber(formValues.registrationNumber),
      color: formValues.color.trim(),
      year: formValues.year.trim(),
    };

    const nextErrors = validateVehicleForm(normalizedValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      Alert.alert('Please complete the form', 'All fields are required and must be valid.');
      return;
    }

    if (isEditing && editingVehicleId) {
      updateVehicle(editingVehicleId, normalizedValues);
      Alert.alert('Vehicle updated', 'Your vehicle details were saved successfully.');
    } else {
      addVehicle(normalizedValues);
      Alert.alert('Vehicle added', 'Your vehicle was added to your garage.');
    }

    navigation.goBack();
  }, [
    addVehicle,
    editingVehicleId,
    formValues,
    isEditing,
    navigation,
    updateVehicle,
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
            contentContainerStyle={styles.formScrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* Header with back navigation */}
            <View style={styles.formHeaderRow}>
              <Pressable
                onPress={() => navigation.goBack()}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
              </Pressable>

              <View style={styles.formHeaderText}>
                <Text style={styles.formTitle} accessibilityRole="header">
                  {isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
                </Text>
                <Text style={styles.formSubtitle}>
                  {isEditing
                    ? 'Update your vehicle details below.'
                    : 'Fill in the details to add a new vehicle.'}
                </Text>
              </View>
            </View>

            {/* Form fields card */}
            <View style={styles.formCard}>
              <FormField
                label="Vehicle Name"
                value={formValues.name}
                placeholder="e.g. Family Hatchback"
                error={errors.name}
                focused={focusedField === 'name'}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                onChangeText={value => updateField('name', value)}
              />

              <FormField
                label="Manufacturer"
                value={formValues.manufacturer}
                placeholder="e.g. Hyundai"
                error={errors.manufacturer}
                focused={focusedField === 'manufacturer'}
                onFocus={() => setFocusedField('manufacturer')}
                onBlur={() => setFocusedField(null)}
                onChangeText={value => updateField('manufacturer', value)}
              />

              <FormField
                label="Model"
                value={formValues.model}
                placeholder="e.g. i20 Sportz"
                error={errors.model}
                focused={focusedField === 'model'}
                onFocus={() => setFocusedField('model')}
                onBlur={() => setFocusedField(null)}
                onChangeText={value => updateField('model', value)}
              />

              <FormField
                label="Registration Number"
                value={formValues.registrationNumber}
                placeholder="e.g. MH12AB1234"
                autoCapitalize="characters"
                error={errors.registrationNumber}
                focused={focusedField === 'registrationNumber'}
                onFocus={() => setFocusedField('registrationNumber')}
                onBlur={() => setFocusedField(null)}
                onChangeText={value =>
                  updateField('registrationNumber', normalizeRegistrationNumber(value))
                }
              />

              {/* Fuel type selector */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Fuel Type</Text>
                <View style={styles.fuelRow}>
                  {FUEL_TYPES.map(fuelType => {
                    const selected = formValues.fuelType === fuelType;

                    return (
                      <Pressable
                        key={fuelType}
                        onPress={() => updateField('fuelType', fuelType as FuelType)}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={`${fuelType} fuel type`}
                        style={[
                          styles.fuelChip,
                          selected && styles.fuelChipSelected,
                        ]}>
                        <Text
                          style={[
                            styles.fuelChipText,
                            selected && styles.fuelChipTextSelected,
                          ]}>
                          {fuelType}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                {errors.fuelType ? (
                  <Text style={styles.errorText}>{errors.fuelType}</Text>
                ) : null}
              </View>

              <FormField
                label="Color"
                value={formValues.color}
                placeholder="e.g. White"
                error={errors.color}
                focused={focusedField === 'color'}
                onFocus={() => setFocusedField('color')}
                onBlur={() => setFocusedField(null)}
                onChangeText={value => updateField('color', value)}
              />

              <FormField
                label="Year"
                value={formValues.year}
                placeholder="e.g. 2021"
                keyboardType="number-pad"
                maxLength={4}
                error={errors.year}
                focused={focusedField === 'year'}
                onFocus={() => setFocusedField('year')}
                onBlur={() => setFocusedField(null)}
                onChangeText={value =>
                  updateField('year', value.replace(/\D/g, '').slice(0, 4))
                }
              />
            </View>

            {/* Save CTA */}
            <Pressable
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save Vehicle"
              style={styles.saveButton}>
              <LinearGradient
                colors={[...CTA_GRADIENT_COLORS]}
                start={CTA_GRADIENT_START}
                end={CTA_GRADIENT_END}
                style={styles.saveGradient}>
                <Text style={styles.saveText}>
                  {isEditing ? 'Update Vehicle' : 'Save Vehicle'}
                </Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

type FormFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  focused: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'number-pad';
  maxLength?: number;
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (value: string) => void;
};

/**
 * FormField
 * ---------
 * Reusable labeled input used across the Add / Edit vehicle form.
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  error,
  focused,
  autoCapitalize = 'words',
  keyboardType = 'default',
  maxLength,
  onFocus,
  onBlur,
  onChangeText,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        accessibilityLabel={label}
        style={[
          styles.input,
          focused && styles.inputFocused,
          Boolean(error) && styles.inputError,
        ]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default AddVehicleScreen;
