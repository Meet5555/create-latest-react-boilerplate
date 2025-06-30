import { execSync } from 'child_process';
import fs from 'fs/promises';
import ora from 'ora';
import path from 'path';
import { colors } from './utils/colors';
import { generateBoilerPlate } from './generate-boilerplate';
import { generateConfigs } from './generate-configs';
import { generateFolderStructure } from './generate-folder-structure';
import { UserPrompts } from './prompts';
import { ProjectFramework } from './types';
import {
  getNextVersions,
  getReactVersions,
} from './utils/get-framework-versions';

export async function generateProjectStructure(
  framework: ProjectFramework
): Promise<void> {
  try {
    console.log(`\n🚀 Creating a new ${colors.highlight(framework)} project\n`);

    const versionSpinner = ora({
      text: colors.info('Fetching available versions...'),
      color: 'blue',
    }).start();

    // Get available versions
    const versions =
      framework === 'react'
        ? await getReactVersions()
        : await getNextVersions();

    versionSpinner.stop();

    const latestVersion = versions[versions.length - 1];
    const commonVersions = versions.slice(-5).reverse();

    const answers = await UserPrompts({
      commonVersions,
      framework,
      latestVersion,
    });
    const selectedVersion = answers.customVersion || answers.version;
    const projectName = answers.projectName;
    const useSrc = answers.useSrc;
    const useTypeScript = answers.typescript;
    const useEslint = answers.eslint;
    const usePrettier = answers.prettier;
    const useTailwind = answers.tailwind;
    const useAppDir = answers.appDir;

    const spinner = ora({
      text: colors.primary('Creating new project...'),
      color: 'cyan',
    }).start();

    try {
      // Create new project using create-vite or create-next-app
      if (framework === 'react') {
        spinner.text = colors.primary(
          'Creating new React project with Vite...'
        );

        // Execute Vite command and await completion
        await new Promise<void>((resolve, reject) => {
          try {
            execSync(
              `npm create vite@latest ${projectName} -- --template ${useTypeScript ? 'react-ts' : 'react'}`,
              { stdio: 'ignore' }
            );
            resolve();
          } catch (err) {
            reject(err);
          }
        });

        spinner.text = colors.primary('Updating React version...');
        // Update React version in package.json
        const packageJsonPath = path.join(projectName, 'package.json');
        const packageJson = JSON.parse(
          await fs.readFile(packageJsonPath, 'utf8')
        );
        packageJson.dependencies.react = `^${selectedVersion}`;
        packageJson.dependencies['react-dom'] = `^${selectedVersion}`;
        await fs.writeFile(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2)
        );
      } else {
        const tsFlag = useTypeScript ? '--ts' : '';
        const srcFlag = useSrc ? '--src-dir' : '--no-src-dir';
        const eslintFlag = useEslint ? '--eslint' : '';
        const tailwindFlag = useTailwind ? '--tailwind' : '--no-tailwind';
        const appDirFlag = useAppDir ? '--app' : '--no-app';

        const nextCreateCmd = `npx create-next-app@${selectedVersion} ${projectName} ${tsFlag} ${srcFlag} ${eslintFlag} ${tailwindFlag} ${appDirFlag}`;

        // Execute Next.js command and await completion
        await new Promise<void>((resolve, reject) => {
          try {
            execSync(`${nextCreateCmd}`, { stdio: 'inherit' });
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      }

      // Change to project directory
      process.chdir(projectName);

      // Generate folder structure sequentially
      spinner.text = colors.primary('Creating project structure...');
      generateFolderStructure({ framework, useAppDir, useSrc, useTypeScript });

      // Generate project configurations
      spinner.text = colors.primary('Generating Project Configurations...');
      await generateConfigs({
        framework,
        usePrettier,
        useSrc,
        useTailwind,
        useTypeScript,
      });

      // Generate boilerplate files
      spinner.text = colors.primary('Generating boilerplate files...');
      await generateBoilerPlate({
        framework,
        isTypescript: useTypeScript,
        useSrc,
      });

      spinner.text = colors.primary('Finalizing setup...');

      // run prettier format command
      if (usePrettier) {
        try {
          spinner.text = colors.primary('Formatting files with Prettier...');
          await new Promise<void>((resolve, reject) => {
            try {
              execSync('npx prettier --write .', { stdio: 'ignore' });
              resolve();
            } catch (err) {
              reject(err);
            }
          });
          spinner.succeed(colors.success('Files formatted successfully'));
        } catch (error) {
          spinner.warn(colors.warning('Failed to format some files'));
          console.error(error);
        }
      }

      spinner.succeed(colors.success('Project created successfully!'));

      // show next steps
      console.log(
        `\n${colors.heading('🎉 Next Steps:')}${colors.muted(' (follow these steps to get started)')}\n`
      );
      console.log(`Change to your project directory:`);
      console.log(`   ${colors.info(`cd ${projectName}`)}`);

      console.log(`Install dependencies:`);
      console.log(`   ${colors.info('npm install')}`);

      console.log(`Start the development server:`);
      console.log(`   ${colors.info('npm run dev')}\n`);

      console.log(colors.muted('Happy coding! 👨‍💻'));
    } catch (error) {
      spinner.fail(colors.error('Failed to generate project'));
      console.error(
        `${error instanceof Error ? error.message : String(error)}`
      );
      throw error;
    }
  } catch (error) {
    console.error(
      colors.error('Error:'),
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}
