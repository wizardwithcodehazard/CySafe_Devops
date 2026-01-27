import React, { useState } from 'react';
import { USER_SEED } from './constants/data';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './views/Dashboard';
import ForensicScanner from './views/ForensicScanner';
import ScamSimulator from './views/ScamSimulator';
import Academy from './views/Academy';
import ProfileOverlay from './components/ProfileOverlay';

export default function CyberSafeUltimate() {
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode for impact
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(USER_SEED);
  
  // Splash Timer logic handled inside SplashScreen component for better control

  return (
    <div className={`${isDark ? 'dark' : ''} flex justify-center min-h-screen bg-gray-100 dark:bg-black font-sans transition-colors duration-500 selection:bg-cyan-500 selection:text-white`}>
      {/* Device Frame */}
      <div className="w-full max-w-md bg-white dark:bg-slate-950 flex flex-col shadow-2xl relative h-[100dvh] sm:h-[850px] sm:my-auto sm:rounded-[3rem] sm:border-[8px] sm:border-gray-800 overflow-hidden transition-colors duration-500 ring-1 ring-white/10">
        
        {!showSplash && (
          <Header 
            user={user} 
            activeTab={activeTab} 
            isDark={isDark} 
            toggleTheme={() => setIsDark(!isDark)}
            openProfile={() => setShowProfile(true)}
          />
        )}

        <main className="flex-1 overflow-y-auto scrollbar-hide bg-gray-50 dark:bg-slate-950 relative">
          {activeTab === 'home' && <Dashboard setActiveTab={setActiveTab} isDark={isDark} user={user} />}
          {activeTab === 'scan' && <ForensicScanner isDark={isDark} />}
          {activeTab === 'sim' && <ScamSimulator isDark={isDark} />}
          {activeTab === 'learn' && <Academy isDark={isDark} user={user} setUser={setUser} />}
        </main>

        {!showSplash && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />
        )}

        {showProfile && <ProfileOverlay user={user} close={() => setShowProfile(false)} isDark={isDark} />}
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        
      </div>
    </div>
  );
}
