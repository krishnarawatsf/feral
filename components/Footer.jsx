export const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-16 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-12 mb-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-light tracking-[0.3em] mb-6 text-slate-900">FERAL</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Hand-embroidered luxury polo shirts.<br/>
            Each animal from its homeland. Each piece singular.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs tracking-widest mb-4 font-sans text-slate-900">COLLECTIONS</h4>
          <div className="space-y-2 text-sm text-slate-600 font-sans">
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Indian Heritage</div>
            <div className="hover:text-blue-600 transition-colors cursor-pointer">International</div>
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Limited Editions</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs tracking-widest mb-4 font-sans text-slate-900">MAISON</h4>
          <div className="space-y-2 text-sm text-slate-600 font-sans">
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Our Story</div>
            <div className="hover:text-blue-600 transition-colors cursor-pointer">The Atelier</div>
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Craftsmanship</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs tracking-widest mb-4 font-sans text-slate-900">CLIENT SERVICES</h4>
          <div className="space-y-2 text-sm text-slate-600 font-sans">
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Contact</div>
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Shipping</div>
            <div className="hover:text-blue-600 transition-colors cursor-pointer">Returns</div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-sans">
        <div>© 2025 FERAL. All rights reserved.</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <span className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);
