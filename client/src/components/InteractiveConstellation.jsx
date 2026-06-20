import React, { useEffect, useRef } from 'react';

export default function InteractiveConstellation({ transparent = false }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse movement
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // 3D coordinates
        this.z = Math.random() * 400 + 100; // depth
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.vz = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? 'rgba(79, 70, 229, 0.4)' : 'rgba(6, 182, 212, 0.4)';
      }

      update(mx, my) {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Mouse gravity pull (subtle)
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          this.x += (dx / dist) * 0.15;
          this.y += (dy / dist) * 0.15;
        }

        // Loop boundaries in 3D
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (this.z < 50 || this.z > 500) this.vz *= -1;
      }

      draw() {
        // 3D projection
        const scale = 200 / this.z;
        const projX = (this.x - width / 2) * scale + width / 2;
        const projY = (this.y - height / 2) * scale + height / 2;
        const projR = this.radius * scale;

        if (projX < 0 || projX > width || projY < 0 || projY > height) return;

        ctx.beginPath();
        ctx.arc(projX, projY, projR, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        return { x: projX, y: projY, z: this.z };
      }
    }

    let particles = [];
    const initParticles = () => {
      const density = Math.floor((width * height) / 11000);
      particles = Array.from({ length: Math.min(density, 120) }, () => new Particle());
    };

    initParticles();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      if (!transparent) {
        // Draw smooth radial void background
        const grad = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, Math.max(width, height));
        grad.addColorStop(0, '#f8fafc');
        grad.addColorStop(1, '#f1f5f9');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const projected = [];

      // Update and draw particles
      particles.forEach((p) => {
        p.update(mouse.x, mouse.y);
        const proj = p.draw();
        if (proj) projected.push(proj);
      });

      // Draw connecting lines with alpha based on distance
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-canvas-container">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />
      <div className="grid-mesh" />
    </div>
  );
}
