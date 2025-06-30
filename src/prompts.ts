import prompts from 'prompts';
import { colors } from './utils/colors';

interface IUserPromptsProps {
  framework: 'react' | 'next';
  latestVersion: string;
  commonVersions: string[];
}

export const UserPrompts = async ({
  commonVersions,
  framework,
  latestVersion,
}: IUserPromptsProps) => {
  return prompts([
    {
      type: 'select',
      name: 'version',
      message: colors.info(`Select ${colors.highlight(framework)} version:`),
      choices: [
        {
          title: colors.success(`Latest (${latestVersion})`),
          value: latestVersion,
        },
        ...commonVersions.map((v) => ({
          title: v,
          value: v,
        })),
        { title: colors.highlight('Custom version'), value: 'custom' },
      ],
    },
    {
      type: (prev) => (prev === 'custom' ? 'text' : null),
      name: 'customVersion',
      message: colors.info('Enter version number:'),
      validate: (input) =>
        /^\d+\.\d+\.\d+$/.test(input)
          ? true
          : colors.error('Please enter a valid version number (e.g., 18.2.0)'),
    },
    {
      type: 'text',
      name: 'projectName',
      message: colors.info('What is your project name?'),
      initial: 'my-app',
      validate: (input) =>
        /^[a-z0-9-_]+$/i.test(input)
          ? true
          : colors.error(
              'Project name may only include letters, numbers, underscores, and dashes'
            ),
    },
    {
      type: 'toggle',
      name: 'typescript',
      message: colors.info('Would you like to use TypeScript?'),
      initial: true,
      active: colors.success('Yes'),
      inactive: colors.error('No'),
    },
    {
      type: framework === 'next' ? 'toggle' : null,
      name: 'eslint',
      message: colors.info('Would you like to include ESLint configuration?'),
      initial: true,
      active: colors.success('Yes'),
      inactive: colors.error('No'),
    },
    {
      type: 'toggle',
      name: 'prettier',
      message: colors.info('Would you like to include Prettier configuration?'),
      initial: true,
      active: colors.success('Yes'),
      inactive: colors.error('No'),
    },
    {
      type: framework === 'next' ? 'toggle' : null,
      name: 'useSrc',
      message: colors.info('Would you like to use the src directory?'),
      initial: true,
      active: colors.success('Yes'),
      inactive: colors.error('No'),
    },
    {
      type: framework === 'next' ? 'toggle' : null,
      name: 'appDir',
      message: colors.info('Would you like to use App Router?'),
      initial: true,
      active: colors.success('Yes'),
      inactive: colors.error('No'),
    },
    {
      type: framework === 'next' ? 'toggle' : null,
      name: 'tailwind',
      message: colors.info('Would you like to use Tailwind CSS?'),
      initial: true,
      active: colors.success('Yes'),
      inactive: colors.error('No'),
    },
  ]);
};
