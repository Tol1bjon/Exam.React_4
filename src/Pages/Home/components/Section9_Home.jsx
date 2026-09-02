import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo1 from '../../../assets/cybex-removebg-preview 1.png';
import logo2 from '../../../assets/Erbesi-Logo-removebg-preview 1.png';
import logo3 from '../../../assets/cybex-removebg-preview 1.png';
import logo4 from '../../../assets/Erbesi-Logo-removebg-preview 1.png';
import logo5 from '../../../assets/cybex-removebg-preview 1.png';
import logo6 from '../../../assets/Erbesi-Logo-removebg-preview 1.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

const Section9Home = () => {
    const sliderRef = useRef(null);

    const handleScrollLeft = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
            if (scrollLeft <= 10) {
                sliderRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: -250, behavior: 'smooth' });
            }
        }
    };

    const handleScrollRight = () => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: 250, behavior: 'smooth' });
            }
        }
    };

    return (
        <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ 
                maxWidth: { xs: '100%', md: '1450px' }, 
                margin: 'auto',
                py: { xs: 6, md: 8 }, 
                px: { xs: 2, md: 4 }, 
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    position: 'relative'
                }}
            >
                
                <Box 
                    onClick={handleScrollLeft}
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ 
                        minWidth: '40px',
                        height: '40px', 
                        borderRadius: '50%', 
                        border: '1px solid #334D5C', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        color: '#334D5C',
                        backgroundColor: '#FFFFFF',
                        zIndex: 2,
                        mr: { xs: 1, md: 2 }
                    }}
                >
                    <ArrowBackIcon sx={{ fontSize: '18px' }} />
                </Box>

                
                <Box 
                    ref={sliderRef}
                    sx={{ 
                        display: 'flex', 
                        gap: { xs: 3, md: 6 }, 
                        alignItems: 'center',
                        width: '100%',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        py: 2,
                        px: 1
                    }}
                >
                    {logos.map((logo, index) => (
                        <Box 
                            key={index}
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ scale: 1.08 }}
                            sx={{ 
                                minWidth: { xs: '140px', sm: '180px', md: '200px' },
                                height: { xs: '70px', md: '90px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                p: 1,
                                filter: 'grayscale(100%) opacity(0.7)',
                                transition: 'filter 0.3s ease',
                                '&:hover': {
                                    filter: 'grayscale(0%) opacity(1)'
                                }
                            }}
                        >
                            <Box 
                                component="img"
                                src={logo}
                                alt={`brand-logo-${index + 1}`}
                                sx={{ 
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                
                <Box 
                    onClick={handleScrollRight}
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ 
                        minWidth: '40px',
                        height: '40px', 
                        borderRadius: '50%', 
                        border: '1px solid #334D5C', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        color: '#334D5C',
                        backgroundColor: '#FFFFFF',
                        zIndex: 2,
                        ml: { xs: 1, md: 2 }
                    }}
                >
                    <ArrowForwardIcon sx={{ fontSize: '18px' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Section9Home;