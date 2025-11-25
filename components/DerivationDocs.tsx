
import React from 'react';

const DerivationDocs: React.FC = () => {
  return (
    <div className="space-y-12 mt-12 border-t border-slate-700 pt-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-slate-700 flex-1"></div>
        <h2 className="text-2xl font-bold text-slate-200">📚 核心推导与 LQR 控制设计详解</h2>
        <div className="h-px bg-slate-700 flex-1"></div>
      </div>

      {/* Slide 1: Symbol Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-400">1. 物理符号定义</h3>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Symbol Definition</span>
        </div>
        <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-400 uppercase font-mono text-xs">
                    <tr>
                        <th className="px-4 py-3">符号 (Symbol)</th>
                        <th className="px-4 py-3">物理意义 (Meaning)</th>
                        <th className="px-4 py-3">单位 (Unit)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    <tr>
                        <td className="px-4 py-3 font-mono text-yellow-400 text-lg">I<sub>ϕ</sub></td>
                        <td className="px-4 py-3">车辆绕侧倾轴的转动惯量</td>
                        <td className="px-4 py-3 text-slate-500">-</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono text-yellow-400 text-lg">ϕ̈</td>
                        <td className="px-4 py-3">车辆侧倾角加速度 (二阶导数)</td>
                        <td className="px-4 py-3 font-mono">rad/s²</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono text-red-400 text-lg">M<sub>g</sub></td>
                        <td className="px-4 py-3">重力倾倒力矩 (Gravity Torque)</td>
                        <td className="px-4 py-3 font-mono">N·m</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono text-green-400 text-lg">M<sub>c</sub></td>
                        <td className="px-4 py-3">轮胎侧向力矩 (Centrifugal Torque)</td>
                        <td className="px-4 py-3 font-mono">N·m</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono">m</td>
                        <td className="px-4 py-3">车辆质量</td>
                        <td className="px-4 py-3 font-mono">kg</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono">g</td>
                        <td className="px-4 py-3">重力加速度 (9.8)</td>
                        <td className="px-4 py-3 font-mono">m/s²</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono">h</td>
                        <td className="px-4 py-3">质心到地面的等效高度</td>
                        <td className="px-4 py-3 font-mono">m</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono">V</td>
                        <td className="px-4 py-3">车速 (线速度)</td>
                        <td className="px-4 py-3 font-mono">m/s</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono text-blue-400">δ</td>
                        <td className="px-4 py-3">转向角 (控制量 u)</td>
                        <td className="px-4 py-3 font-mono">rad</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono">b</td>
                        <td className="px-4 py-3">轴距</td>
                        <td className="px-4 py-3 font-mono">m</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-mono">F<sub>y</sub></td>
                        <td className="px-4 py-3">侧向力 (提供向心力)</td>
                        <td className="px-4 py-3 font-mono">N</td>
                    </tr>
                     <tr>
                        <td className="px-4 py-3 font-mono">R</td>
                        <td className="px-4 py-3">转弯半径 (R ≈ b/δ)</td>
                        <td className="px-4 py-3 font-mono">m</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>

      {/* Slide 2: Torque Derivation */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
         <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-400">2. 力矩平衡推导 (转动定律)</h3>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Torque Balance</span>
        </div>
        <div className="p-6 space-y-6">
            <div className="bg-slate-950 p-4 rounded border border-slate-800 text-center">
                <p className="text-slate-400 mb-2 text-sm">刚体转动的核心定律：<b>合外力矩 = 转动惯量 × 角加速度</b></p>
                <div className="text-2xl font-mono text-white">
                    I<sub>ϕ</sub>ϕ̈ = <span className="text-red-400">M<sub>g</sub></span> + <span className="text-green-400">M<sub>c</sub></span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 p-4 rounded border-l-2 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">重力倾倒力矩 M<sub>g</sub></h4>
                    <p className="text-sm text-slate-300 mb-2">重力作用于质心，力臂近似为 <span className="font-mono">hϕ</span> (小角度假设)。</p>
                    <div className="font-mono text-lg bg-slate-900 p-2 rounded text-center">
                        M<sub>g</sub> = mghϕ
                    </div>
                </div>

                <div className="bg-slate-800/30 p-4 rounded border-l-2 border-green-500">
                    <h4 className="font-bold text-green-400 mb-2">轮胎侧向力矩 M<sub>c</sub></h4>
                    <p className="text-sm text-slate-300 mb-2">侧向力提供向心力 <span className="font-mono">F<sub>y</sub> = mV²/R</span>，且 <span className="font-mono">R ≈ b/δ</span>。</p>
                    <div className="font-mono text-lg bg-slate-900 p-2 rounded text-center">
                        M<sub>c</sub> = F<sub>y</sub>·h = mh(V²/b)δ
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
                <p className="text-sm text-slate-400 mb-2">代入转动定律并整理 (假设 <span className="font-mono">I<sub>ϕ</sub> ≈ mh²</span>):</p>
                <div className="flex justify-center items-center gap-4 text-xl md:text-2xl font-mono bg-slate-950/50 p-4 rounded-lg border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <span>ϕ̈ = </span>
                    <div className="flex flex-col items-center leading-none">
                        <span className="border-b border-slate-500 pb-1 mb-1">g</span>
                        <span>h</span>
                    </div>
                    <span>ϕ + </span>
                    <div className="flex flex-col items-center leading-none">
                        <span className="border-b border-slate-500 pb-1 mb-1">V²</span>
                        <span>hb</span>
                    </div>
                    <span>δ</span>
                </div>
                <p className="text-center text-xs text-slate-500 mt-2">这就是我们用于控制的二阶线性微分方程。</p>
            </div>
        </div>
      </div>

      {/* Slide 3: State Space */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
         <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-400">3. 状态方程建模 (State Space)</h3>
            <span className="text-xs text-slate-500 uppercase tracking-wider">ẋ = Ax + Bu</span>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-white font-bold mb-4">定义状态变量</h4>
                <ul className="space-y-4">
                    <li className="flex items-center gap-4 bg-slate-800 p-3 rounded">
                        <span className="font-mono text-yellow-400 text-lg">x₁ = ϕ</span>
                        <span className="text-slate-400 text-sm">侧倾角 (Roll Angle)</span>
                    </li>
                    <li className="flex items-center gap-4 bg-slate-800 p-3 rounded">
                        <span className="font-mono text-yellow-400 text-lg">x₂ = ϕ̇</span>
                        <span className="text-slate-400 text-sm">侧倾角速度 (Roll Rate)</span>
                    </li>
                </ul>
                <div className="mt-6">
                    <h4 className="text-white font-bold mb-2">求导关系</h4>
                    <div className="font-mono text-slate-300 space-y-2 bg-slate-950 p-3 rounded border border-slate-800">
                        <p>ẋ₁ = ϕ̇ = x₂</p>
                        <p>ẋ₂ = ϕ̈ = (g/h)x₁ + (V²/hb)u</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <h4 className="text-white font-bold mb-4 text-center">矩阵形式</h4>
                <div className="bg-slate-950 p-6 rounded-lg border border-slate-700 flex items-center justify-center font-mono text-lg overflow-x-auto">
                    <div className="flex items-center gap-2">
                        <span>ẋ = </span>
                        {/* Matrix A */}
                        <div className="flex relative mx-2">
                            <div className="border-l-2 border-t-2 border-b-2 border-slate-500 w-3 rounded-l"></div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-center py-1">
                                <span>0</span> <span>1</span>
                                <span className="text-sm pt-1">g/h</span> <span>0</span>
                            </div>
                            <div className="border-r-2 border-t-2 border-b-2 border-slate-500 w-3 rounded-r"></div>
                        </div>
                        {/* State x */}
                        <div className="flex relative mx-1">
                            <div className="border-l-2 border-t-2 border-b-2 border-slate-500 w-2 rounded-l"></div>
                            <div className="flex flex-col text-center py-1">
                                <span>x₁</span>
                                <span>x₂</span>
                            </div>
                            <div className="border-r-2 border-t-2 border-b-2 border-slate-500 w-2 rounded-r"></div>
                        </div>
                        <span>+</span>
                        {/* Matrix B */}
                        <div className="flex relative mx-2">
                            <div className="border-l-2 border-t-2 border-b-2 border-slate-500 w-3 rounded-l"></div>
                            <div className="flex flex-col text-center py-1">
                                <span>0</span>
                                <span className="text-sm pt-1">V²/hb</span>
                            </div>
                            <div className="border-r-2 border-t-2 border-b-2 border-slate-500 w-3 rounded-r"></div>
                        </div>
                        <span>u</span>
                    </div>
                </div>
                <div className="flex justify-center gap-12 mt-4 text-sm font-mono text-slate-500">
                    <span>A 矩阵</span>
                    <span>B 矩阵</span>
                </div>
            </div>
        </div>
      </div>

      {/* Slide 4: LQR Logic */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
         <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-blue-400">4. LQR 最优控制逻辑</h3>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Linear Quadratic Regulator</span>
        </div>
        <div className="p-6">
            <p className="text-slate-300 mb-6">目标：找到最优控制律 <span className="font-mono text-blue-400">u = -Kx</span>，使得以下代价函数最小化：</p>
            
            <div className="flex justify-center mb-8">
                <div className="bg-slate-950 px-8 py-4 rounded-lg border border-slate-800 shadow-inner">
                    <span className="font-mono text-xl text-white">
                        J = ∫ (xᵀQx + uᵀRu) dt
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                    <h4 className="font-bold text-slate-200">参数含义：</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li>• <span className="font-bold text-white">Q (State Cost)</span>: 惩罚状态偏差 (希望车身多直？)</li>
                        <li>• <span className="font-bold text-white">R (Control Cost)</span>: 惩罚控制量大小 (希望方向盘多省力？)</li>
                    </ul>
                </div>
                <div className="space-y-4">
                     <h4 className="font-bold text-slate-200">求解过程 (Riccati 方程)：</h4>
                     <div className="font-mono text-slate-400 bg-slate-800 p-3 rounded">
                        AᵀP + PA - PBR⁻¹BᵀP + Q = 0
                     </div>
                     <p className="text-slate-400">
                        解出 P 矩阵后，得到反馈增益：
                        <span className="block mt-1 font-mono text-blue-400">K = R⁻¹BᵀP</span>
                     </p>
                </div>
            </div>
            
            <div className="mt-8 bg-blue-900/20 border border-blue-900/50 p-4 rounded text-center">
                <p className="text-blue-200 text-sm">
                    最终控制律：我们只需要测量 <b>倾角(ϕ)</b> 和 <b>倾角速度(ϕ̇)</b>，乘以计算出的系数 <b>K</b>，就能得到当前需要的 <b>转向角(δ)</b>。
                </p>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default DerivationDocs;
