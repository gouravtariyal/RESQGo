import React, { memo, useMemo } from 'react';
import { Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  createStyles,
} from './styles';

type MessageInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

/**
 * MessageInput
 * ------------
 * Composer row with a multiline text field and gradient send button.
 * Empty / whitespace-only input cannot be sent.
 */
export const MessageInput: React.FC<MessageInputProps> = memo(
  ({ value, onChangeText, onSend, disabled = false }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);

    const canSend = value.trim().length > 0 && !disabled;

    return (
      <View style={styles.inputBar}>
        <View style={styles.inputWrap}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder="Ask RESQGo AI for help..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            multiline
            maxLength={500}
            editable={!disabled}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              if (canSend) {
                onSend();
              }
            }}
            accessibilityLabel="Message input"
          />
        </View>

        <Pressable
          onPress={onSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}>
          <LinearGradient
            colors={[...CTA_GRADIENT_COLORS]}
            start={CTA_GRADIENT_START}
            end={CTA_GRADIENT_END}
            style={styles.sendGradient}>
            <Text style={styles.sendIcon}>➤</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  },
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
