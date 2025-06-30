interface IGenerateUseLocalStorageHookProps {
  framework: 'react' | 'next';
  useSrc: boolean;
  isTypescript: boolean;
}

export const getButtonContent = ({
  framework,
  useSrc,
  isTypescript,
}: IGenerateUseLocalStorageHookProps) => {
  const ext = isTypescript ? 'tsx' : 'jsx';

  const componentPath =
    framework === 'react'
      ? `src/components/Button.${ext}`
      : useSrc
        ? `src/components/Button.${ext}`
        : `components/Button.${ext}`;

  const componentContent = `${isTypescript ? "import React from 'react';" : ''}

    ${isTypescript ? 'interface ButtonProps {' : ''}
    ${isTypescript ? '  label: string;' : ''}
    ${isTypescript ? '  onClick?: () => void;' : ''}
    ${isTypescript ? '}' : ''}

    export const Button${isTypescript ? ': React.FC<ButtonProps>' : ''} = ({ label, onClick }) => {
      return (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClick}
        >
          {label}
        </button>
      );
    };`;
  return { componentContent, componentPath };
};
