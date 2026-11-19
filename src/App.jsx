import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { loadDatabase, saveDatabase, computeAvailableSlots, formatDateISO } from './services/storage';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Public/Hero';
import Services from './components/Public/Services';
import Skills from './components/Public/Skills';
import Journey from './components/Public/Journey';
import BookingSection from './components/Public/BookingSection';
import FAQ from './components/Public/FAQ';
import AdminDashboard from './components/Admin/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const [db, setDb] = useState(() => loadDatabase());
  
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash.startsWith('#/admin') ? 'admin' : 'public';
  });

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.startsWith('#/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSetView = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateDB = (updatedDB) => {
    setDb(updatedDB);
    saveDatabase(updatedDB);
  };

  const handleNewBooking = (newBooking) => {
    const updated = {
      ...db,
      bookings: [newBooking, ...db.bookings],
    };
    handleUpdateDB(updated);
  };

  const todayStr = formatDateISO(new Date());
  const todaySlots = computeAvailableSlots(todayStr, db);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 flex flex-col font-sans transition-colors duration-200">
        
        {/* Navigation */}
        <Navbar
          currentView={currentView}
          setCurrentView={handleSetView}
          todaySlotsCount={todaySlots.length}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentView === 'public' ? (
            <>
              <Hero
                onBookClick={() => {
                  const el = document.getElementById('booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onExploreClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                todaySlotsCount={todaySlots.length}
              />
              <Services />
              <Skills />
              <Journey />
              <BookingSection db={db} onNewBooking={handleNewBooking} />
              <FAQ />
            </>
          ) : (
            <AdminDashboard
              db={db}
              onUpdateDB={handleUpdateDB}
              onBackToPublic={() => handleSetView('public')}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onAdminClick={() => handleSetView('admin')} />

        {/* Vercel Speed Insights & Web Analytics */}
        <SpeedInsights />
        <Analytics />

      </div>
    </ThemeProvider>
  );
}
