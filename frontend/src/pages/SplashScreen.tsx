import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 1. Wait 2.5 seconds, then start fading out
    const timer = setTimeout(() => {
      setFade(true);
      // 2. Wait another 0.5s for fade to finish, then unmount
      setTimeout(onFinish, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center animate-pulse">
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase scale-animation">
          KOVA
        </h1>
        <p className="text-white text-xs md:text-sm tracking-[0.5em] mt-4 uppercase text-gray-400">
          Est. 2026
        </p>
      </div>
      
      <style>{`
        .scale-animation {
            animation: scaleUp 3s ease-out forwards;
        }
        @keyframes scaleUp {
            0% { transform: scale(0.8); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}