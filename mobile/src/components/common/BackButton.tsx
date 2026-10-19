import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type BackButtonProps = {
  onPress?: () => void;
  color?: string;
  style?: ViewStyle | ViewStyle[];
  variant?: 'circle' | 'ghost' | 'glass';
  size?: number;
};

/**
 * BackButton
 * ----------
 * Realistic, high-polish native app back button.
 * Uses a crisp vector arrow-back icon with smooth press feedback and comfortable hit slop.
 */
export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  color = '#0F172A',
  style,
  variant = 'circle',
  size = 22,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      style={({ pressed }) => [
        variant === 'circle' && styles.circle,
        variant === 'glass' && styles.glass,
        variant === 'ghost' && styles.ghost,
        pressed && styles.pressed,
        style,
      ]}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  glass: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
});

export default BackButton;
