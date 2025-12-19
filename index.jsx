
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBanner } from './components/TopBanner';
import { Navigation } from './components/Navigation';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { AtelierPage } from './pages/AtelierPage';
import { ClubPage } from './pages/ClubPage';
import { ProductModal } from './components/ProductModal';
import { supabase } from './src/lib/supabase';

const FeralWebsite = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('tier', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          // Fallback to hardcoded animals if fetch fails
          setAnimals(defaultAnimals);
        } else {
          setAnimals(data || defaultAnimals);
        }
      } catch (err) {
        console.error('Error fetching animals:', err);
        setAnimals(defaultAnimals);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const defaultAnimals = [
    {
      name: 'Bengal Tiger',
      region: 'West Bengal, India',
      symbolism: 'Bold confidence, power, Indian heritage',
      personality: 'Fearless leaders, powerful presences',
      price: '180',
      tier: 'signature',
      image: 'bengal tiger.jpeg'
    },
    {
      name: 'Indian Elephant',
      region: 'Kerala, India',
      symbolism: 'Wisdom, patience, strength',
      personality: 'Thoughtful leaders, mentors',
      price: '180',
      tier: 'signature',
      image: 'indian elephant.jpeg'
    },
    {
      name: 'Asiatic Lion',
      region: 'Gujarat, India',
      symbolism: 'Courage, nobility, leadership',
      personality: 'Brave visionaries, natural leaders',
      price: '180',
      tier: 'signature',
      image: 'lion.jpeg'
    },
    {
      name: 'One-Horned Rhino',
      region: 'Assam, India',
      symbolism: 'Resilience, strength, rarity',
      personality: 'Determined, unstoppable spirits',
      price: '220',
      tier: 'rare',
      image: 'assam rhino.jpeg'
    },
    {
      name: 'Snow Leopard',
      region: 'Himalayas, India',
      symbolism: 'Grace, mystery, adaptability',
      personality: 'Elegant achievers, independent thinkers',
      price: '220',
      tier: 'rare',
      image: 'snow leopard.jpeg'
    },
    {
      name: 'Indian Peacock',
      region: 'Rajasthan, India',
      symbolism: 'Beauty, confidence, pride',
      personality: 'Bold expressionists, creative souls',
      price: '250',
      tier: 'limited',
      image: 'indian peacock.jpeg'
    },
    {
      name: 'African Lion',
      region: 'Serengeti, Tanzania',
      symbolism: 'Majesty, pride, dominance',
      personality: 'Born leaders, commanding presence',
      price: '200',
      tier: 'international',
      image: 'AFRICAN LION'
    },
    {
      name: 'Galápagos Tortoise',
      region: 'Galápagos Islands, Ecuador',
      symbolism: 'Longevity, wisdom, endurance',
      personality: 'Patient strategists, long-term thinkers',
      price: '200',
      tier: 'international',
      image: 'GALÁPAGOS TORTOISE'
    },
    {
      name: 'Arctic Wolf',
      region: 'Arctic Canada',
      symbolism: 'Loyalty, pack mentality, resilience',
      personality: 'Team players, loyal companions',
      price: '200',
      tier: 'international',
      image: 'ARCTIC WOLF'
    }
  ];

  const heroSlides = [
    { name: 'Bengal Tiger', region: 'West Bengal' },
    { name: 'Indian Elephant', region: 'Kerala' },
    { name: 'Asiatic Lion', region: 'Gujarat' }
  ];

  return (
    <Router>
      <div className="bg-white text-slate-900 font-serif overflow-x-hidden">
        <TopBanner />
        <Navigation scrolled={scrolled} />
        
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900 mb-4">Loading...</div>
              <div className="text-sm text-slate-600">Connecting to the collection</div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage heroSlides={animals.slice(0, 3)} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />} />
              <Route path="/collection" element={<CollectionPage animals={animals} setSelectedAnimal={setSelectedAnimal} />} />
              <Route path="/atelier" element={<AtelierPage />} />
              <Route path="/club" element={<ClubPage />} />
            </Routes>
          </div>
        )}
        
        <ProductModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
        <NewsletterSection />
        <Footer />
      </div>
    </Router>
  );
};

export default FeralWebsite;