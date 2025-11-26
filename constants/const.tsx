import { ModelData, ComparisonRow } from '../types';
import React from 'react';

export const MODELS: ModelData[] = [
  {
    id: 'ssr',
    name: 'SSR',
    fullName: 'Navigation-Guided Sparse Scene Representation',
    organization: '智加科技 (Plus)',
    repoUrl: 'https://github.com/PeidongLi/SSR',
    features: [
      '仅用 16个稀疏导航引导令牌 表征场景',
      '无需显式感知监督 (Unsupervised Perception)',
      '推理速度提升 10.9×，训练时间缩短 13×'
    ],
    performance: [
      { metric: 'nuScenes L2 Error', value: '⬇ 27.2%', improvement: 'Better' },
      { metric: 'Collision Rate', value: '⬇ 51.6%', improvement: 'Better' },
      { metric: 'CARLA Town05', value: 'SOTA', improvement: 'vs VAD-Base' }
    ],
    tags: { hasVLM: false, isSOTA: true, isOpenSource: true }
  },
  {
    id: 'law',
    name: 'LAW',
    fullName: 'Latent World Model for E2E Driving',
    organization: '中科院自动化所 (CASIA)',
    repoUrl: 'https://github.com/BraveGroup/LAW',
    features: [
      '引入 潜在世界模型 (Latent World Model) 进行自监督学习',
      '通过当前特征与轨迹预测未来场景，优化特征表征',
      '统一架构设计'
    ],
    performance: [
      { metric: 'nuScenes', value: 'SOTA', improvement: 'Closed-loop' },
      { metric: 'NAVSIM', value: 'SOTA', improvement: 'Closed-loop' },
      { metric: 'CARLA', value: 'SOTA', improvement: 'Closed-loop' }
    ],
    tags: { hasVLM: false, isSOTA: true, isOpenSource: true }
  },
  {
    id: 'drivetransformer',
    name: 'DriveTransformer',
    fullName: 'Unified Transformer for Scalable E2E AD',
    organization: '上海交通大学 & 上海AI实验室',
    repoUrl: 'https://github.com/Thinklab-SJTU/DriveTransformer/',
    features: [
      '统一 Transformer 架构，支持任务并行、稀疏表征',
      '流式处理设计，摒弃串行范式',
      '减少感知到规划的误差累积'
    ],
    performance: [
      { metric: 'Bench2Drive', value: 'SOTA', improvement: 'Closed-loop' },
      { metric: 'nuScenes', value: 'SOTA', improvement: 'Open-loop' },
      { metric: 'Frame Rate', value: 'High', improvement: 'Real-time' }
    ],
    tags: { hasVLM: false, isSOTA: true, isOpenSource: true }
  },
  {
    id: 'mgmapnet',
    name: 'MGMapNet',
    fullName: 'Multi-Granularity Representation Learning',
    organization: '同济大学 & 百度',
    repoUrl: 'https://github.com/Tongji-MIC-Lab/MGMapNet',
    features: [
      '聚焦矢量化高精地图构建 (HD Map)',
      'E2E 系统的关键上游模块',
      '融合 点级 + 实例级 多粒度查询'
    ],
    performance: [
      { metric: 'nuScenes mAP', value: '+5.3', improvement: 'vs MapTRv2' },
      { metric: 'Argoverse2 mAP', value: '+4.4', improvement: 'Significant' }
    ],
    tags: { hasVLM: false, isSOTA: true, isOpenSource: true }
  },
  {
    id: 'orion',
    name: 'ORION',
    fullName: 'Vision-Language Instructed Action Generation',
    organization: '华中科技大学 & 小米汽车',
    repoUrl: 'https://github.com/xiaomi-mlab/Orion',
    features: [
      '首个 视觉-语言模型 (VLM) 驱动的 E2E 框架',
      '生成式规划器：将语义指令映射为可微分轨迹',
      '核心模块：QT-Former, VLM, Generative Model'
    ],
    performance: [
      { metric: 'Bench2Drive Score', value: '77.74', improvement: '+14.28' },
      { metric: 'Success Rate', value: '54.62%', improvement: '+19.61%' }
    ],
    tags: { hasVLM: true, isSOTA: true, isOpenSource: true },
    highlight: 'Bench2Drive 闭环最强'
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  { name: 'SSR', innovation: '稀疏导航令牌、无监督感知', hasVLM: false, sotaContext: 'CARLA', openSource: true },
  { name: 'LAW', innovation: '潜在世界模型、自监督', hasVLM: false, sotaContext: 'nuScenes/CARLA', openSource: true },
  { name: 'DriveTransformer', innovation: '统一Transformer、任务并行', hasVLM: false, sotaContext: 'Bench2Drive/nuScenes', openSource: true },
  { name: 'MGMapNet', innovation: '多粒度矢量地图构建', hasVLM: false, sotaContext: '地图任务 (nuScenes)', openSource: true },
  { name: 'ORION', innovation: '视觉-语言指令 + 生成式规划', hasVLM: true, sotaContext: 'Bench2Drive 闭环最强', openSource: true },
];

// Icons
export const Icons = {
  Lightning: () => (
    <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Cross: () => (
    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Github: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
};
