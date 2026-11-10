import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(error => console.warn('Offline cache registration failed:', error)));
}

class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error, info) { console.error('Transformer UI error:', error, info); }
  render() {
    if (this.state.failed) return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#102c24',color:'#f6f0e3',fontFamily:'system-ui,sans-serif'}}><section style={{maxWidth:440,textAlign:'center',border:'1px solid #d5ad59',borderRadius:20,padding:28,background:'#071510'}}><img src="/transformer-logo.png" alt="Transformer" style={{width:150,maxWidth:'100%',borderRadius:18}}/><h1>Something went wrong</h1><p>The app encountered an unexpected screen error. Your saved local data has not been intentionally deleted. Reload Transformer to try again.</p><button onClick={() => window.location.reload()} style={{padding:'12px 18px',borderRadius:10,background:'#d5ad59',color:'#102c24',fontWeight:700}}>Reload app</button></section></main>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><AppErrorBoundary><App /></AppErrorBoundary></React.StrictMode>
);
