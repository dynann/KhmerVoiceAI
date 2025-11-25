import React from 'react';
import { CheckCircleIcon } from './Icons';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  color: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for hobbyists and prototypes.',
    features: ['100 Minutes / month', 'Standard Accuracy', 'Community Support', '1 Concurrent Stream'],
    color: 'from-slate-500 to-slate-700'
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For growing startups and serious applications.',
    features: ['10,000 Minutes / month', 'Highest Accuracy (Gemini 2.5)', 'Priority Email Support', '10 Concurrent Streams', 'Custom Vocabulary'],
    recommended: true,
    color: 'from-blue-500 to-purple-600'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Scale without limits. Full dedication.',
    features: ['Unlimited Minutes', 'On-Premise Deployment', '24/7 Dedicated Support', 'SLA Guarantees', 'Fine-tuned Models'],
    color: 'from-indigo-500 to-cyan-500'
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pricing</span>
          </h2>
          <p className="text-lg text-slate-400">
            Start for free, scale as you grow. No hidden fees. Just pure Khmer speech recognition power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`relative group p-1 rounded-3xl transition-all duration-500 hover:scale-105 ${tier.recommended ? 'scale-105 z-10' : 'scale-100 z-0'}`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Border Gradient */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${tier.color} opacity-20 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
              
              <div className="relative h-full bg-[#0f172a] rounded-[22px] p-8 flex flex-col border border-slate-800">
                {tier.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-slate-400 font-medium mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    {tier.price !== 'Free' && tier.price !== 'Custom' && <span className="text-slate-500">/mo</span>}
                  </div>
                  <p className="text-slate-500 text-sm mt-4">{tier.description}</p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center text-sm text-slate-300">
                      <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                  tier.recommended 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}>
                  Choose {tier.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;