'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-orange-500 px-4 py-2 rounded hover:text-gray-300 hover:cursor-pointer font-mono"
    >
      {children}
    </button>
  );
};

export default Button;
