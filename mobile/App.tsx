/**
 * RESQGo App entry.
 * Navigation ownership lives in RootNavigator — keep this file thin.
 *
 * @format
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootNavigator } from './src/navigation';
import { colors } from './src/theme/colors';

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

/**
 * Prevents a white/blank screen when a render error occurs.
 */
class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Unexpected render error',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorRoot}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{this.state.message}</Text>
          <Text style={styles.errorHint}>Reload the app to continue.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <AppErrorBoundary>
      <RootNavigator />
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 12,
  },
  errorHint: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default App;
