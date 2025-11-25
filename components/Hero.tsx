import React from 'react';
import { PageType } from '../types';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 animate-fade-in-up backdrop-blur-sm">
          <span className="flex w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          New: Gemini 2.5 Model Integration
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-white">
            Khmer Speech
          </span>
          <br />
          <span className="relative z-10 drop-shadow-2xl">Reimagined.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Unlock the power of the Khmer language with our state-of-the-art AI. 
          Seamlessly transcribe voice to text with unprecedented accuracy and speed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={() => onNavigate('demo')}
            className="px-8 py-4 bg-white text-slate-950 font-bold text-lg rounded-full hover:bg-blue-50 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:-translate-y-1"
          >
            Try Live Demo
          </button>
          <button 
            onClick={() => onNavigate('features')}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-md hover:-translate-y-1"
          >
            View Features
          </button>
        </div>

        {/* Floating Element */}
        <div className="mt-20 relative mx-auto w-full max-w-4xl animate-float">
          <div className="glass-panel p-2 rounded-2xl border border-white/10 shadow-2xl">
            <img src="https://placehold.co/1200x600/1e293b/475569?text=Waveform+Analytics+Preview" alt="Dashboard Preview" className="rounded-xl w-full opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;