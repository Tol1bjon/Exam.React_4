import React, { useContext } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyCart from './Components/EmptyCart';
import CartItemsList from './Components/CartItemsList';
import CartSummary from './Components/CartSummary';
import Section2_basket from './Components/Section2_basket';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7E929D',
  border: '#CCD6DD',
  cream: '#F5F7FA',
};

const Basket = () => {
  const { cartItems, clearCart, getTotalPrice, getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <>
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        bgcolor: '#fff',
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              color: COLORS.primaryDark,
              mb: 1,
            }}
          >
            В корзине {getTotalItems()} товар{getTotalItems() !== 1 ? 'а' : ''}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: COLORS.textMuted,
            }}
          >
            Проверьте выбранные товары и оформите покупку
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 380px' },
              gap: { xs: 3, md: 4 },
              alignItems: 'flex-start',
            }}
          >
            {/* Items List */}
            <CartItemsList items={cartItems} />

            {/* Summary */}
            <CartSummary totalPrice={getTotalPrice()} totalItems={getTotalItems()} />
          </Box>
        )}
      </Box>
    </Box>
    <Section2_basket/>
    </>
  );
};

export default Basket;
