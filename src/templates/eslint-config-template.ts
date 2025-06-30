import _fs from 'fs/promises';
import { ProjectFramework } from '../types';

interface IGenerateEslintConfigProps {
  framework: ProjectFramework;
  useTypeScript: boolean;
  usePrettier: boolean;
}

export const generateEslintConfig = async ({
  framework,
  useTypeScript,
  usePrettier,
}: IGenerateEslintConfigProps) => {
  const eslintConfig = {
    extends: [
      'eslint:recommended',
      framework === 'next' ? 'next/core-web-vitals' : 'react-app',
      useTypeScript && 'plugin:@typescript-eslint/recommended',
      usePrettier && 'prettier',
    ].filter(Boolean),
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  };

  return eslintConfig;
};
