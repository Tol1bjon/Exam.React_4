import React, { useContext } from 'react';
import { Box, Typography, IconButton, Card } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLanguage } from '../../../context/LanguageContext';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7E929D',
  border: '#CCD6DD',
  cream: '#F5F7FA',
};

const CartItemsList = ({ items }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const { t } = useLanguage();

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const handleIncrement = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {items.map((item, index) => {
          const price = parseFloat(item.price.toString().replace(/\s|₽/g, ''));
          const itemTotal = price * item.quantity;

          return (
            <Card
              key={item.id}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              sx={{
                display: 'flex',
                gap: 3,
                p: 3,
                mb: 2,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                bgcolor: '#fff',
                alignItems: 'center',
                '&:hover': {
                  boxShadow: '0px 6px 20px rgba(114, 181, 232, 0.1)',
                },
              }}
            >
              
              <Box
                component={motion.img}
                whileHover={{ scale: 1.05 }}
                src={item.image}
                alt={t(item.title)}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  borderRadius: '8px',
                  bgcolor: COLORS.cream,
                  p: 1,
                  flexShrink: 0,
                }}
              />

              
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    fontWeight: 600,
                    color: COLORS.text,
                    mb: 1,
                    lineHeight: 1.4,
                  }}
                >
                  {t(item.title)}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: COLORS.textMuted,
                    mb: 1.5,
                  }}
                >
                  {t('Артикул:')} {item.id}
                </Typography>

                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '6px',
                    width: 'fit-content',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleDecrement(item.id, item.quantity)}
                    sx={{ color: COLORS.primary, p: 0.5 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    sx={{
                      px: 1.5,
                      fontSize: 12,
                      fontWeight: 600,
                      color: COLORS.text,
                      minWidth: 20,
                      textAlign: 'center',
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleIncrement(item.id, item.quantity)}
                    sx={{ color: COLORS.primary, p: 0.5 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 2,
                  flexShrink: 0,
                }}
              >
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 12, md: 13 },
                      color: COLORS.textMuted,
                      mb: 0.5,
                    }}
                  >
                    {t('За 1 шт.')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 14, md: 16 },
                      fontWeight: 700,
                      color: COLORS.primary,
                    }}
                  >
                    {item.price}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: COLORS.textMuted,
                      mb: 0.5,
                    }}
                  >
                    {t('Всего')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: COLORS.primaryDark,
                    }}
                  >
                    {itemTotal.toLocaleString('ru-RU')} ₽
                  </Typography>
                </Box>

                <IconButton
                  component={motion.button}
                  whileHover={{ scale: 1.1, color: '#ff5252' }}
                  whileTap={{ scale: 0.9 }}
                  size="small"
                  onClick={() => handleDelete(item.id)}
                  sx={{ color: COLORS.textMuted, p: 0.5 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

export default CartItemsList;
