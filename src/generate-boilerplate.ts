import fs from 'fs/promises';
import { colors } from './utils/colors';
import { getButtonContent } from './examples/components/common/Button';
import { getUseLocalStorageHookContent } from './examples/hooks/useLocalStorage';

interface IGenerateBoilerPlateProps {
  framework: 'react' | 'next';
  useSrc: boolean;
  isTypescript: boolean;
}

export const generateBoilerPlate = async ({
  framework,
  isTypescript,
  useSrc,
}: IGenerateBoilerPlateProps) => {
  try {
    const { componentContent, componentPath } = getButtonContent({
      framework,
      useSrc,
      isTypescript,
    });
    await fs.writeFile(componentPath, componentContent);

    const { hookContent, hookPath } = getUseLocalStorageHookContent({
      framework,
      useSrc,
      isTypescript,
    });
    await fs.writeFile(hookPath, hookContent);
  } catch (error) {
    console.error(
      colors.error('\nError generating boilerplate files:'),
      error instanceof Error ? error.message : error
    );
  }
};
