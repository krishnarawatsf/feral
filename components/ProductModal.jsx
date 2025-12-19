import { X } from 'lucide-react';

export const ProductModal = ({ animal, onClose }) => {
  if (!animal) return null;

  const src = animal.imageSrc || `/images/${animal.image}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-4xl w-full mx-4 rounded shadow-lg overflow-hidden">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-slate-700 hover:text-slate-900">
            <X />
          </button>
        </div>

        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="w-full h-96 bg-slate-100 flex items-center justify-center">
            <img src={src} alt={animal.name} className="max-h-96 object-contain" />
          </div>

          <div className="pt-4">
            <h2 className="text-4xl font-light mb-4">{animal.name}</h2>
            <p className="text-sm text-blue-600 mb-2">{animal.region}</p>
            <p className="text-base text-slate-700 mb-4">{animal.symbolism}</p>
            <p className="text-sm text-slate-900 font-semibold">EUR {animal.price}</p>

            <div className="mt-6">
              <button className="bg-slate-900 text-white px-6 py-3 text-xs tracking-widest font-sans hover:bg-blue-900 transition-all">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
