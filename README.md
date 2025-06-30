# create-latest-react-boilerplate

A powerful CLI tool that scaffolds well-structured React or Next.js applications with best practices baked in.

## Features

- 🚀 Generate React or Next.js projects with optimal folder structure
- 📦 TypeScript/JavaScript support
- 🛠 ESLint and Prettier configuration
- 📱 Includes Old and Latest versions of React/Next.js
- ⚡️ Fast and interactive setup

## Installation

You can use this package in several ways:

### Using npx (Recommended)

```bash
npx create-latest-react-boilerplate@latest
```

### Global Installation

```bash
npm install -g create-latest-react-boilerplate
```

- Now run following command in terminal

```bash
create-latest-react-boilerplate
```

### Local Installation

```bash
npm install create-latest-react-boilerplate
```

- Then add to your package.json scripts:

```json
{
  "scripts": {
    "create": "create-latest-react-boilerplate"
  }
}
```

- Run using npm

```bash
npm run create
```

## Usage

### Interactive Mode

Simply run:

```bash
npx create-latest-react-boilerplate@latest
```

Follow the interactive prompts to:

1. Choose framework (React/Next.js)
2. Select TypeScript/JavaScript
3. Configure ESLint
4. Set up Prettier
5. Choose framework version
6. Name your project

### Direct Mode

Specify the framework directly:

```bash
npx create-latest-react-boilerplate@latest react
# or
npx create-latest-react-boilerplate@latest next
```

## Project Structure

The generated project includes:

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Basic UI components (buttons, inputs)
│   ├── layout/          # Layout components (header, footer)
│   ├── shared/          # Shared/common components
│   └── providers/       # Context providers or other providers
│
├── hooks/               # Custom React hooks
├── context/             # React Context definitions
├── store/               # State management
│   └── slices/          # Redux/state slices
│
├── services/            # API and external services
├── layouts/             # Page layout templates
├── views/               # Page views
├── locales/             # Localization files
│
├── utils/               # Utility functions
├── lib/                 # Third-party library configs
├── config/              # App configuration files
├── constants/           # App constants and enums
├── types/               # TypeScript types
├── schemas/             # Schemas for validation/data
│
├── assets/              # Static assets
│   ├── images/          # Image files
│   └── icons/           # Icon files
└── styles/              # Global styles and themes

# React-specific
└── routes/              # Route definitions

# Additional for Next.js with App Router
├── app/                 # App router pages
│   ├── (auth)/          # Auth group routes
│   ├── (dashboard)/     # Dashboard group routes
│   └── api/             # API routes
└── actions/             # Server actions

# Next.js with Pages Router
├── pages/               # Pages router
│   └── api/             # API routes
└── middleware.ts        # Next.js middleware
```

## Examples

### Creating a React Project

```bash
npx create-latest-react-boilerplate@latest react
```

### Creating a Next.js Project

```bash
npx create-latest-react-boilerplate@latest next
```

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/Meet5555/create-latest-react-boilerplate/issues)
2. Create a new issue if your problem isn't already reported
3. Join our [Discord Community](https://discord.gg/n3J4S4vY) for real-time help

## Contributing

We welcome contributions! Please see [Contributing Guide](CONTRIBUTING.md) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

MIT © [Meet5555](https://github.com/Meet5555)

## Contact

- GitHub: [@Meet5555](https://github.com/Meet5555)
- Email: bhimanimeet55555@gmail.com
