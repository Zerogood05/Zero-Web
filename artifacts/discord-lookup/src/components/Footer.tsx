import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="text-center">
        <p className="text-gray-400 text-lg mb-2 backdrop-blur-xl bg-black/30 px-6 py-3 rounded-2xl border border-white/10">
          Hecho por{' '}
          <span className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-xl animate-pulse group cursor-pointer hover:scale-110 transition-all duration-300 hover:drop-shadow-2xl hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] relative">
            Zero<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 inline-block animate-pulse">Good</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-150" />
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
