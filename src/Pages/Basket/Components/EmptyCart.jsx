import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useLanguage } from '../../../context/LanguageContext';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7E929D',
  cream: '#F5F7FA',
};

const EmptyCart = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        sx={{
          fontSize: { xs: 60, md: 80 },
          mb: 3,
          color: COLORS.primary,
          opacity: 0.7,
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: 'inherit' }} />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: 20, md: 28 },
          fontWeight: 700,
          color: COLORS.primaryDark,
          mb: 1,
        }}
      >
        {t('Ваша корзина пуста')}
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          color: COLORS.textMuted,
          mb: 4,
          maxWidth: 400,
        }}
      >
        {t('Вы еще ничего не добавили в корзину. Начните покупки прямо сейчас!')}
      </Typography>

      <Button
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        sx={{
          bgcolor: COLORS.primary,
          color: '#fff',
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '10px',
          px: 4,
          py: 1.5,
          fontSize: 15,
          '&:hover': { bgcolor: '#4CB2D1' },
        }}
      >
        {t('Вернуться в магазин')}
      </Button>
    </Box>
  );
};

export default EmptyCart;
