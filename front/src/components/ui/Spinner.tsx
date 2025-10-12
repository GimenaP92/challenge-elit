'use client';

import React from 'react';

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}
