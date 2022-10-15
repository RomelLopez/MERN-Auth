import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import { authActions } from '../store';
axios.defaults.withCredentials = true

function Header() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const sendLogoutReq = async () => {
        const res = await axios.post("https://immense-forest-91733.herokuapp.com/api/logout", null, {
            withCredentials: true,
        });
        if (res.status === 200) {
            return res
        }
        return new Error("Unable to logout. Please try again.")
    };

    const handleLogout = () => {
        sendLogoutReq().then(() => dispatch(authActions.logout()))
    };

    const [value, setValue] = useState()

    return (
        <div>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h3'>
                        MernAuth
                    </Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs
                            indicatorColor='secondary'
                            onChange={(e, val) => setValue(val)}
                            value={value}
                            textColor='inherit'
                        >
                            {!isLoggedIn && (
                                <>
                                    {" "}
                                    <Tab to="/login" LinkComponent={Link} label="Login" />
                                    <Tab to="/signup" LinkComponent={Link} label="Sign Up" />
                                </>
                            )}
                            {isLoggedIn && (
                                <Tab
                                    onClick={handleLogout}
                                    to="/"
                                    LinkComponent={Link}
                                    label="Logout"
                                />
                            )}{" "};
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

//materialui css
//appbar is sticky to place it above otherwise information from other components hidden behind

export default Header