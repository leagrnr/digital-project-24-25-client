import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const actionStyle = {
        '& .MuiBottomNavigationAction-label': {
            fontSize: '2vw',
            '&.Mui-selected': {
                fontSize: '2.25vw',
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
            }}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Accueil" icon={<HomeOutlinedIcon />} sx={actionStyle} />
                <BottomNavigationAction label="Tableau de bord" icon={<SpaceDashboardOutlinedIcon />} sx={actionStyle} />
                <BottomNavigationAction label="Cours" icon={<BookOutlinedIcon />} sx={actionStyle} />
                <BottomNavigationAction label="Quiz" icon={<QuizOutlinedIcon />} sx={actionStyle} />
            </BottomNavigation>
        </Box>
    );
}
