import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrayerTimes from './components/PrayerTimes';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [locationId, setLocationId] = useState('4892'); // Default to Adana

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-emerald-500/30">
      <Navbar />
      <main>
        <Hero setLocationId={setLocationId} />
        <PrayerTimes locationId={locationId} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
