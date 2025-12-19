import { ChevronRight, Play, Shield, Award, Globe } from 'lucide-react';

export const HeroSection = ({ heroSlides, currentSlide, setCurrentSlide }) => (
  <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
    <div className="absolute inset-0">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-30"></div>
    </div>
    
    <div className="relative h-full flex items-center justify-center">
      <div className="text-center px-8 max-w-6xl mx-auto">
        {/* Animal Name Display */}
        <div className="mb-12 relative h-48">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
                currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <span className="text-7xl font-light tracking-wide mb-4">{slide.name}</span>
              <span className="text-sm text-slate-500 tracking-widest font-sans uppercase flex items-center gap-2">
                <Globe size={14} />
                {slide.region}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mb-6 text-xs tracking-[0.3em] uppercase font-sans text-slate-600">
          Spring Summer 2025 Collection
        </div>
        
        <h1 className="text-7xl md:text-8xl font-light mb-8 tracking-tight leading-none text-slate-900">
          No Fixed Logo.<br/>
          <span className="italic font-serif text-blue-900">Every Animal is Unique.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
          Hand-embroidered by master Indian artisans. Each animal represents its homeland.
          From the Bengal plains to the Arctic tundra.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-slate-900 text-white px-12 py-4 text-xs tracking-widest font-sans hover:bg-blue-900 transition-all duration-300 group">
            EXPLORE THE COLLECTION
            <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </button>
          <button className="flex items-center gap-3 text-xs tracking-widest font-sans hover:text-blue-600 transition-colors">
            <Play size={16} />
            WATCH THE CRAFT
          </button>
        </div>

        {/* Luxury Indicators */}
        <div className="mt-16 flex items-center justify-center gap-16 text-xs text-slate-500 font-sans">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span className="tracking-wider">ARTISAN CERTIFIED</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} />
            <span className="tracking-wider">LIMITED EDITIONS</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <span className="tracking-wider">GLOBAL HERITAGE</span>
          </div>
        </div>
      </div>
    </div>

    {/* Slide Indicators */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
      {[0, 1, 2].map((idx) => (
        <button
          key={idx}
          onClick={() => setCurrentSlide(idx)}
          className={`w-16 h-0.5 transition-all duration-300 ${
            currentSlide === idx ? 'bg-slate-900' : 'bg-slate-300'
          }`}
        />
      ))}
    </div>
  </section>
);
