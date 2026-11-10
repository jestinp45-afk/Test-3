# Transformer implementation and release workflow

The source project includes the redesigned feature panels, appearance modes, theme integration, and shared task/calendar work. The production build status and exact validation limitations are recorded in `PRODUCTION_BUILD_STATUS.md`.

## Local web production build

```bash
npm ci
npm run build
npm run preview
```

## Android build

Requires Android Studio, Android SDK, Java, and a configured signing key.

```bash
npx cap add android   # only once, if android/ is absent
npx cap sync android
npx cap open android
```

In Android Studio, complete Gradle sync, choose the release variant, then use **Build > Generate Signed Bundle / APK**. Keep signing credentials out of source control.

## Before release

- Configure production Firebase environment variables and Firestore rules.
- Test authentication and user data separation.
- Test all weekly themes and Home scenery mappings in Light, Dark, and System modes.
- Test task synchronization between Home and Tasks.
- Test calendar navigation including leap years and selected-date agenda.
- Test Bible Reading Journey, Daily Reflection, Weekly Reports, and Focus Mode.
- Test Android safe areas, back navigation, notifications, and offline behavior.
- Review `PRODUCTION_BUILD_STATUS.md`; do not publish until the actual Vite and signed Android builds pass.

## Android build commands

See `ANDROID_BUILD_WORKFLOW.md`. First-time setup: `npm ci`, `npm run build`, `npx cap add android`, `npx cap sync android`, `npx cap open android`. Do not run `cap add android` again after the Android platform folder exists.
