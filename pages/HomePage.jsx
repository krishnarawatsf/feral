import { HeroSection } from '../components/HeroSection';
import { PhilosophySection } from '../components/PhilosophySection';

export const HomePage = ({ heroSlides, currentSlide, setCurrentSlide }) => (
  <>
    <HeroSection 
      heroSlides={heroSlides} 
      currentSlide={currentSlide} 
      setCurrentSlide={setCurrentSlide}
    />
    <PhilosophySection />
  </>
);
