import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Placeholder home screen — UI to be designed later.
 * Entry point of the authenticated AppNavigator.
 */
export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
