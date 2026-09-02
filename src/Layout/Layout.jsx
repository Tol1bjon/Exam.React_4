import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    return (
        <Box>
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
}

export default Layout;
