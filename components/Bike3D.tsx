import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Bike3DProps {
  leanAngle: number;
  steerAngle: number;
  centrifugalForce: number; // For visualization magnitude
}

// Reusable Arrow Component
const VectorArrow = ({ position, direction, color, length, label }: any) => {
  if (length < 0.1) return null;
  
  // Create a quaternion to rotate the arrow to point in 'direction'
  const dir = new THREE.Vector3(direction[0], direction[1], direction[2]).normalize();
  const origin = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(origin, dir);

  return (
    <group position={position}>
      <group quaternion={quaternion}>
        {/* Shaft */}
        <mesh position={[0, length / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, length, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
        {/* Head */}
        <mesh position={[0, length, 0]}>
          <coneGeometry args={[0.2, 0.5, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      </group>
      {/* Label - Billboarded */}
      <Text
        position={[direction[0] * (length + 0.8), direction[1] * (length + 0.8), direction[2] * (length + 0.8)]}
        fontSize={0.6}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
};

const BikeModel = ({ leanAngle, steerAngle, centrifugalForce }: Bike3DProps) => {
  // Convert degrees to radians
  const leanRad = THREE.MathUtils.degToRad(leanAngle);
  const steerRad = THREE.MathUtils.degToRad(steerAngle);

  // Center of Mass height approximation
  const comHeight = 3.5;

  return (
    <group>
      {/* 
        The Pivot Point (Contact Patch).
        We rotate the whole bike around Z axis for Lean.
      */}
      <group rotation={[0, 0, -leanRad]}>
        
        {/* --- CHASSIS --- */}
        {/* Rear Wheel */}
        <group position={[0, 1, -2.5]}>
             {/* Tire: Rotated 90 deg around Y to stand up and face X direction */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[1, 0.15, 16, 32]} />
                <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>
            {/* Rim/Hub: Rotated 90 deg around Z to align axle with X */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            {/* Axle Detail */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
        </group>

        {/* Frame Body */}
        <mesh position={[0, 2, -1]}>
          <boxGeometry args={[0.3, 2, 3]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
        </mesh>
        
        {/* Seat */}
        <mesh position={[0, 3.2, -2]}>
          <boxGeometry args={[0.6, 0.2, 1]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Rider (Simplified Block) */}
        <mesh position={[0, 4.5, -1.5]}>
           <capsuleGeometry args={[0.5, 2, 4, 16]} />
           <meshStandardMaterial color="#60a5fa" transparent opacity={0.7} />
        </mesh>
        {/* Rider Head */}
        <mesh position={[0, 6, -1.5]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#fcd34d" metalness={0.4} />
        </mesh>

        {/* --- STEERING ASSEMBLY --- */}
        {/* Pivot point for steering is at the head tube, approx (0, 3, 1) */}
        <group position={[0, 2.5, 1.2]} rotation={[0, steerRad, 0]}>
            
            {/* Fork */}
            <mesh position={[0, -1.5, 0]} rotation={[0.2, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            
            {/* Front Wheel (Attached to fork) */}
            <group position={[0, -2.5, 0.5]}>
                 <mesh rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[1, 0.15, 16, 32]} />
                    <meshStandardMaterial color="#334155" roughness={0.6} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
            </group>

            {/* Handlebars */}
            <mesh position={[0, 0.5, -0.2]}>
                {/* Cylinder along Y, rotate Z 90 -> along X (Left-Right) */}
                <cylinderGeometry args={[0.08, 0.08, 2.5, 8]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Grips */}
            <mesh position={[1.2, 0.5, -0.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
                <meshStandardMaterial color="#ef4444" /> {/* Red Grip Right */}
            </mesh>
            <mesh position={[-1.2, 0.5, -0.2]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
                <meshStandardMaterial color="#3b82f6" /> {/* Blue Grip Left */}
            </mesh>
            
            {/* Steering Direction Indicator Text */}
            <group position={[0, 1.2, 0]} visible={Math.abs(steerAngle) > 2}>
                <Text 
                    fontSize={0.4} 
                    color="#ffffff" 
                    anchorX="center" 
                    anchorY="bottom"
                    outlineWidth={0.04}
                    outlineColor="#000000"
                >
                    {steerAngle > 0 ? "向右打 ↷" : "↶ 向左打"}
                </Text>
            </group>
        </group>

        {/* --- VECTORS (Attached to bike frame) --- */}
        <group position={[0, comHeight, 0]}>
             {/* Gravity: Vector pointing straight down in WORLD space. 
                 Since this group is rotated by -leanRad (Z), we need to rotate the vector by +leanRad (Z) to stay vertical.
             */}
             <VectorArrow 
                position={[0, 0, 0]} 
                direction={[Math.sin(leanRad), -Math.cos(leanRad), 0]} // Counter-rotate to stay vertical
                length={3.5} 
                color="#ef4444" 
                label="G (重力)" 
             />

             {/* Centrifugal Force */}
             {Math.abs(centrifugalForce) > 1 && (
                <VectorArrow 
                    position={[0, 0, 0]} 
                    // Force opposes the lean direction (horizontally)
                    direction={[-Math.sign(centrifugalForce) * Math.cos(leanRad), -Math.sign(centrifugalForce) * Math.sin(leanRad), 0]}
                    length={Math.abs(centrifugalForce) * 0.08} 
                    color="#22c55e" 
                    label="Fc (离心力)" 
                />
             )}
        </group>

      </group>
    </group>
  );
};

export const BikeScene: React.FC<Bike3DProps> = (props) => {
  return (
    <div className="w-full h-full relative bg-slate-800 rounded-lg overflow-hidden">
        <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={45} />
            
            {/* Brighter Lighting Setup */}
            <ambientLight intensity={1.5} />
            <hemisphereLight skyColor="#ffffff" groundColor="#333333" intensity={1} />
            <directionalLight 
                position={[5, 10, 5]} 
                intensity={2} 
                castShadow 
                shadow-mapSize-width={1024} 
                shadow-mapSize-height={1024}
            />
            <pointLight position={[-5, 5, 0]} intensity={1} color="#60a5fa" />

            <BikeModel {...props} />

            {/* Brighter Grid */}
            <Grid 
                renderOrder={-1} 
                position={[0, 0, 0]} 
                infiniteGrid 
                cellSize={1} 
                sectionSize={5} 
                fadeDistance={40} 
                sectionColor="#475569" 
                cellColor="#334155" 
            />
            
            <OrbitControls 
                enablePan={false} 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2 - 0.1}
                target={[0, 2, 0]}
            />
        </Canvas>
        
        {/* Overlay Instructions */}
        <div className="absolute top-4 left-4 pointer-events-none select-none">
            <div className="bg-slate-900/70 backdrop-blur text-xs text-slate-200 p-2 rounded border border-slate-600 shadow-lg">
                <p>🖱️ 拖拽旋转视角</p>
                <p>🖱️ 滚轮缩放</p>
                <p>👀 观察倾角与车把方向的关系</p>
            </div>
        </div>
    </div>
  );
};