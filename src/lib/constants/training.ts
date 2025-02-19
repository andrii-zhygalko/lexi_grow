export const UI_CONFIG = {
  en: {
    flag: '#flag-ukraine',
    language: 'Ukrainian',
    placeholder: 'Enter translation',
    validationError: 'Please enter a valid English word/phrase',
  },
  ua: {
    flag: '#flag-united-kingdom',
    language: 'English',
    placeholder: 'Введіть переклад',
    validationError: 'Please enter a valid Ukrainian word/phrase',
  },
} as const;

export const VALIDATION_PATTERNS = {
  ua: /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
  en: /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
} as const;
