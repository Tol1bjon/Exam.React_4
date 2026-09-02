import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const COLORS = {
  primary: '#5FC2DE',
  text: '#3A4B63',
  border: '#ECEEF1',
  cream: '#FBF6EF',
};

const ThankYou = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        py: 4,
      }}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          textAlign: 'center',
          bgcolor: '#fff',
          borderRadius: '16px',
          p: { xs: 3, md: 5 },
          maxWidth: 500,
          boxShadow: '0 10px 40px rgba(20, 40, 60, 0.12)',
        }}
      >
        <motion.div variants={itemVariants}>
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{ mb: 2 }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: COLORS.primary,
              }}
            />
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              color: COLORS.text,
              mb: 1,
            }}
          >
            Спасибо!
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            sx={{
              fontSize: 16,
              color: '#7C8CA1',
              mb: 0.5,
              lineHeight: 1.6,
            }}
          >
            Письмо с инструкциями по восстановлению пароля
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            sx={{
              fontSize: 16,
              color: '#7C8CA1',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            отправлена на ваш электронный адрес
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            sx={{
              fontSize: 13,
              color: COLORS.text,
              fontWeight: 500,
              mb: 3,
              p: 2,
              bgcolor: COLORS.cream,
              borderRadius: '10px',
              border: `1px solid ${COLORS.border}`,
            }}
          >
            Пожалуйста проверьте спам, если не видите письмо
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            fullWidth
            sx={{
              bgcolor: COLORS.primary,
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '10px',
              py: 1.3,
              fontSize: 15,
              '&:hover': { bgcolor: '#4CB2D1' },
              transition: 'all 0.25s ease',
            }}
          >
            На главную
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ThankYou;
