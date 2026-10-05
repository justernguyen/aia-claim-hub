import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'aia_agent_privacy_mode';
const EVENT_NAME = 'aia_privacy_mode_change';

/**
 * Global Privacy Mode hook.
 * When enabled (default: true), sensitive PII such as CCCD and Phone numbers
 * are automatically masked across all tables, cards, and detail drawers.
 *
 * Supports persistent storage and synchronization across all components.
 * Also registers global shortcut: Alt + P to quickly toggle privacy mode.
 */
export function usePrivacyMode() {
  const [isPrivacyMode, setIsPrivacyModeState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
    } catch (e) {
      console.warn('Unable to read privacy mode from localStorage:', e);
    }
    // Default to true (safe-by-default for financial/insurance agents)
    return true;
  });

  const setPrivacyMode = useCallback((value: boolean) => {
    setIsPrivacyModeState(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch (e) {
      console.warn('Unable to save privacy mode to localStorage:', e);
    }
    // Broadcast event to other hook consumers
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
  }, []);

  const togglePrivacyMode = useCallback(() => {
    setPrivacyMode(!isPrivacyMode);
  }, [isPrivacyMode, setPrivacyMode]);

  // Synchronize across multiple hook instances and tabs
  useEffect(() => {
    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (typeof customEvent.detail === 'boolean') {
        setIsPrivacyModeState(customEvent.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue !== null) {
        setIsPrivacyModeState(e.newValue === 'true');
      }
    };

    // Keyboard shortcut: Alt + P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setIsPrivacyModeState((prev) => {
          const next = !prev;
          try {
            localStorage.setItem(STORAGE_KEY, String(next));
          } catch {}
          window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
          return next;
        });
      }
    };

    window.addEventListener(EVENT_NAME, handleCustomChange);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(EVENT_NAME, handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    isPrivacyMode,
    togglePrivacyMode,
    setPrivacyMode,
  };
}
