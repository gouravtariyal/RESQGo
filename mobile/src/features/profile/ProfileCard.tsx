import React, { memo, useMemo } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';

import type { UserProfile } from './data';
import { createStyles } from './styles';

type ProfileCardProps = {
  profile: UserProfile;
};

/**
 * ProfileCard
 * -----------
 * Reusable identity card showing avatar, name, contact info, and membership date.
 */
export const ProfileCard: React.FC<ProfileCardProps> = memo(({ profile }) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(width), [width]);

  return (
    <View style={styles.profileCard}>
      <View
        style={styles.avatarWrap}
        accessibilityRole="image"
        accessibilityLabel="Profile picture">
        <Text style={styles.avatarEmoji}>{profile.avatarEmoji}</Text>
      </View>

      <Text style={styles.profileName}>{profile.name}</Text>
      <Text style={styles.profileMeta}>{profile.mobileNumber}</Text>
      <Text style={styles.profileMeta}>{profile.email}</Text>
      <Text style={styles.memberSince}>{`Member since ${profile.memberSince}`}</Text>
    </View>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
