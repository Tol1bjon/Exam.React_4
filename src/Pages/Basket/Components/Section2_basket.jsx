import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { getCards as getCardsData } from '../../../API/cardsData';
import Button from '../../../Layout/Button';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // можно оставить ваш импорт
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useProductActions } from '../../../hooks/useProductActions';
import AuthRequiredModal from '../../../Layout/AuthRequiredModal';
import { useLanguage } from '../../../context/LanguageContext';

const Section2_basket = () => {
    const [cards, setCards] = useState([]);
    const sliderRef = useRef(null);
    const { handleAddToCart, handleBuyNow, handleFavorite, isFavorited, showAuthModal, setShowAuthModal } = useProductActions();
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

    const handleScrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
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
                maxWidth: { xs: "100%", md: "1450px" }, 
                margin: "auto",
                py: 8, 
                px: 2, 
                boxSizing: 'border-box',
                overflowX: 'hidden' 
            }}
        >
            <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
            
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
                {t('С этим покупают')}
            </Typography>

            
            <Box 
                ref={sliderRef}
                sx={{ 
                    display: 'flex', 
                    gap: 3, 
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    width: '100%',
                    mb: 4,
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                    px: { xs: 1, md: 0 }
                }}
            >
                {cards.map((el, index) => {
                    const cardId = el.id || index;
                    const isFavorite = isFavorited(cardId);

                    return (
                        <Box 
                            key={cardId}
                            component={motion.div}
                            whileHover={{ y: -6, boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.08)' }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            sx={{ 
                                minWidth: { xs: 'calc(50% - 6px)', md: 'calc(25% - 18px)' },
                                maxWidth: { xs: 'calc(50% - 6px)', md: 'calc(25% - 18px)' },
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                p: { xs: 2, md: 3 },
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.04)',
                                boxSizing: 'border-box',
                                position: 'relative',
                                overflow: 'hidden',
                                scrollSnapAlign: 'start',
                                flexShrink: 0
                            }}
                        >
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Box 
                                    sx={{ 
                                        backgroundColor: '#E8F4F8', 
                                        color: '#334D5C', 
                                        fontSize: '11px', 
                                        fontWeight: 'bold', 
                                        px: 1.5, 
                                        py: 0.5, 
                                        borderRadius: '6px',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    NEW
                                </Box>
                                <Box 
                                    component={motion.div} 
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(event) => handleFavorite(el, event)}
                                    sx={{ 
                                        cursor: 'pointer', 
                                        color: isFavorite ? '#ff5252' : '#7E929D', 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        p: 0.5 // увеличивает область клика на мобильных
                                    }}
                                >
                                    {isFavorite ? (
                                        <FavoriteIcon sx={{ fontSize: '20px' }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ fontSize: '20px' }} />
                                    )}
                                </Box>
                            </Box>

                            
                            <Box 
                                component={motion.img}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                src={el.image} 
                                alt={el.title} 
                                sx={{ 
                                    width: '100%', 
                                    height: '160px', 
                                    objectFit: 'contain',
                                    my: 2 
                                }} 
                            />

                            
                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                <Typography sx={{ fontSize: { xs: '13px', md: '14px' }, fontWeight: '500', color: '#334D5C', mb: 1, lineHeight: 1.3, height: '36px', overflow: 'hidden' }}>
                                    {t(el.title || 'Коляска Riko Basic, Польша')}
                                </Typography>
                                <Typography sx={{ fontSize: { xs: '16px', md: '18px' }, fontWeight: 'bold', color: '#5BC0EB' }}>
                                    {el.price ? `${el.price} ₽` : '52 000 ₽'}
                                </Typography>
                            </Box>

                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
                                <Box component={motion.div} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={(event) => handleAddToCart(el, 1, event)} text={t('В корзину')} />
                                </Box>
                                
                                <Typography 
                                    component="span"
                                    onClick={(event) => handleBuyNow(el, 1, event)}
                                    sx={{ 
                                        fontSize: '11px', 
                                        color: '#7E929D', 
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        '&:hover': { color: '#334D5C', textDecoration: 'underline' }
                                    }}
                                >
                                    {t('Купить в один клик')}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                <Box 
                    onClick={handleScrollLeft}
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        border: '1px solid #7E929D', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        color: '#7E929D'
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: '14px', ml: '-2px' }} />
                </Box>
                <Box 
                    onClick={handleScrollRight}
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        border: '1px solid #7E929D', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        color: '#7E929D'
                    }}
                >
                    <ArrowForwardIosIcon sx={{ fontSize: '14px', mr: '-2px' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Section2_basket;