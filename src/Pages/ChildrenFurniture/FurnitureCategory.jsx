import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  TextField,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { NavLink, useParams } from 'react-router';
import axios from 'axios';
import { API } from '../../API/API';
import { FURNITURE_CATEGORIES, enrichProduct, parsePrice } from '../../utils/furniture';
import ProductCard from '../../Layout/ProductCard';
import CatalogPagination, { PAGE_SIZE } from '../../Layout/CatalogPagination';
import AuthRequiredModal from '../../Layout/AuthRequiredModal';
import { useProductActions } from '../../hooks/useProductActions';

const emptyFilters = () => ({
  priceFrom: '',
  priceTo: '',
  inStock: false,
  brands: [],
  colors: [],
  materials: [],
  mechanisms: [],
  wheels: [],
  drawers: [],
  sizes: [],
});

const toggleValue = (list, value) => (
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
);

const FilterGroup = ({ title, options, selected, onToggle, searchable, query, onQuery }) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#2F3E4E', mb: 1.5 }}>{title}</Typography>
    {searchable && (
      <TextField
        size="small"
        fullWidth
        placeholder="Поиск"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        sx={{ mb: 1 }}
      />
    )}
    <Box sx={{ maxHeight: 180, overflowY: 'auto' }}>
      {options
        .filter((option) => !query || option.toLowerCase().includes(query.toLowerCase()))
        .map((option) => (
          <FormControlLabel
            key={option}
            sx={{ display: 'flex', ml: 0 }}
            control={
              <Checkbox
                size="small"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
            }
            label={<Typography sx={{ fontSize: 14 }}>{option}</Typography>}
          />
        ))}
    </Box>
  </Box>
);

const FurnitureCategory = () => {
  const { slug } = useParams();
  const category = FURNITURE_CATEGORIES.find((item) => item.slug === slug);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(emptyFilters());
  const [brandQuery, setBrandQuery] = useState('');
  const [page, setPage] = useState(1);
  const [extra, setExtra] = useState(0);
  const { showAuthModal, setShowAuthModal } = useProductActions();

  useEffect(() => {
    axios.get(API).then(({ data }) => {
      setProducts((Array.isArray(data) ? data : []).map(enrichProduct));
    }).catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    setFilters(emptyFilters());
    setPage(1);
    setExtra(0);
  }, [slug]);

  const categoryProducts = useMemo(
    () => products.filter((item) => item.furnitureSlug === slug),
    [products, slug]
  );

  const options = useMemo(() => ({
    brands: [...new Set(categoryProducts.map((item) => item.brand))],
    colors: [...new Set(categoryProducts.flatMap((item) => item.colors || [item.color]))],
    materials: [...new Set(categoryProducts.map((item) => item.material))],
    mechanisms: [...new Set(categoryProducts.map((item) => item.mechanism))],
    wheels: ['Есть', 'Нет'],
    drawers: ['Есть', 'Нет'],
    sizes: [...new Set(categoryProducts.map((item) => item.size))],
  }), [categoryProducts]);

  const filtered = useMemo(() => {
    return categoryProducts.filter((item) => {
      const price = parsePrice(item.price);
      if (filters.priceFrom && price < Number(filters.priceFrom)) return false;
      if (filters.priceTo && price > Number(filters.priceTo)) return false;
      if (filters.inStock && !item.inStock) return false;
      if (filters.brands.length && !filters.brands.includes(item.brand)) return false;
      if (filters.colors.length && !(item.colors || []).some((color) => filters.colors.includes(color))) return false;
      if (filters.materials.length && !filters.materials.includes(item.material)) return false;
      if (filters.mechanisms.length && !filters.mechanisms.includes(item.mechanism)) return false;
      if (filters.wheels.length && !filters.wheels.includes(item.wheels)) return false;
      if (filters.drawers.length && !filters.drawers.includes(item.drawer)) return false;
      if (filters.sizes.length && !filters.sizes.includes(item.size)) return false;
      return true;
    });
  }, [categoryProducts, filters]);

  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE + extra);

  const selectedChips = [
    ...filters.brands,
    ...filters.colors,
    ...filters.materials,
    ...filters.mechanisms,
    ...filters.wheels.map((item) => `Колеса: ${item}`),
    ...filters.drawers.map((item) => `Ящик: ${item}`),
    ...filters.sizes,
    filters.inStock ? 'Только в наличии' : null,
    filters.priceFrom ? `от ${filters.priceFrom}` : null,
    filters.priceTo ? `до ${filters.priceTo}` : null,
  ].filter(Boolean);

  const removeChip = (chip) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (chip === 'Только в наличии') next.inStock = false;
      else if (String(chip).startsWith('от ')) next.priceFrom = '';
      else if (String(chip).startsWith('до ')) next.priceTo = '';
      else if (String(chip).startsWith('Колеса: ')) next.wheels = next.wheels.filter((item) => `Колеса: ${item}` !== chip);
      else if (String(chip).startsWith('Ящик: ')) next.drawers = next.drawers.filter((item) => `Ящик: ${item}` !== chip);
      else {
        ['brands', 'colors', 'materials', 'mechanisms', 'sizes'].forEach((key) => {
          next[key] = next[key].filter((item) => item !== chip);
        });
      }
      return next;
    });
    setPage(1);
    setExtra(0);
  };

  if (!category) {
    return <Typography sx={{ p: 4 }}>Категория не найдена</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1450, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <Breadcrumbs sx={{ fontSize: 13, color: '#7E929D', mb: 2 }}>
        <MuiLink component={NavLink} to="/" underline="hover" color="inherit">Главная</MuiLink>
        <MuiLink component={NavLink} to="/children-furniture" underline="hover" color="inherit">Детская мебель</MuiLink>
        <Typography sx={{ fontSize: 13, color: '#334D5C' }}>{category.label}</Typography>
      </Breadcrumbs>

      <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: '#2F3E4E', mb: 4 }}>
        {category.label}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: 4 }}>
        <Box>
          {selectedChips.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 15 }}>Выбранные фильтры</Typography>
                <Typography
                  onClick={() => {
                    setFilters(emptyFilters());
                    setPage(1);
                    setExtra(0);
                  }}
                  sx={{ fontSize: 13, color: '#5FC2DE', cursor: 'pointer' }}
                >
                  Сбросить все
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedChips.map((chip) => (
                  <Chip key={chip} label={chip} onDelete={() => removeChip(chip)} />
                ))}
              </Box>
            </Box>
          )}

          <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 1.5 }}>Цена, ₽</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              size="small"
              placeholder="от"
              value={filters.priceFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, priceFrom: e.target.value.replace(/\D/g, '') }))}
            />
            <TextField
              size="small"
              placeholder="до"
              value={filters.priceTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, priceTo: e.target.value.replace(/\D/g, '') }))}
            />
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.inStock}
                onChange={(e) => setFilters((prev) => ({ ...prev, inStock: e.target.checked }))}
              />
            }
            label="Только в наличии"
            sx={{ mb: 2 }}
          />

          <FilterGroup
            title="Бренд"
            options={options.brands}
            selected={filters.brands}
            onToggle={(value) => setFilters((prev) => ({ ...prev, brands: toggleValue(prev.brands, value) }))}
            searchable
            query={brandQuery}
            onQuery={setBrandQuery}
          />
          <FilterGroup
            title="Цвет"
            options={options.colors}
            selected={filters.colors}
            onToggle={(value) => setFilters((prev) => ({ ...prev, colors: toggleValue(prev.colors, value) }))}
          />
          <FilterGroup
            title="Материал"
            options={options.materials}
            selected={filters.materials}
            onToggle={(value) => setFilters((prev) => ({ ...prev, materials: toggleValue(prev.materials, value) }))}
          />
          <FilterGroup
            title="Маятник"
            options={options.mechanisms}
            selected={filters.mechanisms}
            onToggle={(value) => setFilters((prev) => ({ ...prev, mechanisms: toggleValue(prev.mechanisms, value) }))}
          />
          <FilterGroup
            title="Колеса"
            options={options.wheels}
            selected={filters.wheels}
            onToggle={(value) => setFilters((prev) => ({ ...prev, wheels: toggleValue(prev.wheels, value) }))}
          />
          <FilterGroup
            title="Ящик"
            options={options.drawers}
            selected={filters.drawers}
            onToggle={(value) => setFilters((prev) => ({ ...prev, drawers: toggleValue(prev.drawers, value) }))}
          />
          <FilterGroup
            title="Размер"
            options={options.sizes}
            selected={filters.sizes}
            onToggle={(value) => setFilters((prev) => ({ ...prev, sizes: toggleValue(prev.sizes, value) }))}
          />
        </Box>

        <Box>
          <Typography sx={{ color: '#7E929D', mb: 2, fontSize: 14 }}>
            Показано {visible.length} из {filtered.length} товаров
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>

          {filtered.length === 0 && (
            <Typography sx={{ py: 6, textAlign: 'center', color: '#7E929D' }}>
              Товаров по выбранным фильтрам не найдено
            </Typography>
          )}

          <CatalogPagination
            total={filtered.length}
            page={page}
            extra={extra}
            onPageChange={(value) => {
              setPage(value);
              setExtra(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowMore={() => setExtra((prev) => prev + PAGE_SIZE)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FurnitureCategory;
