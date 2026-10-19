import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, DEV_MACHINE_LAN_IP } from './env';

const STORAGE_KEY_CUSTOM_SERVER_URL = '@resqgo_custom_server_url';

let activeServerUrl: string = API_URL;
let isInitialized = false;

/**
 * Normalizes input (raw IP, hostname, or full URL) into a complete API URL.
 * Examples:
 *   '172.16.0.60' -> 'http://172.16.0.60:5000/api'
 *   '172.16.0.60:5000' -> 'http://172.16.0.60:5000/api'
 *   'http://172.16.0.60:5000' -> 'http://172.16.0.60:5000/api'
 *   'https://api.resqgo.com/api' -> 'https://api.resqgo.com/api'
 */
export const normalizeServerUrl = (input: string): string => {
  let cleaned = input.trim();
  if (!cleaned) {
    return API_URL;
  }

  // Remove trailing slashes
  cleaned = cleaned.replace(/\/+$/, '');

  // Add protocol if missing
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = `http://${cleaned}`;
  }

  // Add port 5000 if it's an IP address or localhost without a port
  try {
    const url = new URL(cleaned);
    if (!url.port && (url.hostname === 'localhost' || /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(url.hostname))) {
      const pathname = url.pathname && url.pathname !== '/' ? url.pathname : '';
      cleaned = `${url.protocol}//${url.hostname}:5000${pathname}`;
    }
  } catch {
    // If URL parsing fails, continue with string heuristics
    if (!cleaned.includes(':') || cleaned.split(':').length === 2) {
      cleaned = `${cleaned}:5000`;
    }
  }

  // Ensure trailing /api
  if (!cleaned.endsWith('/api')) {
    cleaned = `${cleaned}/api`;
  }

  return cleaned;
};

/**
 * Returns the currently active server URL synchronously (uses cached value).
 */
export const getCurrentServerUrlSync = (): string => {
  return activeServerUrl;
};

/**
 * Initializes and restores saved server URL from storage on app launch.
 */
export const initializeServerUrl = async (): Promise<string> => {
  if (isInitialized) {
    return activeServerUrl;
  }

  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY_CUSTOM_SERVER_URL);
    if (saved && saved.trim()) {
      activeServerUrl = saved.trim();
    } else {
      activeServerUrl = API_URL;
    }
  } catch (error) {
    console.warn('[serverConfig] Failed to load custom server URL', error);
    activeServerUrl = API_URL;
  }

  isInitialized = true;
  return activeServerUrl;
};

/**
 * Saves a new custom server URL and updates memory cache.
 */
export const setCustomServerUrl = async (inputUrl: string): Promise<string> => {
  const normalized = normalizeServerUrl(inputUrl);
  try {
    await AsyncStorage.setItem(STORAGE_KEY_CUSTOM_SERVER_URL, normalized);
    activeServerUrl = normalized;
  } catch (error) {
    console.warn('[serverConfig] Failed to persist custom server URL', error);
    activeServerUrl = normalized;
  }
  return normalized;
};

/**
 * Resets the server URL back to the default bundled API_URL.
 */
export const resetServerUrlToDefault = async (): Promise<string> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_CUSTOM_SERVER_URL);
  } catch (error) {
    console.warn('[serverConfig] Failed to remove custom server URL', error);
  }
  activeServerUrl = API_URL;
  return API_URL;
};

/**
 * Tests connection to a given server URL by calling its /health endpoint.
 */
export const testServerConnection = async (
  inputUrl?: string,
): Promise<{ success: boolean; message: string; latencyMs?: number }> => {
  const targetApiUrl = inputUrl ? normalizeServerUrl(inputUrl) : activeServerUrl;
  // Construct health URL by stripping /api
  const hostRoot = targetApiUrl.replace(/\/api\/?$/, '');
  const healthUrl = `${hostRoot}/health`;

  const startTime = Date.now();
  try {
    const response = await axios.get(healthUrl, {
      timeout: 5000,
      headers: { Accept: 'application/json' },
    });

    const latencyMs = Date.now() - startTime;
    if (response.status === 200) {
      return {
        success: true,
        message: `Connected successfully! (${latencyMs}ms)`,
        latencyMs,
      };
    }

    return {
      success: false,
      message: `Server responded with HTTP ${response.status}`,
    };
  } catch (error: any) {
    // Also try /api/health in case health route is nested
    try {
      const fallbackUrl = `${targetApiUrl}/health`;
      const fallbackRes = await axios.get(fallbackUrl, {
        timeout: 4000,
        headers: { Accept: 'application/json' },
      });
      const latencyMs = Date.now() - startTime;
      if (fallbackRes.status === 200) {
        return {
          success: true,
          message: `Connected successfully! (${latencyMs}ms)`,
          latencyMs,
        };
      }
    } catch {
      // Ignore fallback error and report initial error
    }

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        success: false,
        message: 'Connection timed out. Check IP & port.',
      };
    }

    return {
      success: false,
      message: error.message || 'Unable to reach server.',
    };
  }
};
