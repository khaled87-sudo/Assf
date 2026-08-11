import React, { useEffect, useState } from 'react';

export default function TeekafitSplashScreen({ onFinish }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // محاكاة نبض الشعار عند التحميل
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1500);

    // الانتقال بعد 3 ثوانٍ
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* خلفية جمالية متضرجة (Gradient Glow) */}
      <div className="absolute w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* المحتوى الرئيسي */}
      <div className="z-10 flex flex-col items-center space-y-6">
        
        {/* أيقونة الشعار Tt مع تأثير النبض والحركة */}
        <div 
          className={`transition-transform duration-700 ease-in-out ${
            pulse ? 'scale-110 drop-shadow-[0_0_25px_rgba(204,255,0,0.6)]' : 'scale-100'
          }`}
        >
          <div className="text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-white">
            T<span className="text-lime-400 font-extrabold text-7xl">t</span>
          </div>
        </div>

        {/* اسم الماركة Teekafit الكامل */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl font-bold tracking-widest uppercase text-white">
            Teeka<span className="text-lime-400">fit</span>
          </h1>
          <p className="text-xs text-zinc-400 tracking-wider uppercase">
            Discipline • Drive • Results
          </p>
        </div>

        {/* مؤشر التحميل البسيط */}
        <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-lime-400 animate-[shimmer_1.5s_infinite]"></div>
        </div>
      </div>

      {/* تذييل الشاشة */}
      <div className="absolute bottom-8 text-zinc-600 text-xs tracking-widest uppercase">
        Powered by Performance
      </div>
    </div>
  );
}
