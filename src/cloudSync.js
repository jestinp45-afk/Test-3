import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase.js';

// Only explicitly supported app data is synchronized. Reminder-send markers and
// device notification tokens remain local to avoid syncing device-specific state.
export const CLOUD_KEYS = [
  'transformer_tasks', 'transformer_journal', 'transformer_questions',
  'transformer_auto_theme', 'transformer_manual_theme',
  'transformer_reminders', 'transformer_notifications_enabled',
  'transformer_reading_journey', 'transformer_daily_reflections', 'transformer_focus_history', 'transformer_reading_plan_days', 'transformer_reading_day', 'transformer_appearance_mode', 'transformer_calendar_events', 'transformer_countdowns', 'transformer_deleted_tasks', 'transformer_focus_goal', 'transformer_focus_ambient', 'transformer_font_scale', 'transformer_animations', 'transformer_accent_override',
];

export async function hydrateUserData(uid) {
  if (!db || !uid) throw new Error('Firebase is not configured.');
  const snapshot = await getDocs(collection(db, 'users', uid, 'appData'));
  const migratedUid = localStorage.getItem('transformer_cloud_migrated_uid');
  if (snapshot.empty) {
    // Migrate legacy local data only once, never copy one account's data into another account.
    if (!migratedUid) {
      for (const key of CLOUD_KEYS) {
        const value = localStorage.getItem(key);
        if (value !== null) await setDoc(doc(db, 'users', uid, 'appData', key), { value, updatedAt: serverTimestamp() });
      }
    } else if (migratedUid !== uid) {
      for (const key of CLOUD_KEYS) localStorage.removeItem(key);
    }
    localStorage.setItem('transformer_cloud_migrated_uid', uid);
    return;
  }
  // Remove stale data from any previously signed-in account before restoring this account.
  for (const key of CLOUD_KEYS) localStorage.removeItem(key);
  for (const item of snapshot.docs) {
    if (CLOUD_KEYS.includes(item.id) && typeof item.data().value === 'string') {
      localStorage.setItem(item.id, item.data().value);
    }
  }
  localStorage.setItem('transformer_cloud_migrated_uid', uid);
}

export async function syncUserData(uid) {
  if (!db || !uid) return;
  const writes = CLOUD_KEYS.map(async key => {
    const value = localStorage.getItem(key);
    if (value !== null) await setDoc(doc(db, 'users', uid, 'appData', key), { value, updatedAt: serverTimestamp() });
  });
  await Promise.all(writes);
}
