"use client"

import React, { useState, useRef, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signup } from '../actions'
import { GoogleAuthButton } from "@/components/auth/google-auth-button"

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const AppInput = (props: InputProps) => {
  const { label, placeholder, type = "text", id, name, required, ...rest } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="w-full min-w-[200px] relative text-left">
      {label && (
        <label htmlFor={id} className="block mb-1.5 text-xs font-semibold text-zinc-400 font-mono">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          className="peer relative z-10 border-2 border-zinc-800/80 h-12 w-full rounded-xl bg-zinc-950/60 px-4 text-sm text-white font-medium outline-none drop-shadow-sm transition-all duration-200 focus:bg-zinc-950 placeholder:text-zinc-600 focus:border-zinc-700/80"
          placeholder={placeholder}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...rest}
        />
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, #39FF14 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, #39FF14 0%, transparent 70%)`,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = use(props.searchParams);
  const error = searchParams?.error;

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const leftSection = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - leftSection.left,
      y: e.clientY - leftSection.top
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const socialIcons = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>,
      href: '#'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"/></svg>,
      href: '#'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"/></svg>,
      href: '#'
    }
  ];

  return (
    <div className="w-full max-w-5xl px-4 flex items-center justify-center py-10">
      <div className="w-full flex justify-between bg-zinc-950/45 border border-zinc-800/80 rounded-3xl overflow-hidden min-h-[580px] h-[580px] shadow-2xl backdrop-blur-md">
        
        {/* Left Form Column */}
        <div
          className="w-full lg:w-1/2 left h-full relative overflow-hidden flex flex-col justify-center p-6 md:p-12 select-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Neon Glow Hover Tracer */}
          <div
            className={`absolute pointer-events-none w-[400px] h-[400px] bg-gradient-to-r from-[#39FF14]/5 via-[#00ffc4]/5 to-transparent rounded-full blur-3xl transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`,
              transition: 'transform 0.08s ease-out'
            }}
          />

          <div className="form-container h-full z-10 flex flex-col justify-center max-w-md mx-auto w-full">
            <form className="text-center flex flex-col gap-6" action={signup}>
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-extrabold text-white tracking-tight leading-none">Sign Up</h1>
                
                {/* Social logins */}
                <div className="social-container mt-1">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <ul className="flex gap-3 justify-center">
                      {socialIcons.map((social, index) => (
                        <li key={index} className="list-none">
                          <a
                            href={social.href}
                            className="w-10 h-10 bg-zinc-900/60 border border-zinc-800 rounded-full flex justify-center items-center relative z-[1] overflow-hidden group transition-all duration-300 hover:border-[#39FF14]/40"
                          >
                            <span className="text-zinc-400 transition-all duration-300 z-[2] group-hover:text-[#39FF14] group-hover:rotate-[360deg]">
                              {social.icon}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="w-full max-w-xs mt-1">
                      <GoogleAuthButton isSignUp />
                    </div>
                  </div>
                </div>

                <div className="relative my-2.5">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-900" />
                  </div>
                  <div className="relative flex justify-center text-[10px] font-bold font-mono uppercase">
                    <span className="bg-[#0c0c0e] px-2 text-zinc-500">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="flex flex-col gap-4 text-left">
                <AppInput 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  required 
                />
                <AppInput 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  required 
                />
              </div>

              {error && (
                <p className="text-xs font-semibold text-red-500 text-left font-mono">{error}</p>
              )}

              {/* Submit Buttons and Toggles */}
              <div className="flex flex-col items-center gap-4 mt-2">
                <button 
                  type="submit"
                  className="group/button relative inline-flex justify-center items-center overflow-hidden rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-white/10 cursor-pointer w-full"
                >
                  <span className="text-sm px-2">Sign Up</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-black/10" />
                  </div>
                </button>

                <div className="text-center text-xs text-zinc-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#39FF14] hover:text-[#5eff3d] transition-colors font-bold">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Cover Image Column */}
        <div className="hidden lg:flex w-1/2 right h-full items-center justify-center overflow-hidden border-l border-zinc-900 bg-[#0a0a0c] relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#39FF14]/10 via-transparent to-transparent z-10 pointer-events-none" />
          <Image
            src="/EchoClipz%20final.png"
            width={800}
            height={800}
            priority
            alt="EchoClipz Logo"
            className="w-full h-full object-contain p-16 drop-shadow-[0_0_50px_rgba(57,255,20,0.2)] hover:scale-105 transition-transform duration-700"
          />
        </div>

      </div>
    </div>
  );
}
