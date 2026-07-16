import { useCallback, useEffect, useState } from 'react';

import {
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  type AppSettings,
  type UserProfile,
} from './data';

/**
 * Tiny in-memory store for profile + settings.
 * Keeps screens in sync without a backend for now.
 */
let profile: UserProfile = { ...DEFAULT_PROFILE };
let settings: AppSettings = { ...DEFAULT_SETTINGS };
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach(listener => listener());
};

export const getProfile = () => profile;
export const getSettings = () => settings;

export const updateProfile = (next: Partial<UserProfile>) => {
  profile = { ...profile, ...next };
  notify();
};

export const updateSettings = (next: Partial<AppSettings>) => {
  settings = { ...settings, ...next };
  notify();
};

/**
 * React hook that re-renders when local profile/settings change.
 */
export const useProfileStore = () => {
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(() => getProfile());
  const [currentSettings, setCurrentSettings] = useState<AppSettings>(() => getSettings());

  useEffect(() => {
    const refresh = () => {
      setCurrentProfile({ ...getProfile() });
      setCurrentSettings({ ...getSettings() });
    };

    listeners.add(refresh);

    return () => {
      listeners.delete(refresh);
    };
  }, []);

  const saveProfile = useCallback((next: Partial<UserProfile>) => {
    updateProfile(next);
  }, []);

  const saveSettings = useCallback((next: Partial<AppSettings>) => {
    updateSettings(next);
  }, []);

  return {
    profile: currentProfile,
    settings: currentSettings,
    saveProfile,
    saveSettings,
  };
};
