import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [menu, setMenu] = React.useState<string | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Détecte les écrans mobiles

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, menuName: string) => {
        setAnchorEl(event.currentTarget);
        setMenu(menuName);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenu(null);
    };

    const menuItems = {
        Accueil: [],
        "Tableau de bord": [],
        Cours: ["Ecologie", "Sécurité"],
        Quiz: ["Ecologie", "Sécurité"],
    };

    return (
        <AppBar position="fixed" color="default" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between", minHeight: "10vh !important" }} >
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <img src={Logo} alt="Logo" style={{ height: 40 }} />
                </Box>

                {isMobile ? (
                    <IconButton component={Link} to="/setting">
                        <AccountCircle sx={{ color: '#6E866B' }} />
                    </IconButton>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((label) => {
                                const hasMenu = menuItems[label].length > 0;
                                return (
                                    <div key={label}>
                                        {hasMenu ? (
                                            <>
                                                <Button
                                                    onClick={(e) => handleMenuOpen(e, label)}
                                                    aria-controls={menu === label ? "simple-menu" : undefined}
                                                    aria-haspopup="true"
                                                >
                                                    {label}
                                                </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={menu === label}
                                                    onClose={handleClose}
                                                >
                                                    {menuItems[label].map((item) => (
                                                        <MenuItem
                                                            key={item}
                                                            onClick={handleClose}
                                                            sx={{ color: '#6E866B' }}
                                                            component={Link}
                                                            to={`/${label.toLowerCase()}/${item}`}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </>
                                        ) : (
                                            <Button
                                                component={Link}
                                                to={label === "Accueil" ? "/" : label === "Tableau de bord" ? "/dashboard" : `/${label.toLowerCase().replace(/\s+/g, '-')}`}
                                            >
                                                {label}
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}

                            <Box
                                sx={{
                                    height: 24,
                                    borderLeft: '3px solid #6E866B',
                                    mx: 1,
                                }}
                            />
                        </Box>

                        <IconButton component={Link} to="/setting">
                            <AccountCircle sx={{ color: '#6E866B' }} />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}