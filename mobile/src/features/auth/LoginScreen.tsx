import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import type {
  AuthStackParamList,
  RootStackParamList,
} from '../../navigation/types';

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

/**
 * Placeholder login screen — UI to be designed later.
 * On success, resets the root stack into the authenticated App navigator.
 */
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const handleLoginSuccess = () => {
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Pressable onPress={handleLoginSuccess} style={styles.action}>
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

export default LoginScreen;
