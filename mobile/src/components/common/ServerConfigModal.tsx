import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { DEV_MACHINE_LAN_IP } from '../../config/env';
import {
  getCurrentServerUrlSync,
  normalizeServerUrl,
  resetServerUrlToDefault,
  setCustomServerUrl,
  testServerConnection,
} from '../../config/serverConfig';
import { palette } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type ServerConfigModalProps = {
  visible: boolean;
  onClose: () => void;
  onSaved?: (newUrl: string) => void;
};

export const ServerConfigModal: React.FC<ServerConfigModalProps> = ({
  visible,
  onClose,
  onSaved,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (visible) {
      setUrlInput(getCurrentServerUrlSync());
      setTestResult(null);
    }
  }, [visible]);

  const handleTestConnection = useCallback(async () => {
    if (!urlInput.trim()) {
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const result = await testServerConnection(urlInput.trim());
    setTestResult(result);
    setIsTesting(false);
  }, [urlInput]);

  const handleSave = useCallback(async () => {
    if (!urlInput.trim()) {
      return;
    }

    const savedUrl = await setCustomServerUrl(urlInput.trim());
    onSaved?.(savedUrl);
    onClose();
  }, [onClose, onSaved, urlInput]);

  const handleReset = useCallback(async () => {
    const defaultUrl = await resetServerUrlToDefault();
    setUrlInput(defaultUrl);
    setTestResult(null);
  }, []);

  const handlePresetSelect = useCallback((ipOrUrl: string) => {
    const normalized = normalizeServerUrl(ipOrUrl);
    setUrlInput(normalized);
    setTestResult(null);
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIconWrap}>
              <Ionicons name="server" size={20} color={palette.teal600} />
            </View>
            <View style={styles.headerTextWrap}>
              <Text style={styles.title}>Server Configuration</Text>
              <Text style={styles.subtitle}>
                Configure the backend API URL for this device/build.
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#64748B" />
            </Pressable>
          </View>

          {/* Current URL indicator */}
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Active Endpoint:</Text>
            <Text style={styles.statusValue} numberOfLines={1}>
              {getCurrentServerUrlSync()}
            </Text>
          </View>

          {/* Input field */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Backend IP or URL</Text>
            <TextInput
              value={urlInput}
              onChangeText={text => {
                setUrlInput(text);
                setTestResult(null);
              }}
              placeholder="e.g. 172.16.0.60 or http://172.16.0.60:5000"
              placeholderTextColor="#94A3B8"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              style={styles.textInput}
            />
          </View>

          {/* Quick Preset Buttons */}
          <View style={styles.presetSection}>
            <Text style={styles.presetLabel}>Quick Presets:</Text>
            <View style={styles.presetRow}>
              <Pressable
                onPress={() => handlePresetSelect(DEV_MACHINE_LAN_IP)}
                style={styles.presetChip}>
                <Text style={styles.presetChipText}>Host PC ({DEV_MACHINE_LAN_IP})</Text>
              </Pressable>
              <Pressable
                onPress={() => handlePresetSelect('10.0.2.2')}
                style={styles.presetChip}>
                <Text style={styles.presetChipText}>Emulator (10.0.2.2)</Text>
              </Pressable>
              <Pressable
                onPress={handleReset}
                style={[styles.presetChip, styles.presetChipReset]}>
                <Text style={[styles.presetChipText, styles.presetChipResetText]}>Reset</Text>
              </Pressable>
            </View>
          </View>

          {/* Test connection result banner */}
          {testResult && (
            <View
              style={[
                styles.resultBanner,
                testResult.success
                  ? styles.resultBannerSuccess
                  : styles.resultBannerError,
              ]}>
              <Ionicons
                name={testResult.success ? 'checkmark-circle' : 'alert-circle'}
                size={18}
                color={testResult.success ? '#059669' : '#DC2626'}
              />
              <Text
                style={[
                  styles.resultBannerText,
                  testResult.success
                    ? styles.resultBannerTextSuccess
                    : styles.resultBannerTextError,
                ]}>
                {testResult.message}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <Pressable
              onPress={handleTestConnection}
              disabled={isTesting || !urlInput.trim()}
              style={[
                styles.testButton,
                (isTesting || !urlInput.trim()) && styles.buttonDisabled,
              ]}>
              {isTesting ? (
                <ActivityIndicator size="small" color={palette.teal700} />
              ) : (
                <Text style={styles.testButtonText}>Test Connection</Text>
              )}
            </Pressable>

            <Pressable
              onPress={handleSave}
              disabled={!urlInput.trim()}
              style={[
                styles.saveButton,
                !urlInput.trim() && styles.buttonDisabled,
              ]}>
              <Text style={styles.saveButtonText}>Save & Connect</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: radius['2xl'],
    padding: spacing.xl,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: '#0F172A',
  },
  subtitle: {
    fontSize: fontSizes.xs,
    color: '#64748B',
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: fontWeights.semibold,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusValue: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: '#0F766E',
    marginTop: 2,
  },
  inputSection: {
    marginBottom: spacing.sm,
  },
  inputLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: '#334155',
    marginBottom: spacing.xs,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.sm : spacing.xs,
    fontSize: fontSizes.sm,
    color: '#0F172A',
  },
  presetSection: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  presetLabel: {
    fontSize: 11,
    fontWeight: fontWeights.semibold,
    color: '#64748B',
    marginBottom: spacing.xs,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  presetChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  presetChipText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: fontWeights.medium,
  },
  presetChipReset: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  presetChipResetText: {
    color: '#DC2626',
  },
  resultBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  resultBannerSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  resultBannerError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  resultBannerText: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
  },
  resultBannerTextSuccess: {
    color: '#065F46',
  },
  resultBannerTextError: {
    color: '#991B1B',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  testButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: palette.teal600,
    backgroundColor: '#F0FDFA',
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    color: palette.teal700,
  },
  saveButton: {
    flex: 1.2,
    backgroundColor: palette.teal600,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
