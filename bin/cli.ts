#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import { generateProjectStructure } from '../src/index.js';
import { colors } from '../src/utils/colors.js';

const ALLOWED_FRAMEWORKS = ['react', 'next'] as const;
type Framework = (typeof ALLOWED_FRAMEWORKS)[number];

program
  .name('create-project-structure')
  .description('Generate project structure for React or Next.js applications')
  .argument('[framework]', 'Framework to generate structure for (react/next)')
  .action(async (framework?: string) => {
    try {
      if (
        !framework ||
        !ALLOWED_FRAMEWORKS.includes(framework.toLowerCase() as Framework)
      ) {
        const frameworkAnswer = await inquirer.prompt<{ framework: Framework }>(
          [
            {
              type: 'list',
              name: 'framework',
              message: 'Which framework would you like to use?',
              choices: ALLOWED_FRAMEWORKS.map((f) => ({
                name: f.charAt(0).toUpperCase() + f.slice(1),
                value: f,
              })),
            },
          ]
        );
        framework = frameworkAnswer.framework;
      }

      await generateProjectStructure(framework.toLowerCase() as Framework);
    } catch (error) {
      console.error(
        colors.error('\n❌ Error generating project structure:'),
        error instanceof Error ? error.message : error
      );
      process.exit(1);
    }
  });

program.parse();
