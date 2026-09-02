import { getCards as getCardsData } from '../../../API/cardsData';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button2 from '../../../Layout/Button2';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../../context/LanguageContext';

const Section3Home = () => {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const { t } = useLanguage();

    async function getCards() {
        try {
            const data = await getCardsData();
            setCards(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCards();
    }, []);

    const backgroundColors = ['#F5E1DF', '#FDF2E9', '#E6F2F8'];

    return (
        <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ 
                width: '100%', 
                py: 8, 
                px: 2, 
                boxSizing: 'border-box',
                overflowX: 'hidden' // Жестко пресекает появление горизонтального скролла
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
                    mb: 6,
                    fontSize: { xs: '24px', md: '32px' }
                }}
            >
                {t('Популярные категории')}
            </Typography>

            {/* Контейнер карточек */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    gap: 3, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                {cards.slice(0, 2).map((el, index) => (
                    <Box 
                        key={el.id || index}
                        component={motion.div}
                        whileHover={{ y: -6, boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.08)' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                        sx={{ 
                            width: { xs: '100%', md: '380px' }, // На мобилках ровно 100% от доступного места внутри px={2}
                            maxWidth: '100%',
                            height: '220px',
                            backgroundColor: backgroundColors[index % backgroundColors.length],
                            borderRadius: '16px',
                            p: { xs: 2, sm: 3 }, // Чуть меньше падинг на узких экранах, чтобы текст помещался
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
                            boxSizing: 'border-box', // Важно, чтобы padding не раздувал ширину за пределы 100%
                            overflow: 'hidden',
                        }}
                    >
                        {/* Левая часть: текст и кнопка */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', maxWidth: '160px' }}>
                            <Box>
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#334D5C', mb: 1, lineHeight: 1.2 }}>
                                    {el.title}
                                </Typography>
                                {/* Закомментированный блок с описанием можно вернуть при необходимости */}
                            </Box>
                            
                            <Box component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button2
                                    text={t('Смотреть')}
                                    onClick={() => navigate(`/product/${el.id}`)}
                                />
                            </Box>
                        </Box>

                        {/* Правая часть: картинка товара */}
                        <Box 
                            component={motion.img}
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            src={el.image} 
                            alt={el.title} 
                            sx={{ 
                                width: { xs: '130px', sm: '150px' }, 
                                height: { xs: '130px', sm: '150px' }, 
                                objectFit: 'contain' 
                            }} 
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Section3Home;