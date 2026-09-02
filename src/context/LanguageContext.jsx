import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_KEY = 'language';

const translations = {
  ru: {
    sale: 'Акции', about: 'О нас', blog: 'Блог', wholesale: 'Оптовым клиентам', returns: 'Возврат', paymentDelivery: 'Оплата и доставка', contacts: 'Контакты',
    catalog: 'Каталог товаров', online: 'Онлайн гипермаркет', childrenGoods: 'товаров для детей',
    cart: 'Корзина', login: 'Войти в личный кабинет', orders: 'Мои заказы', favorites: 'Мое избранное', personalData: 'Настройки личных данных', logout: 'Выйти',
    childrenFurniture: 'Детская мебель', promotions: 'Акции', strollers: 'Коляски', carSeats: 'Автокресла', clothes: 'Одежда', feeding: 'Кормление', hygiene: 'Гигиена и уход', toys: 'Умные игрушки',
    beds: 'Кроватки', cradles: 'Колыбели', bassinets: 'Люльки', changing: 'Пеленальные комоды', wardrobes: 'Шкафы', accessories: 'Аксессуары',
  },
  en: {
    sale: 'Sale', about: 'About us', blog: 'Blog', wholesale: 'Wholesale', returns: 'Returns', paymentDelivery: 'Payment and delivery', contacts: 'Contacts',
    catalog: 'Product catalog', online: 'Online hypermarket', childrenGoods: 'children’s products',
    cart: 'Cart', login: 'Sign in', orders: 'My orders', favorites: 'My favorites', personalData: 'Personal data settings', logout: 'Sign out',
    childrenFurniture: 'Children’s furniture', promotions: 'Sale', strollers: 'Strollers', carSeats: 'Car seats', clothes: 'Clothing', feeding: 'Feeding', hygiene: 'Hygiene and care', toys: 'Smart toys',
    beds: 'Cots', cradles: 'Cradles', bassinets: 'Bassinets', changing: 'Changing tables', wardrobes: 'Wardrobes', accessories: 'Accessories',
  },
};

const commonTranslations = {
  'Главная': 'Home', 'Детская мебель': 'Children’s furniture', 'Коляски': 'Strollers', 'Кроватки': 'Cots',
  'Популярные категории': 'Popular categories', 'Новинки': 'New arrivals', 'В корзину': 'Add to cart',
  'Купить в один клик': 'Buy now', 'Смотреть': 'View', 'Подробнее': 'Learn more', 'Показать еще': 'Show more',
  'Избранное': 'Favorites', 'Мое избранное': 'My favorites', 'Настройки личных данных': 'Personal data settings',
  'Личные данные': 'Personal data', 'Корзина': 'Cart', 'Войти': 'Sign in', 'Выйти': 'Sign out',
  'Регистрация': 'Registration', 'Восстановить пароль': 'Reset password', 'Оформление заказа': 'Checkout',
  'Ваш заказ': 'Your order', 'Итого': 'Total', 'Итого к оплате': 'Total to pay', 'Оформить заказ': 'Checkout',
  'Перейти к оплате': 'Proceed to payment', 'Оплата банковской картой': 'Bank card payment', 'Оплатить': 'Pay',
  'Спасибо за покупку': 'Thank you for your purchase', 'Заказ оплачен': 'Order paid', 'Вернуться в магазин': 'Back to shop',
  'Заказ не найден': 'Order not found', 'Товар для оформления не выбран': 'No product selected for checkout',
  'Цена, ₽': 'Price, ₽', 'Бренд': 'Brand', 'Цвет': 'Color', 'Материал': 'Material', 'Размер': 'Size',
  'Доставка': 'Delivery', 'Адрес доставки': 'Delivery address', 'Город': 'City', 'Имя': 'First name',
  'Фамилия': 'Last name', 'Телефон': 'Phone', 'Комментарий к заказу': 'Order comment', 'Новая карта': 'New card',
  'Номер карты': 'Card number', 'Имя владельца': 'Cardholder name', 'Срок': 'Expiry date', 'Срок действия ММ/ГГ': 'Expiry MM/YY',
  'Мои заказы': 'My orders', 'Каталог товаров': 'Product catalog', 'Акции': 'Sale', 'О нас': 'About us',
  'Блог': 'Blog', 'Контакты': 'Contacts', 'Оплата и доставка': 'Payment and delivery', 'Возврат': 'Returns',
  'Оптовым клиентам': 'Wholesale', 'Кроватки': 'Cots', 'Колыбели': 'Cradles', 'Люльки': 'Bassinets',
  'Пеленальные комоды': 'Changing tables', 'Шкафы': 'Wardrobes', 'Аксессуары': 'Accessories',
  'Только в наличии': 'In stock only', 'Сбросить все': 'Reset all', 'Поиск': 'Search', 'По популярности': 'Popular',
  'Сначала дешевые': 'Price: low to high', 'Сначала дорогие': 'Price: high to low', 'По новизне': 'Newest',
  'Пока нет отзывов': 'No reviews yet', 'Отзывы': 'Reviews', 'Описание': 'Description', 'Характеристики': 'Specifications',
};

const translateText = (value, language) => {
  if (language === 'ru') {
    return Object.prototype.hasOwnProperty.call(commonTranslations, value)
      ? Object.keys(commonTranslations).find((key) => commonTranslations[key] === value) || value
      : value;
  }
  return translations.en[value] || commonTranslations[value] || value;
};

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_KEY) || 'ru');
  const russianToEnglish = useMemo(
    () => Object.fromEntries(Object.entries(translations.ru).map(([key, value]) => [value, translations.en[key]])),
    []
  );

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;

    const translateDom = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.parentElement.tagName)) nodes.push(node);
      }
      nodes.forEach((textNode) => {
        const translated = translateText(textNode.nodeValue.trim(), language);
        if (translated !== textNode.nodeValue.trim() && textNode.nodeValue.trim()) {
          textNode.nodeValue = textNode.nodeValue.replace(textNode.nodeValue.trim(), translated);
        }
      });
    };

    translateDom();
    const observer = new MutationObserver(translateDom);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => translations[language][key] || (language === 'en' ? russianToEnglish[key] : key) || key,
  }), [language, russianToEnglish]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
