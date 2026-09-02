import React, { useState, useContext } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import { motion } from 'motion/react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const COLORS = {
  primary: '#89D2F8',
  text: '#3A4B63',
  border: '#CCD6DD',
};

const RecoveryPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email) {
      setError('Пожалуйста, введите email');
      return;
    }

    const result = resetPassword(email);
    if (result.success) {
      navigate('/thank-you');
    } else {
      setError(result.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleReset();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        bgcolor: '#fff',
        p: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: '#fff',
          p: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 26, md: 32 },
            fontWeight: 700,
            color: COLORS.text,
            mb: 3,
            textAlign: 'left',
            lineHeight: 1.2,
          }}
        >
          Восстановление пароля
        </Typography>

        <Box sx={{ mb: 2.5 }}>
          <InputBase
            fullWidth
            type="email"
            placeholder="Ваш электронный адрес"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            sx={{
              border: `1px solid ${error ? '#ff6b6b' : COLORS.border}`,
              borderRadius: '8px',
              px: 2,
              py: 1.2,
              fontSize: 14,
              color: COLORS.text,
              transition: 'all 0.25s ease',
              '& input::placeholder': {
                color: '#A0B0BC',
                opacity: 1,
              },
            }}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography sx={{ fontSize: 12, color: '#ff6b6b', mt: 1 }}>
                {error}
              </Typography>
            </motion.div>
          )}
        </Box>

        <Button
          component={motion.button}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          fullWidth
          sx={{
            bgcolor: COLORS.primary,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
            py: 1.4,
            fontSize: 15,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#72C4F0', boxShadow: 'none' },
            transition: 'all 0.25s ease',
          }}
        >
          Восстановить пароль
        </Button>
      </Box>
    </Box>
  );
};

export default RecoveryPassword;