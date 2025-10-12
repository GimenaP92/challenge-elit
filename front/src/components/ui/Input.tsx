'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="px-4 py-2 border border-gray-300 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-7700"
      />
    </div>
  );
};

export default Input;
