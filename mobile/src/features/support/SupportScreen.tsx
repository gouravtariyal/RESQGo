import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
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
import { BUSINESS_HOURS, DUMMY_FAQS, SUPPORT_CHANNELS } from './data';
import { FAQCard } from './FAQCard';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type SupportNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Support'>;

/**
 * SupportScreen
 * -------------
 * Help center with searchable FAQs and dummy support channels.
 */
export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<SupportNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(DUMMY_FAQS[0]?.id ?? null);

  const filteredFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return DUMMY_FAQS;
    }

    return DUMMY_FAQS.filter(
      item =>
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized),
    );
  }, [query]);

  const handleToggleFaq = useCallback((id: string) => {
    setExpandedId(current => (current === id ? null : id));
  }, []);

  const handleChannelPress = useCallback((title: string) => {
    Alert.alert(title, 'This support channel is a demo preview for now.');
  }, []);

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
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
                Help & Support
              </Text>
              <Text style={styles.headerSubtitle}>
                Find answers quickly or reach our support team.
              </Text>
            </View>
          </View>

          <View style={styles.searchWrap}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search FAQs"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              accessibilityLabel="Search FAQs"
            />
          </View>

          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {filteredFaqs.length === 0 ? (
            <Text style={styles.emptyText}>No FAQs match your search.</Text>
          ) : (
            filteredFaqs.map(item => (
              <FAQCard
                key={item.id}
                item={item}
                expanded={expandedId === item.id}
                onToggle={handleToggleFaq}
              />
            ))
          )}

          <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Contact Support</Text>
          {SUPPORT_CHANNELS.map(channel => (
            <Pressable
              key={channel.id}
              onPress={() => handleChannelPress(channel.title)}
              accessibilityRole="button"
              accessibilityLabel={channel.title}
              style={styles.channelCard}>
              <View style={styles.channelIconWrap}>
                <Text style={styles.channelIcon}>{channel.icon}</Text>
              </View>
              <View style={styles.channelTextWrap}>
                <Text style={styles.channelTitle}>{channel.title}</Text>
                <Text style={styles.channelSubtitle}>{channel.subtitle}</Text>
              </View>
            </Pressable>
          ))}

          <Pressable
            onPress={() =>
              Alert.alert('Raise Ticket', 'Ticket creation will be connected later.')
            }
            accessibilityRole="button"
            accessibilityLabel="Raise Ticket"
            style={styles.ticketButton}>
            <LinearGradient
              colors={[...CTA_GRADIENT_COLORS]}
              start={CTA_GRADIENT_START}
              end={CTA_GRADIENT_END}
              style={styles.ticketGradient}>
              <Text style={styles.ticketText}>Raise Ticket</Text>
            </LinearGradient>
          </Pressable>

          <View style={styles.hoursCard}>
            <Text style={styles.hoursText}>{`Business Hours: ${BUSINESS_HOURS}`}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SupportScreen;
