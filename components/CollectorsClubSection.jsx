export const CollectorsClubSection = () => {
  const tiers = [
    { 
      tier: 'Bronze', 
      animals: '3', 
      benefit: '10% on your next commission',
      color: 'from-amber-700 to-amber-600',
      borderColor: 'border-amber-400',
      bgGlow: 'bg-amber-50',
      textColor: 'text-amber-900',
      accentColor: 'text-amber-600'
    },
    { 
      tier: 'Silver', 
      animals: '5', 
      benefit: 'Priority access to new releases',
      color: 'from-slate-400 to-slate-300',
      borderColor: 'border-slate-300',
      bgGlow: 'bg-slate-50',
      textColor: 'text-slate-900',
      accentColor: 'text-slate-500'
    },
    { 
      tier: 'Gold', 
      animals: '10', 
      benefit: 'Bespoke animal commission',
      color: 'from-yellow-500 to-yellow-400',
      borderColor: 'border-yellow-300',
      bgGlow: 'bg-yellow-50',
      textColor: 'text-yellow-900',
      accentColor: 'text-yellow-600'
    },
    { 
      tier: 'Platinum', 
      animals: '20', 
      benefit: 'Private atelier visit in India',
      color: 'from-indigo-300 to-cyan-300',
      borderColor: 'border-indigo-200',
      bgGlow: 'bg-indigo-50',
      textColor: 'text-indigo-950',
      accentColor: 'text-indigo-600'
    }
  ];

  return (
    <section id="club" className="py-32 px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-6 text-xs tracking-[0.3em] uppercase font-sans text-slate-600">
            Exclusive Membership
          </div>
          <h2 className="text-5xl md:text-6xl font-light mb-6 text-slate-900">The Collectors Club</h2>
          <p className="text-lg text-slate-600 font-sans max-w-2xl mx-auto">
            Build your personal kingdom. Unlock privileges reserved for true collectors.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {tiers.map((level, idx) => (
            <div 
              key={idx} 
              className={`relative group overflow-hidden rounded-lg p-8 ${level.bgGlow} border-2 ${level.borderColor} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${level.color}`}></div>

              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Tier name with metallic effect */}
                <div className={`text-4xl font-light mb-2 bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                  {level.tier}
                </div>

                {/* Tier badge */}
                <div className={`inline-block px-3 py-1 ${level.bgGlow} border border-current ${level.accentColor} text-xs tracking-widest font-sans mb-6 rounded-full`}>
                  TIER {idx + 1}
                </div>

                {/* Animal count with icon */}
                <div className="mb-6 py-4 border-y border-current border-opacity-20">
                  <div className={`text-3xl font-light ${level.textColor}`}>{level.animals}</div>
                  <div className={`text-xs ${level.accentColor} tracking-wider font-sans mt-2`}>
                    ANIMALS
                  </div>
                </div>

                {/* Benefit description */}
                <p className={`text-sm ${level.textColor} font-sans leading-relaxed mb-6`}>
                  {level.benefit}
                </p>

                {/* CTA Button */}
                <button className={`w-full py-3 px-4 text-xs tracking-widest font-sans bg-gradient-to-r ${level.color} text-white rounded hover:shadow-lg transition-all duration-300 hover:opacity-90`}>
                  JOIN {level.tier.toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
