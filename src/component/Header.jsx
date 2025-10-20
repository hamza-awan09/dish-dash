import { useState } from 'react';
import { useAuth } from '../context/Auth';
import logo from '../assets/images/logo.png';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Login from './Login';
import SignUp from './SignUp';

export default function Header() {
    const { currentUser, logout, isAuthenticated } = useAuth();
    const [loginOpen, setLoginOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickOpen = () => {
        setLoginOpen(true);
    };

    const handleClickClose = () => {
        setLoginOpen(false);
    };

    const handleClickSignUpOpen = () => {
        setSignUpOpen(true);
    };

    const handleClickSignUpClose = () => {
        setSignUpOpen(false);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        handleMenuClose();
    };

    const [language, setLanguage] = useState("EN");
    const handleChange = (e) => {
        setLanguage(e.target.value)
        console.log(e.target.value)
    }

    return (
        <header className='py-3 shadow-[0px_0px_24px_0px_rgba(0,0,0,0.16)]'>
            <div className="mx-[20px] md:mx-[32px] lg:mx-auto lg:w-[960px] xl:w-[1140px] 2xl:w-[1325px]">
                <div className="grid grid-cols-2 gap-2 items-center">
                    <div className="logo">
                        <img src={logo} alt="logo" className='w-[130px]' />
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        {!isAuthenticated ? (
                            <>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Login
                                </Button>
                                <Button variant="contained" onClick={handleClickSignUpOpen}>
                                    Sign up for free delivery
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="text"
                                    onClick={handleMenuOpen}
                                    startIcon={<PersonIcon />}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    sx={{ color: 'text.primary' }}
                                >
                                    {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'My Account'}
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    onClick={handleMenuClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.16))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        {currentUser?.displayName && (
                                            <div className="font-medium">{currentUser.displayName}</div>
                                        )}
                                        <div className="text-gray-500">{currentUser?.email}</div>
                                    </div>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <LanguageIcon className="text-color-brandBlack" />
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 'content', margin: 0 }}>
                                <Select
                                    value={language}
                                    onChange={handleChange}
                                    autoWidth
                                    disableUnderline
                                    IconComponent={(props) => (<KeyboardArrowDownIcon {...props} sx={{ fill: "#2E3138" }} />)}
                                    renderValue={(selected) => selected}
                                >
                                    <MenuItem value="EN">English</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <IconButton aria-label="cart" size="large" color="secondary" disabled sx={{
                            "&.Mui-disabled": {
                                backgroundColor: "#f4f5f5",
                                color: "#B7BABC",
                                opacity: 1,
                            },
                        }}>
                            <LocalMallIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <Login open={loginOpen} onClose={handleClickClose} />
            <SignUp open={signUpOpen} onClose={handleClickSignUpClose} />
        </header >
    );
}