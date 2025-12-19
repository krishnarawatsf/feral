import { ProductCard } from './ProductCard';

export const CollectionSection = ({ animals, setSelectedAnimal }) => (
  <section id="collection" className="py-32 px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="mb-6 text-xs tracking-[0.3em] uppercase font-sans text-slate-600">
          The Collection
        </div>
        <h2 className="text-5xl md:text-6xl font-light mb-6 text-slate-900">Animals of the World</h2>
        <p className="text-lg text-slate-600 font-sans">Each representing its homeland with pride</p>
      </div>

      {/* Indian Heritage Collection */}
      <div className="mb-20">
        <h3 className="text-3xl font-light mb-8 text-center text-blue-900">Indian Heritage Collection</h3>
        <div className="grid md:grid-cols-3 gap-16">
          {animals.filter(a => a.tier === 'signature' || a.tier === 'rare' || a.tier === 'limited').map((animal, idx) => (
            <ProductCard 
              key={idx}
              animal={animal}
              onClick={() => setSelectedAnimal(animal)}
            />
          ))}
        </div>
      </div>

      {/* International Collection */}
      <div>
        <h3 className="text-3xl font-light mb-8 text-center text-slate-900">International Collection</h3>
        <div className="grid md:grid-cols-3 gap-16">
          {animals.filter(a => a.tier === 'international').map((animal, idx) => (
            <ProductCard 
              key={idx}
              animal={animal}
              onClick={() => setSelectedAnimal(animal)}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
