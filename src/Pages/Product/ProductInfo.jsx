import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Tabs,
  Tab,
  IconButton,
  Modal,
} from '@mui/material';
import { NavLink, useParams } from 'react-router';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { getCards } from '../../API/cardsData';
import { enrichProduct, formatPrice } from '../../utils/furniture';
import { useProductActions } from '../../hooks/useProductActions';
import AuthRequiredModal from '../../Layout/AuthRequiredModal';

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [tab, setTab] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [imageOpen, setImageOpen] = useState(false);
  const { handleAddToCart, handleFavorite, isFavorited, showAuthModal, setShowAuthModal } = useProductActions();

  useEffect(() => {
    getCards().then((data) => {
      const found = (Array.isArray(data) ? data : []).find((item) => String(item.id) === String(id));
      if (found) {
        const enriched = enrichProduct(found);
        setProduct(enriched);
        setSelectedColor(enriched.colors?.[0] || '');
      }
    }).catch(() => setProduct(null));
  }, [id]);

  if (!product) {
    return <Typography sx={{ p: 4, textAlign: 'center' }}>Загрузка...</Typography>;
  }

  const liked = isFavorited(product.id);
  const specs = product.specifications || {};

  return (
    <Box sx={{ maxWidth: 1450, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <Breadcrumbs sx={{ fontSize: 13, color: '#7E929D', mb: 3 }}>
        <MuiLink component={NavLink} to="/" underline="hover" color="inherit">Главная</MuiLink>
        <MuiLink component={NavLink} to="/children-furniture" underline="hover" color="inherit">Детская мебель</MuiLink>
        <Typography sx={{ fontSize: 13, color: '#334D5C' }}>{product.title}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, gap: 5, mb: 5 }}>
        <Box
          onClick={() => setImageOpen(true)}
          sx={{
            bgcolor: '#F7F9FB',
            borderRadius: '16px',
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-in',
            minHeight: 420,
          }}
        >
          <Box component="img" src={product.image} alt={product.title} sx={{ maxWidth: '100%', maxHeight: 380, objectFit: 'contain' }} />
        </Box>

        <Box>
          <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: '#2F3E4E', mb: 2 }}>
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', color: '#C9D4DC' }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarBorderIcon key={index} fontSize="small" />
              ))}
            </Box>
            <Typography sx={{ fontSize: 13, color: '#7E929D' }}>
              {product.reviewsCount ? `${product.reviewsCount} отзывов` : 'Нет отзывов'}
            </Typography>
            <Box
              onClick={(event) => handleFavorite(product, event)}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.8, cursor: 'pointer', color: liked ? '#ff5252' : '#5FC2DE' }}
            >
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              <Typography sx={{ fontSize: 14 }}>{liked ? 'В избранном' : 'В избранное'}</Typography>
            </Box>
          </Box>

          {product.colors?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontSize: 14, mb: 1 }}>Цвет: {selectedColor}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {product.colors.map((color) => (
                  <Box
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '6px',
                      border: selectedColor === color ? '2px solid #5FC2DE' : '1px solid #D7DEE4',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 9,
                      px: 0.5,
                      textAlign: 'center',
                    }}
                  >
                    {color}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Typography sx={{ fontSize: 36, fontWeight: 800, color: '#2F3E4E', mb: 3 }}>
            {formatPrice(product.price)}
          </Typography>

          <Button
            type="button"
            onClick={(event) => handleAddToCart(product, 1, event)}
            sx={{
              bgcolor: '#5FC2DE',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 700,
              px: 6,
              py: 1.4,
              borderRadius: '8px',
              mb: 2,
              '&:hover': { bgcolor: '#4CB2D1' },
            }}
          >
            В корзину
          </Button>

          <Typography sx={{ fontSize: 13, color: '#7E929D' }}>Код товара: {product.article || product.id}</Typography>
          <Typography sx={{ fontSize: 13, color: '#5FC2DE', mt: 0.5, cursor: 'pointer' }}>Подробнее о доставке</Typography>
        </Box>
      </Box>

      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ borderBottom: '1px solid #E8EEF2', mb: 3 }}>
        <Tab label="Описание" />
        <Tab label="Характеристики" />
        <Tab label="Отзывы" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Typography sx={{ color: '#3A4B63', lineHeight: 1.8, mb: 2 }}>{product.description}</Typography>
          <Box component="ul" sx={{ color: '#3A4B63', pl: 3 }}>
            {(product.features || []).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </Box>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          {Object.entries(specs).map(([key, value]) => (
            <Box key={key} sx={{ display: 'flex', gap: 2, py: 1, borderBottom: '1px solid #F0F3F6' }}>
              <Typography sx={{ minWidth: 220, color: '#7E929D' }}>{key}</Typography>
              <Typography sx={{ color: '#334D5C' }}>{value}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {tab === 2 && (
        <Box>
          {(product.reviews || []).length === 0 ? (
            <Typography sx={{ color: '#7E929D' }}>Пока нет отзывов</Typography>
          ) : (
            product.reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 3, p: 2, bgcolor: '#F7F9FB', borderRadius: '12px' }}>
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{review.author}</Typography>
                <Typography sx={{ fontSize: 12, color: '#7E929D', mb: 1 }}>{review.date}</Typography>
                <Typography sx={{ mb: 0.5 }}><b>Плюсы:</b> {review.pros}</Typography>
                <Typography sx={{ mb: 0.5 }}><b>Минусы:</b> {review.cons}</Typography>
                <Typography>{review.comment}</Typography>
              </Box>
            ))
          )}
        </Box>
      )}

      <Modal open={imageOpen} onClose={() => setImageOpen(false)}>
        <Box
          onClick={() => setImageOpen(false)}
          sx={{
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{
              bgcolor: '#fff',
              borderRadius: '16px',
              p: { xs: 3, md: 6 },
              position: 'relative',
              maxWidth: 900,
              width: '100%',
            }}
          >
            <IconButton onClick={() => setImageOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
            <Box component="img" src={product.image} alt={product.title} sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductInfo;
