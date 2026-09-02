import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const COLORS = {
  primary: '#89D2F8',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  gray: '#7E929D',
  lightGray: '#E8EEF2',
};

const PersonalData = () => {
  const { user, updateUserData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
      });
      setAvatar(user.avatar || `https://ui-avatars.com/api/?name=${user.email}`);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (updateUserData) {
      updateUserData({
        ...user,
        ...formData,
        avatar,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
      });
    }
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
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
        <Typography color="error">Пожалуйста, авторизуйтесь</Typography>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: '1000px',
        margin: 'auto',
        py: { xs: 6, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Balsamiq Sans", sans-serif',
          color: COLORS.primaryDark,
          mb: 6,
          fontSize: { xs: '24px', md: '32px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Личные данные
        {!isEditing && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              onClick={() => setIsEditing(true)}
              sx={{
                backgroundColor: COLORS.primary,
                color: '#fff',
                '&:hover': {
                  backgroundColor: COLORS.primaryDark,
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </motion.div>
        )}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          padding: { xs: 3, md: 4 },
          borderRadius: '12px',
          backgroundColor: '#f9fafb',
          border: `1px solid ${COLORS.lightGray}`,
        }}
      >
        {/* Avatar Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 4, borderBottom: `1px solid ${COLORS.lightGray}` }}>
          <Box sx={{ position: 'relative', mr: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: COLORS.primary,
                fontSize: '40px',
              }}
              src={avatar}
            >
              {user.email[0].toUpperCase()}
            </Avatar>
            {isEditing && (
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: COLORS.primary,
                    color: '#fff',
                    width: 36,
                    height: 36,
                    '&:hover': {
                      backgroundColor: COLORS.primaryDark,
                    },
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 18 }} />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </motion.div>
            )}
          </Box>
          <Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: COLORS.primaryDark }}>
              {formData.firstName || 'Пользователь'}
            </Typography>
            <Typography sx={{ fontSize: '14px', color: COLORS.gray }}>
              {formData.email}
            </Typography>
          </Box>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Имя
            </Typography>
            <TextField
              fullWidth
              value={formData.firstName}
              name="firstName"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Фамилия
            </Typography>
            <TextField
              fullWidth
              value={formData.lastName}
              name="lastName"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Email
            </Typography>
            <TextField
              fullWidth
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Телефон
            </Typography>
            <TextField
              fullWidth
              value={formData.phone}
              name="phone"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Адрес
            </Typography>
            <TextField
              fullWidth
              value={formData.address}
              name="address"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Город
            </Typography>
            <TextField
              fullWidth
              value={formData.city}
              name="city"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontSize: '12px', color: COLORS.gray, mb: 1, textTransform: 'uppercase' }}>
              Почтовый индекс
            </Typography>
            <TextField
              fullWidth
              value={formData.postalCode}
              name="postalCode"
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: isEditing ? '#fff' : COLORS.lightGray,
                  '& fieldset': {
                    borderColor: COLORS.lightGray,
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Action Buttons */}
        {isEditing && (
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: COLORS.primary,
                  color: '#fff',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: COLORS.primaryDark,
                  },
                }}
              >
                Сохранить
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ flex: 1 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleCancel}
                startIcon={<CancelIcon />}
                sx={{
                  borderColor: COLORS.lightGray,
                  color: COLORS.gray,
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: COLORS.primaryDark,
                    color: COLORS.primaryDark,
                  },
                }}
              >
                Отмена
              </Button>
            </motion.div>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PersonalData;
