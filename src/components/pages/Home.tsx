// src/pages/Home.tsx
import { useState, useEffect, useMemo } from 'react';
import './Home.css';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

type PageState = 'initial' | 'letter' | 'memories';

const Home = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('initial');
  const [hearts, setHearts] = useState<number[]>([]);
  const [typedText, setTypedText] = useState('');
  const [showSignature, setShowSignature] = useState(false);
  const [showNavButton, setShowNavButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Love letter content - sincere and emotional
  const loveLetterContent = `To the one who holds my heart,

From the very first moment our eyes met, I knew my life would never be the same. You walked into my world like a gentle breeze, and suddenly everything felt right.

Every morning I wake up grateful that you exist. Your smile is my sunrise, your laughter is my favorite melody, and your love... your love is the most precious gift I have ever received.

You see me — truly see me — in ways no one else ever has. You hold my hand through storms and dance with me in the rain. You make ordinary moments feel extraordinary, and I fall deeper in love with you every single day.

I don't need grand gestures or perfect words. I just need you — your warmth, your presence, your heart beating next to mine.

Thank you for loving me the way you do. Thank you for being my home, my peace, my forever. I promise to cherish you, to protect your heart, and to love you more than yesterday but less than tomorrow.

You are my everything. Today, tomorrow, and always.`;

  // Generate bokeh particles
  const bokehParticles = useMemo<Particle[]>(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 20 + Math.random() * 50,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
  }, []);

  // Generate sparkles
  const sparkles = useMemo<Particle[]>(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 2.5 + Math.random() * 3,
      delay: Math.random() * 4,
    }));
  }, []);

  // Random floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHearts = [...prev, Date.now()];
        return newHearts.slice(-15);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Clean up old hearts
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(id => Date.now() - id < 12000));
    }, 3000);

    return () => clearInterval(cleanup);
  }, []);

  // Typewriter effect for love letter
  useEffect(() => {
    if (currentPage === 'letter' && typedText.length < loveLetterContent.length) {
      const timeout = setTimeout(() => {
        setTypedText(loveLetterContent.slice(0, typedText.length + 1));
      }, 25);
      return () => clearTimeout(timeout);
    } else if (currentPage === 'letter' && typedText.length >= loveLetterContent.length) {
      // Show signature after typing completes
      setTimeout(() => setShowSignature(true), 500);
      // Show navigation button after signature
      setTimeout(() => setShowNavButton(true), 1200);
    }
  }, [currentPage, typedText, loveLetterContent]);

  const handleSurprise = () => {
    setCurrentPage('letter');
  };

  const handleNavigateToMemories = () => {
    setIsTransitioning(true);
    // Smooth transition to memories page
    setTimeout(() => {
      setCurrentPage('memories');
      setIsTransitioning(false);
    }, 600);
  };

  const getContainerClass = () => {
    let classes = 'valentines-container';
    if (currentPage === 'letter') classes += ' love-letter-mode';
    if (currentPage === 'memories') classes += ' memories-mode';
    if (isTransitioning) classes += ' transitioning';
    return classes;
  };

  return (
    <div className={getContainerClass()}>
      {/* Background with gradient layers */}
      <div className="background-image" />

      {/* Bokeh particles */}
      {bokehParticles.map(particle => (
        <div
          key={`bokeh-${particle.id}`}
          className={`bokeh-particle ${currentPage !== 'initial' ? 'bokeh-soft' : ''}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map(id => (
        <div
          key={id}
          className={`floating-heart ${currentPage !== 'initial' ? 'heart-soft' : ''}`}
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${10 + Math.random() * 6}s`,
          }}
        >
          ♥
        </div>
      ))}

      <div className="content-wrapper">
        {/* SCREEN 1: Initial Welcome */}
        {currentPage === 'initial' && (
          <div className="initial-screen">
            <h1 className="title">My Dearest 💕</h1>
            <p className="subtitle">Something special is waiting for you...</p>

            <button className="magic-btn" onClick={handleSurprise}>
              Click Here For Your Surprise! ✨
            </button>
          </div>
        )}

        {/* SCREEN 2: Love Letter */}
        {currentPage === 'letter' && (
          <div className={`love-letter-screen ${isTransitioning ? 'fade-out' : ''}`}>
            {/* Decorative header */}
            <div className="letter-header">
              <span className="header-heart">💌</span>
              <h2 className="letter-title">A Letter From My Heart</h2>
              <span className="header-heart">💌</span>
            </div>

            {/* Love letter card */}
            <div className="love-letter-card">
              <div className="paper-texture" />
              <div className="letter-content">
                <p className="typewriter-text">
                  {typedText}
                  <span className="cursor">|</span>
                </p>
              </div>

              {/* Signature appears after typing */}
              <div className={`letter-signature ${showSignature ? 'visible' : ''}`}>
                <p className="closing">With all my love,</p>
                <p className="signature-name">[Your Name] 💕</p>
                <p className="date">Valentine's Day 2026</p>
              </div>
            </div>

            {/* Bottom section with message and navigation button */}
            <div className={`bottom-section ${showSignature ? 'visible' : ''}`}>
              <p className="forever-text">Forever & Always 💞</p>

              {/* Navigation button to memories */}
              <button
                className={`memories-nav-btn ${showNavButton ? 'visible' : ''}`}
                onClick={handleNavigateToMemories}
              >
                <span className="btn-icon">📸</span>
                <span className="btn-text">See Our Memories</span>
                <span className="btn-heart">💞</span>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Memories Gallery */}
        {currentPage === 'memories' && (
          <div className="memories-screen">
            <div className="memories-header">
              <span className="header-heart">📷</span>
              <h2 className="memories-title">Our Beautiful Memories</h2>
              <span className="header-heart">📷</span>
            </div>

            <p className="memories-subtitle">Every moment with you is a treasure 💕</p>

            {/* Memories gallery with mock data */}
            <div className="memories-gallery">
              <div className="memory-card">
                <div className="memory-icon">☕</div>
                <h3 className="memory-title">Our First Coffee Date</h3>
                <p className="memory-date">March 15, 2024</p>
                <p className="memory-description">
                  That little café where we talked for hours... I knew right then you were special.
                </p>
              </div>

              <div className="memory-card">
                <div className="memory-icon">🌅</div>
                <h3 className="memory-title">Sunset at the Beach</h3>
                <p className="memory-date">June 8, 2024</p>
                <p className="memory-description">
                  Watching the sun dip into the ocean, your hand in mine. Pure magic.
                </p>
              </div>

              <div className="memory-card">
                <div className="memory-icon">🎂</div>
                <h3 className="memory-title">Your Birthday Surprise</h3>
                <p className="memory-date">August 22, 2024</p>
                <p className="memory-description">
                  The look on your face when you saw the balloons — I'll treasure it forever.
                </p>
              </div>

              <div className="memory-card">
                <div className="memory-icon">🌧️</div>
                <h3 className="memory-title">Dancing in the Rain</h3>
                <p className="memory-date">September 3, 2024</p>
                <p className="memory-description">
                  We got completely soaked, but your laughter made it the best day ever.
                </p>
              </div>

              <div className="memory-card">
                <div className="memory-icon">🎄</div>
                <h3 className="memory-title">Our First Christmas</h3>
                <p className="memory-date">December 25, 2024</p>
                <p className="memory-description">
                  Hot cocoa, warm blankets, and your head on my shoulder. Perfect.
                </p>
              </div>

              <div className="memory-card">
                <div className="memory-icon">✨</div>
                <h3 className="memory-title">New Year's Kiss</h3>
                <p className="memory-date">January 1, 2025</p>
                <p className="memory-description">
                  Starting a new year with you in my arms — my greatest blessing.
                </p>
              </div>
            </div>

            <p className="memories-footer-text">
              Many more memories to come... 🌹
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;