export const CraftsmanshipSection = () => (
  <section id="atelier" className="relative h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <div className="text-8xl mb-8 leading-none font-light">手</div>
        <div className="mb-6 text-xs tracking-[0.3em] uppercase font-sans text-blue-200">
          The Atelier
        </div>
        <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
          Three to Four Hours.<br/>
          One Master Artisan.<br/>
          <span className="italic">Your Animal's Story.</span>
        </h2>
        <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto font-sans mb-12">
          Each embroidery is signed by the craftsman who created it. Accompanied by photographs 
          documenting its creation, and a certificate of authenticity bearing the artisan's signature.
        </p>
        <button className="border border-white text-white px-12 py-4 text-xs tracking-widest font-sans hover:bg-white hover:text-slate-900 transition-all duration-300">
          DISCOVER THE PROCESS
        </button>
      </div>
    </div>
  </section>
);
