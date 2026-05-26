import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#050506] flex items-center justify-center overflow-x-hidden">
      {children}
    </div>
  );
}
