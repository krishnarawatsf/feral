export const ComparisonSection = () => (
  <section className="py-32 px-8 bg-white">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <div className="mb-6 text-xs tracking-[0.3em] uppercase font-sans text-slate-600">
          The Distinction
        </div>
        <h2 className="text-5xl font-light text-slate-900">Why FERAL?</h2>
      </div>
      
      <div className="border-t border-slate-200">
        {[
          { brand: 'Lacoste', logo: 'One crocodile', method: 'Machine embroidered', price: '€100-130', unique: 'None' },
          { brand: 'Ralph Lauren', logo: 'One polo player', method: 'Machine embroidered', price: '€90-150', unique: 'None' },
          { brand: 'FERAL', logo: '20+ global animals', method: 'Hand-embroidered', price: '€180-300', unique: 'Every piece', highlight: true }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className={`grid grid-cols-5 gap-8 py-8 border-b border-slate-200 text-sm font-sans ${
              item.highlight ? 'bg-blue-50' : ''
            }`}
          >
            <div className={`${item.highlight ? 'font-bold text-blue-900' : 'text-slate-600'}`}>{item.brand}</div>
            <div className={item.highlight ? 'font-medium text-slate-900' : 'text-slate-500'}>{item.logo}</div>
            <div className={item.highlight ? 'font-medium text-slate-900' : 'text-slate-500'}>{item.method}</div>
            <div className={item.highlight ? 'font-medium text-slate-900' : 'text-slate-500'}>{item.unique}</div>
            <div className={`text-right ${item.highlight ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
