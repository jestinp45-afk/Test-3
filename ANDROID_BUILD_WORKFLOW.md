# Transformer Android build workflow

## First-time setup

```bash
npm ci
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Run `npx cap add android` only once. If the `android/` directory already exists, skip that command.

## Later builds

```bash
npm ci
npm run build
npx cap sync android
npx cap open android
```

## Debug APK

```bash
npm run android:debug
```

Expected output: `android/app/build/outputs/apk/debug/app-debug.apk`.

## Release bundle

```bash
npm run android:release
```

Expected output: `android/app/build/outputs/bundle/release/app-release.aab`. Configure Android release signing in Android Studio/Gradle before distributing a release build.

## Requirements and verification

- Node.js and npm compatible with Vite 6.
- Android Studio, Android SDK, and a compatible JDK for Android builds.
- Firebase web configuration supplied through the existing Vite environment variables / GitHub Actions secrets.
- Test notifications and any Android-native functionality on a physical device.
- Home-screen widgets require native Android AppWidget implementation; the current web app includes widget specifications/previews only.
