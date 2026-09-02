import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router';
import { getSaleItems } from '../../API/contentData';
import { useLanguage } from '../../context/LanguageContext';

const Sale = () => {
    const [sale, setSale] = useState([]);

    async function saleCards() {
        try {
            const data = await getSaleItems();
            setSale(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        saleCards();
    }, []);





    const navigate = useNavigate()
    const { t } = useLanguage();

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
                py: { xs: 4, md: 8 }, 
                px: { xs: 2, md: 4 }, 
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}
        >
            
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 2 }}>
                {t('Главная')} &nbsp;&gt;&nbsp; <Box component="span" sx={{ color: '#334D5C' }}>{t('Акции')}</Box>
            </Typography>

            
            <Typography 
                variant="h4" 
                sx={{ 
                    fontFamily: '"Balsamiq Sans", sans-serif', 
                    fontOpticalSizing: "auto", 
                    fontWeight: "400", 
                    fontStyle: "normal", 
                    color: "#446B80",
                    mb: { xs: 4, md: 6 },
                    fontSize: { xs: '24px', md: '36px' }
                }}
            >
                {t('Акции')}
            </Typography>

            
            <Box 
                sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: { xs: 4, md: 6 },
                    alignItems: 'start'
                }}
            >
                {sale.map((item, index) => (
                    <Box 
                        key={item.id || index}
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5
                        }}
                    >
                        
                        <Box 
                            component={NavLink} 
                            to={`/Sale/${item.id}`}
                            state={item}
                            sx={{ 
                                display: 'block',
                                width: '100%',
                                textDecoration: 'none',
                                borderRadius: '16px',
                                overflow: 'hidden'
                            }}
                        >
                            <Box 
                                component={motion.img}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                src={item.img} 
                                alt={item.title}
                                sx={{ 
                                    width: '100%',
                                    height: { xs: '180px', sm: '240px', md: '280px' },
                                    objectFit: 'cover',
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
                                    cursor: 'pointer',
                                    display: 'block'
                                }}
                            />
                        </Box>

                        
                        <Typography sx={{ fontSize: '13px', color: '#7E929D', mt: 0.5 }}>
                            {item.day}
                        </Typography>

                        
                        <Typography 
                            component={NavLink}
                            to={`/Sale/${item.id}`}
                            state={item}
                            sx={{ 
                                fontSize: { xs: '15px', md: '18px' },
                                fontWeight: 'bold',
                                color: '#334D5C',
                                lineHeight: 1.3,
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                '&:hover': { color: '#5BC0EB' }
                            }}
                        >
                            {t(item.title)}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Sale;