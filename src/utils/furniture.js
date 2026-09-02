export const FURNITURE_CATEGORIES = [
  { slug: 'krovatki', label: 'Кроватки' },
  { slug: 'kolybeli', label: 'Колыбели' },
  { slug: 'pelenatory', label: 'Пеленаторы' },
  { slug: 'podrostkovye', label: 'Подростковые кровати' },
  { slug: 'shkafy', label: 'Шкафы' },
  { slug: 'komody', label: 'Комоды' },
];

export const CATEGORY_SLUG_BY_LABEL = FURNITURE_CATEGORIES.reduce((acc, item) => {
  acc[item.label] = item.slug;
  return acc;
}, {
  Люльки: 'kolybeli',
  'Пеленальные комоды': 'pelenatory',
  Аксессуары: 'shkafy',
});

const BRANDS = ['Nuovita', 'Sweet Baby', 'Happy Baby', 'Indigo', 'Pituso', 'Mr Sandman', 'Erbesi', 'Polini', 'Агат', 'Антел'];
const MATERIALS = ['Бук', 'МДФ', 'Берёза', 'ЛДСП', 'Сосна', 'Дуб', 'Ольха', 'Ясень'];
const MECHANISMS = ['Маятник поперечный', 'Поперечный', 'Продольный', 'Универсальный'];
const SIZES = ['Маленький', 'Средний', 'Большой'];

export const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return parseFloat(String(price).replace(/\s|₽/g, '')) || 0;
};

export const formatPrice = (price) => {
  const text = String(price ?? '');
  return text.includes('₽') ? text : `${text} ₽`;
};

export const enrichProduct = (product) => {
  if (!product) return product;
  const id = Number(product.id) || 1;
  const category = FURNITURE_CATEGORIES[(id - 1) % FURNITURE_CATEGORIES.length];
  const specBrand = product.specifications?.Производитель;

  return {
    ...product,
    furnitureCategory: category.label,
    furnitureSlug: category.slug,
    brand: specBrand || BRANDS[id % BRANDS.length],
    color: product.colors?.[0] || 'Белый',
    colors: product.colors?.length ? product.colors : ['Белый'],
    material: product.specifications?.Материал || MATERIALS[id % MATERIALS.length],
    mechanism: MECHANISMS[id % MECHANISMS.length],
    wheels: id % 2 === 0 ? 'Есть' : 'Нет',
    drawer: id % 3 === 0 ? 'Есть' : 'Нет',
    inStock: id % 5 !== 0,
    size: SIZES[id % SIZES.length],
  };
};
