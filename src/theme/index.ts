import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary?: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#6E866B',
        },
        secondary: {
            main: '#DD6048',
        },
        tertiary: {
            main: '#F5A50D',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, sans-serif',
    },
});

export default theme;