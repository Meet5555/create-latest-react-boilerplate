import { execSync } from 'child_process';

// Fallback versions if npm registry is unavailable
const REACT_FALLBACK_VERSIONS = [
  '19.0.0',
  '18.2.0',
  '18.0.0',
  '17.0.2',
  '16.14.0',
  '16.8.0',
];

const NEXT_FALLBACK_VERSIONS = [
  '15.0.0',
  '14.0.0',
  '13.4.19',
  '13.0.0',
  '12.3.4',
  '11.1.4',
];

export async function getReactVersions(): Promise<string[]> {
  try {
    // Set timeout to avoid hanging if npm registry is slow
    const output = execSync('npm view react versions --json', {
      timeout: 10000,
    }).toString();
    const versions = JSON.parse(output) as string[];
    return versions.filter(
      (v) =>
        !v.includes('alpha') &&
        !v.includes('beta') &&
        !v.includes('rc') &&
        !v.includes('dev') &&
        !v.includes('canary')
    );
  } catch (error) {
    console.error(
      'Error fetching React versions, using fallback versions:',
      error
    );
    return REACT_FALLBACK_VERSIONS;
  }
}

export async function getNextVersions(): Promise<string[]> {
  try {
    const output = execSync('npm view next versions --json', {
      timeout: 10000,
    }).toString();
    const versions = JSON.parse(output) as string[];
    return versions.filter(
      (v) =>
        !v.includes('alpha') &&
        !v.includes('beta') &&
        !v.includes('rc') &&
        !v.includes('dev') &&
        !v.includes('canary')
    );
  } catch (error) {
    console.error(
      'Error fetching Next.js versions, using fallback versions:',
      error
    );
    return NEXT_FALLBACK_VERSIONS;
  }
}
