import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7E929D',
};

const AuthRequiredModal = ({ open, onClose, onLogin, onRegister }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin?.();
  };

  const handleRegister = () => {
    onClose?.();
    navigate('/registration');
  };

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
          onClick={onClose}
        >
          <Box
            component={motion.div}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: '#fff',
              borderRadius: '16px',
              p: { xs: 2.5, sm: 3.5 },
              boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.15)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <IconButton
              component={motion.button}
              whileHover={{ rotate: 90 }}
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                color: COLORS.textMuted,
                p: 0.5,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* Icon */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              sx={{
                width: 60,
                height: 60,
                bgcolor: '#FFE8E8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
              }}
            >
              <LockOutlinedIcon sx={{ color: '#FF6B6B', fontSize: 28 }} />
            </Box>

            {/* Title */}
            <Typography
              sx={{
                fontSize: { xs: 18, sm: 20 },
                fontWeight: 700,
                color: COLORS.primaryDark,
                textAlign: 'center',
                mb: 1.5,
              }}
            >
              Требуется вход в аккаунт
            </Typography>

            {/* Message */}
            <Typography
              sx={{
                fontSize: 13,
                color: COLORS.textMuted,
                textAlign: 'center',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Вы не можете ничего класть в корзину или заказать моментально, пока не зайдёте в свой аккаунт. Если у вас нет аккаунта, вы можете зарегистрироваться.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                fullWidth
                sx={{
                  bgcolor: COLORS.primary,
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  py: 1.2,
                  fontSize: 14,
                  '&:hover': { bgcolor: '#4CB2D1' },
                }}
              >
                Вход
              </Button>

              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegister}
                fullWidth
                sx={{
                  border: `1.5px solid ${COLORS.primary}`,
                  color: COLORS.primary,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '8px',
                  py: 1.2,
                  fontSize: 14,
                  bgcolor: '#fff',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(137, 210, 248, 0.08)',
                    borderColor: '#4CB2D1',
                  },
                }}
              >
                Регистрация
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
