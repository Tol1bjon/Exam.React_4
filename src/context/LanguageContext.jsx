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
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => translations[language][key] || (language === 'en' ? russianToEnglish[key] : key) || key,
  }), [language, russianToEnglish]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
