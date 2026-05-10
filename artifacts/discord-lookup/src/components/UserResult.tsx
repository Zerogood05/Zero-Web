// Reemplaza el return principal con esta versión mejorada
return (
  <div className="relative group">
    {/* Efecto de brillo al hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl blur-xl animate-pulse" />
    
    <div className="relative z-10 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-[1.02] group-hover:border-white/40">
      {/* Tu código existente aquí... */}
      
      {/* Palabras con efectos especiales */}
      <div className="mt-6 p-4 bg-black/20 rounded-2xl border border-white/10">
        <h4 className="text-lg font-bold mb-3 inline-block group-hover:text-blue-400 transition-colors duration-300 cursor-pointer hover:scale-105">
          🔍 Datos Completos
        </h4>
        <div className="space-y-2 text-sm">
          <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            ID único:
          </span>
          <code className="ml-2 font-mono">{user.id}</code>
          
          <span className="inline-block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
            Creado:
          </span>
          <span className="ml-2">{new Date(user.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </div>
);
