import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [location, setLocation] = useState({
    lat: '25.2048',
    lon: '55.2708',
    name: 'Dubai, United Arab Emirates'
  }); // Default to Dubai

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-emerald-500/30">
      <Navbar />
      <main>
        <Hero location={location} setLocation={setLocation} />
        {/* City Selector will be added here */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
