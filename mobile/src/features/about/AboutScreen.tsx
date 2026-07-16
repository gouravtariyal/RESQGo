import React, { useMemo } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
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

type AboutNavigationProp = NativeStackNavigationProp<AppStackParamList, 'About'>;

const SOCIAL_LINKS = [
  { id: 'website', label: 'Website', url: 'https://resqgo.app' },
  { id: 'twitter', label: 'Twitter', url: 'https://twitter.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
] as const;

/**
 * AboutScreen
 * -----------
 * App information, mission, social links, and share/rate actions.
 */
export const AboutScreen: React.FC = () => {
  const navigation = useNavigation<AboutNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const openLink = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      Alert.alert('Unable to open link', url);
      return;
    }

    await Linking.openURL(url);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Try RESQGo — AI Powered Roadside Assistance. https://resqgo.app',
      });
    } catch {
      Alert.alert('Share unavailable', 'Sharing is not available on this device right now.');
    }
  };

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}>
              <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>
            <Text style={styles.headerTitle} accessibilityRole="header">
              About
            </Text>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.logoWrap}>
              <Text style={styles.logoEmoji}>🚗</Text>
            </View>
            <Text style={styles.appName}>RESQGo</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>RESQGo Product Team</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Company</Text>
              <Text style={styles.infoValue}>RESQGo Technologies Pvt. Ltd.</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Mission</Text>
              <Text style={styles.missionText}>
                Make roadside help across India faster, safer, and smarter with AI-guided
                assistance and verified nearby providers.
              </Text>
            </View>
          </View>

          <View style={styles.socialRow}>
            {SOCIAL_LINKS.map(link => (
              <Pressable
                key={link.id}
                onPress={() => openLink(link.url)}
                accessibilityRole="link"
                accessibilityLabel={link.label}
                style={styles.socialChip}>
                <Text style={styles.socialText}>{link.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => Alert.alert('Rate App', 'App store rating will open here later.')}
              accessibilityRole="button"
              accessibilityLabel="Rate App"
              style={styles.primaryButton}>
              <LinearGradient
                colors={[...CTA_GRADIENT_COLORS]}
                start={CTA_GRADIENT_START}
                end={CTA_GRADIENT_END}
                style={styles.primaryGradient}>
                <Text style={styles.primaryText}>Rate App</Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={handleShare}
              accessibilityRole="button"
              accessibilityLabel="Share App"
              style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Share App</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AboutScreen;
