import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { LANGUAGE_OPTIONS, type AppLanguage } from './data';
import { useProfileStore } from './profileStore';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type SettingsNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Settings'>;

/**
 * SettingsScreen
 * --------------
 * App preferences screen. Toggles are UI-only for now (local state / in-memory store).
 */
export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { settings, saveSettings } = useProfileStore();

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.stackScrollContent}
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
                Settings
              </Text>
              <Text style={styles.headerSubtitle}>
                Manage preferences for your RESQGo experience.
              </Text>
            </View>
          </View>

          <View style={styles.settingsCard}>
            {/* Dark mode — UI only */}
            <View style={styles.settingRow}>
              <View style={styles.settingTextWrap}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingSubtitle}>
                  Preview toggle only. Theme switching comes later.
                </Text>
              </View>
              <Switch
                value={settings.darkMode}
                onValueChange={value => saveSettings({ darkMode: value })}
                trackColor={{ false: colors.border, true: '#93C5FD' }}
                thumbColor={settings.darkMode ? colors.primary : colors.surface}
                accessibilityLabel="Dark mode toggle"
              />
            </View>

            {/* Language selection */}
            <View>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingSubtitle}>Choose your preferred app language.</Text>
              <View style={styles.languageRow}>
                {LANGUAGE_OPTIONS.map((language: AppLanguage) => {
                  const selected = settings.language === language;

                  return (
                    <Pressable
                      key={language}
                      onPress={() => saveSettings({ language })}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`${language} language`}
                      style={[
                        styles.languageChip,
                        selected && styles.languageChipSelected,
                      ]}>
                      <Text
                        style={[
                          styles.languageChipText,
                          selected && styles.languageChipTextSelected,
                        ]}>
                        {language}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Notifications toggle */}
            <View style={styles.settingRow}>
              <View style={styles.settingTextWrap}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>
                  Receive booking and roadside assistance alerts.
                </Text>
              </View>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={value => saveSettings({ notificationsEnabled: value })}
                trackColor={{ false: colors.border, true: '#93C5FD' }}
                thumbColor={
                  settings.notificationsEnabled ? colors.primary : colors.surface
                }
                accessibilityLabel="Notifications toggle"
              />
            </View>

            {/* Location permission status (display only) */}
            <View style={styles.settingRow}>
              <View style={styles.settingTextWrap}>
                <Text style={styles.settingTitle}>Location Permission</Text>
                <Text style={styles.settingSubtitle}>
                  Required for nearby help and live tracking.
                </Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>{settings.locationPermission}</Text>
              </View>
            </View>

            {/* App version */}
            <View style={styles.settingRow}>
              <View style={styles.settingTextWrap}>
                <Text style={styles.settingTitle}>App Version</Text>
                <Text style={styles.settingSubtitle}>Current installed RESQGo build.</Text>
              </View>
              <Text style={styles.settingTitle}>{settings.appVersion}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingsScreen;
