import React from 'react';
import { architectureData } from '../constants/data';
import { 
  Map, 
  Navigation, 
  MessageSquare, 
  Camera, 
  Cpu, 
  Brain, 
  Network, 
  ArrowRight, 
  Layers,
  Snowflake,
  Activity
} from 'lucide-react';
import { ArchitectureItem } from '../types';

const StatusBadge: React.FC<{ status?: 'frozen' | 'training' }> = ({ status }) => {
  if (!status) return null;
  const isFrozen = status === 'frozen';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${
      isFrozen 
        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
        : 'bg-orange-100 text-orange-700 border border-orange-200'
    }`}>
      {isFrozen ? <Snowflake size={12} /> : <Activity size={12} />}
      {isFrozen ? 'Frozen' : 'Training'}
    </span>
  );
};

const IconForTitle = (title: string) => {
  if (title.includes('地图')) return <Map className="text-emerald-500" size={20} />;
  if (title.includes('导航')) return <Navigation className="text-sky-500" size={20} />;
  if (title.includes('规划')) return <MessageSquare className="text-violet-500" size={20} />;
  if (title.includes('图像')) return <Camera className="text-rose-500" size={20} />;
  if (title.includes('Tokenizer')) return <Cpu className="text-slate-500" size={20} />;
  if (title.includes('Vision')) return <Cpu className="text-slate-500" size={20} />;
  if (title.includes('LLM')) return <Brain className="text-indigo-600" size={24} />;
  if (title.includes('Decoder')) return <MessageSquare className="text-amber-500" size={20} />;
  if (title.includes('GRU')) return <Network className="text-emerald-600" size={20} />;
  return <Layers className="text-gray-400" size={20} />;
};

const ArchCard: React.FC<{ item: ArchitectureItem }> = ({ item }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        {IconForTitle(item.title)}
        <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
      </div>
      <StatusBadge status={item.status} />
    </div>
    <div className="mb-2">
      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">核心作用</p>
      <p className="text-sm text-slate-700 leading-relaxed">{item.role}</p>
    </div>
    <div className="bg-slate-50 rounded p-2 border border-slate-100 mt-3">
      <p className="text-xs text-slate-500 font-mono">{item.techStack}</p>
    </div>
  </div>
);

const FlowDiagram = () => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 mb-10 shadow-xl text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Brain size={120} />
      </div>
      <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-700 pb-2">数据流转 (Pipeline Flow)</h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        
        {/* Input Group */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
           <div className="bg-slate-800 p-3 rounded border border-slate-700 text-center text-sm font-medium">图像 (Images)</div>
           <div className="bg-slate-800 p-3 rounded border border-slate-700 text-center text-sm font-medium">地图/导航/任务</div>
        </div>

        <div className="hidden md:flex flex-col gap-8 text-slate-500"><ArrowRight /> <ArrowRight /></div>
        <div className="md:hidden text-slate-500 rotate-90 my-2"><ArrowRight /></div>

        {/* Encoding Group */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
           <div className="bg-blue-900/50 p-3 rounded border border-blue-700 text-blue-100 text-center text-sm font-medium">Vision Encoder</div>
           <div className="bg-indigo-900/50 p-3 rounded border border-indigo-700 text-indigo-100 text-center text-sm font-medium">Tokenizer</div>
        </div>

        <div className="hidden md:flex flex-col gap-1 text-slate-500 items-center">
            <span className="text-xs">Q-Former / Adapter</span>
            <ArrowRight />
        </div>
        <div className="md:hidden text-slate-500 rotate-90 my-2"><ArrowRight /></div>

        {/* Central Brain */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-6 rounded-xl shadow-lg shadow-indigo-500/30 flex flex-col items-center justify-center w-full md:w-48 h-32 text-center border border-indigo-400">
           <Brain className="mb-2 animate-pulse" />
           <span className="font-bold text-lg">LLM Core</span>
           <span className="text-xs opacity-80 mt-1">Reasoning & Understanding</span>
        </div>

        <div className="hidden md:flex text-slate-500"><ArrowRight /></div>
        <div className="md:hidden text-slate-500 rotate-90 my-2"><ArrowRight /></div>

        {/* Output Group */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
           <div className="bg-emerald-900/50 p-3 rounded border border-emerald-700 text-emerald-100 text-center text-sm font-medium">
             <span className="block text-xs opacity-60">GRU</span>
             Waypoints
           </div>
           <div className="bg-emerald-900/50 p-3 rounded border border-emerald-700 text-emerald-100 text-center text-sm font-medium">
             <span className="block text-xs opacity-60">Decoder</span>
             Action / Text
           </div>
        </div>

      </div>
    </div>
  )
}

const KeyIdeas = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
      <h3 className="text-indigo-900 font-bold text-lg mb-4 flex items-center gap-2">
        <Brain size={20} />
        为什么使用 LLM?
      </h3>
      <ul className="space-y-3">
        {[
          '强大的泛化能力 (Generalization)',
          '多模态融合 (Multi-modal Fusion)',
          '可解释性 (Explainability)',
          '少样本学习 (Few-shot Learning)'
        ].map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-indigo-800 font-medium">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-center">
      <h3 className="text-slate-900 font-bold text-lg mb-4">整体逻辑摘要</h3>
      <div className="font-mono text-sm bg-white p-4 rounded-lg border border-slate-200 text-slate-600 overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-rose-500">[图像]</span> → Enc → Adapt → <span className="text-indigo-600 font-bold">LLM</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap mt-2">
          <span className="text-emerald-500">[导航]</span> → Tokenizer → <span className="text-indigo-600 font-bold">LLM</span>
        </div>
        <div className="flex justify-center my-2">↓</div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-indigo-600 font-bold">LLM</span> → Hidden Features
        </div>
        <div className="flex justify-center my-2">↓</div>
        <div className="whitespace-nowrap">
          Output: <span className="bg-emerald-100 text-emerald-800 px-1 rounded">Waypoints</span> & <span className="bg-amber-100 text-amber-800 px-1 rounded">CoT Explanations</span>
        </div>
      </div>
    </div>
  </div>
);

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">系统架构解析</h2>
        <p className="text-slate-500">端到端自动驾驶深度学习模型流转机制</p>
      </div>

      <FlowDiagram />
      <KeyIdeas />

      <div className="space-y-8 relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
        {architectureData.map((section, idx) => (
          <div key={section.id} className="relative md:pl-16">
            <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-white border-4 border-slate-100 items-center justify-center font-bold text-slate-400 z-10">
              {idx + 1}
            </div>
            
            <div className="mb-4 sticky top-20 z-0 bg-white/90 backdrop-blur py-2 border-b md:border-none border-slate-100">
               <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
               {section.description && <p className="text-slate-500 text-sm mt-1">{section.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, itemIdx) => (
                <ArchCard key={itemIdx} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};