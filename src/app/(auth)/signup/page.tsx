"use client"

import React, { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signup } from '../actions'
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import Particles from '@/components/ui/particles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

const AppInput = (props: InputProps) => {
  const { label, icon, isPassword, className, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const type = isPassword ? (showPassword ? "text" : "password") : props.type || "text";

  return (
    <div className="w-full flex flex-col gap-2 text-left mb-4">
      <label htmlFor={props.id} className="block text-sm font-semibold text-white">
        {label}
      </label>
      <div 
        className={`relative flex items-center w-full h-12 rounded-xl bg-zinc-950/80 border transition-all duration-200 ${
          isFocused ? 'border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.15)]' : 'border-zinc-800'
        }`}
      >
        {icon && (
          <div className="absolute left-4 flex items-center justify-center text-[#39FF14]">
            {icon}
          </div>
        )}
        <input
          {...rest}
          type={type}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          className={`w-full h-full bg-transparent outline-none text-sm text-white placeholder:text-zinc-600 ${
            icon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = use(props.searchParams);
  const error = searchParams?.error;

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#050505] overflow-hidden p-4">
      
      {/* Particles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#39FF14', '#5eff3d', '#1f8f0a', '#ffffff']}
          particleCount={250}
          particleSpread={15}
          speed={0.15}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          className="opacity-60"
        />
      </div>

      <div className="w-full max-w-[440px] z-10 relative">
        <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/EchoClipz%20final.png"
              width={200}
              height={80}
              priority
              alt="EchoClipz Logo"
              className="object-contain drop-shadow-[0_0_20px_rgba(57,255,20,0.5)] mb-6"
            />
            <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-sm text-zinc-400">Join EchoClipz and get started</p>
          </div>

          <form className="flex flex-col w-full" action={signup}>
            
            <AppInput 
              id="name" 
              name="name" 
              type="text" 
              label="Full Name"
              placeholder="Enter your full name" 
              icon={<User className="w-4 h-4" />}
            />

            <AppInput 
              id="email" 
              name="email" 
              type="email" 
              label="Email"
              placeholder="Enter your email" 
              icon={<Mail className="w-4 h-4" />}
              required 
            />
            
            <AppInput 
              id="password" 
              name="password" 
              isPassword
              label="Password"
              placeholder="Create a password" 
              icon={<Lock className="w-4 h-4" />}
              required 
            />

            <AppInput 
              id="confirmPassword" 
              name="confirmPassword" 
              isPassword
              label="Confirm Password"
              placeholder="Confirm your password" 
              icon={<Lock className="w-4 h-4" />}
              required 
            />

            {error && (
              <p className="text-sm font-semibold text-red-500 text-center mb-4 mt-2">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full h-12 rounded-xl bg-[#39FF14] text-black font-bold text-base transition-all duration-300 hover:bg-[#5eff3d] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] mt-4"
            >
              Sign Up
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0a0a0c] px-4 text-zinc-500">or</span>
              </div>
            </div>

            <GoogleAuthButton isSignUp />

            <div className="text-center text-sm text-zinc-400 mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-[#39FF14] hover:text-[#5eff3d] transition-colors">
                Sign in
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
