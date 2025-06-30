interface IGeneratePrettierConfigProps {}

export const generatePrettierConfig =
  async ({}: IGeneratePrettierConfigProps) => {
    const prettierConfig = {
      semi: true,
      trailingComma: 'es5',
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
    };
    return prettierConfig;
  };
