import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, InputBase, Button, IconButton, Typography, Drawer } from '@mui/material';
import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/Mask Group.png';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const NAV_LINKS = [
  { label: 'sale', to: 'Sale' },
  { label: 'about', to: '/' },
  { label: 'blog', to: 'Blog' },
  { label: 'wholesale', to: 'Optovim' },
  { label: 'returns', to: '/' },
  { label: 'paymentDelivery', to: 'Payment_Delivery' },
  { label: 'contacts', to: 'Map' },
];

const CATEGORIES = [
  { label: 'Акции', items: [] },
  {
    label: 'Детская мебель',
    items: ['Кроватки', 'Колыбели', 'Люльки', 'Пеленальные комоды', 'Шкафы', 'Аксессуары'],
  },
  {
    label: 'Коляски',
    items: ['Прогулочные', 'Трансформеры 2в1', 'Для двойни', 'Аксессуары для колясок'],
  },
  {
    label: 'Автокресла',
    items: ['0–13 кг', '9–18 кг', '15–36 кг', 'Аксессуары'],
  },
  {
    label: 'Одежда',
    items: ['Для новорождённых', 'Для мальчиков', 'Для девочек', 'Верхняя одежда'],
  },
  {
    label: 'Кормление',
    items: ['Бутылочки', 'Смеси', 'Стульчики для кормления', 'Посуда'],
  },
  {
    label: 'Гигиена и уход',
    items: ['Подгузники', 'Косметика', 'Аксессуары для купания'],
  },
  {
    label: 'Умные игрушки',
    items: ['Развивающие', 'Интерактивные', 'Конструкторы'],
  },
];

const FURNITURE_CATEGORY_PATHS = {
  Кроватки: '/children-furniture/krovatki',
  Колыбели: '/children-furniture/kolybeli',
  Люльки: '/children-furniture/kolybeli',
  'Пеленальные комоды': '/children-furniture/pelenatory',
  Шкафы: '/children-furniture/shkafy',
  Аксессуары: '/children-furniture/shkafy',
};

const COLORS = {
  primary: '#5FC2DE',
  primaryDark: '#3E5C76',
  text: '#3A4B63',
  textMuted: '#7C8CA1',
  border: '#ECEEF1',
  cream: '#FBF6EF',
};

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const cartCount = getTotalItems();
  const navigate = useNavigate();

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const { language, setLanguage, t } = useLanguage();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const catalogRef = useRef(null);
  const loginRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setCatalogOpen(false);
      }
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCatalogToggle = () => {
    setLoginOpen(false);
    setProfileOpen(false);
    setCatalogOpen((prev) => !prev);
  };

  const handleLoginToggle = () => {
    setCatalogOpen(false);
    setProfileOpen(false);
    setLoginOpen((prev) => !prev);
  };

  const handleProfileToggle = () => {
    setCatalogOpen(false);
    setLoginOpen(false);
    setProfileOpen((prev) => !prev);
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setLoginError('Заполните все поля');
      return;
    }

    const result = login(loginEmail, loginPassword);
    if (result.success) {
      setLoginOpen(false);
      setLoginEmail('');
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError(result.message);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileProfileOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      navigate('/children-furniture');
      return;
    }

    navigate(`/children-furniture?search=${encodeURIComponent(query)}`);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Box sx={{ position: 'relative', bgcolor: '#FFFFFF', zIndex: 1200 }}>

      
      
      
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          px: 2,
          py: 1.5,
          gap: 1.5,
          bgcolor: '#FFFFFF',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton
            onClick={() => setMobileMenuOpen(true)}
            sx={{ color: COLORS.text, p: 0.5 }}
          >
            <MenuIcon sx={{ fontSize: 26 }} />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Карапуз"
              sx={{ width: 38, height: 38 }}
            />
            <Typography sx={{ fontSize: 12, color: COLORS.text, fontWeight: 500, lineHeight: 1.2 }}>
              {t('Онлайн гипермаркет')}<br />{t('товаров для детей')}
            </Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <IconButton 
              onClick={() => navigate('/Basket')}
              sx={{ color: COLORS.primary, p: 0.5, cursor: 'pointer' }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} />
            </IconButton>
            {cartCount > 0 && (
              <Box
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
                sx={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  bgcolor: '#ff5252',
                  color: 'white',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: COLORS.cream,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            px: 2,
            py: 1,
          }}
        >
          <SearchIcon sx={{ color: COLORS.textMuted, mr: 1 }} fontSize="small" />
          <InputBase
            placeholder={t('Я хочу купить...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyPress}
            sx={{ flex: 1, fontSize: 14, color: COLORS.text }}
          />
        </Box>
      </Box>

      
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '100%',
            p: 3,
            bgcolor: '#FFFFFF',
            color: COLORS.text,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: COLORS.text, p: 0.5 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {user ? (
          <Box
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileProfileOpen(true);
            }}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, cursor: 'pointer', paddingX: '20px' }}
          >
            <AccountCircleIcon sx={{ color: COLORS.primary, fontSize: 22 }} />
            <Typography sx={{ fontSize: 15, color: COLORS.text }}>
              {user.name}
            </Typography>
          </Box>
        ) : (
          <Box
            onClick={() => {
              setMobileMenuOpen(false);
              setLoginOpen(true);
            }}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, cursor: 'pointer', paddingX: '20px' }}
          >
            <PersonOutlineIcon sx={{ color: COLORS.primary, fontSize: 22 }} />
            <Typography sx={{ fontSize: 15, color: COLORS.text }}>
              {t('login')}
            </Typography>
          </Box>
        )}

        <Box
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileActiveCategory(null);
            setMobileCatalogOpen(true);
          }}
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.text,
            py: 1.5,
            borderBottom: `1px solid ${COLORS.border}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: '20px'
          }}
        >
          {t('catalog')}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map((link) => (
            <Typography
              key={link.label}
              component={NavLink}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              sx={{
                fontSize: 15,
                color: COLORS.text,
                textDecoration: 'none',
                py: 1.5,
                borderBottom: `1px solid ${COLORS.border}`,
                fontWeight: 400,
                paddingX: '20px',
                pr: '100px'
              }}
            >
              {t(link.label)}
            </Typography>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnOutlinedIcon fontSize="small" sx={{ color: COLORS.textMuted }} />
          <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
            {t('Город:')} <Box component="span" sx={{ color: COLORS.primary, fontWeight: 500 }}>{t('Москва')}</Box>
          </Typography>
        </Box>
      </Drawer>

      
      <Drawer
        anchor="left"
        open={mobileCatalogOpen}
        onClose={() => setMobileCatalogOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            color: 'white',
            backgroundColor: '#3E5C76',
          }
        }}
      >
        {mobileActiveCategory === null ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 3, backgroundColor: '#3E5C76', paddingX: '20px' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#FFFFFF' }}>
                {t('catalog')}
              </Typography>
              <IconButton onClick={() => setMobileCatalogOpen(false)} sx={{ color: '#FFFFFF', p: 0.5 }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, gap: 2.5, backgroundColor: '#3E5C76' }}>
              {CATEGORIES.map((cat, idx) => (
                <Box
                  key={cat.label}
                  onClick={() => setMobileActiveCategory(idx)}
                  sx={{
                    cursor: 'pointer',
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingX: '20px'
                  }}
                >
                    {t(cat.label)}
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 3, backgroundColor: '#3E5C76', paddingX: '20px' }}>
              <IconButton
                onClick={() => setMobileActiveCategory(null)}
                sx={{ color: '#FFFFFF', p: 0.5, display: 'flex', gap: 1, alignItems: 'center' }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
                <Typography sx={{ fontSize: 15, color: '#FFFFFF', fontWeight: 500 }}>
                  Назад
                </Typography>
              </IconButton>
              <IconButton onClick={() => setMobileCatalogOpen(false)} sx={{ color: '#FFFFFF', p: 0.5 }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', mb: 0, backgroundColor: '#3E5C76', px: '20px', pb: 2 }}>
              {t(CATEGORIES[mobileActiveCategory].label)}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, gap: 2.5, backgroundColor: '#3E5C76', px: '20px', pt: 1, pb: 3 }}>
              {CATEGORIES[mobileActiveCategory].items.length === 0 ? (
                <Typography
                  component={NavLink}
                  to="/"
                  onClick={() => setMobileCatalogOpen(false)}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  Смотреть все акции
                </Typography>
              ) : (
                CATEGORIES[mobileActiveCategory].items.map((item) => (
                  <Typography
                    key={item}
                    component={NavLink}
                    to={CATEGORIES[mobileActiveCategory].label === 'Детская мебель' ? FURNITURE_CATEGORY_PATHS[item] : '/'}
                    onClick={() => setMobileCatalogOpen(false)}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontWeight: 400,
                    }}
                  >
                    {t(item)}
                  </Typography>
                ))
              )}
            </Box>
          </>
        )}
      </Drawer>

      
      <Drawer
        anchor="left"
        open={mobileProfileOpen}
        onClose={() => setMobileProfileOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '100%',
            p: 3,
            bgcolor: '#FFFFFF',
            color: COLORS.text,
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={() => setMobileProfileOpen(false)} sx={{ color: COLORS.text, p: 0.5 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: COLORS.cream, borderRadius: '12px' }}>
          <AccountCircleIcon sx={{ fontSize: 40, color: COLORS.primary }} />
          <Box>
            <Typography sx={{ fontWeight: 600, color: COLORS.text }}>
              {user?.name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.textMuted }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography
            sx={{
              fontSize: 14,
              color: COLORS.text,
              py: 1.5,
              borderBottom: `1px solid ${COLORS.border}`,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {t('Мои заказы')}
          </Typography>
          <Typography
            onClick={() => navigate('/favorites')}
            sx={{
              fontSize: 14,
              color: COLORS.text,
              py: 1.5,
              borderBottom: `1px solid ${COLORS.border}`,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {t('Мое избранное')}
          </Typography>
          <Typography
            onClick={() => navigate('/personal-data')}
            sx={{
              fontSize: 14,
              color: COLORS.text,
              py: 1.5,
              borderBottom: `1px solid ${COLORS.border}`,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {t('Настройки личных данных')}
          </Typography>
          <Box
            component={motion.div}
            whileHover={{ x: 4 }}
            onClick={handleLogout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1.5,
              fontSize: 14,
              color: '#ff5252',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <LogoutIcon sx={{ fontSize: 18 }} />
            {t('Выход')}
          </Box>
        </Box>
      </Drawer>

      
      
      
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 3,
          px: { xs: 2, md: 5 },
          py: 2,
          maxWidth: 1440,
          mx: 'auto',
        }}
      >
        <Box
          component={motion.img}
          whileHover={{ scale: 1.05, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          src={logo}
          alt="Карапуз"
          sx={{ width: 52, height: 52, cursor: 'pointer', flexShrink: 0 }}
        />

        <Box ref={catalogRef} sx={{ position: 'relative', flexShrink: 0 }}>
          <Button
            onClick={handleCatalogToggle}
            disableRipple
            component={motion.button}
            whileTap={{ scale: 0.96 }}
            endIcon={
              <motion.span
                animate={{ rotate: catalogOpen ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex' }}
              >
                {catalogOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
              </motion.span>
            }
            sx={{
              bgcolor: COLORS.primary,
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '10px',
              px: 2.5,
              py: 1,
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: '#4CB2D1' },
            }}
          >
            {t('Каталог товаров')}
          </Button>

          <AnimatePresence>
            {catalogOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  left: 0,
                  display: 'flex',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(20, 40, 60, 0.18)',
                  zIndex: 1300,
                  width: '1000px',
                  backgroundColor: 'white'
                }}
              >
                <Box sx={{ bgcolor: COLORS.primaryDark, width: 330 }}>
                  {CATEGORIES.map((cat, idx) => {
                    const active = idx === activeCategory;
                    return (
                      <Box
                        key={cat.label}
                        component={motion.div}
                        onMouseEnter={() => setActiveCategory(idx)}
                        whileHover={{ x: 4 }}
                        sx={{
                          px: 2.5,
                          py: 1.4,
                          cursor: 'pointer',
                          color: active ? COLORS.primaryDark : '#DCE6ED',
                          bgcolor: active ? '#fff' : 'transparent',
                          fontWeight: active ? 600 : 400,
                          fontSize: 14,
                          transition: 'background-color 0.2s, color 0.2s',
                        }}
                      >
                        {t(cat.label)}
                      </Box>
                    );
                  })}
                </Box>

                <Box sx={{ bgcolor: '#fff', width: 260, p: 3 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      {CATEGORIES[activeCategory].items.length === 0 ? (
                        <Typography sx={{ color: COLORS.textMuted, fontSize: 14 }}>
                          Смотреть все акции
                        </Typography>
                      ) : (
                        CATEGORIES[activeCategory].items.map((item) => (
                          <Typography
                            key={item}
                            component={motion.a}
                            whileHover={{ x: 4, color: COLORS.primary }}
                            href={CATEGORIES[activeCategory].label === 'Детская мебель' ? FURNITURE_CATEGORY_PATHS[item] : '/'}
                            sx={{
                              display: 'block',
                              textDecoration: 'none',
                              color: COLORS.text,
                              fontSize: 14,
                              mb: 1.6,
                              cursor: 'pointer',
                            }}
                          >
                            {t(item)}
                          </Typography>
                        ))
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            bgcolor: COLORS.cream,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '10px',
            pl: 2,
            maxWidth: 480,
          }}
        >
          <SearchIcon sx={{ color: COLORS.textMuted, mr: 1 }} fontSize="small" />
          <InputBase
            placeholder={t('Я хочу купить...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyPress}
            sx={{ flex: 1, fontSize: 14, color: COLORS.text }}
          />
          <Button
            component={motion.button}
            whileTap={{ scale: 0.95 }}
            sx={{
              bgcolor: COLORS.primary,
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              px: 2.5,
              '&:hover': { bgcolor: '#4CB2D1' },
            }}
            onClick={handleSearch}
          >
            {t('Найти')}
          </Button>
        </Box>

        <Box sx={{ flex: 1 }} />

        
        {user ? (
          <Box ref={profileRef} sx={{ position: 'relative', flexShrink: 0 }}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleProfileToggle}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                cursor: 'pointer',
                color: COLORS.text,
              }}
            >
              <AccountCircleIcon fontSize="small" sx={{ color: COLORS.primary }} />
              <Typography sx={{ fontSize: 14, whiteSpace: 'nowrap' }}>
                {user.name}
              </Typography>
            </Box>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    right: 0,
                    width: 320,
                    background: '#fff',
                    borderRadius: 14,
                    boxShadow: '0 20px 45px rgba(20, 40, 60, 0.18)',
                    padding: 20,
                    zIndex: 1300,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, bgcolor: COLORS.cream, borderRadius: '10px' }}>
                    <AccountCircleIcon sx={{ fontSize: 32, color: COLORS.primary }} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: COLORS.text, fontSize: 14 }}>
                        {user.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: COLORS.textMuted }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <Typography
                      component={motion.div}
                      whileHover={{ x: 4, color: COLORS.primary }}
                      onClick={() => navigate('/favorites')}
                      sx={{
                        fontSize: 13,
                        color: COLORS.text,
                        py: 1.2,
                        borderBottom: `1px solid ${COLORS.border}`,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {t('Мои заказы')}
                    </Typography>
                    <Typography
                      component={motion.div}
                      whileHover={{ x: 4, color: COLORS.primary }}
                      onClick={() => navigate('/favorites')}
                      sx={{
                        fontSize: 13,
                        color: COLORS.text,
                        py: 1.2,
                        borderBottom: `1px solid ${COLORS.border}`,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {t('Мое избранное')}
                    </Typography>
                    <Typography
                      component={motion.div}
                      whileHover={{ x: 4, color: COLORS.primary }}
                      onClick={() => navigate('/personal-data')}
                      sx={{
                        fontSize: 13,
                        color: COLORS.text,
                        py: 1.2,
                        borderBottom: `1px solid ${COLORS.border}`,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {t('Настройки личных данных')}
                    </Typography>
                    <Box
                      component={motion.div}
                      whileHover={{ x: 4 }}
                      onClick={handleLogout}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 1.2,
                        fontSize: 13,
                        color: '#ff5252',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <LogoutIcon sx={{ fontSize: 16 }} />
                      {t('Выход')}
                    </Box>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        ) : (
          <Box ref={loginRef} sx={{ position: 'relative', flexShrink: 0 }}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLoginToggle}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
                cursor: 'pointer',
                color: COLORS.text,
              }}
            >
              <PersonOutlineIcon fontSize="small" sx={{ color: COLORS.primary }} />
              <Typography sx={{ fontSize: 14, whiteSpace: 'nowrap' }}>
                {t('Войти в личный кабинет')}
              </Typography>
            </Box>

            <AnimatePresence>
              {loginOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    right: 0,
                    width: 320,
                    background: '#fff',
                    borderRadius: 14,
                    boxShadow: '0 20px 45px rgba(20, 40, 60, 0.18)',
                    padding: 24,
                    zIndex: 1300,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, color: COLORS.text, fontSize: 16 }}>
                      {t('Вход в аккаунт')}
                    </Typography>
                    <IconButton size="small" onClick={() => setLoginOpen(false)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <InputBase
                    fullWidth
                    type="email"
                    placeholder={t('Электронный адрес')}
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginError('');
                    }}
                    onKeyPress={handleKeyPress}
                    sx={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '8px',
                      px: 1.5,
                      py: 1,
                      fontSize: 14,
                      mb: 1.5,
                    }}
                  />
                  <InputBase
                    fullWidth
                    type="password"
                    placeholder={t('Пароль')}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError('');
                    }}
                    onKeyPress={handleKeyPress}
                    sx={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '8px',
                      px: 1.5,
                      py: 1,
                      fontSize: 14,
                      mb: loginError ? 1 : 2,
                    }}
                  />

                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Typography sx={{ fontSize: 12, color: '#ff6b6b', mb: 2 }}>
                        {t(loginError)}
                      </Typography>
                    </motion.div>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Button
                      component={motion.button}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleLogin}
                      sx={{
                        bgcolor: COLORS.primary,
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                        px: 3,
                        py: 0.9,
                        '&:hover': { bgcolor: '#4CB2D1' },
                      }}
                    >
                      {t('Войти')}
                    </Button>
                    <Typography
                      component={motion.div}
                      whileHover={{ color: COLORS.primary }}
                      onClick={() => {
                        setLoginOpen(false);
                        navigate('/recovery-password');
                      }}
                      sx={{
                        fontSize: 13,
                        color: COLORS.text,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      {t('Восстановить пароль?')}
                    </Typography>
                  </Box>

                  <Typography
                    component={motion.div}
                    whileHover={{ color: COLORS.primary }}
                    onClick={() => {
                      setLoginOpen(false);
                      navigate('/registration');
                    }}
                    sx={{
                      fontSize: 13,
                      color: COLORS.text,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {t('Нет аккаунта? Зарегистрироваться')}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0, bgcolor: COLORS.cream, p: 0.5, borderRadius: '8px', border: `1px solid ${COLORS.border}` }}>
          <Button
            size="small"
            onClick={() => setLanguage('ru')}
            sx={{
              minWidth: 32,
              height: 26,
              p: 0,
              fontSize: 12,
              fontWeight: 600,
              borderRadius: '6px',
              bgcolor: language === 'ru' ? COLORS.primary : 'transparent',
              color: language === 'ru' ? '#fff' : COLORS.text,
              '&:hover': { bgcolor: language === 'ru' ? COLORS.primary : '#eee' },
            }}
          >
            RU
          </Button>
          <Button
            size="small"
            onClick={() => setLanguage('en')}
            sx={{
              minWidth: 32,
              height: 26,
              p: 0,
              fontSize: 12,
              fontWeight: 600,
              borderRadius: '6px',
              bgcolor: language === 'en' ? COLORS.primary : 'transparent',
              color: language === 'en' ? '#fff' : COLORS.text,
              '&:hover': { bgcolor: language === 'en' ? COLORS.primary : '#eee' },
            }}
          >
            EN
          </Button>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/Basket')}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.7, cursor: 'pointer', color: COLORS.text }}
          >
            <ShoppingCartOutlinedIcon fontSize="small" sx={{ color: COLORS.primary }} />
            <Typography sx={{ fontSize: 14 }}>{t('cart')}</Typography>
          </Box>
          {cartCount > 0 && (
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: '#ff5252',
                color: 'white',
                width: 22,
                height: 22,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {cartCount}
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          borderTop: `1px solid ${COLORS.border}`,
          bgcolor: '#fff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            px: { xs: 2, md: 5 },
            py: 1.6,
            maxWidth: 1440,
            mx: 'auto',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: 13, color: COLORS.text, fontWeight: 500, whiteSpace: 'nowrap' }}>
            {t('online')}
            <br />
            {t('childrenGoods')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            {NAV_LINKS.map((link) => (
              <Box
                key={link.label}
                component={NavLink}
                to={link.to}
                sx={{
                  position: 'relative',
                  fontSize: 14,
                  color: COLORS.text,
                  textDecoration: 'none',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -4,
                    width: 0,
                    height: '2px',
                    bgcolor: COLORS.primary,
                    transition: 'width 0.25s ease',
                  },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {t(link.label)}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', flexShrink: 0 }}>
            <LocationOnOutlinedIcon fontSize="small" sx={{ color: COLORS.textMuted }} />
            <Typography sx={{ fontSize: 14, color: COLORS.textMuted }}>
              {t('Город:')} <Box component="span" sx={{ color: COLORS.primary }}>{t('Москва')}</Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
