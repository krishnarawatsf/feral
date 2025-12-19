import { Globe } from 'lucide-react';

export const ProductCard = ({ animal, onClick }) => {
  // Prefer file name on the data (e.g. 'bengal tiger.jpeg')
  const src = animal.imageSrc || `/images/${animal.image || ''}`;

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="relative bg-gradient-to-br from-blue-50 to-sky-50 aspect-[3/4] mb-6 overflow-hidden flex items-center justify-center border border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <img
          src={src}
          alt={animal.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.objectFit = 'contain'; }}
        />

        {animal.tier === 'limited' && (
          <div className="absolute top-6 right-6 bg-slate-900 text-white text-[0.65rem] px-4 py-1.5 tracking-widest font-sans">
            LIMITED EDITION
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-light tracking-wide text-slate-900">{animal.name}</h3>
        <p className="text-sm text-blue-600 flex items-center gap-2 font-sans">
          <Globe size={14} />
          {animal.region}
        </p>
        <p className="text-xs text-slate-600 font-sans leading-relaxed">{animal.symbolism}</p>

        <div className="pt-4 flex items-center justify-between border-t border-slate-200">
          <span className="text-sm font-sans text-slate-900">EUR {animal.price}</span>
          <button className="text-xs tracking-widest font-sans hover:text-blue-600 transition-colors">VIEW DETAILS →</button>
        </div>
      </div>
    </div>
  );
};
