import { ProjectFramework } from '../types';

interface IGenerateTsConfigProps {
  framework: ProjectFramework;
  useSrc: boolean;
}

export function generateTsConfig({
  framework,
  useSrc,
}: IGenerateTsConfigProps) {
  const baseCompilerOptions = {
    target: 'es2022',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
  };

  if (framework === 'react') {
    return {
      compilerOptions: {
        ...baseCompilerOptions,
        allowImportingTsExtensions: true,
        baseUrl: 'src',
        paths: {
          '@/*': ['./*'],
        },
        jsx: 'react-jsx',
      },
      include: ['src'],
      exclude: ['node_modules', 'build', 'dist'],
    };
  }

  // Next.js specific config
  return {
    compilerOptions: {
      ...baseCompilerOptions,
      plugins: [
        {
          name: 'next',
        },
      ],
      baseUrl: '.',
      paths: {
        '@/*': [useSrc ? './src/*' : './*'],
      },
    },
    include: [
      'next-env.d.ts',
      useSrc ? 'src/**/*.ts' : '**/*.ts',
      useSrc ? 'src/**/*.tsx' : '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '.next/types/**/*.ts',
    ],
    exclude: ['node_modules', '.next', 'dist'],
  };
}
