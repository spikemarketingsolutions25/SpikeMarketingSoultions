import React from 'react';
import { motion } from 'framer-motion';

export default function ParticleBackground() {
  return (
    <div className="bg-canvas-container">
      {/* Interactive background mesh grid */}
      <div className="grid-mesh" />

      {/* Floating Light Glow Blob 1 (Indigo) */}
      <motion.div
        className="glow-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.32) 0%, transparent 70%)',
          top: '-10%',
          left: '10%',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Light Glow Blob 2 (Cyan/Teal) */}
      <motion.div
        className="glow-blob"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
          bottom: '10%',
          right: '5%',
        }}
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating Light Glow Blob 3 (Violet) */}
      <motion.div
        className="glow-blob"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, transparent 70%)',
          top: '40%',
          left: '-5%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, 30, 50, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Grid Tech Dots (Static/Decorative) */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-muted) 1px, transparent 0)',
             backgroundSize: '30px 30px'
           }} 
      />
    </div>
  );
}
