import React from 'react';
import { Icons, MODELS } from '../constants/const';
import { ModelData } from '../types';
import ComparisonTable from './ComparisonTable';

interface ModelCardProps {
  model: ModelData;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 flex flex-col h-full hover:border-gray-600 transition-colors duration-300 relative overflow-hidden group">
      {/* Top Decoration Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-1 flex items-center gap-2">
            {model.name}
            {model.tags.hasVLM && (
              <span className="bg-purple-900/50 text-purple-300 text-[10px] px-2 py-0.5 rounded border border-purple-700/50">
                VLM-Driven
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-600"></span>
            {model.organization}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
            <span className="border border-green-500/30 text-green-400 bg-green-500/10 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Open Source
            </span>
            <a 
                href={model.repoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                title="View Source"
            >
                <Icons.Github />
            </a>
        </div>
      </div>

      {/* Technical Features */}
      <div className="mb-6 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <Icons.Lightning />
          <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Technical Features</h4>
        </div>
        <ul className="space-y-2">
          {model.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-300">
              <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-blue-500 flex-shrink-0"></span>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Performance */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <Icons.Chart />
          <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Performance Highlights</h4>
        </div>
        <div className="space-y-2">
          {model.performance.map((perf, idx) => (
            <div key={idx} className="bg-[#0d1117] border border-[#30363d] rounded px-3 py-2 flex justify-between items-center">
              <span className="text-xs text-gray-400">{perf.metric}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-green-400">{perf.value}</span>
                {perf.improvement && (
                  <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">
                    {perf.improvement}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-[#30363d] flex justify-between items-center text-xs text-gray-500">
         <span>Updated: Nov 2025</span>
         {model.highlight && (
             <span className="text-orange-400 font-medium">{model.highlight}</span>
         )}
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
        Open Source Landscape
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-400">
        <h2 className="text-xl font-light">
            E2E Autonomous Driving Models & Progress
        </h2>
        <div className="hidden md:block w-px h-6 bg-gray-700"></div>
        <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                As of Nov 2025
            </span>
            <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                5 Major Frameworks
            </span>
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-2">
         <div className="bg-green-500 w-5 h-5 rounded flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.4)]">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
         </div>
         <h3 className="text-lg font-bold text-white tracking-wide">
             Open Source Implementations
         </h3>
         <div className="h-px bg-[#30363d] flex-grow ml-4"></div>
      </div>
    </div>
  );
};

const OpenSourceView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <Header />

        <main>
            {/* Grid for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
                {MODELS.map((model) => (
                    <ModelCard key={model.id} model={model} />
                ))}
            </div>

            {/* Comparison Section Header */}
            <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-white">Technical Comparison</h3>
                <div className="h-px bg-[#30363d] flex-grow"></div>
            </div>

            {/* Table */}
            <div className="mb-12">
                <ComparisonTable />
            </div>

            {/* Footer Note */}
            <div className="text-center text-xs text-gray-600 pb-8">
                <p className="mb-2">
                    <span className="inline-block w-3 h-3 border border-gray-600 rounded-full mr-2 relative top-0.5 text-[8px] flex items-center justify-center">i</span>
                    Data source: Public research papers and GitHub repositories available as of November 2025.
                </p>
                <p>Designed for immediate integration into existing dashboards.</p>
            </div>
        </main>

      </div>
    </div>
  );
};

export default OpenSourceView;