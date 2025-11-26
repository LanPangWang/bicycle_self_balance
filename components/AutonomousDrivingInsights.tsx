import React, { useState } from 'react';
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
  Activity,
  CheckCircle2, 
  Truck, 
  TestTube2, 
  MapPin, 
  Calendar, 
  Zap,
  Car,
  LucideIcon,
  ChevronRight,
  Info
} from 'lucide-react';
import OpenSourceView from './OpenSource';

// --- Types ---

interface ArchitectureItem {
  title: string;
  role: string;
  techStack: string;
  status?: 'frozen' | 'training'; 
}

interface LayerSection {
  id: string;
  title: string;
  description?: string;
  items: ArchitectureItem[];
}

interface ProductItem {
  name: string;
  region: string;
  status: 'production' | 'commercial' | 'rnd';
  landingDate?: string;
  features: string[];
  performance?: string[];
  progress?: string;
  models?: string;
  icon?: LucideIcon;
}

interface Category {
  title: string;
  items: ProductItem[];
}

// --- Data ---

const architectureData: LayerSection[] = [
  {
    id: 'input',
    title: '一、输入层 (Inputs)',
    items: [
      {
        title: '地图信息',
        role: '提供道路拓扑结构、车道线、交通标志等先验知识',
        techStack: 'HD Map（高精地图）、OpenDrive/Osmosis 格式'
      },
      {
        title: '导航信息',
        role: '指示目标路径（如目的地、航点）',
        techStack: '路径规划算法（A*、Dijkstra）、GPS + 导航指令'
      },
      {
        title: '行驶规划问题',
        role: '当前驾驶任务描述（例如：“左转进入主路”）',
        techStack: 'NLP 文本表示、自然语言指令'
      },
      {
        title: '6个视角图像',
        role: '实时环境感知（前方、侧方、后方视野）',
        techStack: '多相机系统（如特斯拉8摄像头）、RGB图像'
      }
    ]
  },
  {
    id: 'features',
    title: '二、特征提取层 (Features)',
    items: [
      {
        title: 'Tokenizer',
        role: '将文本类输入转化为 token 序列。',
        techStack: '分词器（Tokenizer）如 BPE、WordPiece',
        status: 'frozen'
      },
      {
        title: 'Vision Encoder',
        role: '把6个视角图像编码成视觉特征向量。',
        techStack: 'CNN（如 ResNet、EfficientNet）、Transformer（如 ViT, Swin Transformer）',
        status: 'frozen'
      },
      {
        title: 'Q-Former',
        role: '桥接视觉编码器和 LLM 的“查询转换器”。',
        techStack: '小型 Transformer 模块',
        status: 'training'
      },
      {
        title: 'Adapter',
        role: '轻量级适配器，连接视觉特征与 LLM 输入空间。',
        techStack: '低秩适配（LoRA）、Adapter Modules',
        status: 'training'
      }
    ]
  },
  {
    id: 'llm',
    title: '三、中央决策层 (LLM)',
    description: '接收来自视觉、地图、导航的融合特征，进行逻辑推理、任务理解与行为生成。',
    items: [
      {
        title: 'LLM 模型',
        role: '逻辑推理、任务理解与行为生成',
        techStack: '大语言模型（LLM）如 LLaMA、Qwen、GPT 系列',
        status: 'frozen'
      }
    ]
  },
  {
    id: 'output',
    title: '四、输出层 (Output)',
    items: [
      {
        title: 'GRU',
        role: '处理时间序列信息，预测未来轨迹点（Waypoints）',
        techStack: '循环神经网络（RNN / GRU / LSTM）',
        status: 'training'
      },
      {
        title: 'Decoder Layer',
        role: '将 LLM 的中间表示解码为自然语言回答或操作指令',
        techStack: '自回归解码器（如 GPT 的 decoder-only 架构）',
        status: 'training'
      }
    ]
  }
];

const industryData: Category[] = [
  {
    title: '✅ 已量产落地的产品',
    items: [
      {
        name: '小鹏汽车 - XNGP系统',
        region: '中国',
        status: 'production',
        landingDate: '2024年5月20日AI天玑系统',
        features: [
          '国内首个量产上车的端到端大模型系统',
          '核心组件：XNet(感知) + XPlanner(规划) + XBrain(模型)',
          'XBrain具备宏观逻辑推理能力，能理解路牌文字'
        ],
        performance: [
          '高速领航：1000公里接管一次',
          '城区接管：约200公里一次',
          '目标：2024 Q3 实现"全国都能开"'
        ],
        models: 'G9、G6、P7i、X9等'
      },
      {
        name: '特斯拉 - FSD V12',
        region: '美国',
        status: 'production',
        landingDate: '北美大规模测试中',
        features: [
          '真正的端到端架构，感知到决策全流程一个模型',
          '纯视觉方案，大幅减少人工规则',
          'C++代码仅2000行 (V11版本有30万行)'
        ],
        performance: [
          '无关键接管行驶里程：160公里 → 622公里',
          '更类人的驾驶行为和流畅体验'
        ],
        progress: '正在推进FSD入华，尚未正式落地'
      }
    ]
  },
  {
    title: '🚚 商用车/物流领域',
    items: [
      {
        name: '千挂科技 (Autra)',
        region: '中国',
        status: 'commercial',
        features: [
          '自研端到端算法框架 AutraFlow',
          '完全learning化的自动驾驶系统，embedding连接',
          '摒弃了传统人工设计的抽象概念(如边界框)'
        ],
        landingDate: '2023年底进入公开道路常态化测试阶段',
        performance: [
          '中国首个完成端到端智能驾驶大模型公开道路闭环测试',
          '服务顺丰、福佑等，单均运输里程超1000公里'
        ]
      }
    ]
  },
  {
    title: '🔬 研发/测试阶段',
    items: [
      {
        name: '理想汽车',
        region: '中国',
        status: 'rnd',
        features: ['公开表示2024年将实现端到端上车'],
        progress: '尚未正式推出'
      },
      {
        name: '比亚迪',
        region: '中国',
        status: 'rnd',
        features: ['投入4000人进行智能驾驶研发', '端到端技术是重要方向'],
        progress: '尚未明确量产时间表'
      },
      {
        name: '清华李克强团队',
        region: '中国',
        status: 'rnd',
        features: [
            '2024年4月完成国内首套全栈式端到端自动驾驶系统开放道路测试',
            '依托"车路云一体化智能网联驾驶架构"'
        ],
        progress: '尚处于研究测试阶段，未商业化落地'
      }
    ]
  }
];

// --- Sub-Components (Styled for Dark Mode) ---

const StatusBadgeArch: React.FC<{ status?: 'frozen' | 'training' }> = ({ status }) => {
  if (!status) return null;
  const isFrozen = status === 'frozen';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
      isFrozen 
        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    }`}>
      {isFrozen ? <Snowflake size={10} /> : <Activity size={10} />}
      {isFrozen ? 'Frozen' : 'Training'}
    </span>
  );
};

const StatusBadgeIndustry: React.FC<{ status: ProductItem['status'] }> = ({ status }) => {
  switch (status) {
    case 'production':
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded text-xs font-bold border border-emerald-500/20">
          <CheckCircle2 size={12} />
          已量产
        </span>
      );
    case 'commercial':
      return (
        <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded text-xs font-bold border border-blue-500/20">
          <Truck size={12} />
          商业化
        </span>
      );
    case 'rnd':
      return (
        <span className="inline-flex items-center gap-1 bg-violet-500/10 text-violet-400 px-2.5 py-1 rounded text-xs font-bold border border-violet-500/20">
          <TestTube2 size={12} />
          研发中
        </span>
      );
    default:
      return null;
  }
};

const IconForTitle = (title: string) => {
  if (title.includes('地图')) return <Map className="text-emerald-400" size={20} />;
  if (title.includes('导航')) return <Navigation className="text-sky-400" size={20} />;
  if (title.includes('规划')) return <MessageSquare className="text-violet-400" size={20} />;
  if (title.includes('图像')) return <Camera className="text-rose-400" size={20} />;
  if (title.includes('Tokenizer')) return <Cpu className="text-slate-400" size={20} />;
  if (title.includes('Vision')) return <Cpu className="text-slate-400" size={20} />;
  if (title.includes('LLM')) return <Brain className="text-indigo-400" size={24} />;
  if (title.includes('Decoder')) return <MessageSquare className="text-amber-400" size={20} />;
  if (title.includes('GRU')) return <Network className="text-emerald-400" size={20} />;
  return <Layers className="text-slate-400" size={20} />;
};

const CardWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-[#151925] rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors ${className}`}>
    {children}
  </div>
);

const ArchCard: React.FC<{ item: ArchitectureItem }> = ({ item }) => (
  <CardWrapper className="p-5">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-800/50 rounded-lg">
          {IconForTitle(item.title)}
        </div>
        <h4 className="font-bold text-slate-200 text-lg">{item.title}</h4>
      </div>
      <StatusBadgeArch status={item.status} />
    </div>
    <div className="mb-4">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Function</p>
      <p className="text-sm text-slate-400 leading-relaxed">{item.role}</p>
    </div>
    <div className="bg-[#0b0c15] rounded px-3 py-2 border border-slate-800">
      <p className="text-xs text-slate-500 font-mono flex items-center gap-2">
         <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
         {item.techStack}
      </p>
    </div>
  </CardWrapper>
);

const ProductCard: React.FC<{ item: ProductItem }> = ({ item }) => {
  return (
    <CardWrapper className="overflow-hidden group">
      <div className="p-5 border-b border-slate-800/50 bg-slate-800/20">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-500">
              <MapPin size={12} />
              <span>{item.region}</span>
            </div>
          </div>
          <StatusBadgeIndustry status={item.status} />
        </div>
        
        {item.landingDate && (
           <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
             <Calendar size={12} className="text-slate-500" />
             {item.landingDate}
           </div>
        )}
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
             <Zap size={12} className="text-amber-500" /> Technical Features
          </h4>
          <ul className="space-y-2.5">
            {item.features.map((feat, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-3">
                <span className="mt-2 w-1 h-1 bg-blue-500 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {item.performance && (
          <div>
             <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Activity size={12} className="text-emerald-500" /> Performance
             </h4>
             <ul className="space-y-2">
              {item.performance.map((perf, idx) => (
                <li key={idx} className="text-sm text-slate-400 bg-emerald-950/20 px-3 py-2 rounded border border-emerald-900/30 flex items-center gap-2">
                   <ChevronRight size={12} className="text-emerald-600" />
                  {perf}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.progress && (
           <div className="text-xs text-slate-500 pt-3 border-t border-slate-800/50 flex items-center gap-2">
              <Info size={12} />
              {item.progress}
           </div>
        )}
      </div>
    </CardWrapper>
  );
};

const FlowDiagram = () => {
  return (
    <div className="bg-[#0f111a] rounded-xl border border-slate-800 p-6 md:p-8 mb-10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4 relative z-10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="text-blue-500" size={18} />
            System Pipeline
          </h3>
          <span className="text-xs font-mono text-slate-500">E2E_ARCH_V1.0</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between relative z-10">
        
        {/* Input Group */}
        <div className="space-y-3 w-full md:w-auto">
           <div className="bg-slate-800/80 p-3 rounded border-l-2 border-rose-500 text-center text-xs font-bold text-slate-300 w-full md:w-32">
             IMAGES (6x)
           </div>
           <div className="bg-slate-800/80 p-3 rounded border-l-2 border-emerald-500 text-center text-xs font-bold text-slate-300 w-full md:w-32">
             MAP & NAV
           </div>
        </div>

        <div className="hidden md:flex flex-col gap-8 text-slate-700"><ArrowRight size={16} /> <ArrowRight size={16} /></div>
        <div className="md:hidden text-slate-700 rotate-90"><ArrowRight size={16} /></div>

        {/* Encoding Group */}
        <div className="space-y-3 w-full md:w-auto">
           <div className="bg-[#1a2035] p-3 rounded border border-blue-900/50 text-blue-200 text-center text-xs font-mono shadow-[0_0_15px_rgba(30,58,138,0.2)] w-full md:w-36">
             Vision Encoder
           </div>
           <div className="bg-[#1a2035] p-3 rounded border border-indigo-900/50 text-indigo-200 text-center text-xs font-mono shadow-[0_0_15px_rgba(49,46,129,0.2)] w-full md:w-36">
             Tokenizer
           </div>
        </div>

        <div className="hidden md:flex flex-col gap-1 text-slate-600 items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest">Adapter</span>
            <ArrowRight size={16} />
        </div>
        <div className="md:hidden text-slate-700 rotate-90"><ArrowRight size={16} /></div>

        {/* Central Brain */}
        <div className="bg-gradient-to-b from-indigo-900/40 to-slate-900/40 p-6 rounded-xl border border-indigo-500/30 flex flex-col items-center justify-center w-full md:w-48 h-32 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
           <Brain className="mb-2 text-indigo-400 group-hover:text-indigo-300 transition-colors" size={32} />
           <span className="font-bold text-base text-white relative z-10">LLM Core</span>
           <span className="text-[10px] text-indigo-300/70 mt-1 relative z-10 font-mono">Decision Engine</span>
        </div>

        <div className="hidden md:flex text-slate-600"><ArrowRight size={16} /></div>
        <div className="md:hidden text-slate-700 rotate-90"><ArrowRight size={16} /></div>

        {/* Output Group */}
        <div className="space-y-3 w-full md:w-auto">
           <div className="bg-emerald-950/30 p-3 rounded border border-emerald-900/50 text-emerald-100 text-center w-full md:w-36">
             <span className="block text-[10px] text-emerald-500/70 font-bold uppercase mb-1">Trajectory</span>
             <span className="text-xs font-mono">Waypoints</span>
           </div>
           <div className="bg-amber-950/30 p-3 rounded border border-amber-900/50 text-amber-100 text-center w-full md:w-36">
             <span className="block text-[10px] text-amber-500/70 font-bold uppercase mb-1">Explainability</span>
             <span className="text-xs font-mono">Chain of Thought</span>
           </div>
        </div>

      </div>
    </div>
  )
}

const KeyIdeas = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    <CardWrapper className="p-6 bg-gradient-to-br from-[#151925] to-[#11141d]">
      <h3 className="text-indigo-400 font-bold text-lg mb-4 flex items-center gap-2">
        <Brain size={20} />
        Why LLM?
      </h3>
      <ul className="space-y-3">
        {[
          'Strong Generalization',
          'Multi-modal Fusion',
          'Explainability',
          'Few-shot Learning'
        ].map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
            {item}
          </li>
        ))}
      </ul>
    </CardWrapper>
    
    <CardWrapper className="p-6 flex flex-col justify-center">
      <h3 className="text-slate-200 font-bold text-lg mb-4">Logic Summary</h3>
      <div className="font-mono text-xs bg-[#0b0c15] p-4 rounded-lg border border-slate-800 text-slate-400 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-rose-400">[IMG]</span> → Enc → Adapt → <span className="text-indigo-400 font-bold">LLM</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap mt-2">
          <span className="text-emerald-400">[NAV]</span> → Tokenizer → <span className="text-indigo-400 font-bold">LLM</span>
        </div>
        <div className="flex justify-center my-2 text-slate-600">↓</div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-indigo-400 font-bold">LLM</span> → Hidden Features
        </div>
        <div className="flex justify-center my-2 text-slate-600">↓</div>
        <div className="whitespace-nowrap flex items-center gap-2">
          Output: <span className="text-emerald-400">Waypoints</span> & <span className="text-amber-400">Explanations</span>
        </div>
      </div>
    </CardWrapper>
  </div>
);

// --- Sub Views ---

const ArchitectureView: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">System Architecture</h2>
        <p className="text-slate-500">Deep Learning Model Pipeline & Flow</p>
      </div>

      <FlowDiagram />
      <KeyIdeas />

      <div className="space-y-8 relative">
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block"></div>
        {architectureData.map((section, idx) => (
          <div key={section.id} className="relative md:pl-16">
            <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-[#151925] border border-slate-700 items-center justify-center font-bold text-slate-500 z-10 shadow-lg">
              {idx + 1}
            </div>
            
            <div className="mb-4 sticky top-16 z-20 bg-[#0b0c15]/90 backdrop-blur py-3 border-b border-slate-800 md:border-none">
               <h3 className="text-xl font-bold text-white flex items-center gap-3">
                 <span className="md:hidden inline-flex items-center justify-center w-6 h-6 rounded bg-slate-800 text-xs text-slate-400">{idx+1}</span>
                 {section.title}
               </h3>
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

const IndustryView: React.FC = () => {
  return (
    <div className="animate-fadeIn">
       <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Industry Landscape</h2>
        <p className="text-slate-500">Commercial Implementation & Progress</p>
      </div>

      <div className="space-y-12">
        {industryData.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-4 mb-6">
               <h3 className="text-lg font-bold text-slate-200">{category.title}</h3>
               <div className="h-px bg-slate-800 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {category.items.map((item, itemIdx) => (
                <ProductCard key={itemIdx} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

const AutonomousDrivingInsights: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<'arch' | 'industry' | 'openSource'>('arch');

  const renderTabs = () => {
    switch (activeTab) {
      case 'arch':
        return <ArchitectureView />;
      case 'industry':
        return <IndustryView />;
      case 'openSource':
        return <OpenSourceView />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#0b0c15] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 ${className}`}>
      
      {/* Header */}
      <header className="bg-[#151925]/80 backdrop-blur-md border-b border-t border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <Car size={64} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">AutoDrive <span className="text-blue-500">E2E</span></h1>
                <p className="text-[14px] text-slate-500 font-medium uppercase tracking-widest">Insights Dashboard</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex bg-[#0b0c15] p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => setActiveTab('arch')}
                className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'arch' ? 'bg-[#1e293b] text-white shadow-sm border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
              >
                架构 (Architecture)
              </button>
              <button 
                onClick={() => setActiveTab('industry')}
                className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'industry' ? 'bg-[#1e293b] text-white shadow-sm border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
              >
                落地 (Industry)
              </button>
              <button 
                onClick={() => setActiveTab('openSource')}
                className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'openSource' ? 'bg-[#1e293b] text-white shadow-sm border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
              >
                开源 (Open Source)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="md:hidden bg-[#0b0c15] border-b border-slate-800 px-4 py-3 sticky top-16 z-40">
        <div className="flex bg-[#151925] p-1 rounded-lg w-full border border-slate-800">
            <button 
              onClick={() => setActiveTab('arch')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'arch' ? 'bg-[#252b3d] text-white' : 'text-slate-500'}`}
            >
              <Network size={16} />
              架构
            </button>
            <button 
              onClick={() => setActiveTab('industry')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'industry' ? 'bg-[#252b3d] text-white' : 'text-slate-500'}`}
            >
              <Car size={16} />
              落地
            </button>
              <button 
                onClick={() => setActiveTab('openSource')}
                className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'openSource' ? 'bg-[#1e293b] text-white shadow-sm border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
              >
                开源 (Open Source)
              </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderTabs()}
      </main>

      {/* Footer */}
      <footer className="bg-[#08090f] border-t border-slate-900 text-slate-600 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm mb-2 font-mono">SYSTEM_STATUS: ONLINE</p>
          <p className="text-xs opacity-50">Generated for Technical Review • E2E Autonomous Driving</p>
        </div>
      </footer>
    </div>
  );
};

export default AutonomousDrivingInsights;
