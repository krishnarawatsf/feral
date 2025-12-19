import { useState } from 'react';
import { supabase } from '../src/lib/supabase';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;
      
      setMessage('✓ Thanks for subscribing!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Subscription error:', err);
      setMessage('Error subscribing. Try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-light mb-6 text-white">Join Our World</h3>
        <p className="text-sm text-blue-200 mb-8 font-sans tracking-wide">
          Be the first to discover new animals and exclusive releases
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 bg-transparent border border-blue-800 px-6 py-4 text-sm font-sans text-white placeholder-blue-300 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading}
            className="border border-white px-8 py-4 text-xs tracking-widest font-sans text-white hover:bg-white hover:text-slate-900 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-sm text-blue-300 font-sans">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};
