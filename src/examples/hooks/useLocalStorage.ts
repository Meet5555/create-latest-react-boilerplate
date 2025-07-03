interface IGenerateUseLocalStorageHookProps {
  framework: 'react' | 'next';
  useSrc: boolean;
  isTypescript: boolean;
}

export const getUseLocalStorageHookContent = ({
  framework,
  useSrc,
  isTypescript,
}: IGenerateUseLocalStorageHookProps) => {
  const ext = isTypescript ? 'tsx' : 'jsx';

  const hookPath =
    framework === 'react'
      ? `src/hooks/useLocalStorage.${ext}`
      : useSrc
        ? `src/hooks/useLocalStorage.${ext}`
        : `hooks/useLocalStorage.${ext}`;

  const hookContent = `${isTypescript ? "import { useState, useEffect } from 'react';" : ''}
  
  export const useLocalStorage = ${isTypescript ? '<T,>' : ''}(key: string, initialValue${isTypescript ? ': T' : ''}) => {
    const [storedValue, setStoredValue] = useState${isTypescript ? '<T>' : ''}(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });
  
    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }, [key, storedValue]);
  
    return [storedValue, setStoredValue];
  };`;
  return { hookContent, hookPath };
};
