/**
 * Navigation public API
 * ---------------------
 * Import navigators and param lists from this barrel to keep feature imports stable.
 */

export { AppNavigator } from './AppNavigator';
export { AuthNavigator } from './AuthNavigator';
export { BottomTabNavigator } from './BottomTabNavigator';
export { RootNavigator } from './RootNavigator';

export type {
  AppStackParamList,
  AuthStackParamList,
  BottomTabParamList,
  RootStackParamList,
} from './types';

import type { RootStackParamList } from './types';

/**
 * Enables typed `useNavigation` / linking helpers across the app.
 * @see https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-hook-prop-etc
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
