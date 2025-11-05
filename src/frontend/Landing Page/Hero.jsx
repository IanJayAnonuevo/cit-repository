import { useNavigate } from 'react-router-dom';
import Illustration from '../../assets/images/Home/Illustration.svg';
import V9Gradient from '../../assets/images/V9.svg';
import { useEffect, useState } from 'react';

function TypewriterText() {
  const phrases = [
    'Web Development',
    'Mobile Applications',
    'IoT Projects',
    'AI Systems',
    'E-Learning Platforms',
    'Smart Solutions',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 70;
  const deletingSpeed = 45;
  const holdDelay = 1000;

  useEffect(() => {
    let timer;
    const current = phrases[phraseIndex];

    if (!isDeleting && displayText.length < current.length) {
      timer = window.setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === current.length) {
      timer = window.setTimeout(() => setIsDeleting(true), holdDelay);
    } else if (isDeleting && displayText.length > 0) {
      timer = window.setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <span className="inline-flex items-center align-middle">
      <span className="inline-block min-w-[22ch] text-transparent bg-clip-text bg-gradient-to-b from-purple-700 via-purple-500 to-purple-300">
        {displayText}
      </span>
      <span className="ml-1 inline-block w-[2px] h-[1em] bg-gray-500 blink-soft" />
    </span>
  );
}

export default function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: relX, y: relY });
  }

  function handleBrowseClick(e) {
    e.preventDefault();
    navigate('/capstone');
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden flex-1 mt-16 md:mt-24 group"
      onMouseMove={handleMouseMove}
    >
      {/* V9.svg gradient background */}
      <div className="absolute inset-0 bg-white" aria-hidden />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url(${V9Gradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3 lg:gap-4 items-center">
        <div className="justify-self-center md:justify-self-start text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-snug md:leading-tight text-gray-900">
            Easily access <TypewriterText /> in one click!
          </h1>
          <p className="mt-5 text-gray-600 max-w-xl">
            Empowering IT students to learn, share, and innovate through easy
            access to capstone research.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg">
              <button
                onClick={handleBrowseClick}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-purple-700 px-7 py-3 text-white font-semibold shadow-lg hover:bg-purple-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                <span>Browse here</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center md:justify-end justify-self-center md:justify-self-end">
          <div
            className="absolute inset-0 bg-gradient-to-tr from-purple-300/60 to-transparent rounded-[48px] blur-2xl"
            aria-hidden
          />
          <img
            src={Illustration}
            alt="Illustration"
            className="relative h-72 md:h-88 w-auto select-none animate-float-slow transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-1"
          />
        </div>
      </div>
    </section>
  );
}
