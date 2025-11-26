import React from 'react';
import { COMPARISON_DATA, Icons } from '../constants/const';

const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#30363d]">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-200 uppercase bg-[#161b22] border-b border-[#30363d]">
          <tr>
            <th scope="col" className="px-6 py-4 font-bold">Model</th>
            <th scope="col" className="px-6 py-4">Core Innovation</th>
            <th scope="col" className="px-6 py-4 text-center">VLM Driven</th>
            <th scope="col" className="px-6 py-4">SOTA Context</th>
            <th scope="col" className="px-6 py-4 text-center">Open Source</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.map((row, index) => (
            <tr 
              key={row.name} 
              className={`bg-[#0d1117] border-b border-[#30363d] hover:bg-[#161b22] transition-colors ${index === COMPARISON_DATA.length - 1 ? 'border-b-0' : ''}`}
            >
              <td className="px-6 py-4 font-medium text-blue-400 whitespace-nowrap">
                {row.name}
              </td>
              <td className="px-6 py-4 text-gray-300">
                {row.innovation}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center">
                    {row.hasVLM ? <Icons.Check /> : <Icons.Cross />}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="bg-green-900/20 text-green-400 px-2 py-1 rounded text-xs border border-green-900/30">
                  {row.sotaContext}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center">
                    {row.openSource ? <Icons.Check /> : <Icons.Cross />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
