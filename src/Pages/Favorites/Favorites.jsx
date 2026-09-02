import React, { useContext } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router';
import { useProductActions } from '../../hooks/useProductActions';
import AuthRequiredModal from '../../Layout/AuthRequiredModal';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  gray: '#7E929D',
  lightGray: '#E8EEF2',
};

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const { handleAddToCart, showAuthModal, setShowAuthModal } = useProductActions();

  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          maxWidth: '1450px',
          margin: 'auto',
          py: { xs: 6, md: 12 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Balsamiq Sans", sans-serif',
            color: COLORS.primaryDark,
            mb: 3,
            fontSize: { xs: '24px', md: '32px' },
          }}
        >
          Ваши избранные товары пусты
        </Typography>
        <Typography sx={{ color: COLORS.gray, mb: 4 }}>
          Добавьте товары, которые вам нравятся, нажав на сердечко
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: COLORS.primary,
            color: '#fff',
            padding: '12px 32px',
            fontSize: '14px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: COLORS.primaryDark,
            },
          }}
        >
          Вернуться в магазин
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '1450px',
        margin: 'auto',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Balsamiq Sans", sans-serif',
          color: COLORS.primaryDark,
          mb: 6,
          fontSize: { xs: '24px', md: '32px' },
        }}
      >
        Избранные товары ({favorites.length})
      </Typography>

      <Grid container spacing={3}>
        <AnimatePresence mode="popLayout">
          {favorites.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {/* Иконка сердца */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 2,
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton
                        onClick={() => removeFromFavorites(product.id)}
                        sx={{
                          backgroundColor: '#fff',
                          color: '#FF6B6B',
                          width: 44,
                          height: 44,
                          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#FF5252',
                          },
                        }}
                      >
                        <FavoriteIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </motion.div>
                  </Box>

                  {/* Изображение */}
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.title}
                    onClick={() => navigate(`/Product/${product.id}`)}
                    sx={{
                      objectFit: 'contain',
                      padding: 2,
                      backgroundColor: COLORS.lightGray,
                      cursor: 'pointer',
                    }}
                  />

                  {/* Содержание */}
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: '14px',
                        color: COLORS.gray,
                        mb: 1,
                      }}
                    >
                      {product.article}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: COLORS.primaryDark,
                        mb: 2,
                        minHeight: '40px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: COLORS.primary,
                        mb: 3,
                      }}
                    >
                      {product.price} ₽
                    </Typography>

                    {/* Кнопки */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            backgroundColor: COLORS.primary,
                            color: '#fff',
                            padding: '10px 16px',
                            fontSize: '13px',
                            borderRadius: '6px',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: COLORS.primaryDark,
                            },
                          }}
                        >
                          В корзину
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          onClick={() => removeFromFavorites(product.id)}
                          sx={{
                            color: COLORS.gray,
                            '&:hover': {
                              color: '#FF6B6B',
                              backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );
};

export default Favorites;
