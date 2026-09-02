import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import one from '../../../assets/Group 42.png';
import two from '../../../assets/Group 43.png';
import three from '../../../assets/Group 44.png';
import four from '../../../assets/Group 45.png';
import { useLanguage } from '../../../context/LanguageContext';

const features = [
    { img: one, text: 'Все товары для детей в одном месте' },
    { img: two, text: 'Цены ниже, чем у конкурентов' },
    { img: three, text: 'Официальные дилеры лучших мировых производителей' },
    { img: four, text: 'Собственное эко-производство' }
];

const Section8Home = () => {
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
                py: { xs: 6, md: 10 }, 
                px: { xs: 2, md: 4 }, 
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}
        >
            {/* Заголовок секции */}
            <Typography 
                variant="h4" 
                sx={{ 
                    textAlign: 'center', 
                    fontFamily: '"Balsamiq Sans", sans-serif', 
                    fontOpticalSizing: "auto", 
                    fontWeight: "400", 
                    fontStyle: "normal", 
                    color: "#446B80",
                    mb: { xs: 4, md: 8 },
                    fontSize: { xs: '20px', sm: '24px', md: '32px' },
                    lineHeight: 1.3,
                    maxWidth: '900px',
                    mx: 'auto'
                }}
            >
                {t('Карапуз - это онлайн гипермаркет товаров для детей. С нами вырастают поколения!')}
            </Typography>

            {/* Сетка карточек */}
            <Box 
                sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: { xs: 2, md: 3 },
                    alignItems: 'stretch'
                }}
            >
                {features.map((item, index) => (
                    <Box 
                        key={index}
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -6, boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.08)' }}
                        sx={{ 
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            border: '1px solid #E2E8F0',
                            p: { xs: 2, md: 3 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)',
                            boxSizing: 'border-box',
                            minHeight: { xs: '160px', md: '200px' }
                        }}
                    >
                        <Box 
                            component={motion.img}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            src={item.img} 
                            alt={`feature-${index + 1}`}
                            sx={{ 
                                width: { xs: '50px', md: '70px' },
                                height: 'auto',
                                objectFit: 'contain',
                                mb: 2
                            }}
                        />
                        <Typography 
                            sx={{ 
                                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                                fontWeight: '500',
                                color: '#334D5C',
                                lineHeight: 1.3
                            }}
                        >
                            {t(item.text)}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Section8Home;