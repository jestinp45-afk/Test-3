# Transformer — GitHub Firebase Secrets

Add these as **Repository secrets** at GitHub → Settings → Secrets and variables → Actions → New repository secret.

| GitHub secret name | Copy the matching value from Firebase Web app config |
|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

Do not add quotes around the values. Do not add Firebase Admin SDK private keys or service-account JSON to these client-side build secrets. The Firebase web configuration is intended to be present in a client app; protect data with Firebase Authentication and Firestore Security Rules.

After adding all six secrets, commit the source and workflow, then run **Actions → Build Transformer Android APK → Run workflow** on `main`.
