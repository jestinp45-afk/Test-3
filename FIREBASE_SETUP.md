# Transformer Firebase setup (required for account login and cloud sync)

1. Create a Firebase project at https://console.firebase.google.com/.
2. Add a Web app and copy its configuration values.
3. In **Authentication → Sign-in method**, enable **Email/Password**.
4. In **Firestore Database**, create the database. Publish the rules in `firestore.rules` (Firebase Console → Firestore → Rules). These rules restrict each user to their own supported data documents.
5. For a local build, copy `.env.example` to `.env` and replace every placeholder with the web app values. Do not commit `.env`.
6. For GitHub Actions, open repository **Settings → Secrets and variables → Actions** and add these repository secrets: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`. Run the Android workflow again after saving them.
7. The first signed-in account on a device imports supported existing local task/journal/question/settings values when that account has no cloud data yet. Once cloud data exists, it is restored to the device before the app mounts. Keep a backup before testing migration on valuable data.

## Important limitations
- Firebase web configuration is embedded in the client bundle by design; security comes from Authentication and Firestore rules, not hiding these values. Never add Firebase Admin service-account keys to this app or repository.
- Cloud sync covers tasks, journal entries, daily-question answers, theme preference, and reminder settings. Notification-send markers and FCM device tokens stay device-local.
- The current app still uses local notifications for scheduled daily reminders. True remote push notifications require Android Firebase configuration (`google-services.json`), a token registration path, and a trusted backend using Firebase Admin SDK/Cloud Functions to send messages. Do not send messages from the client with privileged credentials. No remote-send backend is included in this source package.
- Journal data is synchronized to the signed-in account's private Firestore path by this build. Only use it if you accept that cloud storage behavior; the rules restrict reads/writes to the same account.
- Bible chapter content currently depends on the existing external Bible API and an internet connection; the bundled sample text is not a complete licensed offline Bible.
