export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'wip',
        'test',
        'deps',
        'revert',
        'config',
        'docs',
        'chore',
        'build',
        'security',
        'component',
        'hook',
        'util',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // Enforce lowercase type (e.g., 'feat', 'fix')
    'type-empty': [2, 'never'], // Disallow empty type (Type cannot be empty)
    'subject-case': [0, 'always', 'lower-case'], // Enforce subject case (e.g., 'lower-case', 'sentence-case', 'start-case', 'pascal-case', 'upper-case')
    'subject-empty': [2, 'never'], // Disallow empty subject (Subject cannot be empty)
  },
};
