const palette = {
  black: {
    base: '#121417',
    alpha50: 'rgba(18, 20, 23, 0.5)',
    alpha20: 'rgba(18, 20, 23, 0.2)',
    alpha10: 'rgba(18, 20, 23, 0.1)',
  },
  green: {
    base: '#85AA9F',
    light: '#A5C0B8',
    success: '#3CBF61',
    alpha10: 'rgba(133, 170, 159, 0.10)',
    alpha40: 'rgba(rgba(252, 252, 252, 0.40)',
    progressLight: '#D4F8D3',
    progressDark: '#2BD627',
  },
  white: {
    pure: '#FFFFFF',
    off: '#FCFCFC',
    gray: '#F8F8F8',
    alpha30: 'rgba(252, 252, 252, 0.30)',
  },
  red: {
    base: '#D80027',
  },
  misc: {
    gainsboro: '#DBDBDB',
    cultured: 'rgba(133, 170, 159, 0.10);',
  },
} as const;

export const colors = {
  brand: {
    primary: palette.green.base,
    primaryHover: palette.green.light,
    primaryLight: palette.green.alpha10,
  },
  text: {
    primary: palette.black.base,
    secondary: palette.black.alpha50,
    disabled: palette.black.alpha20,
    success: palette.green.success,
    error: palette.red.base,
    inverse: palette.white.off,
  },
  background: {
    page: palette.white.off,
    white: palette.white.pure,
    secondary: palette.white.gray,
    overlay: palette.black.alpha50,
    overlayLight: palette.black.alpha20,
    hover: palette.green.alpha10,
  },
  border: {
    default: palette.black.alpha10,
    hover: palette.green.base,
    inputLight: palette.white.alpha30,
    inputAccentLight: palette.green.alpha40,
  },
  progress: {
    background: palette.green.progressLight,
    fill: palette.green.progressDark,
  },
  status: {
    success: palette.green.success,
    error: palette.red.base,
  },
  table: {
    border: palette.misc.gainsboro,
    row: palette.misc.cultured,
    cell: palette.white.off,
  },
  radio: {
    checked: palette.green.base,
    unchecked: palette.black.alpha20,
  },
} as const;

export type ColorPalette = typeof colors;
export type BrandColors = keyof typeof colors.brand;
export type TextColors = keyof typeof colors.text;
export type BackgroundColors = keyof typeof colors.background;
export type BorderColors = keyof typeof colors.border;
export type ProgressColors = keyof typeof colors.progress;
export type StatusColors = keyof typeof colors.status;
