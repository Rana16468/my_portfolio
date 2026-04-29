import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-88px)] bg-gradient-to-r from-indigo-900 to-purple-900">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 mb-2">
          Portfolio Loading
        </h2>
      </div>
      
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-teal-400 animate-spin"></div>
        
        {/* Middle spinning ring - opposite direction */}
        <div className="absolute top-2 left-2 w-20 h-20 rounded-full border-l-4 border-r-4 border-purple-500 animate-spin-slow"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 animate-pulse"></div>
      </div>
      
      {/* Progress dots */}
      <div className="mt-8 flex space-x-2">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div 
            key={dot}
            className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce"
            style={{ animationDelay: `${dot * 0.1}s` }}
          ></div>
        ))}
      </div>
      
      <p className="text-gray-300 mt-6 tracking-wider font-light">
        Preparing something amazing for you...
      </p>
    </div>
  );
};


export default LoadingSpinner;