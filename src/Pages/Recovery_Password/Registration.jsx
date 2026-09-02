import React, { useState, useContext } from 'react';
import { Box, Typography, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { motion } from 'motion/react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const COLORS = {
  primary: '#89D2F8',
  text: '#3A4B63',
  border: '#CCD6DD',
};

const Registration = () => {
  const [formData, setFormData] = useState({
    name: 'Анна',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setErrors({ email: result.message });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  if (showSuccess) {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fff',
        }}
      >
        <Box
          component={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          sx={{
            textAlign: 'center',
            bgcolor: '#fff',
            borderRadius: '16px',
            p: 4,
            maxWidth: 400,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8 }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: COLORS.primary, mb: 2 }} />
          </motion.div>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: COLORS.text, mb: 1 }}>
            Регистрация успешна!
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#7C8CA1' }}>
            Добро пожаловать, {formData.name}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        bgcolor: '#fff',
        p: { xs: 3, md: 6 },
        maxWidth: {xs: '100%', md: "1450px"},
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
          Регистрация
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          
          <Box>
            <TextField
              fullWidth
              label="Имя"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  borderColor: COLORS.border,
                  '& fieldset': {
                    borderColor: errors.name ? '#ff6b6b' : COLORS.border,
                  },
                },
                '& .MuiInputLabel-root': { color: '#7E929D' }
              }}
            />
            {errors.name && (
              <Typography sx={{ fontSize: 12, color: '#ff6b6b', mt: 0.5 }}>
                {errors.name}
              </Typography>
            )}
          </Box>

          
          <Box>
            <TextField
              fullWidth
              type="email"
              label="Электронный адрес"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  borderColor: COLORS.border,
                  '& fieldset': {
                    borderColor: errors.email ? '#ff6b6b' : COLORS.border,
                  },
                },
                '& .MuiInputLabel-root': { color: '#7E929D' }
              }}
            />
            {errors.email && (
              <Typography sx={{ fontSize: 12, color: '#ff6b6b', mt: 0.5 }}>
                {errors.email}
              </Typography>
            )}
          </Box>

          
          <Box>
            <TextField
              fullWidth
              type="password"
              label="Пароль"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  borderColor: COLORS.border,
                  '& fieldset': {
                    borderColor: errors.password ? '#ff6b6b' : COLORS.border,
                  },
                },
                '& .MuiInputLabel-root': { color: '#7E929D' }
              }}
            />
            {errors.password && (
              <Typography sx={{ fontSize: 12, color: '#ff6b6b', mt: 0.5 }}>
                {errors.password}
              </Typography>
            )}
          </Box>

          
          <Box>
            <TextField
              fullWidth
              type="password"
              label="Повторите пароль"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  borderColor: COLORS.border,
                  '& fieldset': {
                    borderColor: errors.confirmPassword ? '#ff6b6b' : COLORS.border,
                  },
                },
                '& .MuiInputLabel-root': { color: '#7E929D' }
              }}
            />
            {errors.confirmPassword && (
              <Typography sx={{ fontSize: 12, color: '#ff6b6b', mt: 0.5 }}>
                {errors.confirmPassword}
              </Typography>
            )}
          </Box>

          
          <Box 
            sx={{ 
              border: `1px solid ${COLORS.border}`, 
              borderRadius: '8px', 
              p: 1.5, 
              maxWidth: '220px',
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography sx={{ color: '#7E929D', fontSize: '13px' }}>
              Вставить каптчу
            </Typography>
          </Box>

          
          <FormControlLabel 
            control={
              <Checkbox 
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                sx={{ 
                  color: COLORS.border,
                  '&.Mui-checked': { color: COLORS.primary }
                }} 
              />
            }
            label={
              <Typography sx={{ fontSize: '13px', color: '#7E929D' }}>
                Согласие с <Box component="span" sx={{ color: COLORS.primary }}>пользовательским соглашением</Box> и <Box component="span" sx={{ color: COLORS.primary }}>политикой конфиденциальности</Box>
              </Typography>
            }
          />
        </Box>

        <Button
          component={motion.button}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRegister}
          fullWidth
          sx={{
            bgcolor: COLORS.primary,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
            py: 1.4,
            mt: 3,
            fontSize: 15,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#72C4F0', boxShadow: 'none' },
            transition: 'all 0.25s ease',
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
};

export default Registration;