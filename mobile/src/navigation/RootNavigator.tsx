import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from '../features/splash/SplashScreen';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
import type { RootStackParamList } from './types';

/**
 * RootNavigator
 * -------------
 * Top-level navigation container for RESQGo.
 *
 * Flow:
 *   Splash → check Firebase auth().currentUser
 *     → App (Bottom Tabs → Home) when logged in
 *     → Auth (Onboarding → Login → OTP) when logged out
 *
 * Responsibilities:
 * - Wrap the tree in SafeAreaProvider + NavigationContainer
 * - Host the root native stack that switches major app phases
 * - Remain agnostic of feature UI (screens live under features/)
 *
 * Scalability:
 * - Auth changes stay in AuthNavigator
 * - Product modules stay in AppNavigator / BottomTabNavigator
 * - Session/bootstrap logic can later decide initialRouteName (Splash vs App)
 */
export type { RootStackParamList };

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="App" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
