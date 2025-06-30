export const baseStructure = [
  // Core Components
  'components',
  'components/ui', // Basic UI components (buttons, inputs)
  'components/layout', // Layout components (header, footer)
  'components/shared', // Shared/common components
  'components/common', // Common components
  'components/providers', // Context providers or other providers

  // Application Logic
  'hooks', // Custom React hooks
  'context', // React Context definitions
  'store', // State management (replaces 'redux')
  'store/slices', // Redux/state slices
  'services', // API and external services

  'layouts', // Page layout templates

  'locales', // Localization files

  // Utils & Config
  'utils', // Utility functions
  'lib', // Third-party library configs
  'config', // App configuration files
  'constants', // App constants and enums
  'types', // TypeScript types
  'schemas', // schemas,

  // Assets & Styles
  'assets', // Static assets
  'assets/images', // Image files
  'assets/icons', // Icon files
  'styles', // Global styles and themes

  'fonts', // Font files
];

export const reactStructure = [
  ...baseStructure,

  // Routing & Services
  'pages', // Page views
  'routes', // Route definitions
];

export const baseNextStructure = [...baseStructure];

// // App Router specific structure
// const appRouterStructure = [
//   'app',
//   'app/api', // API routes
//   'app/actions', // Co-located server actions
//   'app/lib', // Co-located utilities
//   'app/(auth)', // Auth group routes
//   'app/(dashboard)', // Dashboard group routes
//   'app/error.tsx',
//   'app/loading.tsx',
//   'app/layout.tsx',
//   'app/not-found.tsx',
//   'middleware.ts',
// ];

// // Pages Router specific structure
// const pagesRouterStructure = [
//   'pages',
//   'pages/api',
//   'pages/_app.tsx',
//   'pages/_document.tsx',
//   'pages/404.tsx',
//   'pages/500.tsx',
//   'middleware.ts',
// ];
