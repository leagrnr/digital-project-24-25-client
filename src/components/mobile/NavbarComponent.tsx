import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


export default function MobileNavigation() {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const actionStyle = {
        '&.Mui-selected': {
            color: theme.palette.tertiary?.main || theme.palette.primary.main,
        },
        '& .MuiBottomNavigationAction-label': {
            fontSize: '3vw',
            width: 'max-content',
            '&.Mui-selected': {
                fontSize: '3.5vw',
                width: 'max-content',
            },
        },
    };

    return (
        <Box
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                display: { xs: 'block', sm: 'none' },
                zIndex: (theme) => theme.zIndex.appBar + 1,
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="Accueil"
                    icon={<HomeOutlinedIcon />}
                    sx={actionStyle}
                    component={Link}
                    to="/"
                />
                <BottomNavigationAction
                    label="Tableau de bord"
                    icon={<SpaceDashboardOutlinedIcon />}
                    sx={actionStyle}
                    component={Link}
                    to="/dashboard"
                />
                <BottomNavigationAction
                    label="Cours"
                    icon={<BookOutlinedIcon />}
                    sx={actionStyle}
                    component={Link}
                    to="/lesson/Ecologie"
                />
                <BottomNavigationAction
                    label="Quiz"
                    icon={<QuizOutlinedIcon />}
                    sx={actionStyle}
                    component={Link}
                    to="/quiz/Ecologie"
                />
            </BottomNavigation>
        </Box>
    );
}
