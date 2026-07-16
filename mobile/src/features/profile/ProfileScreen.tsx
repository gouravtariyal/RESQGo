import React, { useCallback, useMemo } from 'react';
import { Alert, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type {
  AppStackParamList,
  BottomTabParamList,
  RootStackParamList,
} from '../../navigation/types';
import {
  PROFILE_MENU_ITEMS,
  type ProfileMenuItem,
} from './data';
import { MenuItem } from './MenuItem';
import { ProfileCard } from './ProfileCard';
import { useProfileStore } from './profileStore';
import {
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type ProfileNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<AppStackParamList>
>;

/**
 * ProfileScreen
 * -------------
 * Premium account hub with identity card and quick-action menu.
 */
export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { profile } = useProfileStore();

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout from RESQGo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // Return the user to the auth flow after logout.
          navigation
            .getParent<NativeStackNavigationProp<RootStackParamList>>()
            ?.reset({
              index: 0,
              routes: [{ name: 'Auth', params: { screen: 'Login' } }],
            });
        },
      },
    ]);
  }, [navigation]);

  const handleMenuPress = useCallback(
    (item: ProfileMenuItem) => {
      switch (item.id) {
        case 'edit-profile':
          navigation.navigate('EditProfile');
          return;
        case 'my-vehicles':
          navigation.navigate('MainTabs', { screen: 'Vehicles' });
          return;
        case 'service-history':
          navigation.navigate('MainTabs', { screen: 'History' });
          return;
        case 'emergency-contacts':
          navigation.navigate('EmergencyContacts');
          return;
        case 'notifications':
          navigation.navigate('Notifications');
          return;
        case 'help-support':
          navigation.navigate('Support');
          return;
        case 'about-app':
          navigation.navigate('About');
          return;
        case 'privacy-policy':
          navigation.navigate('PrivacyPolicy');
          return;
        case 'terms':
          navigation.navigate('Terms');
          return;
        case 'logout':
          handleLogout();
          return;
        default:
          return;
      }
    },
    [handleLogout, navigation],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      {/* Bottom inset is handled by the floating tab bar. */}
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.headerTitle} accessibilityRole="header">
            My Profile
          </Text>

          {/* Identity summary */}
          <ProfileCard profile={profile} />

          {/* Quick actions */}
          <Text style={styles.menuSectionTitle}>Quick Actions</Text>
          <View style={styles.menuCard}>
            {PROFILE_MENU_ITEMS.map((item, index) => (
              <MenuItem
                key={item.id}
                item={item}
                isLast={index === PROFILE_MENU_ITEMS.length - 1}
                onPress={handleMenuPress}
              />
            ))}
          </View>

          {/* Shortcut into full settings */}
          <Text style={[styles.menuSectionTitle, { marginTop: 24 }]}>Preferences</Text>
          <View style={styles.menuCard}>
            <MenuItem
              item={{ id: 'notifications', title: 'Settings', icon: '⚙️' }}
              isLast
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;
