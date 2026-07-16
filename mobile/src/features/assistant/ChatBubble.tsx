import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';

import { formatMessageTime, type ChatMessage } from './data';
import { createStyles } from './styles';

type ChatBubbleProps = {
  message: ChatMessage;
};

/**
 * ChatBubble
 * ----------
 * Reusable message bubble with separate layouts for user and AI messages.
 */
export const ChatBubble: React.FC<ChatBubbleProps> = memo(({ message }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const isUser = message.sender === 'user';

  // Soft fade/slide-in when a new bubble appears.
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.bubbleRow,
        isUser ? styles.bubbleRowUser : styles.bubbleRowAi,
        { opacity, transform: [{ translateY }] },
      ]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAi]}>
        <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextAi]}>
          {message.text}
        </Text>
        <Text
          style={[styles.timestamp, isUser ? styles.timestampUser : styles.timestampAi]}>
          {formatMessageTime(message.createdAt)}
        </Text>
      </View>
    </Animated.View>
  );
});

ChatBubble.displayName = 'ChatBubble';

export default ChatBubble;
