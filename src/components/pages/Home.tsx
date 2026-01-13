// src/pages/Home.tsx
import { useState, useEffect, useMemo } from 'react';
import './Home.css';

import Coffee from '../../assets/images/coffee_date.png';
import Beach from '../../assets/images/beach_sunset.png';
import Birthday from '../../assets/images/birthday_surprise.png';
import Rain from '../../assets/images/rain_dance.png';
import Christmas from '../../assets/images/christmas.png';
import NewYears from '../../assets/images/new_years.png';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

type PageState = 'initial' | 'letter' | 'memories' | 'proposal' | 'promise';

interface Memory {
  id: number;
  title: string;
  date: string;
  caption: string;
  icon: string;
  image?: string;
  className: string;
}

const Home = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('initial');
  const [hearts, setHearts] = useState<number[]>([]);
  const [typedText, setTypedText] = useState('');
  const [showSignature, setShowSignature] = useState(false);
  const [showNavButton, setShowNavButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [titleText, setTitleText] = useState('My Dearest 💕');
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);

  // Memories data
  const memories: Memory[] = [
    {
      id: 1,
      title: "Our First Coffee Date",
      date: "March 15, 2024",
      caption: "That little café where we talked for hours... I knew right then you were special.",
      icon: "☕",
      image: Coffee,
      className: "memory-photo-1"
    },
    {
      id: 2,
      title: "Sunset at the Beach",
      date: "June 8, 2024",
      caption: "Watching the sun dip into the ocean, your hand in mine. Pure magic.",
      icon: "🌅",
      image: Beach,
      className: "memory-photo-2"
    },
    {
      id: 3,
      title: "Your Birthday Surprise",
      date: "August 22, 2024",
      caption: "The look on your face when you saw the balloons — I'll treasure it forever.",
      icon: "🎂",
      image: Birthday,
      className: "memory-photo-3"
    },
    {
      id: 4,
      title: "Dancing in the Rain",
      date: "September 3, 2024",
      caption: "We got completely soaked, but your laughter made it the best day ever.",
      icon: "🌧️",
      image: Rain,
      className: "memory-photo-4"
    },
    {
      id: 5,
      title: "Our First Christmas",
      date: "December 25, 2024",
      caption: "Hot cocoa, warm blankets, and your head on my shoulder. Perfect.",
      icon: "🎄",
      image: Christmas,
      className: "memory-photo-5"
    },
    {
      id: 6,
      title: "New Year's Kiss",
      date: "January 1, 2025",
      caption: "Starting a new year with you in my arms — my greatest blessing.",
      icon: "✨",
      image: NewYears,
      className: "memory-photo-6"
    }
  ];

  const loveLetterContent = `To the one who holds my heart,

Your love is my greatest gift. You see me, stand by me, and make every moment special. I promise to love you more each day.

Always yours. 💖`;

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

  const handleNavigateToProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('proposal');
      setIsTransitioning(false);
    }, 600);
  };

  const handleYes = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('promise');
      setIsTransitioning(false);
    }, 600);
  };

  const handleNoHover = () => {
    const maxX = window.innerWidth / 3;
    const maxY = window.innerHeight / 3;
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    const newExplosion = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setExplosions(prev => [...prev, newExplosion]);
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id));
    }, 1000);
  };

  const getContainerClass = () => {
    let classes = 'valentines-container';
    if (currentPage === 'letter') classes += ' love-letter-mode';
    if (currentPage === 'memories') classes += ' memories-mode';
    if (currentPage === 'proposal') classes += ' proposal-mode';
    if (currentPage === 'promise') classes += ' promise-mode';
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
          onClick={handleHeartClick}
        >
          ♥
        </div>
      ))}

      <div className="content-wrapper">
        {/* SCREEN 1: Initial Welcome */}
        {currentPage === 'initial' && (
          <div className="initial-screen">
            <h1
              className="title"
              onMouseEnter={() => setTitleText('My Everything ❤️')}
              onMouseLeave={() => setTitleText('My Dearest 💕')}
            >
              {titleText}
            </h1>
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
                <p className="signature-name">Your Name 💕</p>
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
                {/* <span className="btn-icon">📸</span> */}
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
              {/* <span className="header-heart">📷</span> */}
              <h2 className="memories-title">Our Beautiful Memories</h2>
              <span className="header-heart">📷</span>
            </div>

            <p className="memories-subtitle">Every moment with you is a treasure 💕</p>

            {/* Memories gallery with photos */}
            <div className="memories-gallery">
              {memories.map((memory) => (
                <div key={memory.id} className="memory-card memory-photo-card">
                  <div
                    className={`memory-photo ${memory.className}`}
                    style={memory.image ? { backgroundImage: `url(${memory.image})` } : {}}
                  >
                    {!memory.image && <div className="photo-overlay">{memory.icon}</div>}
                  </div>
                  <div className="memory-details">
                    <h3 className="memory-title">{memory.title}</h3>
                    <p className="memory-date">{memory.date}</p>
                    <p className="memory-caption">{memory.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="memories-footer-text">
              Many more memories to come... 🌹
            </p>

            <div className="memories-next-section">
              <button className="memories-next-btn" onClick={handleNavigateToProposal}>
                Next 💖
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: Proposal */}
        {currentPage === 'proposal' && (
          <div className={`proposal-screen ${isTransitioning ? 'fade-out' : ''}`}>
            <div className="proposal-card">
              <div className="proposal-heart">💖</div>
              <h2 className="proposal-question">Will You Be My Valentine? 💕</h2>
              <div className="proposal-actions">
                <button className="yes-btn" onClick={handleYes}>YES 💖</button>
                <button
                  className="no-btn"
                  onMouseEnter={handleNoHover}
                  style={{ transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` }}
                >
                  NO 😅
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 5: Future Promise */}
        {currentPage === 'promise' && (
          <div className="promise-screen">
            <div className="promise-content">
              <div className="promise-glow"></div>
              <h2 className="promise-title">My Promise to You 💍</h2>
              <div className="promise-message">
                <p>“With you, every tomorrow is my favorite promise 💖”</p>
                <p>I promise to hold your hand through every adventure, to be your calm in every storm, and to love you more with every heartbeat.</p>
                <p>You are my today, my tomorrow, and my forever.</p>
              </div>
              <div className="promise-footer">
                <span className="heart-icon">💖</span>
                <span className="heart-icon">✨</span>
                <span className="heart-icon">💖</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Particle explosions */}
      {explosions.map(exp => (
        <div
          key={exp.id}
          className="explosion-container"
          style={{ left: exp.x, top: exp.y }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mini-heart">❤️</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;