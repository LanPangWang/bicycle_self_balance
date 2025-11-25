import React from 'react';

// 1. 倒立摆受力分析图 (Free Body Diagram)
export const FreeBodyDiagram = () => (
  <svg viewBox="0 0 300 220" className="w-full h-full bg-slate-900/50 rounded-lg border border-slate-700">
    <defs>
      <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#f87171" />
      </marker>
      <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#4ade80" />
      </marker>
    </defs>

    {/* 地面 */}
    <line x1="40" y1="200" x2="260" y2="200" stroke="#475569" strokeWidth="2" />
    <text x="265" y="205" fill="#475569" fontSize="10">Ground</text>

    {/* 垂直参考线 */}
    <line x1="150" y1="200" x2="150" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="4" />

    {/* 倒立摆 (车身) */}
    <g transform="rotate(20, 150, 200)">
       {/* 杆 */}
       <line x1="150" y1="200" x2="150" y2="60" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
       {/* 质心 */}
       <circle cx="150" cy="60" r="10" fill="#60a5fa" stroke="#1e293b" strokeWidth="2" />
       
       {/* 高度 h 标注 */}
       <line x1="160" y1="200" x2="160" y2="60" stroke="#94a3b8" strokeWidth="1" />
       <text x="165" y="130" fill="#94a3b8" fontSize="14" style={{transform: "rotate(-90deg)", transformOrigin: "165px 130px"}}>h (质心高度)</text>
    </g>

    {/* 角度 Phi */}
    <path d="M150,160 A40,40 0 0,1 163,163" stroke="#facc15" strokeWidth="2" fill="none" />
    <text x="155" y="150" fill="#facc15" fontSize="16" fontWeight="bold">ϕ</text>

    {/* 质心处的受力 (需要计算旋转后的位置) 
        Center (150, 200). Length 140. Angle 20deg.
        x = 150 + 140*sin(20) = 150 + 47.8 = 197.8
        y = 200 - 140*cos(20) = 200 - 131.5 = 68.5
    */}
    <g transform="translate(198, 68)">
        {/* 重力 Mg */}
        <line x1="0" y1="0" x2="0" y2="60" stroke="#f87171" strokeWidth="3" markerEnd="url(#arrow-red)" />
        <text x="10" y="50" fill="#f87171" fontSize="14" fontWeight="bold">Mg (重力矩)</text>
        <text x="10" y="65" fill="#f87171" fontSize="10">产生倾覆力矩</text>
        
        {/* 离心力 Mc (纠正力) - 水平向左 */}
        <line x1="0" y1="0" x2="-70" y2="0" stroke="#4ade80" strokeWidth="3" markerEnd="url(#arrow-green)" />
        <text x="-80" y="-10" fill="#4ade80" fontSize="14" fontWeight="bold">Mc (离心力矩)</text>
        <text x="-90" y="-25" fill="#4ade80" fontSize="10">由转向 δ 产生</text>
    </g>

    <text x="20" y="30" fill="#fff" fontSize="12" fontWeight="bold">受力分析图 (FBD)</text>
  </svg>
);

// 2. 运动学俯视图 (Kinematic Diagram)
export const KinematicDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full bg-slate-900/50 rounded-lg border border-slate-700">
     <defs>
      <marker id="k-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="#e2e8f0" />
      </marker>
    </defs>

    <text x="20" y="30" fill="#fff" fontSize="12" fontWeight="bold">转向运动学模型 (Top View)</text>

    {/* 旋转中心 */}
    <circle cx="50" cy="180" r="4" fill="#475569" />
    <text x="20" y="195" fill="#64748b" fontSize="10">ICR (瞬时旋转中心)</text>

    {/* 转弯半径 R */}
    <line x1="50" y1="180" x2="250" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="6" />
    <text x="110" y="140" fill="#94a3b8" fontSize="14">R ≈ b/δ</text>

    {/* 车辆模型 (简化) */}
    <g transform="translate(200, 50) rotate(15)">
        {/* 车架轴线 */}
        <line x1="0" y1="0" x2="120" y2="0" stroke="#3b82f6" strokeWidth="6" />
        <text x="50" y="-10" fill="#3b82f6" fontSize="14" fontWeight="bold">b (轴距)</text>

        {/* 后轮 */}
        <rect x="-15" y="-4" width="30" height="8" fill="#64748b" rx="2" />
        
        {/* 前轮转轴 */}
        <circle cx="120" cy="0" r="4" fill="#e2e8f0" />

        {/* 前轮 (偏转 δ) */}
        <g transform="translate(120, 0) rotate(25)">
            <rect x="-15" y="-4" width="30" height="8" fill="#facc15" rx="2" />
            <line x1="-30" y1="0" x2="40" y2="0" stroke="#facc15" strokeWidth="1" strokeDasharray="3" />
        </g>
        
        {/* δ 角度标注 */}
        <path d="M150,0 A30,30 0 0,0 145,-12" fill="none" stroke="#facc15" strokeWidth="2" />
        <text x="155" y="-5" fill="#facc15" fontSize="16" fontWeight="bold">δ</text>
    </g>
    
    {/* 速度矢量 V */}
    <line x1="200" y1="50" x2="280" y2="20" stroke="#fff" strokeWidth="2" markerEnd="url(#k-arrow)" />
    <text x="250" y="30" fill="#fff" fontSize="14" fontWeight="bold">V</text>

    {/* 离心力公式标注 */}
    <rect x="250" y="130" width="130" height="50" rx="4" fill="#1e293b" stroke="#334155" />
    <text x="260" y="150" fill="#4ade80" fontSize="12">侧向力 (Lateral Force)</text>
    <text x="260" y="170" fill="#fff" fontSize="14" fontFamily="monospace">Fy = m(V²/b)δ</text>

  </svg>
);

// 3. LQR 控制框图
export const ControlLoopDiagram = () => (
  <svg viewBox="0 0 500 120" className="w-full h-full bg-slate-900/50 rounded-lg border border-slate-700">
      <defs>
        <marker id="c-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#64748b" />
        </marker>
      </defs>

      {/* Controller Block */}
      <rect x="180" y="70" width="80" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
      <text x="220" y="95" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">LQR Gain</text>
      <text x="220" y="125" textAnchor="middle" fill="#3b82f6" fontSize="10">u = -Kx</text>

      {/* Plant Block */}
      <rect x="180" y="10" width="80" height="40" rx="4" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
      <text x="220" y="35" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Bike Physics</text>

      {/* Lines */}
      {/* State Feedback x -> K */}
      <line x1="260" y1="30" x2="400" y2="30" stroke="#64748b" strokeWidth="2" />
      <line x1="400" y1="30" x2="400" y2="90" stroke="#64748b" strokeWidth="2" />
      <line x1="400" y1="90" x2="260" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#c-arrow)" />
      
      {/* Control Input u -> Plant */}
      <line x1="180" y1="90" x2="100" y2="90" stroke="#facc15" strokeWidth="2" />
      <line x1="100" y1="90" x2="100" y2="30" stroke="#facc15" strokeWidth="2" />
      <line x1="100" y1="30" x2="180" y2="30" stroke="#facc15" strokeWidth="2" markerEnd="url(#c-arrow)" />

      {/* Labels */}
      <text x="350" y="25" fill="#fff" fontSize="12">State x (ϕ, ϕ̇)</text>
      <text x="120" y="85" fill="#facc15" fontSize="12">Input u (δ)</text>

  </svg>
);