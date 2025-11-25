import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DemoSection from './components/DemoSection';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { PageType } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Hero onNavigate={setActivePage} />;
      case 'features':
        return <Features />;
      case 'pricing':
        return <Pricing />;
      case 'demo':
        return <DemoSection />;
      default:
        return <Hero onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar currentPage={activePage} onNavigate={setActivePage} />
      <main className="transition-opacity duration-500 ease-in-out">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;