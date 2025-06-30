import fs from 'fs/promises';
// import { generateTsConfig } from './templates/ts-config-template';
import { execSync } from 'child_process';
import { generatePrettierConfig } from './templates/prettier-config-template';
import { colors } from './utils/colors';

interface IGenerateConfigProps {
  framework: 'react' | 'next';
  usePrettier: boolean;
  useSrc: boolean;
  useTailwind: boolean;
  useTypeScript: boolean;
}

export const generateConfigs = async ({
  usePrettier,
  useTailwind,
}: IGenerateConfigProps) => {
  // Generate configuration files

  // if (useTypeScript && framework === 'next') {
  //   const tsConfig = generateTsConfig({ framework, useSrc });
  //   await fs.writeFile('tsconfig.json', JSON.stringify(tsConfig, null, 2));
  // }

  if (usePrettier) {
    try {
      const prettierConfig = generatePrettierConfig({});
      await fs.writeFile(
        '.prettierrc',
        JSON.stringify(prettierConfig, null, 2)
      );

      await fs.writeFile(
        '.prettierignore',
        'node_modules\n.next\nbuild\ndist\ncoverage\n*.log'
      );

      const prettierDependencies = [
        'prettier',
        'eslint-config-prettier',
        useTailwind && 'prettier-plugin-tailwindcss',
      ].filter(Boolean);

      // Add prettier dependencies
      execSync(`npm install -D ${prettierDependencies.join(' ')}`, {
        stdio: 'inherit',
      });
    } catch (error) {
      console.error(
        colors.error('   Failed to set up Prettier:'),
        error instanceof Error ? error.message : error
      );
    }
  }
};
