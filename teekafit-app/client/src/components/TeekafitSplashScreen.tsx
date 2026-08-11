import { useEffect, useState } from "react";

/**
 * Animated welcome/splash screen — ported from the standalone
 * TeekafitSplashScreen.jsx design (see repo root `components/`) into the
 * app's TSX + Tailwind v4 setup. Shows for a few seconds, then hands off
 * to the rest of the app via onFinish.
 */
export default function TeekafitSplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1200);

    const timer = setTimeout(() => {
      onFinish();
    }, 2600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <button
      type="button"
      onClick={onFinish}
      aria-label="تخطي شاشة الترحيب"
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white overflow-hidden font-sans cursor-pointer"
    >
      <div className="absolute w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 flex flex-col items-center space-y-6">
        <div
          className={`transition-transform duration-700 ease-in-out ${
            pulse
              ? "scale-110 drop-shadow-[0_0_25px_rgba(204,255,0,0.6)]"
              : "scale-100"
          }`}
        >
          <div className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-white">
            T<span className="text-lime-400 font-extrabold text-7xl">t</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl font-bold tracking-widest uppercase text-white">
            Teeka<span className="text-lime-400">fit</span>
          </h1>
          <p className="text-xs text-zinc-400 tracking-wider uppercase">
            Discipline • Drive • Results
          </p>
        </div>

        <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-lime-400 animate-pulse" />
        </div>
      </div>

      <div className="absolute bottom-8 text-zinc-600 text-xs tracking-widest uppercase">
        Powered by Performance
      </div>
    </button>
  );
}
