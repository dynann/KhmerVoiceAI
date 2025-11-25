import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-800 bg-[#020617]">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-white tracking-tighter">
            KhmerVoice<span className="text-blue-500">.ai</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">© 2025 KhmerVoice AI. All rights reserved.</p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
