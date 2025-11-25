import React from 'react';
import { FeatureCardProps } from '../types';
import { CpuIcon, GlobeIcon, ZapIcon, CheckCircleIcon, MicIcon } from './Icons';

const features: FeatureCardProps[] = [
  {
    title: "Native Precision",
    description: "Trained on thousands of hours of native Khmer speech, capturing regional accents and colloquialisms perfectly.",
    icon: <GlobeIcon className="w-6 h-6" />,
  },
  {
    title: "Real-time Latency",
    description: "Powered by Gemini 2.5 Flash, experience near-instantaneous transcription results suitable for live captioning.",
    icon: <ZapIcon className="w-6 h-6" />,
  },
  {
    title: "Context Aware",
    description: "Our engine understands context, ensuring correct spelling for homophones and complex grammatical structures.",
    icon: <CpuIcon className="w-6 h-6" />,
  },
  {
    title: "Multi-Speaker",
    description: "Differentiate between speakers automatically in interviews or podcasts.",
    icon: <MicIcon className="w-6 h-6" />,
  },
  {
    title: "Secure & Private",
    description: "Enterprise-grade encryption. Your audio data is processed ephemerally and never stored without permission.",
    icon: <CheckCircleIcon className="w-6 h-6" />,
  },
  {
    title: "API First",
    description: "REST and WebSocket APIs designed for developers. Drop into your Node.js or Python app in minutes.",
    icon: <CpuIcon className="w-6 h-6" />,
  }
];

const Features: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
            <span className="flex w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Feature Rich Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything you need for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Khmer Audio Intelligence</span>
          </h2>
          <p className="text-lg text-slate-400">
            We've solved the hard problems of low-resource language processing so you don't have to.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 rounded-2xl bg-[#0b1221] border border-slate-800 hover:border-blue-500/30 transition-all duration-500 hover:translate-y-[-5px] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] group-hover:bg-blue-500/10 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">{feature.description}</p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Stats Strip */}
        <div className="mt-20 glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-around items-center gap-8 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">98.5%</div>
            <div className="text-blue-400 font-medium">Accuracy Rate</div>
          </div>
          <div className="w-full md:w-px h-px md:h-16 bg-slate-700"></div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">&lt;200ms</div>
            <div className="text-purple-400 font-medium">Average Latency</div>
          </div>
          <div className="w-full md:w-px h-px md:h-16 bg-slate-700"></div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">10M+</div>
            <div className="text-pink-400 font-medium">Words Transcribed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;