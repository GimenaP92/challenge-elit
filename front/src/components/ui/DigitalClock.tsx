'use client';

import React, { useEffect, useState } from 'react';

export default function DigitalClock() {
  // 1. Ahora el estado guardará dos partes: la hora y el sufijo (AM/PM)
  const [timeParts, setTimeParts] = useState({ hour: '', suffix: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // convierte 0 a 12

      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;

      // 2. Actualizamos el estado con las dos partes
      setTimeParts({ hour: formattedTime, suffix: ampm });
    };

    updateTime(); // inicial
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-2xl font-mono">
     
      <span className="text-white">
        {timeParts.hour}
      </span>
    
      <span className="text-orange-500 ml-2">
        {timeParts.suffix}
      </span>
    </div>
  );
}