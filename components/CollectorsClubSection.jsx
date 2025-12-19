export const CollectorsClubSection = () => (
  <section id="club" className="py-32 px-8 bg-gradient-to-b from-blue-50 to-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <div className="mb-6 text-xs tracking-[0.3em] uppercase font-sans text-slate-600">
          Exclusive Membership
        </div>
        <h2 className="text-5xl font-light mb-6 text-slate-900">The Collectors Club</h2>
        <p className="text-lg text-slate-600 font-sans max-w-2xl mx-auto">
          Build your personal kingdom. Unlock privileges reserved for true collectors.
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { tier: 'Bronze', animals: '3', benefit: '10% on your next commission' },
          { tier: 'Silver', animals: '5', benefit: 'Priority access to new releases' },
          { tier: 'Gold', animals: '10', benefit: 'Bespoke animal commission' },
          { tier: 'Platinum', animals: '20', benefit: 'Private atelier visit in India' }
        ].map((level, idx) => (
          <div key={idx} className="text-center p-8 bg-white border border-slate-200 hover:border-blue-600 transition-all duration-300">
            <div className="text-5xl mb-6 font-light text-blue-900">{level.tier}</div>
            <div className="text-xs text-slate-500 mb-4 font-sans tracking-wider">
              {level.animals} ANIMALS
            </div>
            <p className="text-sm text-slate-600 font-sans leading-relaxed">{level.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
