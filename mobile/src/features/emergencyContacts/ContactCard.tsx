import React, { memo, useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import type { EmergencyContact } from './data';
import { createStyles } from './styles';

type ContactCardProps = {
  contact: EmergencyContact;
  onCall: (contact: EmergencyContact) => void;
  onEdit: (contact: EmergencyContact) => void;
  onDelete: (contact: EmergencyContact) => void;
};

/**
 * ContactCard
 * -----------
 * Reusable emergency contact row with call / edit / delete actions.
 */
export const ContactCard: React.FC<ContactCardProps> = memo(
  ({ contact, onCall, onEdit, onDelete }) => {
    const { width } = useWindowDimensions();
    const styles = useMemo(() => createStyles(width), [width]);
    const initial = contact.name.trim().charAt(0).toUpperCase() || '?';

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{contact.name}</Text>
              {contact.isPrimary ? (
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryBadgeText}>Primary</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.metaText}>{contact.relationship}</Text>
            <Text style={styles.metaText}>{contact.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => onCall(contact)}
            accessibilityRole="button"
            accessibilityLabel={`Call ${contact.name}`}
            style={[styles.actionButton, styles.actionPrimary]}>
            <Text style={[styles.actionText, styles.actionTextPrimary]}>Call</Text>
          </Pressable>

          <Pressable
            onPress={() => onEdit(contact)}
            accessibilityRole="button"
            accessibilityLabel={`Edit ${contact.name}`}
            style={styles.actionButton}>
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>

          <Pressable
            onPress={() => onDelete(contact)}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${contact.name}`}
            style={[styles.actionButton, styles.actionDanger]}>
            <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  },
);

ContactCard.displayName = 'ContactCard';

export default ContactCard;
