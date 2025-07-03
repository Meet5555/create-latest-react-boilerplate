import pc from 'picocolors';

// Define color theme
export const colors = {
  primary: (text: string) => pc.blue(text),
  secondary: (text: string) => pc.gray(text),
  success: pc.green,
  error: pc.red,
  warning: pc.yellow,
  info: pc.cyan,
  highlight: pc.magenta,
  muted: pc.gray,
  heading: (text: string) => pc.bold(pc.white(text)),
};
