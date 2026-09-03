import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink, MenuItem, Select } from '@mui/material';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { getCards } from '../../API/cardsData';
import { FURNITURE_CATEGORIES, enrichProduct, parsePrice } from '../../utils/furniture';
import ProductCard from '../../Layout/ProductCard';
import CatalogPagination, { PAGE_SIZE } from '../../Layout/CatalogPagination';
import AuthRequiredModal from '../../Layout/AuthRequiredModal';
import { useProductActions } from '../../hooks/useProductActions';

const ChildrenFurniture = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [extra, setExtra] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showAuthModal, setShowAuthModal } = useProductActions();

  useEffect(() => {
    getCards().then((data) => {
      setProducts((Array.isArray(data) ? data : []).map(enrichProduct));
    }).catch(() => setProducts([]));
  }, []);

  const sorted = useMemo(() => {
    const query = searchParams.get('search')?.trim().toLowerCase() || '';
    const list = products.filter((product) => product.title?.toLowerCase().includes(query));
    if (sort === 'price-asc') list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sort === 'price-desc') list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sort === 'new') list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [products, searchParams, sort]);

  const start = (page - 1) * PAGE_SIZE;
  const visible = sorted.slice(start, start + PAGE_SIZE + extra);

  return (
    <Box sx={{ maxWidth: 1450, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      <AuthRequiredModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <Breadcrumbs sx={{ fontSize: 13, color: '#7E929D', mb: 2 }}>
        <MuiLink component={NavLink} to="/" underline="hover" color="inherit">Главная</MuiLink>
        <Typography sx={{ fontSize: 13, color: '#334D5C' }}>Детская мебель</Typography>
      </Breadcrumbs>

      <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: '#2F3E4E', mb: 4 }}>
        Детская мебель
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '240px 1fr' }, gap: 4 }}>
        <Box>
          {FURNITURE_CATEGORIES.map((cat) => (
            <Typography
              key={cat.slug}
              onClick={() => navigate(`/children-furniture/${cat.slug}`)}
              sx={{
                fontSize: 15,
                color: '#3A4B63',
                py: 1.1,
                cursor: 'pointer',
                '&:hover': { color: '#5FC2DE' },
              }}
            >
              {cat.label}
            </Typography>
          ))}
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Select
              size="small"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
                setExtra(0);
              }}
              sx={{ minWidth: 200, fontSize: 14 }}
            >
              <MenuItem value="popular">По популярности</MenuItem>
              <MenuItem value="new">По новизне</MenuItem>
              <MenuItem value="price-asc">Сначала дешевые</MenuItem>
              <MenuItem value="price-desc">Сначала дорогие</MenuItem>
            </Select>
          </Box>

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

          <CatalogPagination
            total={sorted.length}
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

export default ChildrenFurniture;
