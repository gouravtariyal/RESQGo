import React, { useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AuthStackParamList } from '../../../navigation/types';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

/**
 * RegisterScreen
 * --------------
 * Account creation entry point. UI can be expanded later without changing Login.
 */
export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.hero}>
              <View
                style={styles.logoWrap}
                accessibilityRole="image"
                accessibilityLabel="RESQGo logo">
                <Text style={styles.logoEmoji}>🚗</Text>
              </View>

              <Text style={styles.title} accessibilityRole="header">
                Create Account
              </Text>

              <Text style={styles.subtitle}>
                Set up your RESQGo profile to get roadside help faster.
              </Text>
            </View>

            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Back to Login"
              style={styles.continueButton}>
              <Text style={styles.termsLink}>Back to Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;
