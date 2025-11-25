import React from 'react';
import { industryData } from '../constants/data';
import { ProductItem } from '../types';
import { CheckCircle2, Truck, TestTube2, MapPin, Calendar, Activity, Zap } from 'lucide-react';

const StatusBadge: React.FC<{ status: ProductItem['status'] }> = ({ status }) => {
  switch (status) {
    case 'production':
      return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold border border-green-200">
          <CheckCircle2 size={12} />
          已量产 / Mass Production
        </span>
      );
    case 'commercial':
      return (
        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold border border-blue-200">
          <Truck size={12} />
          商业化运营 / Commercial
        </span>
      );
    case 'rnd':
      return (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold border border-amber-200">
          <TestTube2 size={12} />
          研发测试 / R&D
        </span>
      );
    default:
      return null;
  }
};

const ProductCard: React.FC<{ item: ProductItem }> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
      <div className="p-5 border-b border-slate-50">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
              <MapPin size={14} />
              <span>{item.region}</span>
            </div>
          </div>
          <StatusBadge status={item.status} />
        </div>
        
        {item.landingDate && (
           <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded w-fit mt-2">
             <Calendar size={12} />
             {item.landingDate}
           </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
             <Zap size={12} /> 技术特点
          </h4>
          <ul className="space-y-2">
            {item.features.map((feat, idx) => (
              <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 bg-indigo-500 rounded-full flex-shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {item.performance && (
          <div>
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Activity size={12} /> 实际表现
             </h4>
             <ul className="space-y-2">
              {item.performance.map((perf, idx) => (
                <li key={idx} className="text-sm text-slate-600 bg-emerald-50/50 p-2 rounded border border-emerald-100/50">
                  {perf}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.progress && (
           <div className="text-sm text-slate-500 italic border-t border-slate-100 pt-3">
              进度: {item.progress}
           </div>
        )}
      </div>
    </div>
  );
};

export const IndustryView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto animate-fadeIn">
       <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">行业落地现状</h2>
        <p className="text-slate-500">国内外端到端自动驾驶方案的产品化进展</p>
      </div>

      <div className="space-y-10">
        {industryData.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3 mb-6">
               <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
               <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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