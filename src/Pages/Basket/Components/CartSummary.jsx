import React, { useContext } from 'react';
import { Box, Typography, Button, Card, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { CartContext } from '../../../context/CartContext';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useLanguage } from '../../../context/LanguageContext';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7E929D',
  border: '#CCD6DD',
  cream: '#F5F7FA',
};

const CartSummary = ({ totalPrice, totalItems }) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { t } = useLanguage();

  const deliveryPrice = 300;
  const totalWithDelivery = totalPrice + deliveryPrice;

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        items: cartItems,
        deliveryPrice,
        total: totalWithDelivery,
        fromCart: true,
      },
    });
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      sx={{
        p: 3,
        borderRadius: '12px',
        border: `1px solid ${COLORS.border}`,
        bgcolor: '#fff',
        height: 'fit-content',
        position: { lg: 'sticky' },
        top: { lg: 100 },
      }}
    >
      
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: COLORS.primaryDark,
          mb: 2.5,
        }}
      >
        {t('Итого')}
      </Typography>

      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>
            {t('Стоимость товаров:')}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
            {totalPrice.toLocaleString('ru-RU')} ₽
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: COLORS.primary }} />
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>
              {t('Доставка:')}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
            {deliveryPrice} ₽
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, borderColor: COLORS.border }} />

      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          p: 1.5,
          bgcolor: COLORS.cream,
          borderRadius: '8px',
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
          {t('Итого к оплате:')}
        </Typography>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.primary,
          }}
        >
          {totalWithDelivery.toLocaleString('ru-RU')} ₽
        </Typography>
      </Box>

      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          fullWidth
          sx={{
            bgcolor: COLORS.primary,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            py: 1.5,
            fontSize: 14,
            '&:hover': { bgcolor: '#4CB2D1' },
          }}
        >
          {t('Оформить заказ')}
        </Button>

        <Button
          component={motion.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinueShopping}
          fullWidth
          sx={{
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text,
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            py: 1.5,
            fontSize: 14,
            bgcolor: '#fff',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: COLORS.cream,
              borderColor: COLORS.primary,
            },
          }}
        >
          {t('Продолжить покупки')}
        </Button>
      </Box>

      
      <Box
        sx={{
          mt: 3,
          p: 1.5,
          bgcolor: COLORS.cream,
          borderRadius: '8px',
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Typography sx={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6 }}>
          ✓ {t('Бесплатная доставка при покупке от 5000 ₽')} <br />
          ✓ {t('Возврат товара до 14 дней')} <br />
          ✓ {t('Гарантия на все товары')}
        </Typography>
      </Box>
    </Card>
  );
};

export default CartSummary;
