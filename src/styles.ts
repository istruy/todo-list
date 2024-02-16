import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundColor: Palette['primary'];
    white: Palette['primary'];
    greyActive: Palette['primary'];
  }

  interface PaletteOptions {
    backgroundColor?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    greyActive: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    backgroundColor: true;
    white: true;
    greyActive: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C4595',
    },
    secondary: {
      main: '#A5FEB4',
    },
    backgroundColor: {
      main: '#7380AA',
    },
    white: {
      main: '#f5f5f5',
    },
    greyActive: {
      main: '#ABAEB8',
    },
  },
});
