import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth, firebaseConfigured } from './firebase.js';
import { hydrateUserData, syncUserData } from './cloudSync.js';
import { BookOpen, Eye, EyeOff, LoaderCircle, Mail, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react';

function Brand() {
  return <div className="auth-brand"><img src="/transformer-logo.png" alt="Transformer — official logo" /><p>Transform your mind. Strengthen your faith. Discipline your life.</p></div>;
}

export default function AuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!firebaseConfigured || !auth) { setChecking(false); return; }
    let alive = true;
    setPersistence(auth, browserLocalPersistence).catch(() => {});
    const unsubscribe = onAuthStateChanged(auth, async nextUser => {
      if (!alive) return;
      setUser(nextUser);
      setReady(false);
      if (!nextUser) { setChecking(false); return; }
      setChecking(true);
      try {
        await hydrateUserData(nextUser.uid);
        if (alive) setReady(true);
      } catch (e) {
        if (alive) setError('Could not load your private cloud data. Check Firebase setup and Firestore rules, then sign in again.');
      } finally { if (alive) setChecking(false); }
    });
    return () => { alive = false; unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!user || !ready) return;
    let running = false;
    const sync = async () => {
      if (running || document.visibilityState === 'hidden') return;
      running = true;
      try { await syncUserData(user.uid); }
      catch (e) { console.error('Transformer cloud sync failed:', e); }
      finally { running = false; }
    };
    const timer = window.setInterval(sync, 5000);
    const onVisible = () => { if (document.visibilityState === 'visible') sync(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, [user, ready]);

  async function submit(e) {
    e.preventDefault(); setError(''); setMessage('');
    if (!email.trim()) { setError('Enter your email address.'); return; }
    if (mode !== 'reset' && password.length < 6) { setError('Password must contain at least 6 characters.'); return; }
    setBusy(true);
    try {
      if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        setMessage('Account created. Loading your private data…');
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email.trim());
        setMessage('If an account exists for this email, a password-reset email has been sent.');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (e) {
      const messages = {
        'auth/invalid-credential': 'Email or password is incorrect.',
        'auth/email-already-in-use': 'An account already uses this email. Try signing in.',
        'auth/invalid-email': 'Enter a valid email address.',
        'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
        'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
        'auth/network-request-failed': 'Network error. Check your internet connection.',
      };
      setError(messages[e.code] || 'Authentication failed. Check Firebase Authentication setup and try again.');
    } finally { setBusy(false); }
  }

  if (!firebaseConfigured) return <div className="auth-shell"><div className="auth-card"><Brand /><h1>Secure sign-in setup required</h1><p>Firebase Authentication and Firestore are not configured in this build. Add the Firebase web-app values to the GitHub Actions repository secrets or a local <code>.env</code> file, then rebuild.</p><p className="auth-hint">Required Vite variables: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID.</p></div></div>;
  if (checking) return <div className="auth-shell"><div className="auth-card"><Brand /><LoaderCircle className="auth-spinner" /><p>Loading your secure account and private data…</p></div></div>;
  if (user && ready) return <>{typeof children === 'function' ? children({ signOutUser: () => signOut(auth) }) : children}</>;
  return <div className="auth-shell"><div className="auth-card"><Brand /><h1>{mode === 'register' ? 'Create your account' : mode === 'reset' ? 'Reset password' : 'Welcome back'}</h1><p className="auth-subtitle">Your faith, focus, and daily growth — together in one place.</p><form onSubmit={submit} className="auth-form"><label>Email address</label><div className="auth-input"><Mail size={18}/><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></div>{mode !== 'reset' && <><label>Password</label><div className="auth-input"><LockKeyhole size={18}/><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required minLength={6}/><button type="button" className="auth-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></>}{error && <p className="auth-error" role="alert">{error}</p>}{message && <p className="auth-success" role="status">{message}</p>}<button className="auth-submit" disabled={busy} type="submit">{busy ? 'Please wait…' : mode === 'register' ? 'Create account' : mode === 'reset' ? 'Send reset email' : 'Sign in'}</button></form><div className="auth-links">{mode === 'login' && <button onClick={() => { setMode('reset'); setError(''); setMessage(''); }}>Forgot password?</button>}{mode !== 'login' && <button onClick={() => { setMode('login'); setError(''); setMessage(''); }}>Back to sign in</button>}{mode !== 'reset' && <button onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setError(''); setMessage(''); }}>{mode === 'register' ? 'Already have an account? Sign in' : 'Create a new account'}</button>}</div><p className="auth-privacy"><ShieldCheck size={14}/> Your data is separated by account and protected by Firestore security rules.</p></div></div>;
}
