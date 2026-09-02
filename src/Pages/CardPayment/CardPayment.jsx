import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Radio, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { formatPrice, parsePrice } from '../../utils/furniture';
import { CartContext } from '../../context/CartContext';

const MAX_DIGITS = 16;

const formatCardNumber = (digits) => (digits.match(/.{1,4}/g) || []).join(' ');

const CardPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = React.useContext(CartContext);
  // По умолчанию сразу 'new', чтобы пользователь при входе на страницу сразу видел пустые поля ввода внутри карты
  const [paymentMethod, setPaymentMethod] = useState('new'); 
  const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [paid, setPaid] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);

  const storedOrder = localStorage.getItem('pendingOrder');
  const order = state?.order || (storedOrder ? JSON.parse(storedOrder) : null);
  const total = useMemo(() => order?.total || parsePrice(order?.product?.price), [order]);

  useEffect(() => {
    if (paid || !order) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((previous) => (previous > 0 ? previous - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [paid, order]);

  const timeLabel = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const formattedNumber = formatCardNumber(card.number);

  const updateNumber = (event) => {
    const nextDigits = event.target.value.replace(/\D/g, '').slice(0, MAX_DIGITS);
    setCard((previous) => ({ ...previous, number: nextDigits }));
    setErrors((previous) => ({ ...previous, number: '' }));
  };

  const updateCard = (event) => {
    let { name, value } = event.target;
    if (name === 'expiry') value = value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 3);
    setCard((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const pay = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (paymentMethod === 'new') {
      if (card.number.length !== 16) nextErrors.number = 'Введите 16 цифр карты';
      if (!card.holder.trim()) nextErrors.holder = 'Введите имя владельца';
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) nextErrors.expiry = 'Формат ММ/ГГ';
      if (card.cvv.length !== 3) nextErrors.cvv = 'Введите 3 цифры';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    localStorage.removeItem('pendingOrder');
    localStorage.setItem('lastPaidOrder', JSON.stringify({ ...order, paidAt: new Date().toISOString() }));
    if (order.fromCart) clearCart();
    setPaid(true);
  };

  if (!order) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 8, px: 3, textAlign: 'center' }}>
        <Typography sx={{ mb: 3 }}>Заказ не найден</Typography>
        <Button onClick={() => navigate('/')} variant="contained" sx={{ bgcolor: '#5FC2DE' }}>В магазин</Button>
      </Box>
    );
  }

  if (paid) {
    return (
      <Box sx={{ maxWidth: 760, mx: 'auto', py: { xs: 7, md: 11 }, px: 3, textAlign: 'center' }}>
        <Box
          sx={{
            width: 150,
            height: 150,
            mx: 'auto',
            mb: 4,
            perspective: 700,
            animation: 'successFloat 3s ease-in-out infinite',
            '@keyframes successFloat': {
              '0%, 100%': { transform: 'translateY(0) rotateX(0deg) rotateY(0deg)' },
              '50%': { transform: 'translateY(-12px) rotateX(8deg) rotateY(12deg)' },
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-12deg) rotateY(18deg)',
              animation: 'successSpin 8s linear infinite',
              '@keyframes successSpin': {
                from: { transform: 'rotateX(-12deg) rotateY(18deg)' },
                to: { transform: 'rotateX(-12deg) rotateY(378deg)' },
              },
            }}
          >
            {[
              { transform: 'translateZ(45px)', symbol: '✓' },
              { transform: 'rotateY(180deg) translateZ(45px)', symbol: '✓' },
              { transform: 'rotateY(90deg) translateZ(45px)', symbol: '' },
              { transform: 'rotateY(-90deg) translateZ(45px)', symbol: '' },
              { transform: 'rotateX(90deg) translateZ(45px)', symbol: '' },
              { transform: 'rotateX(-90deg) translateZ(45px)', symbol: '' },
            ].map((face, index) => (
              <Box key={index} sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', bgcolor: index < 2 ? '#5FC2DE' : '#3E5C76', border: '1px solid rgba(255,255,255,.35)', backfaceVisibility: 'hidden', transform: face.transform, color: '#fff', fontSize: 58, fontWeight: 700, boxShadow: 'inset 0 0 25px rgba(255,255,255,.2)' }}>
                {face.symbol}
              </Box>
            ))}
          </Box>
        </Box>
        <Typography sx={{ color: '#334D5C', fontSize: 30, fontWeight: 700, mb: 2 }}>Спасибо за покупку</Typography>
        <Typography sx={{ color: '#7E929D', mb: 4 }}>Заказ оплачен и принят в обработку.</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ bgcolor: '#5FC2DE', textTransform: 'none' }}>Вернуться в магазин</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Typography sx={{ color: '#7E929D', mb: 2 }}>Заказ №{order.id}</Typography>
      <Typography sx={{ color: '#334D5C', fontSize: { xs: 22, md: 26 }, fontWeight: 700, mb: 1 }}>Итого к оплате</Typography>
      <Typography sx={{ color: '#334D5C', fontSize: 26, fontWeight: 600, mb: 4 }}>{formatPrice(total)}</Typography>

      {/* Выбор способа оплаты (оставлен для переключения, но по умолчанию активна Новая карта) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        <Box
          onClick={() => setPaymentMethod('saved')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', width: 'fit-content' }}
        >
          <Radio checked={paymentMethod === 'saved'} sx={{ color: '#5FC2DE', '&.Mui-checked': { color: '#5FC2DE' } }} />
          <Typography sx={{ color: '#334D5C' }}>**** 5522</Typography>
          <Box sx={{ width: 28, height: 18, position: 'relative', ml: 1 }}>
            <Box sx={{ position: 'absolute', left: 0, width: 18, height: 18, borderRadius: '50%', bgcolor: '#EB001B' }} />
            <Box sx={{ position: 'absolute', left: 10, width: 18, height: 18, borderRadius: '50%', bgcolor: '#F79E1B', opacity: 0.85 }} />
          </Box>
        </Box>

        <Box
          onClick={() => setPaymentMethod('new')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', width: 'fit-content' }}
        >
          <Radio checked={paymentMethod === 'new'} sx={{ color: '#5FC2DE', '&.Mui-checked': { color: '#5FC2DE' } }} />
          <Typography sx={{ color: '#334D5C' }}>Новая карта</Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={pay} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Левая часть: дизайн банковской карты, в которую пользователь сам вводит ВСЕ данные с нуля */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 420,
              height: 230,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Верхний ряд: Чип карты и поле CVC/CVV */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 42,
                  height: 32,
                  borderRadius: 1,
                  background: 'linear-gradient(135deg, #d4af37 0%, #aa771c 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
                }}
              />

              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: 9, color: '#9ca3af', letterSpacing: 1, mb: 0.5 }}>CVC / CVV</Typography>
                {paymentMethod === 'new' ? (
                  <TextField
                    name="cvv"
                    type="password"
                    value={card.cvv}
                    onChange={updateCard}
                    placeholder="•••"
                    error={Boolean(errors.cvv)}
                    helperText={errors.cvv}
                    slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 3, style: { color: '#fff', textAlign: 'right', fontSize: 13, padding: 0 } } }}
                    variant="standard"
                    sx={{
                      width: 45,
                      '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                      '& .MuiInput-underline:after': { borderBottomColor: '#5FC2DE' },
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: 13, color: '#fff', letterSpacing: 2 }}>•••</Typography>
                )}
              </Box>
            </Box>

            {/* Номер карты */}
            <Box>
              <Typography sx={{ fontSize: 10, color: '#9ca3af', mb: 0.5, letterSpacing: 1 }}>НОМЕР КАРТЫ</Typography>
              {paymentMethod === 'new' ? (
                <TextField
                  name="number"
                  value={formattedNumber}
                  onChange={updateNumber}
                  placeholder="•••• •••• •••• ••••"
                  error={Boolean(errors.number)}
                  helperText={errors.number}
                  slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 19, style: { color: '#fff', letterSpacing: '2px', fontFamily: 'monospace', fontSize: 16 } } }}
                  variant="standard"
                  fullWidth
                  sx={{
                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'rgba(255,255,255,0.6)' },
                    '& .MuiInput-underline:after': { borderBottomColor: '#5FC2DE' },
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: 16, letterSpacing: '2px', fontFamily: 'monospace', color: '#fff' }}>
                  •••• •••• •••• 5522
                </Typography>
              )}
            </Box>

            {/* Нижняя часть карты: Владелец, Срок и Логотип */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ flex: 1, pr: 2 }}>
                <Typography sx={{ fontSize: 9, color: '#9ca3af', letterSpacing: 0.5 }}>ИМЯ ВЛАДЕЛЬЦА</Typography>
                {paymentMethod === 'new' ? (
                  <TextField
                    name="holder"
                    value={card.holder}
                    onChange={updateCard}
                    placeholder="NAME SURNAME"
                    error={Boolean(errors.holder)}
                    helperText={errors.holder}
                    variant="standard"
                    slotProps={{ htmlInput: { style: { color: '#fff', textTransform: 'uppercase', fontSize: 12 } } }}
                    fullWidth
                    sx={{
                      '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                      '& .MuiInput-underline:after': { borderBottomColor: '#5FC2DE' },
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>ANNA IVANOVA</Typography>
                )}
              </Box>

              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography sx={{ fontSize: 9, color: '#9ca3af' }}>СРОК</Typography>
                {paymentMethod === 'new' ? (
                  <TextField
                    name="expiry"
                    value={card.expiry}
                    onChange={updateCard}
                    placeholder="ММ/ГГ"
                    error={Boolean(errors.expiry)}
                    helperText={errors.expiry}
                    slotProps={{ htmlInput: { inputMode: 'numeric', style: { textAlign: 'right', color: '#fff', fontSize: 12, width: 42 } } }}
                    variant="standard"
                    sx={{
                      '& .MuiInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' },
                      '& .MuiInput-underline:after': { borderBottomColor: '#5FC2DE' },
                    }}
                  />
                ) : (
                  <Typography sx={{ fontSize: 12 }}>12/28</Typography>
                )}
              </Box>

              {/* Mastercard Circles */}
              <Box sx={{ width: 32, height: 20, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Box sx={{ position: 'absolute', left: 0, width: 18, height: 18, borderRadius: '50%', bgcolor: '#EB001B', opacity: 0.9 }} />
                <Box sx={{ position: 'absolute', left: 10, width: 18, height: 18, borderRadius: '50%', bgcolor: '#F79E1B', opacity: 0.9 }} />
              </Box>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#5FC2DE', textTransform: 'none', py: 1.4, mt: 4, maxWidth: 420, width: '100%', '&:hover': { bgcolor: '#4CB2D1' } }}
          >
            Оплатить
          </Button>
        </Box>

        {/* Правая часть: таймер и безопасность */}
        <Box sx={{ width: { xs: '100%', md: 280 } }}>
          <Typography sx={{ color: '#334D5C', fontWeight: 600, mb: 2 }}>{timeLabel} на оплату заказа</Typography>
          <Typography sx={{ color: '#7E929D', fontSize: 14, mb: 2 }}>
            🔒 Интернет-платежи защищены сертификатом TLS и протоколом 3D Secure.
          </Typography>
          <Typography sx={{ color: '#7E929D', fontSize: 14 }}>
            Мы не передаём сторонним лицам платёжные данные, в том числе данные карты.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPayment;