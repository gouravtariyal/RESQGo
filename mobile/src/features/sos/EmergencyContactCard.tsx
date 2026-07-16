import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import type { EmergencyContact } from './data';
import { createStyles } from './styles';

type EmergencyContactCardProps = {
  contact: EmergencyContact;
  onCall: (contact: EmergencyContact) => void;
};

/**
 * EmergencyContactCard
 * --------------------
 * Reusable contact row used on the SOS screen.
 * Call is simulated with an alert (no real dialer launch).
 */
export const EmergencyContactCard: React.FC<EmergencyContactCardProps> = memo(
  ({ contact, onCall }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);

    return (
      <View style={styles.contactCard}>
        <View style={styles.contactIconWrap}>
          <Text style={styles.contactIcon}>{contact.icon}</Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
        </View>

        <Pressable
          onPress={() => onCall(contact)}
          accessibilityRole="button"
          accessibilityLabel={`Call ${contact.name}`}
          style={styles.callButton}>
          <Text style={styles.callButtonText}>Call</Text>
        </Pressable>
      </View>
    );
  },
);

EmergencyContactCard.displayName = 'EmergencyContactCard';

export default EmergencyContactCard;
