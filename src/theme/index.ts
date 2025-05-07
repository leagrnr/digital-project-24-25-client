import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // ou 'dark'
        primary: {
            main: '#756e2c',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, sans-serif',
    },
});

export default theme;