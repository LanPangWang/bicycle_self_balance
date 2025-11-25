import React, { useState, useEffect, useRef } from 'react';
import { BikeScene } from './Bike3D';

const ForceAnalysis: React.FC = () => {
  const [mode, setMode] = useState<'wobble' | 'cornering'>('wobble');
  const frameRef = useRef<number>(0);
  
  // Animation State
  const [lean, setLean] = useState(0); // Bike lean angle (phi)
  const [steer, setSteer] = useState(0); // Handlebar angle (delta)
  const [centrifugal, setCentrifugal] = useState(0); // Force magnitude
  const [gravityTorque, setGravityTorque] = useState(0);
  const [centrifugalTorque, setCentrifugalTorque] = useState(0);
  
  // Animation Loop Logic
  useEffect(() => {
    let startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const t = (now - startTime) / 1000; // time in seconds

      if (mode === 'wobble') {
        // Simulate Micro-movements (Straight line balance)
        // 1. Natural instability: A slow sine wave wobble
        const naturalWobble = Math.sin(t * 1.5) * 8; 
        
        // 2. Rider reaction: Steer into the fall (lagged slightly)
        // If falling Right (+Lean), Steer Right (+) to create Left Force (-)
        const reactionSteer = Math.sin(t * 1.5 - 0.2) * 15;
        
        // 3. Resulting Centrifugal Force
        // Steer Right (+) -> Force Left (-)
        const force = -reactionSteer * 2.5;

        setLean(naturalWobble);
        setSteer(reactionSteer);
        setCentrifugal(force);

        // Calculate visual torques (arbitrary units for display)
        setGravityTorque(Math.abs(naturalWobble) * 3);
        setCentrifugalTorque(Math.abs(force) * 0.8);

      } else {
        // Simulate Cornering Equilibrium
        // Steady right turn
        const staticLean = 25;
        setLean(staticLean); 
        setSteer(8); // Small steer angle maintains turn
        setCentrifugal(-55); // Strong centrifugal force opposing lean
        
        // In equilibrium, torques are equal
        setGravityTorque(75); 
        setCentrifugalTorque(75);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [mode]);
  
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 w-full shadow-2xl flex flex-col h-full min-h-[500px]">
      
      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
            <span>🔬</span> 实时受力与力矩分析 (3D)
        </h3>
        <div className="flex bg-slate-800 rounded p-1">
          <button 
            onClick={() => setMode('wobble')}
            className={`px-3 py-1 text-xs rounded transition ${mode === 'wobble' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            动态微动
          </button>
          <button 
            onClick={() => setMode('cornering')}
            className={`px-3 py-1 text-xs rounded transition ${mode === 'cornering' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            稳态平衡
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch h-full flex-1">
          
          {/* 3D Visual Canvas */}
          <div className="relative flex-grow rounded-lg overflow-hidden border border-slate-800 min-h-[350px]">
             <BikeScene 
                leanAngle={lean} 
                steerAngle={steer} 
                centrifugalForce={centrifugal} 
             />
             
             {/* HUD Overlay for Data */}
             <div className="absolute bottom-2 left-2 pointer-events-none">
                 <div className="bg-slate-900/80 p-2 rounded border border-slate-700 text-[10px] font-mono text-slate-400 space-y-1">
                     <div className="flex justify-between gap-4"><span>ϕ (倾角):</span> <span className="text-white">{lean.toFixed(1)}°</span></div>
                     <div className="flex justify-between gap-4"><span>δ (舵角):</span> <span className="text-white">{steer.toFixed(1)}°</span></div>
                 </div>
             </div>
          </div>

          {/* Torque Balance Meter (Keep this 2D abstract view as it is mathematically clearer) */}
          <div className="w-full md:w-24 flex md:flex-col justify-center items-center gap-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
             
             {/* Gravity Torque Bar */}
             <div className="flex-1 w-full flex flex-col items-center justify-end relative group">
                <div 
                    className="w-4 bg-red-500 rounded-t transition-all duration-100 relative shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    style={{ height: `${Math.min(100, gravityTorque)}%`, opacity: 0.9 }}
                >
                </div>
                <span className="text-[10px] text-red-400 mt-1 font-mono text-center">M<sub>g</sub><br/>重力矩</span>
             </div>

             {/* Divider / Equal Sign */}
             <div className="text-slate-600 font-bold text-lg">=</div>

             {/* Centrifugal Torque Bar */}
             <div className="flex-1 w-full flex flex-col items-center justify-end relative group">
                <div 
                    className="w-4 bg-green-500 rounded-t transition-all duration-100 relative shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    style={{ height: `${Math.min(100, centrifugalTorque)}%`, opacity: 0.9 }}
                >
                </div>
                <span className="text-[10px] text-green-400 mt-1 font-mono text-center">M<sub>c</sub><br/>侧向矩</span>
             </div>

          </div>
      </div>
      
      <div className="mt-4 text-xs text-slate-400 text-center bg-slate-800/50 p-2 rounded">
         {mode === 'cornering' 
            ? "稳态平衡：离心力矩 Mc 持续对抗重力矩 Mg。" 
            : "微动状态：通过快速调整 δ (舵角) 产生 Mc，动态修正 ϕ (倾角)。"}
      </div>

    </div>
  );
};

export default ForceAnalysis;