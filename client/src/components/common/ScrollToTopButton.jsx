import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to Top"
      className={`fixed bottom-22 sm:bottom-24 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/95 hover:bg-sky-600 text-white shadow-2xl border border-slate-700/80 hover:border-sky-400 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-hidden ${
        visible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

