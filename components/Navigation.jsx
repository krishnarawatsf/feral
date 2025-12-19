import { Link } from 'react-router-dom';

export const Navigation = ({ scrolled }) => (
  <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/98 backdrop-blur-sm shadow-sm' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
      <Link to="/" className="text-3xl font-light tracking-[0.3em] text-slate-900 hover:text-blue-600 transition-colors">FERAL</Link>
      <div className="hidden md:flex gap-12 text-xs tracking-widest font-sans uppercase">
        <Link to="/collection" className="hover:text-blue-600 transition-colors">Collection</Link>
        <Link to="/" className="hover:text-blue-600 transition-colors">Heritage</Link>
        <Link to="/atelier" className="hover:text-blue-600 transition-colors">Atelier</Link>
        <Link to="/club" className="hover:text-blue-600 transition-colors">The Club</Link>
      </div>
      <button className="border border-slate-900 px-8 py-3 text-xs tracking-widest font-sans hover:bg-slate-900 hover:text-white transition-all duration-300">
        DISCOVER
      </button>
    </div>
  </nav>
);
