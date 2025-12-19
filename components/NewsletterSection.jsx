export const NewsletterSection = () => (
  <section className="py-20 px-8 bg-slate-900">
    <div className="max-w-4xl mx-auto text-center">
      <h3 className="text-3xl font-light mb-6 text-white">Join Our World</h3>
      <p className="text-sm text-blue-200 mb-8 font-sans tracking-wide">
        Be the first to discover new animals and exclusive releases
      </p>
      <div className="flex gap-4 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="Your email address"
          className="flex-1 bg-transparent border border-blue-800 px-6 py-4 text-sm font-sans text-white placeholder-blue-300 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button className="border border-white px-8 py-4 text-xs tracking-widest font-sans text-white hover:bg-white hover:text-slate-900 transition-all duration-300">
          SUBSCRIBE
        </button>
      </div>
    </div>
  </section>
);
