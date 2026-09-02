import React from 'react';
import { Box, Typography } from '@mui/material';
import vector from '../../../assets/Vector.png';
import kids from '../../../assets/brytny-com-C4rXIFSzEXk-unsplash-removebg 1.png';
import Button from '../../../Layout/Button';

const Section5Home = () => {
    return (
        <Box sx={{py: { xs: 4, md: 8 }, boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.04)', marginY: "100px"}}>
        <Box 
            sx={{ 
                maxWidth: { xs: '100%', md: '1450px' }, 
                margin: 'auto',
                px: { xs: 2, md: 4 }, 
                boxSizing: 'border-box',
            }}
        >
            <Box 
                sx={{ 
                    position: 'relative',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: { xs: 4, md: 6 },
                    px: { xs: 3, md: 8 },
                    gap: 4
                }}
            >
                {/* Текстовая часть и кнопка */}
                <Box 
                    sx={{ 
                        zIndex: 2, 
                        maxWidth: { xs: '100%', md: '550px' },
                        textAlign: { xs: 'center', md: 'left' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        gap: 3
                    }}
                >
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            fontFamily: '"Balsamiq Sans", sans-serif', 
                            fontOpticalSizing: "auto", 
                            fontWeight: "400", 
                            fontStyle: "normal", 
                            color: "#446B80",
                            fontSize: { xs: '26px', sm: '32px', md: '42px' },
                            lineHeight: 1.2
                        }}
                    >
                        Все детские костюмы с акцией 10%
                    </Typography>

                    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
                        <Button text={"Смотреть костюмы"} />
                    </Box>
                </Box>

                {/* Блок с фоновым вектором и картинкой ребенка */}
                <Box 
                    sx={{ 
                        position: {xs: "relative", md: "absolute"}, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: { xs: '100%', md: '500px' },
                        height: { xs: '280px', sm: '350px', md: '400px' }
                    }}
                >
                    {/* Векторный фон */}
                    <Box 
                        component="img"
                        src={vector}
                        alt="background shape"
                        sx={{ 
                            position: 'absolute',
                            left: {xs: "auto", md: "550px"},
                            width: { xs: '260px', sm: '320px', md: '800px' },
                            height: 'auto',
                            objectFit: 'contain',
                            zIndex: 1,
                            opacity: 0.9,
                            bottom: {xs: "auto", md: "0"}
                        }}
                    />

                    {/* Картинка ребенка */}
                    <Box 
                        component="img"
                        src={kids}
                        alt="kids costume"
                        sx={{ 
                            position: 'absolute',
                            width: { xs: '210px', sm: '260px', md: '500px' },
                            height: 'auto',
                            objectFit: 'contain',
                            zIndex: {xs: 2, md: 1},
                            bottom: 0,
                            left: {xs: "auto", md: "700px"}
                        }}
                    />
                </Box>
            </Box>
        </Box>
        </Box>
    );
};

export default Section5Home;