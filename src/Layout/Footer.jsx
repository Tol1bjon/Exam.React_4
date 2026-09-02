import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { NavLink } from 'react-router';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import logo from '../assets/Mask Group.png';
import { useLanguage } from '../context/LanguageContext';

const COLORS = {
  primary: '#5FC2DE',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7C8CA1',
  border: '#ECEEF1',
  cream: 'white',
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <Box component="footer" sx={{ bgcolor: COLORS.cream, borderTop: `1px solid ${COLORS.border}`, mt: 'auto' }}>
      
      
      
      
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
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={logo} alt="Карапуз" sx={{ width: 44, height: 44 }} />
              <Typography sx={{ fontSize: 13, color: COLORS.text, fontWeight: 500, lineHeight: 1.2 }}>
                {t('Онлайн гипермаркет')}<br />{t('товаров для детей')}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>
              {t('Всё самое лучшее для вашего малыша с доставкой на дом.')}
            </Typography>
          </Box>

          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.text, mb: 0.5 }}>
              {t('Каталог')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Детская мебель')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Коляски')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Автокресла')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Одежда и обувь')}
            </Typography>
          </Box>

          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.text, mb: 0.5 }}>
              {t('Покупателям')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Акции и скидки')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Оплата и доставка')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Возврат товара')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.textMuted, textDecoration: 'none', '&:hover': { color: COLORS.primary } }}>
              {t('Оптовым клиентам')}
            </Typography>
          </Box>

          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
              {t('Контакты')}
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
                {t('г. Москва, ул. Детская, 15')}
              </Typography>
            </Box>
          </Box>
        </Box>

        
        <Box sx={{ pt: 3, borderTop: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>
            {t('© 2026 Интернет-магазин «Карапуз». Все права защищены.')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography component={NavLink} to="/" sx={{ fontSize: 13, color: COLORS.textMuted, textDecoration: 'none' }}>
              {t('Политика конфиденциальности')}
            </Typography>
            <Typography component={NavLink} to="/" sx={{ fontSize: 13, color: COLORS.textMuted, textDecoration: 'none' }}>
              {t('Условия использования')}
            </Typography>
          </Box>
        </Box>
      </Box>

      
      
      
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
            {t('Онлайн гипермаркет')}<br />{t('товаров для детей')}
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
              {t('г. Москва, ул. Детская, 15')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1, borderTop: `1px solid ${COLORS.border}` }}>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            {t('О компании')}
          </Typography>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            {t('Оплата и доставка')}
          </Typography>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            {t('Возврат товара')}
          </Typography>
          <Typography component={NavLink} to="/" sx={{ fontSize: 14, color: COLORS.text, textDecoration: 'none', py: 0.5 }}>
            {t('Контакты')}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 12, color: COLORS.textMuted, textAlign: 'center', mt: 1 }}>
          {t('© 2026 «Карапуз». Все права защищены.')}
        </Typography>
      </Box>

    </Box>
  );
};

export default Footer;