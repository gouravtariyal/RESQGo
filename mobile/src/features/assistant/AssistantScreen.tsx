import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import { ChatBubble } from './ChatBubble';
import {
  INITIAL_MESSAGES,
  createLocalAiReply,
  type ChatMessage,
} from './data';
import { MessageInput } from './MessageInput';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type AssistantNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'AIAssistant'
>;

/**
 * AssistantScreen
 * ---------------
 * Premium local AI chat UI for roadside guidance.
 * Messages stay in component state until a real assistant backend is added.
 */
export const AssistantScreen: React.FC = () => {
  const navigation = useNavigation<AssistantNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const listRef = useRef<FlatList<ChatMessage>>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Always keep the newest message visible after send / AI reply.
  const scrollToLatest = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  useEffect(() => {
    scrollToLatest();
  }, [messages, scrollToLatest]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = draft.trim();

    // Block empty / whitespace-only messages.
    if (!trimmed || isReplying) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages(current => [...current, userMessage]);
    setDraft('');
    setIsReplying(true);

    // Simulate a short thinking delay before the local AI reply appears.
    replyTimeoutRef.current = setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: createLocalAiReply(trimmed),
        createdAt: new Date().toISOString(),
      };

      setMessages(current => [...current, aiMessage]);
      setIsReplying(false);
    }, 700);
  }, [draft, isReplying]);

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => <ChatBubble message={item} />,
    [],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
          {/* Header with online presence indicator */}
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}>
              <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>

            <View style={styles.avatarWrap}>
              <Text style={styles.avatarEmoji}>🤖</Text>
            </View>

            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle} accessibilityRole="header">
                AI Assistant
              </Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
          </View>

          {/* Chat transcript */}
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={scrollToLatest}
          />

          {/* Composer */}
          <MessageInput
            value={draft}
            onChangeText={setDraft}
            onSend={handleSend}
            disabled={isReplying}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AssistantScreen;
