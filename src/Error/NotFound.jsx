import React from 'react';
import logo from '../assets/Mask Group.png';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItem: 'center',
                minHeight: '100vh',
                px: { xs: 2, md: 4 },
                py: 3
            }}
        >
            {/* Шапка с логотипом */}
            <Box 
                component={Link} 
                to="/" 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    textDecoration: 'none',
                    gap: 1.5,
                    mb: { xs: 6, md: 10 }
                }}
            >
                <Box 
                    component="img" 
                    src={logo} 
                    alt="Логотип" 
                    sx={{ width: { xs: '35px', md: '45px' }, height: 'auto' }} 
                />
                <Typography 
                    sx={{ 
                        color: '#446B80', 
                        fontSize: { xs: '11px', md: '13px' },
                        lineHeight: 1.2,
                        maxWidth: '170px',
                        fontFamily: '"Balsamiq Sans", sans-serif'
                    }}
                >
                    Онлайн гипермаркет товаров для детей
                </Typography>
            </Box>

            {/* Основной контент 404 */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    my: 'auto',
                    pb: 10
                }}
            >
                <Typography 
                    variant='h1' 
                    sx={{ 
                        color: '#7195A8', 
                        fontFamily: '"Balsamiq Sans", sans-serif', 
                        fontWeight: "400", 
                        fontSize: { xs: '90px', md: '140px' },
                        lineHeight: 1,
                        mb: 2
                    }}
                >
                    404
                </Typography>

                <Typography 
                    variant='h2' 
                    sx={{ 
                        color: '#334D5C', 
                        fontFamily: '"Balsamiq Sans", sans-serif', 
                        fontWeight: "600", 
                        fontSize: { xs: '20px', md: '28px' },
                        mb: 1.5
                    }}
                >
                    Страница не найдена
                </Typography>

                <Typography 
                    sx={{ 
                        color: '#7E929D', 
                        fontFamily: '"Balsamiq Sans", sans-serif', 
                        fontSize: { xs: '13px', md: '15px' },
                        maxWidth: '380px',
                        mb: 4,
                        lineHeight: 1.4
                    }}
                >
                    Мы не можем найти страницу, которую вы ищете. Она может быть еще не зарегистрирована или её не существует
                </Typography>

                <Button 
                    component={Link}
                    to="/"
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#72B5E8',
                        color: '#fff',
                        fontFamily: '"Balsamiq Sans", sans-serif',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 4,
                        py: 1.2,
                        fontSize: { xs: '14px', md: '16px' },
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#5ea3d6',
                            boxShadow: 'none'
                        }
                    }}
                >
                    На главную
                </Button>
            </Box>
        </Box>
    );
}

export default NotFound;