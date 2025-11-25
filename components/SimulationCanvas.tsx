import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SimulationState } from '../types';

interface SimulationCanvasProps {
  onCrash: (reason: string) => void;
}

const SimulationCanvas: React.FC<SimulationCanvasProps> = ({ onCrash }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<SimulationState>({
    leanAngle: 0,
    steerAngle: 0,
    speed: 20, // Initial meaningful speed
    isRunning: false,
    score: 0
  });

  // Physics constants
  const GRAVITY_FACTOR = 0.08; // How fast it falls
  const RIGHTING_FACTOR = 0.004; // How effective steering is at correcting lean based on speed
  const DAMPING = 0.98; // Air resistance/friction
  const MAX_LEAN = 45; // Crash angle

  // Use refs for animation loop to avoid dependency staleness
  const stateRef = useRef(gameState);
  
  // Update ref when state changes (from UI inputs)
  useEffect(() => {
    stateRef.current = { ...stateRef.current, ...gameState };
  }, [gameState.speed, gameState.isRunning]);

  // Handle Steering Input (Mouse/Touch)
  const handleInput = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!stateRef.current.isRunning) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let clientX;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const x = clientX - rect.left;
    const centerX = rect.width / 2;
    // Map mouse X to steer angle (-30 to 30 degrees)
    const normalized = (x - centerX) / (rect.width / 2);
    const newSteer = Math.max(-30, Math.min(30, normalized * 30));

    // Direct state mutation for animation loop performance, simplified here for React
    stateRef.current.steerAngle = newSteer;
    setGameState(prev => ({ ...prev, steerAngle: newSteer }));
  }, []);

  const resetSimulation = () => {
    const newState = {
      leanAngle: (Math.random() * 10) - 5, // Start with slight random wobble
      steerAngle: 0,
      speed: 20,
      isRunning: true,
      score: 0
    };
    setGameState(newState);
    stateRef.current = newState;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const { leanAngle, steerAngle, speed, isRunning, score } = stateRef.current;

      if (isRunning) {
        // --- PHYSICS UPDATE ---
        // 1. Gravity tries to increase the lean (inverted pendulum)
        // larger lean = faster fall
        let deltaLean = leanAngle * GRAVITY_FACTOR;

        // 2. Steering creates centrifugal force to correct lean
        // Steer Right (+) -> Creates Centrifugal force to Left (-) -> Reduces Right Lean
        // Effect increases with speed^2 (simplified to speed here for playability)
        const correction = steerAngle * speed * RIGHTING_FACTOR;

        let newLean = leanAngle + deltaLean - correction;
        
        // Damping
        newLean *= DAMPING;

        // Random noise (road bumps) requiring micro-adjustments
        if (speed > 0) {
            newLean += (Math.random() - 0.5) * 0.2; 
        }

        stateRef.current.leanAngle = newLean;
        stateRef.current.score = score + 1;
        
        // Sync back to React state occasionally for UI updates (not every frame to avoid lag)
        if (score % 10 === 0) {
            setGameState(prev => ({ ...prev, leanAngle: newLean, score: score + 1 }));
        } else {
            // Just update score ref
             stateRef.current.score = score + 1;
        }

        if (Math.abs(newLean) > MAX_LEAN) {
          stateRef.current.isRunning = false;
          setGameState(prev => ({ ...prev, isRunning: false }));
          onCrash(newLean > 0 ? "向右摔倒" : "向左摔倒");
        }
      }

      // --- DRAWING ---
      const w = canvas.width;
      const h = canvas.height;
      const centerX = w / 2;
      const bottomY = h - 50;

      // Clear
      ctx.fillStyle = '#1e293b'; // Slate 800
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let i = 0; i < h; i += 40) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(w, i);
          ctx.stroke();
      }
      
      // Horizon (Perspective)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h/2);

      // Save context for bike rotation
      ctx.save();
      
      // Translate to contact patch
      ctx.translate(centerX, bottomY);
      
      // Rotate whole bike by lean angle
      const rad = (stateRef.current.leanAngle * Math.PI) / 180;
      ctx.rotate(rad);

      // Draw Bike (Rear View)
      
      // Wheel
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, -30, 10, 30, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Frame
      ctx.strokeStyle = '#3b82f6'; // Blue 500
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(0, -150); // Seat post area
      ctx.stroke();

      // Rider Body (Simplified)
      ctx.fillStyle = '#60a5fa'; // Blue 400
      ctx.beginPath();
      ctx.roundRect(-20, -220, 40, 70, 10);
      ctx.fill();

      // Head
      ctx.fillStyle = '#fcd34d'; // Yellow (Helmet)
      ctx.beginPath();
      ctx.arc(0, -240, 15, 0, 2 * Math.PI);
      ctx.fill();

      // Handlebars (affected by Steer Angle)
      // Visualizing steer angle in rear view is tricky. 
      // We show it by shifting the "hands" left or right relative to center.
      const steerRad = (stateRef.current.steerAngle * Math.PI) / 180;
      const handleWidth = 60;
      const leftHandX = -handleWidth/2 * Math.cos(steerRad);
      const leftHandY = -handleWidth/2 * Math.sin(steerRad); // Slight dip/raise
      const rightHandX = handleWidth/2 * Math.cos(steerRad);
      const rightHandY = handleWidth/2 * Math.sin(steerRad);

      ctx.strokeStyle = '#94a3b8'; // Handlebar silver
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Pivot is at (0, -180) approximately
      ctx.moveTo(leftHandX, -180 + leftHandY);
      ctx.lineTo(rightHandX, -180 + rightHandY);
      ctx.stroke();
      
      ctx.restore();

      // Force Vectors (Overlays)
      
      // Gravity Vector (Always Down)
      ctx.save();
      ctx.translate(centerX, bottomY - 100); // Center of mass approx
      ctx.strokeStyle = '#ef4444'; // Red
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 60); // Down
      ctx.stroke();
      // Label
      if(stateRef.current.isRunning) {
        ctx.fillStyle = '#ef4444';
        ctx.font = '12px Arial';
        ctx.fillText('G (重力)', 10, 50);
      }
      ctx.restore();

      // Centrifugal Force Vector (Horizontal, depends on Steer & Speed)
      // Only meaningful if steering
      if (Math.abs(stateRef.current.steerAngle) > 1 && stateRef.current.isRunning) {
        ctx.save();
        ctx.translate(centerX, bottomY - 100);
        ctx.strokeStyle = '#22c55e'; // Green
        ctx.lineWidth = 3;
        const forceMag = stateRef.current.steerAngle * stateRef.current.speed * 0.05;
        // Steer Right -> Force Left
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-forceMag, 0); 
        ctx.stroke();
        // Arrowhead
        ctx.fillStyle = '#22c55e';
        ctx.fillText('F (离心力)', -forceMag - 40, -10);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Run setup once

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative border-4 border-slate-700 rounded-lg overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-slate-800 cursor-crosshair touch-none"
          onMouseMove={handleInput}
          onTouchMove={handleInput}
          onMouseDown={handleInput}
        />
        {!stateRef.current.isRunning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <button 
                    onClick={resetSimulation}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transform transition active:scale-95 shadow-lg"
                >
                    {stateRef.current.score > 0 ? "再试一次" : "开始模拟平衡"}
                </button>
            </div>
        )}
        <div className="absolute top-2 left-2 text-xs text-slate-400 font-mono">
            <p>速度: {stateRef.current.speed.toFixed(0)} km/h</p>
            <p>倾角: {stateRef.current.leanAngle.toFixed(1)}°</p>
            <p>舵角: {stateRef.current.steerAngle.toFixed(1)}°</p>
        </div>
      </div>

      <div className="w-full max-w-md bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="text-blue-400 font-bold mb-2">操作指南</h3>
        <p className="text-sm text-slate-300 mb-2">
           在画面中<b>左右移动鼠标/手指</b>来控制车把转向。
        </p>
        <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
            <li>目标：保持车身直立 (倾角接近 0°)。</li>
            <li>物理原理：<b>车向右倒，就向右打方向。</b>这会产生向左的离心力把你推回来。</li>
            <li>微动：你需要不断进行微小的左右修正，这就是“动态平衡”。</li>
        </ul>
        <div className="mt-4 flex items-center gap-2">
             <span className="text-xs text-slate-500">速度设定:</span>
             <input 
                type="range" 
                min="5" 
                max="50" 
                value={stateRef.current.speed} 
                onChange={(e) => {
                    const val = Number(e.target.value);
                    setGameState(prev => ({...prev, speed: val}));
                    stateRef.current.speed = val;
                }}
                className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
             />
             <span className="text-xs font-mono w-8">{stateRef.current.speed}</span>
        </div>
      </div>
    </div>
  );
};

export default SimulationCanvas;
