import React, { useMemo, useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { formatPrice, parsePrice } from '../../utils/furniture';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  delivery: 'courier',
  payment: 'card',
  comment: '',
};

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items?.length ? state.items : state?.product ? [{ ...state.product, quantity: Math.max(1, Number(state.quantity) || 1) }] : [];
  const product = items[0];
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const productsTotal = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.price) * (Number(item.quantity) || 1), 0),
    [items]
  );
  const deliveryPrice = state?.fromCart ? Number(state.deliveryPrice) || 0 : 0;
  const total = state?.fromCart ? Number(state.total) || productsTotal + deliveryPrice : productsTotal;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    ['firstName', 'lastName', 'phone', 'email', 'city', 'address'].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = 'Заполните поле';
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Введите корректный email';
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Введите корректный телефон';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitOrder = (event) => {
    event.preventDefault();
    if (!product) return;
    if (!validate()) return;

    const order = {
      id: `order-${Date.now()}`,
      product,
      items,
      quantity: items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0),
      total,
      deliveryPrice,
      fromCart: Boolean(state?.fromCart),
      customer: form,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('pendingOrder', JSON.stringify(order));
    navigate('/card-payment', { state: { order } });
  };

  if (!product) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: '#334D5C', mb: 3 }}>Товар для оформления не выбран</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ bgcolor: '#5FC2DE', textTransform: 'none' }}>
          Вернуться в магазин
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 4, md: 7 } }}>
      <Typography sx={{ color: '#334D5C', fontSize: { xs: 26, md: 34 }, fontWeight: 700, mb: 4 }}>
        Оформление заказа
      </Typography>
      <Box component="form" onSubmit={submitOrder} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.5fr 0.8fr' }, gap: 5 }}>
        <Box>
          <Typography sx={{ color: '#334D5C', fontWeight: 700, mb: 2 }}>Данные получателя</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
            <TextField name="firstName" label="Имя" value={form.firstName} onChange={updateField} error={Boolean(errors.firstName)} helperText={errors.firstName} />
            <TextField name="lastName" label="Фамилия" value={form.lastName} onChange={updateField} error={Boolean(errors.lastName)} helperText={errors.lastName} />
            <TextField name="phone" label="Телефон" value={form.phone} onChange={updateField} error={Boolean(errors.phone)} helperText={errors.phone} />
            <TextField name="email" label="Email" type="email" value={form.email} onChange={updateField} error={Boolean(errors.email)} helperText={errors.email} />
          </Box>

          <Typography sx={{ color: '#334D5C', fontWeight: 700, mb: 2 }}>Доставка</Typography>
          <Box sx={{ display: 'grid', gap: 2, mb: 4 }}>
            <TextField name="city" label="Город" value={form.city} onChange={updateField} error={Boolean(errors.city)} helperText={errors.city} />
            <TextField name="address" label="Адрес доставки" value={form.address} onChange={updateField} error={Boolean(errors.address)} helperText={errors.address} />
            <FormControl>
              <Select name="delivery" value={form.delivery} onChange={updateField}>
                <MenuItem value="courier">Курьерская доставка</MenuItem>
                <MenuItem value="pickup">Самовывоз</MenuItem>
                <MenuItem value="transport">Транспортная компания</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography sx={{ color: '#334D5C', fontWeight: 700, mb: 1 }}>Способ оплаты</Typography>
          <RadioGroup name="payment" value={form.payment} onChange={updateField} sx={{ mb: 3 }}>
            <FormControlLabel value="card" control={<Radio />} label="Оплата банковской картой" />
            <FormControlLabel value="cash" control={<Radio />} label="Наличными при получении" />
          </RadioGroup>
          <TextField name="comment" label="Комментарий к заказу" value={form.comment} onChange={updateField} fullWidth multiline minRows={3} />
        </Box>

        <Box sx={{ alignSelf: 'start', border: '1px solid #E8EEF2', borderRadius: 2, p: 3 }}>
          <Typography sx={{ color: '#334D5C', fontWeight: 700, mb: 2 }}>Ваш заказ</Typography>
          <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box component="img" src={item.image} alt={item.title} sx={{ width: 72, height: 72, objectFit: 'contain' }} />
                <Box>
                  <Typography sx={{ color: '#3A4B63', fontSize: 14 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#7E929D', fontSize: 13 }}>Количество: {item.quantity || 1}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography>Итого</Typography>
            <Typography sx={{ fontWeight: 700, color: '#334D5C' }}>{formatPrice(total)}</Typography>
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#5FC2DE', textTransform: 'none', py: 1.3, '&:hover': { bgcolor: '#4CB2D1' } }}>
            Перейти к оплате
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
