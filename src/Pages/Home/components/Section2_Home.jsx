import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { API } from '../../../API/API';
import axios from 'axios';
import Button from '../../../Layout/Button';
import AuthRequiredModal from '../../../Layout/AuthRequiredModal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../../../context/CartContext';
import { FavoritesContext } from '../../../context/FavoritesContext';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';

// Свайпер
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Section2Home = () => {
    const [cards, setCards] = useState([]);
    const [activeCardId, setActiveCardId] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [itemToAdd, setItemToAdd] = useState(null);
    const [cartItemAdded, setCartItemAdded] = useState(null);
    
    const { addToCart } = useContext(CartContext);
    const { toggleFavorite, isFavorited } = useContext(FavoritesContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const getCards = async () => {
        try {
            let { data } = await axios.get(API);
            setCards(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCards();
    }, []);

    const handleIncrease = (id, e) => {
        e.stopPropagation();
        setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
    };

    const handleDecrease = (id, e) => {
        e.stopPropagation();
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
    };

    const handleAddToCartClick = (product) => {
        if (!user) {
            setItemToAdd(product);
            setShowAuthModal(true);
        } else {
            const quantity = quantities[product.id] || 1;
            addToCart(product, quantity);
            setCartItemAdded(product.id);
            setActiveCardId(product.id);
            setTimeout(() => setCartItemAdded(null), 3000);
        }
    };

    const handleBuyNowClick = (product) => {
        if (!user) {
            setItemToAdd(product);
            setShowAuthModal(true);
        } else {
            const quantity = quantities[product.id] || 1;
            addToCart(product, quantity);
            navigate('/checkout', { state: { product, quantity } });
        }
    };

    const handleNavigateToBasket = () => {
        setActiveCardId(null);
        navigate('/Basket');
    };

    const handleLoginClick = () => {
        setShowAuthModal(false);
        // The header login modal will be shown from Header component
        // This just closes our auth modal
    };

    return (
        <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ width: '100%', py: 10 }}
        >
            <AuthRequiredModal 
                open={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLogin={handleLoginClick}
            />
            {/* Десктопная версия */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, justifyContent: 'center', overflow: 'visible' }}>
                {cards.slice(0, 2).map((el, index) => {
                    const isLiked = isFavorited(el.id);
                    const isOpen = activeCardId === el.id;
                    const count = quantities[el.id] || 1;

                    return (
                        <Box 
                            key={el.id} 
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.15 }}
                            whileHover={{ y: -6, boxShadow: '0px 12px 30px rgba(114, 181, 232, 0.2)' }}
                            sx={{ 
                                position: 'relative',
                                width: '480px',
                                p: 3,
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                overflow: 'visible', // Позволяет попапу выступать за границы, если нужно
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {/* Поп-ап на десктопе, сдвинутый правее внутри карточки */}
                            <AnimatePresence>
                                {isOpen && (
                                    <Box 
                                        component={motion.div}
                                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                        sx={{
                                            position: 'absolute',
                                            top: '100px',
                                            right: '-20px', // Смещаем правее, чтобы красиво накладывалось как на картинке
                                            width: '330px',
                                            backgroundColor: '#fff',
                                            borderRadius: '16px',
                                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.12)',
                                            zIndex: 20,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 2.5,
                                            border: '1px solid rgba(114, 181, 232, 0.2)'
                                        }}
                                    >
                                        <IconButton 
                                            onClick={() => setActiveCardId(null)}
                                            sx={{ position: 'absolute', top: 8, right: 8, color: '#334D5C', p: 0.5 }}
                                        >
                                            <CloseIcon sx={{ fontSize: '18px' }} />
                                        </IconButton>

                                        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#334D5C', mb: 2 }}>
                                            Товар добавлен в корзину
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                            <img src={el.image} alt={el.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                            <Typography sx={{ fontSize: '11px', color: '#334D5C', lineHeight: 1.2, flex: 1 }}>
                                                {el.title}
                                            </Typography>
                                            
                                            {/* Счетчик */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #72B5E8', borderRadius: '8px', px: 1, py: 0.5, gap: 1 }}>
                                                <button onClick={(e) => handleDecrease(el.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72B5E8', fontSize: '14px' }}>-</button>
                                                <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#334D5C', minWidth: '10px', textAlign: 'center' }}>{count}</Typography>
                                                <button onClick={(e) => handleIncrease(el.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72B5E8', fontSize: '14px' }}>+</button>
                                            </Box>
                                        </Box>

                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#72B5E8', mb: 2 }}>
                                            {el.price}
                                        </Typography>

                                        <Box 
                                            component="button"
                                            onClick={handleNavigateToBasket}
                                            sx={{
                                                width: '100%',
                                                py: 1.2,
                                                backgroundColor: 'transparent',
                                                border: '1px solid #72B5E8',
                                                borderRadius: '8px',
                                                color: '#334D5C',
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                '&:hover': { backgroundColor: '#72B5E8', color: '#fff' }
                                            }}
                                        >
                                            Перейти в корзину
                                        </Box>
                                    </Box>
                                )}
                            </AnimatePresence>

                            <IconButton 
                                component={motion.button}
                                whileTap={{ scale: 0.7 }}
                                whileHover={{ scale: 1.15 }}
                                onClick={(event) => toggleFavorite(el, event)}
                                sx={{ position: 'absolute', top: 12, right: 12, color: '#72B5E8' }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isLiked ? (
                                        <motion.span key="liked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: 'flex', alignItems: 'center' }}>
                                            <FavoriteIcon sx={{ color: '#ff4d4d' }} />
                                        </motion.span>
                                    ) : (
                                        <motion.span key="unliked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: 'flex', alignItems: 'center' }}>
                                            <FavoriteBorderIcon />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </IconButton>

                            <Box sx={{ maxWidth: '250px' }}>
                                <Typography sx={{ fontSize: '14px', color: '#334D5C', mb: 2, fontWeight: 500, lineHeight: 1.3 }}>
                                    {el.title}
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: '#72B5E8', mb: 2 }}>
                                    {el.price}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: "center" }}>
                                    <Box component={motion.div} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                        <Button onClick={() => handleAddToCartClick(el)} text={"В корзину"} />
                                    </Box>
                                    <Typography 
                                        component={motion.span}
                                        whileHover={{ color: '#5295c4' }}
                                        onClick={() => handleBuyNowClick(el)}
                                        sx={{ fontSize: '12px', color: '#7E929D', textAlign: 'center', cursor: 'pointer' }}
                                    >
                                        Купить в один клик
                                    </Typography>
                                </Box>
                            </Box>

                            <Box 
                                component={motion.img} 
                                whileHover={{ scale: 1.08, rotate: 2 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                src={el.image} 
                                alt={el.title} 
                                sx={{ width: '160px', height: '160px', objectFit: 'contain' }} 
                            />
                        </Box>
                    );
                })}
            </Box>

            {/* Мобильная версия (вторая картинка: модалка во весь экран с затенением) */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, px: 2 }}>
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1}
                    style={{ paddingBottom: '40px' }}
                >
                    {cards.slice(0, 2).map(el => {
                        const isLiked = isFavorited(el.id);
                        const isOpen = activeCardId === el.id;
                        const count = quantities[el.id] || 1;

                        return (
                            <SwiperSlide key={el.id}>
                                <Box 
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    sx={{ 
                                        position: 'relative',
                                        backgroundColor: '#fff',
                                        borderRadius: '16px',
                                        p: 3,
                                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    {/* Мобильная модалка на весь экран (как на второй картинке) */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <Box 
                                                component={motion.div}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                sx={{
                                                    position: 'fixed',
                                                    inset: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    zIndex: 1000,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    p: 2
                                                }}
                                            >
                                                <Box 
                                                    component={motion.div}
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.9, opacity: 0 }}
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: '340px',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '16px',
                                                        p: 3,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        textAlign: 'center',
                                                        position: 'relative',
                                                        boxShadow: '0px 10px 25px rgba(0,0,0,0.2)'
                                                    }}
                                                >
                                                    <IconButton 
                                                        onClick={() => setActiveCardId(null)}
                                                        sx={{ position: 'absolute', top: 12, right: 12, color: '#334D5C' }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>

                                                    <Typography sx={{ fontSize: '15px', fontWeight: 500, color: '#334D5C', mb: 2 }}>
                                                        Товар добавлен в корзину
                                                    </Typography>

                                                    <img src={el.image} alt={el.title} style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '12px' }} />

                                                    <Typography sx={{ fontSize: '12px', color: '#334D5C', mb: 2, px: 1, lineHeight: 1.3 }}>
                                                        {el.title}
                                                    </Typography>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: 1, mb: 3 }}>
                                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: '#72B5E8' }}>
                                                            {el.price}
                                                        </Typography>
                                                        
                                                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #72B5E8', borderRadius: '8px', px: 1.5, py: 0.5, gap: 2 }}>
                                                            <button onClick={(e) => handleDecrease(el.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72B5E8', fontSize: '16px' }}>-</button>
                                                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#334D5C' }}>{count}</Typography>
                                                            <button onClick={(e) => handleIncrease(el.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72B5E8', fontSize: '16px' }}>+</button>
                                                        </Box>
                                                    </Box>

                                                    <Box 
                                                        component="button"
                                                        onClick={handleNavigateToBasket}
                                                        sx={{
                                                            width: '100%',
                                                            py: 1.5,
                                                            backgroundColor: 'transparent',
                                                            border: '1px solid #72B5E8',
                                                            borderRadius: '8px',
                                                            color: '#334D5C',
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            '&:hover': { backgroundColor: '#72B5E8', color: '#fff' }
                                                        }}
                                                    >
                                                        Перейти в корзину
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )}
                                    </AnimatePresence>

                                    <IconButton 
                                        component={motion.button}
                                        whileTap={{ scale: 0.7 }}
                                        whileHover={{ scale: 1.15 }}
                                        onClick={(event) => toggleFavorite(el, event)}
                                        sx={{ position: 'absolute', top: 12, right: 12, color: '#72B5E8' }}
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {isLiked ? (
                                                <motion.span key="liked-mob" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FavoriteIcon sx={{ color: '#ff4d4d' }} />
                                                </motion.span>
                                            ) : (
                                                <motion.span key="unliked-mob" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FavoriteBorderIcon />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </IconButton>

                                    <Typography sx={{ fontSize: '13px', color: '#334D5C', mb: 2, fontWeight: 500, px: 2, lineHeight: 1.3 }}>
                                        {el.title}
                                    </Typography>

                                    <Box 
                                        component={motion.img} 
                                        whileHover={{ scale: 1.05 }}
                                        src={el.image} 
                                        alt={el.title} 
                                        sx={{ width: '180px', height: '180px', objectFit: 'contain', mb: 2 }} 
                                    />

                                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: '#72B5E8', mb: 2 }}>
                                        {el.price}
                                    </Typography>

                                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box component={motion.div} whileTap={{ scale: 0.97 }}>
                                            <Button onClick={() => handleAddToCartClick(el)} text={"В корзину"} />
                                        </Box>
                                        <Typography onClick={() => handleBuyNowClick(el)} sx={{ fontSize: '13px', color: '#72B5E8', cursor: 'pointer' }}>
                                            Купить в один клик
                                        </Typography>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Box>
        </Box>
    );
}

export default Section2Home;