import React from 'react';
import { Box, Typography, IconButton, Button as MuiButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/furniture';
import { useProductActions } from '../hooks/useProductActions';
import AuthRequiredModal from './AuthRequiredModal';

const ProductCard = ({ product }) => {
  const { handleAddToCart, handleBuyNow, handleFavorite, goToProduct, isFavorited, showAuthModal, setShowAuthModal } = useProductActions();
  const liked = isFavorited(product.id);

  return (
    <Box
      component={motion.div}
      whileHover={{ y: -4, boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.08)' }}
      onClick={(event) => goToProduct(product, event)}
      sx={{
        height: '100%',
        backgroundColor: '#fff',
        border: '1px solid #E8EEF2',
        borderRadius: '12px',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      {product.isNew && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: '#5FC2DE',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            px: 1,
            py: 0.4,
            borderRadius: '4px',
            zIndex: 1,
          }}
        >
          NEW
        </Box>
      )}

      <IconButton
        onClick={(event) => handleFavorite(product, event)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: liked ? '#ff5252' : '#7E929D',
          zIndex: 2,
        }}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <Box
        component="img"
        src={product.image}
        alt={product.title}
        sx={{ width: '100%', height: 180, objectFit: 'contain', my: 1 }}
      />

      <Typography sx={{ fontSize: 14, color: '#334D5C', minHeight: 40, mb: 1, lineHeight: 1.3 }}>
        {product.title}
      </Typography>

      <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#5FC2DE', mb: 2 }}>
        {formatPrice(product.price)} <Box component="span" sx={{ fontSize: 12, fontWeight: 400, color: '#7E929D' }}>/ за шт</Box>
      </Typography>

      <MuiButton
        type="button"
        fullWidth
        onClick={(event) => handleAddToCart(product, 1, event)}
        sx={{
          bgcolor: '#5FC2DE',
          color: '#fff',
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '24px',
          py: 1,
          '&:hover': { bgcolor: '#4CB2D1' },
        }}
      >
        В корзину
      </MuiButton>

      <Typography
        onClick={(event) => handleBuyNow(product, 1, event)}
        sx={{
          mt: 1,
          textAlign: 'center',
          color: '#5FC2DE',
          fontSize: 13,
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        Купить в один клик
      </Typography>
    </Box>
  );
};

export default ProductCard;
