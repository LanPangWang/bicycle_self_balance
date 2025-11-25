
import React, { useState } from 'react';
import ChatTutor from './components/ChatTutor';
import ForceAnalysis from './components/ForceAnalysis';
import DerivationDocs from './components/DerivationDocs';
import { FreeBodyDiagram, KinematicDiagram, ControlLoopDiagram } from './components/PhysicsDiagrams';
import { AppMode } from './types';
import AutonomousDrivingInsights from './components/AutonomousDrivingInsights';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppMode>(AppMode.THEORY);

  const TabButton = ({ mode, icon, label }: { mode: AppMode; icon: string; label: string }) => (
    <button
      onClick={() => setActiveTab(mode)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        activeTab === mode
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-4xl w-full mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
          两轮平衡：动力学与控制原理
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          基于二阶微分方程的自平衡建模与微动控制分析。
        </p>
      </header>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 mb-8">
        <TabButton mode={AppMode.THEORY} icon="⚡" label="动力学建模" />
        <TabButton mode={AppMode.TUTOR} icon="🤖" label="AI 算法导师" />
      </nav>

      {/* Content Area */}
      <main className="w-full max-w-5xl animate-fade-in pb-20">
        
        {/* THEORY MODE */}
        {activeTab === AppMode.THEORY && (
          <div className="space-y-8">
            
            {/* 1. Main Visualizer Section */}
            <div className="grid lg:grid-cols-5 gap-8">
                {/* Left: Interactive Visualizer (Takes up more space) */}
                <div className="lg:col-span-3">
                    <ForceAnalysis />
                </div>

                {/* Right: Contextual Explanation */}
                <div className="lg:col-span-2 space-y-4 flex flex-col">
                    {/* SVG Free Body Diagram */}
                    <div className="h-48 w-full">
                        <FreeBodyDiagram />
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg flex-grow">
                        <h2 className="text-xl font-bold text-yellow-400 mb-4">⚖️ 力矩平衡方程</h2>
                        <div className="font-mono text-xl text-center mb-4 bg-slate-950 p-3 rounded border border-slate-700">
                           I<sub>ϕ</sub><span className="text-yellow-400">ϕ̈</span> = <span className="text-red-400">M<sub>g</sub></span> + <span className="text-green-400">M<sub>c</sub></span>
                        </div>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex gap-2">
                                <span className="font-mono font-bold text-yellow-400">ϕ̈</span>
                                <span><b>角加速度</b>：平衡状态下应趋近于 0。</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-mono font-bold text-red-400">M<sub>g</sub></span>
                                <span><b>重力矩</b>：正比于倾角 ϕ，使车倒下。</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-mono font-bold text-green-400">M<sub>c</sub></span>
                                <span><b>侧向力矩</b>：由转向 δ 产生的离心力提供。</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 2. Formula Breakdown */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-700 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📐</span> 线性化状态方程 (LQR模型)
              </h2>
              
              <div className="space-y-8">
                
                {/* Equation + Control Loop Block */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="bg-slate-950/50 p-6 rounded-lg border-l-4 border-blue-500 text-center">
                        <h3 className="text-slate-400 text-sm mb-4 uppercase tracking-widest">二阶动力学方程</h3>
                        
                        <div className="flex flex-wrap justify-center items-center gap-4 text-2xl md:text-3xl font-mono text-white mb-6">
                            <div>
                                <span className="text-yellow-400">ϕ̈</span>
                                <span> = </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="border-b border-slate-500 px-2">g</span>
                                <span>h</span>
                            </div>
                            <span className="text-red-400">ϕ</span>
                            <span> + </span>
                            <div className="flex flex-col items-center">
                                <span className="border-b border-slate-500 px-2">V²</span>
                                <span>hb</span>
                            </div>
                            <span className="text-green-400">δ</span>
                        </div>
                        <p className="text-slate-400 text-sm text-left">
                            该方程是 LQR 控制器设计的核心模型（Plant）。它表明：为了抵消正的倾角 <b>ϕ</b>，我们必须施加正的转向 <b>δ</b>，且速度 <b>V</b> 越高，控制效果越明显。
                        </p>
                    </div>

                    {/* Control Loop SVG */}
                    <div className="h-40">
                        <ControlLoopDiagram />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Kinematics SVG Diagram */}
                  <div className="relative flex flex-col gap-4">
                    <div className="h-48 w-full">
                        <KinematicDiagram />
                    </div>
                    <div>
                        <h3 className="text-green-400 font-bold text-lg mb-2">运动学约束</h3>
                        <p className="text-sm text-slate-400">
                            从俯视图可以看到，转向角 <b>δ</b> 决定了转弯半径 <b>R</b>，进而决定了离心力的大小。这是“反打方向”产生恢复力矩的物理来源。
                        </p>
                    </div>
                  </div>

                  {/* Text Variables */}
                  <div className="relative pl-6 border-l border-slate-700">
                    <h3 className="text-slate-200 font-bold text-lg mb-3">参数定义</h3>
                    <ul className="grid grid-cols-1 gap-3 text-sm text-slate-400 font-mono">
                        <li className="flex justify-between border-b border-slate-800 pb-1">
                            <span><span className="text-red-400">ϕ</span> (Roll Angle)</span>
                            <span>车身侧倾角</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-1">
                            <span><span className="text-green-400">δ</span> (Steer Angle)</span>
                            <span>前轮转向角 (控制量 u)</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-1">
                            <span>h (Height)</span>
                            <span>质心有效高度</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-1">
                            <span>b (Wheelbase)</span>
                            <span>车辆轴距</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-800 pb-1">
                            <span>V (Velocity)</span>
                            <span>车辆行驶速度</span>
                        </li>
                    </ul>
                    <div className="mt-4 bg-blue-900/20 p-3 rounded border border-blue-900/50 text-xs text-blue-200">
                        提示：当速度 V=0 时，等式右边第二项为 0。这意味着静止时无法通过转向来平衡（必须依靠速度产生离心力）。
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Detailed Derivation Docs (User Requested Images) */}
            <DerivationDocs />
            
          </div>
        )}

        {/* TUTOR MODE */}
        {activeTab === AppMode.TUTOR && (
          <div className="flex justify-center h-[600px]">
             <ChatTutor />
          </div>
        )}
        <AutonomousDrivingInsights />
      </main>

    </div>
  );
};

export default App;
