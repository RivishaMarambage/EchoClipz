'use client';

import React, { Suspense, lazy } from 'react';

// Error Boundary to catch Spline runtime errors (e.g. invalid scene buffer)
class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#070707] border border-red-500/20 rounded-xl p-4 text-center">
          <div className="text-red-400 mb-2 font-mono text-sm">Failed to load Spline scene</div>
          <p className="text-zinc-500 text-xs max-w-[250px]">
            The provided .splinecode URL might be invalid, corrupted, or from an older unsupported version of Spline.
            Please provide a valid scene URL.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <SplineErrorBoundary>
      <Suspense
        fallback={
          <div className={`w-full h-full flex items-center justify-center bg-transparent text-white ${className}`}>
            <svg className="animate-spin h-5 w-5 text-[#39FF14] mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className} 
          style={{
            filter: "hue-rotate(-150deg) saturate(1.2)",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)"
          }}
        />
      </Suspense>
    </SplineErrorBoundary>
  );
}
