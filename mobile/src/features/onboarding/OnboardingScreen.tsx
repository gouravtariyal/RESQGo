import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import type { AuthStackParamList } from '../../navigation/types';

type OnboardingNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

/**
 * Placeholder onboarding screen — UI to be designed later.
 */
export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Pressable onPress={() => navigation.navigate('Login')} style={styles.action}>
        <Text>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    marginTop: 16,
  },
});

export default OnboardingScreen;
