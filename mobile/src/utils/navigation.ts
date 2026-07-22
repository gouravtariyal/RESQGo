import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';

type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

/**
 * Resets the root navigator into the authenticated app (Bottom Tabs → Home).
 */
export const navigateToAppHome = (navigation: RootNavigation) => {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'App',
        params: {
          screen: 'MainTabs',
          params: { screen: 'Home' },
        },
      },
    ],
  });
};

/**
 * Resets the root navigator into Auth → Onboarding.
 */
export const navigateToLogin = (navigation: RootNavigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Auth', params: { screen: 'Onboarding' } }],
  });
};
