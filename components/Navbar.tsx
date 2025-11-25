import React, { useState, useEffect } from 'react';
import { PageType } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (page: PageType) => 
    `cursor-pointer text-sm font-medium transition-all duration-300 ${
      currentPage === page 
        ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' 
        : 'text-slate-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'
    }`;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-blue-900/5' : 'bg-transparent pt-4'}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300">
            <div className="absolute inset-0 bg-white/20 rotate-45 transform translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700"></div>
            <span className="font-bold text-white text-lg">K</span>
          </div>
          <div className="text-xl font-bold text-white tracking-tighter">
            KhmerVoice<span className="text-blue-500">.ai</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 bg-slate-900/50 px-6 py-2 rounded-full border border-slate-800/50 backdrop-blur-sm">
          <button onClick={() => onNavigate('home')} className={navItemClass('home')}>Home</button>
          <button onClick={() => onNavigate('features')} className={navItemClass('features')}>Features</button>
          <button onClick={() => onNavigate('pricing')} className={navItemClass('pricing')}>Pricing</button>
          <button onClick={() => onNavigate('demo')} className={navItemClass('demo')}>Live Demo</button>
        </div>

        <button className="hidden md:block px-6 py-2.5 bg-slate-100 hover:bg-white text-slate-900 text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105">
          Get API Key
        </button>
      </div>
    </nav>
  );
};

export default Navbar;