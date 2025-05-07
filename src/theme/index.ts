import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // ou 'dark'
        primary: {
            main: '#6E866B',
        },
        secondary: {
            main: '#DD6048',
        },
        tertiary: {
            main: '#F5A50D',
        }
    },
    typography: {
        fontFamily: 'Inter, Roboto, sans-serif',
    },
});

export default theme;