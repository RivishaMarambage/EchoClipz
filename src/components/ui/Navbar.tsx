"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-zinc-400';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-sm font-medium';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
        <span className={`${defaultTextColor} transition-colors duration-200`}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-2xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const logoElement = (
    <a href="/" className="flex items-center group">
      <img src="/EchoClipz.png" alt="EchoClipz" className="h-14 object-contain drop-shadow-[0_0_12px_rgba(57,255,20,0.3)] transition-transform duration-300 group-hover:scale-105" />
    </a>
  );

  const navLinksData = [
    { label: 'Features', href: '#features' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const loginButtonElement = (
    <Link href="/login" className="w-full sm:w-auto">
      <button className="px-4 py-2 sm:py-1.5 text-xs sm:text-sm font-medium border border-zinc-800 bg-[#161616a2] text-zinc-300 rounded-full hover:border-zinc-500 hover:text-white transition-all duration-200 w-full">
        Login
      </button>
    </Link>
  );

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div className="absolute inset-0 -m-1.5 rounded-full
                     hidden sm:block
                     bg-[#39FF14]
                     opacity-25 filter blur-md pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-45 group-hover:blur-lg group-hover:-m-2.5"></div>
      <Link href="/signup" className="w-full sm:w-auto relative z-10 block">
        <button className="relative w-full px-4 py-2 sm:py-1.5 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-[#39FF14] to-[#2ee610] rounded-full hover:from-[#5eff3d] hover:to-[#22cf0b] transition-all duration-200 shadow-[0_0_12px_rgba(57,255,20,0.3)]">
          Get Started
        </button>
      </Link>
    </div>
  );

  return (
    <header className={`fixed top-12 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       px-6 py-2.5 backdrop-blur-md
                       ${headerShapeClass}
                       border border-zinc-800/80 bg-[#1414146e]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-200 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-8 sm:gap-x-12">
        <div className="flex items-center">
          {logoElement}
        </div>

        <nav className="hidden sm:flex items-center space-x-6 sm:space-x-8">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        <button 
          className="sm:hidden flex items-center justify-center w-8 h-8 text-zinc-300 focus:outline-none" 
          onClick={toggleMenu} 
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[300px] opacity-100 pt-4 pb-2' : 'max-h-0 opacity-0 pt-0 pb-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-3.5 text-sm w-full border-t border-zinc-800/50 pt-3">
          {navLinksData.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors w-full text-center py-1 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center gap-3 mt-4 w-full border-t border-zinc-800/30 pt-4">
          {loginButtonElement}
          {signupButtonElement}
        </div>
      </div>
    </header>
  );
}
