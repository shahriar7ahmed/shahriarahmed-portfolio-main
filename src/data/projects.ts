export interface Project {
  id: string;
  title_en: string;
  title_jp: string;
  description_en: string;
  description_jp: string;
  tech: string[];
  tags: string[];
  images: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'ink-ui',
    title_en: 'Ink UI — Component Library',
    title_jp: 'インク UI — コンポーネントライブラリ',
    description_en: 'A black & white component system inspired by manga panels. Features accessible, themeable components with halftone textures and ink-stroke animations. Built with React, TypeScript, and Tailwind CSS.',
    description_jp: 'マンガのパネルに着想を得た白黒のコンポーネントシステム。ハーフトーンテクスチャーとインクストロークアニメーションを備えたアクセシブルでテーマ対応のコンポーネント。React、TypeScript、Tailwind CSSで構築。',
    tech: ['React', 'Tailwind', 'Framer Motion', 'TypeScript'],
    tags: ['ui', 'open-source', 'web'],
    images: [],
    sourceUrl: 'https://github.com/shahriar',
  },
  {
    id: 'task-tracker',
    title_en: 'Task Tracker App',
    title_jp: 'タスクトラッカーアプリ',
    description_en: 'A smart task management application with drag-and-drop functionality, priority sorting, and deadline reminders. Features a minimalist interface with smooth animations.',
    description_jp: 'ドラッグアンドドロップ機能、優先順位のソート、締切りのリマインダーを備えたスマートタスク管理アプリケーション。スムーズなアニメーションを備えたミニマリストのインターフェース。',
    tech: ['React', 'Tailwind', 'Framer Motion', 'Local Storage'],
    tags: ['web', 'productivity'],
    images: [],
    liveUrl: 'https://task-tracker-demo.lovable.app',
    sourceUrl: 'https://github.com/shahriar/task-tracker',
  },
  {
    id: 'portfolio-generator',
    title_en: 'Portfolio Generator',
    title_jp: 'ポートフォリオジェネレーター',
    description_en: 'An interactive tool to generate beautiful portfolio websites with customizable themes, layouts, and content. Export as static HTML or deploy directly to hosting platforms.',
    description_jp: 'カスタマイズ可能なテーマ、レイアウト、コンテンツを備えた美しいポートフォリオWebサイトを生成するインタラクティブなツール。静的HTMLとしてエクスポートするか、ホスティングプラットフォームに直接デプロイ。',
    tech: ['React', 'Node', 'MongoDB', 'Express'],
    tags: ['web', 'open-source', 'tool'],
    images: [],
    liveUrl: 'https://portfolio-gen.lovable.app',
  },
  {
    id: 'anime-dashboard',
    title_en: 'Anime Tracking Dashboard',
    title_jp: 'アニメトラッキングダッシュボード',
    description_en: 'Track your anime watch list with a beautiful manga-inspired UI. Features include season tracking, episode progress, ratings, and recommendations based on your preferences.',
    description_jp: '美しい漫画風のUIでアニメの視聴リストを追跡。シーズントラッキング、エピソードの進捗、評価、好みに基づく推奨機能を搭載。',
    tech: ['React', 'TypeScript', 'Firebase', 'API Integration'],
    tags: ['web', 'entertainment'],
    images: [],
    liveUrl: 'https://anime-tracker.lovable.app',
  },
];

export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind',
  'Framer Motion',
  'Node',
  'MongoDB',
  'Django',
  'MySQL',
  'Firebase',
  'Git',
];
