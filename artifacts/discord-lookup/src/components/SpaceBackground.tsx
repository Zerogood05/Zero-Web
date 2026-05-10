import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Estrellas
    const stars: { x: number; y: number; size: number; speed: number; brightness: number }[] = [];
    const comets: { x: number; y: number; vx: number; vy: number; length: number; opacity: number }[] = [];
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    // Inicializar estrellas
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random()
      });
    }

    // Inicializar cometas
    for (let i = 0; i < 3; i++) {
      comets.push({
        x: -100,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 + 1,
        vy: Math.random() * 0.5 - 0.25,
        length: 100 + Math.random() * 50,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mover estrellas
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
        gradient.addColorStop(0, `rgba(255,255,255,${star.brightness})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(star.x, star.y, star.size * 2, star.size * 2);
      });

      // Cometas
      comets.forEach((comet, index) => {
        comet.x += comet.vx;
        comet.y += comet.vy;

        if (comet.x > canvas.width + 100) {
          comet.x = -100;
          comet.y = Math.random() * canvas.height;
        }

        const gradient = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 30);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${comet.opacity})`);
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${comet.opacity * 0.7})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(comet.x - 30, comet.y - 10, 60, 20);

        // Cola de cometa
        const tailGradient = ctx.createLinearGradient(comet.x, comet.y, comet.x - comet.length, comet.y);
        tailGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
        tailGradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = tailGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.length, comet.y);
        ctx.stroke();
      });

      // Partículas del mouse
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        const alpha = particle.life / particle.maxLife;
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Generar partículas
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 30,
          maxLife: 30
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, #1e3a8a 0%, #0f172a 70%, #000000 100%)' }}
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </>
  );
};

export default SpaceBackground;
