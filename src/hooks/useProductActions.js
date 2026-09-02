import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';

export const useProductActions = () => {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorited } = useContext(FavoritesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAddToCart = (product, quantity = 1, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product, quantity);
  };

  const handleBuyNow = (product, quantity = 1, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product, quantity);
    navigate('/checkout', { state: { product, quantity } });
  };

  const handleFavorite = (product, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    toggleFavorite(product);
  };

  const goToProduct = (product, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!product?.id) return;
    navigate(`/product/${product.id}`);
  };

  return {
    handleAddToCart,
    handleBuyNow,
    handleFavorite,
    goToProduct,
    isFavorited,
    showAuthModal,
    setShowAuthModal,
  };
};
