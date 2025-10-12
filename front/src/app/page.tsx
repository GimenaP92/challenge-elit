'use client';

import React, { useEffect, useState } from 'react';
import DigitalClock from '@/components/ui/DigitalClock';
import Image from 'next/image';
import Spinner from '@/components/ui/Spinner';

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === 'complete') setLoading(false);
    else window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="flex flex-col md:flex-row items-center justify-center max-h-screen bg-[#0a0a0a] gap-8 px-2 overflow-hidden">
  {/* Contenedor relativo desktop */}
  <div className="relative flex items-center justify-center md:justify-normal mt-10">
    {/* Imagen */}
    <div className="relative w-[240px] h-[180px] sm:w-[400px] sm:h-[300px] md:w-[500px] md:h-[350px]">
      <Image
        src="/bgHome.jpg"
        alt="Fondo Home"
        className="object-cover rounded-lg"
        fill
        priority
        onLoad={() => setLoading(false)}
      />
    </div>

    {/* Texto — posicionado en desktop */}
    <div className="hidden md:flex absolute bottom-0 left-[-300px] flex-col items-start text-white">
      <DigitalClock />
      <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-1 font-mono">
        ELIT TASK
      </h1>
      <p className="text-base font-mono">Tus días más organizados.</p>
    </div>
  </div>

  {/* Texto visible solo en mobile */}
  <div className="flex flex-col items-center text-center text-white md:hidden">
    <DigitalClock />
    <h1 className="text-2xl font-extrabold uppercase tracking-wide mb-1 font-mono">
      ELIT TASK
    </h1>
    <p className="text-sm font-mono">Tus días más organizados.</p>
  </div>
</main>

  );
}
