import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export const isNative = () => {
  try { return Capacitor.isNativePlatform(); } catch { return false; }
};

const ID_BASE = 9100;

export async function nativePermissionStatus() {
  try {
    const r = await LocalNotifications.checkPermissions();
    return r.display; // 'granted' | 'denied' | 'prompt' | 'prompt-with-rationale'
  } catch { return 'unsupported'; }
}

export async function nativeRequestPermission() {
  try {
    const r = await LocalNotifications.requestPermissions();
    return r.display === 'granted' ? 'granted' : 'denied';
  } catch { return 'denied'; }
}

// Schedules one repeating daily notification per enabled reminder.
// These fire even when the app is closed.
export async function nativeScheduleReminders(reminders) {
  try {
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length) {
      await LocalNotifications.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
    }
    const list = [];
    reminders.forEach((r, i) => {
      if (!r.enabled || !/^\d{1,2}:\d{2}$/.test(r.time || '')) return;
      const [hour, minute] = r.time.split(':').map(Number);
      list.push({
        id: ID_BASE + i,
        title: `Transformer: ${r.title}`,
        body: 'Take a moment to pause, pray, and continue with intention.',
        schedule: { on: { hour, minute }, allowWhileIdle: true }
      });
    });
    if (list.length) await LocalNotifications.schedule({ notifications: list });
    return true;
  } catch { return false; }
}

export async function nativeCancelAll() {
  try {
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length) {
      await LocalNotifications.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
    }
  } catch {}
}

export async function nativeTestNotification() {
  try {
    await LocalNotifications.schedule({ notifications: [{
      id: 9099,
      title: 'Transformer test reminder',
      body: 'Time for prayer, Bible reading and focused study.',
      schedule: { at: new Date(Date.now() + 2000) }
    }] });
    return true;
  } catch { return false; }
}
