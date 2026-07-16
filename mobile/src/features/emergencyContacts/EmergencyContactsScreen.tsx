import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AppStackParamList } from '../../navigation/types';
import { ContactCard } from './ContactCard';
import { useEmergencyContacts } from './contactsStore';
import type { EmergencyContact } from './data';
import {
  CTA_GRADIENT_COLORS,
  CTA_GRADIENT_END,
  CTA_GRADIENT_START,
  SCREEN_GRADIENT_COLORS,
  SCREEN_GRADIENT_END,
  SCREEN_GRADIENT_START,
  createStyles,
} from './styles';

type EmergencyContactsNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'EmergencyContacts'
>;

/**
 * EmergencyContactsScreen
 * -----------------------
 * Manage personal emergency contacts used during SOS situations.
 */
export const EmergencyContactsScreen: React.FC = () => {
  const navigation = useNavigation<EmergencyContactsNavigationProp>();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);
  const { contacts, deleteContact } = useEmergencyContacts();

  const handleCall = useCallback((contact: EmergencyContact) => {
    Alert.alert(
      `Call ${contact.name}`,
      `This is a simulated call to ${contact.phoneNumber}.`,
    );
  }, []);

  const handleEdit = useCallback(
    (contact: EmergencyContact) => {
      navigation.navigate('AddEmergencyContact', { contactId: contact.id });
    },
    [navigation],
  );

  const handleDelete = useCallback(
    (contact: EmergencyContact) => {
      Alert.alert(
        'Delete contact?',
        `Remove ${contact.name} from your emergency contacts?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteContact(contact.id),
          },
        ],
      );
    },
    [deleteContact],
  );

  const renderItem = useCallback(
    ({ item }: { item: EmergencyContact }) => (
      <ContactCard
        contact={item}
        onCall={handleCall}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    [handleCall, handleDelete, handleEdit],
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </Pressable>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle} accessibilityRole="header">
            Emergency Contacts
          </Text>
          <Text style={styles.headerSubtitle}>
            People we can notify quickly during an SOS.
          </Text>
        </View>
      </View>
    ),
    [navigation, styles],
  );

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No emergency contacts yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap Add Contact to save someone who can help in an emergency.
        </Text>
      </View>
    ),
    [styles],
  );

  return (
    <LinearGradient
      colors={[...SCREEN_GRADIENT_COLORS]}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <Pressable
          onPress={() => navigation.navigate('AddEmergencyContact')}
          accessibilityRole="button"
          accessibilityLabel="Add Contact"
          style={styles.fab}>
          <LinearGradient
            colors={[...CTA_GRADIENT_COLORS]}
            start={CTA_GRADIENT_START}
            end={CTA_GRADIENT_END}
            style={styles.fabGradient}>
            <Text style={styles.fabText}>+ Add Contact</Text>
          </LinearGradient>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EmergencyContactsScreen;
