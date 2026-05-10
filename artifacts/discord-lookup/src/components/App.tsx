import React, { useState } from 'react';
import SpaceBackground from './components/SpaceBackground';
import AuthHeader from './components/AuthHeader';
import UserResult from './components/UserResult';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast'; // Opcional para notificaciones

function App() {
  const [userId, setUserId] = useState('');

  return (
    <SpaceBackground>
      <div className="min-h-screen pt-24 pb-32 px-6 max-w-4xl mx-auto">
        <AuthHeader />
        
        {/* Input principal */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent mb-6 leading-tight">
            Discord<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 inline-block animate-pulse">Lookup</span>
          </h1>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Ingresa un ID de Discord..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl text-xl font-semibold text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 shadow-2xl hover:shadow-blue-500/20"
            />
          </div>
        </div>

        {/* Resultado */}
        {userId && <UserResult userId={userId} />}
        
        <Toaster position="top-right" />
      </div>
      
      <Footer />
    </SpaceBackground>
  );
}

export default App;
