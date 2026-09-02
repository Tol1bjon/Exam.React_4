import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { NavLink } from 'react-router';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import logo from '../assets/Mask Group.png';

const COLORS = {
  primary: '#5FC2DE',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7C8CA1',
  border: '#ECEEF1',
  cream: 'white',
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: COLORS.cream, borderTop: `1px solid ${COLORS.border}`, mt: 'auto' }}>
      
      {/* =================================================================== */}
      {/* ДЕСКТОПНАЯ ВЕРСИЯ                                                   */}
      {/* =================================================================== */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          px: 5,
          py: 6,
          maxWidth: 1440,
          mx: 'auto',
          gap: 5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
          {/* Лого и описание */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={logo} alt="Карапуз" sx={{ width: 44, height: 44 }} />
              <Typography sx={{ fontSize: 13, color: COLORS.text, fontWeight: 500, lineHeight: 1.2 }}>
                Онлайн гипермаркет<br />товаров для детей
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>
              Всё самое лучшее для вашего малыша с доставкой на дом.
            </Typography>
          </Box>

          {/* Колонка: Каталог */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.text, mb: 0.5 }}>
              Каталог
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Детская мебель
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Коляски
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Автокресла
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Одежда и обувь
            </Typography>
          </Box>

          {/* Колонка: Покупателям */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.text, mb: 0.5 }}>
              Покупателям
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Акции и скидки
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Оплата и доставка
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Возврат товара
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              Оптовым клиентам
            </Typography>
          </Box>

          {/* Колонка: Контакты */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
              Контакты
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneOutlinedIcon fontSize="small" sx={{ color: COLORS.primary }} />
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
                8 (800) 555-35-35
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MailOutlineOutlinedIcon fontSize="small" sx={{ color: COLORS.primary }} />
              <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
                support@karapuz.ru
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnOutlinedIcon fontSize="small" sx={{ color: COLORS.primary }} />
              <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
                г. Москва, ул. Детская, 15
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Нижняя полоса копирайта */}
        <Box sx={{ pt: 3, borderTop: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>
            © 2026 Интернет-магазин «Карапуз». Все права защищены.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography component={NavLink} to="/" sx={{ fontSize: 13, color: COLORS.textMuted, textDecoration: 'none' }}>
              Политика конфиденциальности
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 13, color: COLORS.textMuted, textDecoration: 'none' }}>
              Условия использования
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* =================================================================== */}
      {/* ТЕЛЕФОННАЯ ВЕРСИЯ                                                   */}
      {/* =================================================================== */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          px: 2,
          py: 4,
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="img" src={logo} alt="Карапуз" sx={{ width: 38, height: 38 }} />
          <Typography sx={{ fontSize: 12, color: COLORS.text, fontWeight: 500, lineHeight: 1.2 }}>
            Онлайн гипермаркет<br />товаров для детей
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneOutlinedIcon fontSize="small" sx={{ color: COLORS.primary }} />
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>
              8 (800) 555-35-35
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnOutlinedIcon fontSize="small" sx={{ color: COLORS.textMuted }} />
            <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
              г. Москва, ул. Детская, 15
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1, borderTop: `1px solid ${COLORS.border}` }}>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            О компании
          </Typography>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            Оплата и доставка
          </Typography>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            Возврат товара
          </Typography>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            Контакты
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 12, color: COLORS.textMuted, textAlign: 'center', mt: 1 }}>
          © 2026 «Карапуз». Все права защищены.
        </Typography>
      </Box>

    </Box>
  );
};

export default Footer;