import fs from 'fs/promises';
import {
  baseNextStructure,
  reactStructure,
} from './constants/folder-structure';

interface IGenerateFolderStructureProps {
  framework: 'react' | 'next';
  useAppDir: boolean;
  useSrc: boolean;
  useTypeScript: boolean;
}

export const generateFolderStructure = async ({
  framework,
  useAppDir,
  useSrc = false,
  useTypeScript,
}: IGenerateFolderStructureProps) => {
  let structure: string[] = [];

  if (framework === 'react') {
    // React always uses `src` directory
    structure = reactStructure.map((folder) => `src/${folder}`);
  }

  if (framework === 'next') {
    // Additional directories specific to Next.js with the `app` directory
    const dirSpecificStructure = useAppDir
      ? ['app', 'app/(auth)', 'app/(dashboard)', 'app/api']
      : ['pages', 'pages/api'];

    const baseStructure = useSrc
      ? baseNextStructure.map((folder) => `src/${folder}`)
      : baseNextStructure;

    const dirStructure = useSrc
      ? dirSpecificStructure.map((folder) => `src/${folder}`)
      : dirSpecificStructure;

    structure = [
      ...baseStructure,
      useSrc ? 'src/actions' : 'actions',
      ...dirStructure,
    ];
  }

  if (!structure.length) return;

  // Create directories
  for (const dir of structure) {
    await fs.mkdir(dir, { recursive: true });
  }

  // create middleware file for nextjs project
  if (framework === 'next') {
    const fileExtension = useTypeScript ? 'ts' : 'js';
    const middlewarePath = useSrc
      ? `src/middleware.${fileExtension}`
      : `middleware.${fileExtension}`;

    await fs.writeFile(middlewarePath, '//This is middleware file');
  }
};
