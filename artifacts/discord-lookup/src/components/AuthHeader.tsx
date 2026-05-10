import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // o tu sistema de routing

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
}

const AuthHeader: React.FC = () => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular usuario logueado (en prod usa localStorage/sessionStorage)
    const savedUser = localStorage.getItem('discordUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    // Redirigir a OAuth Discord
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=TU_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}&response_type=code&scope=identify`;
  };

  const isSupervisor = user?.id === '598570808771870750';

  return (
    <div className="fixed top-6 right-6 z-50">
      {user ? (
        <>
          {/* Botón de perfil */}
          <div 
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-white/20 shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden group"
            onClick={() => setShowProfile(!showProfile)}
          >
            <img
              src={user.avatar || `https://cdn.discordapp.com/embed/avatars/0.png`}
              alt={user.username}
              className="w-full h-full rounded-2xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Perfil Dropdown */}
          {showProfile && (
            <div className="absolute top-20 right-0 w-80 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user.avatar}
                  className="w-16 h-16 rounded-2xl ring-4 ring-indigo-500/30 shadow-2xl"
                  alt={user.username}
                />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {user.username}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">{user.id}</p>
                </div>
              </div>

              {isSupervisor && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div 
                    className="group relative p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-2 border-emerald-500/30 backdrop-blur-xl hover:from-emerald-500/40 hover:to-green-500/40 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-emerald-500/25"
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.6)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-green-400/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <h4 className="font-bold text-emerald-400 relative z-10 text-lg">👑 Supervisor</h4>
                  </div>
                  
                  <div 
                    className="group relative p-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-500/30 backdrop-blur-xl hover:from-red-500/40 hover:to-pink-500/40 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-red-500/25"
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.6)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <h4 className="font-bold text-red-400 relative z-10 text-lg">⚙️ Dev</h4>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-white/10">
                <button 
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                  onClick={() => navigate('/profile')}
                >
                  Ver Perfil Completo
                </button>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg"
                  onClick={() => {
                    localStorage.removeItem('discordUser');
                    setUser(null);
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 text-lg tracking-wide"
        >
          🔗 Conectar Discord
        </button>
      )}
    </div>
  );
};

export default AuthHeader;
