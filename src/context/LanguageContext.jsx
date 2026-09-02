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
  'Дальше': 'Next', 'Читать': 'Read', 'Смотреть костюмы': 'View costumes', 'Сообщение': 'Message',
  'Электронный адрес': 'Email address', 'Ваш электронный адрес': 'Your email address', 'Пароль': 'Password',
  'Повторите пароль': 'Repeat password', 'Пользователь': 'User', 'Пожалуйста, введите email': 'Please enter email',
  'Заполните все поля': 'Fill in all fields', 'Пароли не совпадают': 'Passwords do not match',
  'Пароль должен быть минимум 6 символов': 'Password must be at least 6 characters',
  'Успешная регистрация': 'Registration successful', 'Успешный вход': 'Login successful',
  'Неверный email или пароль': 'Incorrect email or password', 'Некорректный email': 'Invalid email',
  'Email не найден': 'Email not found', 'Инструкции отправлены на почту': 'Instructions sent by email',
  'Введите пароль': 'Enter password', 'Введите имя': 'Enter your name', 'Введите корректный email': 'Enter a valid email',
  'Введите корректный телефон': 'Enter a valid phone number', 'Есть': 'Yes', 'Нет': 'No',
  'Комоды': 'Dressers', 'Пеленаторы': 'Changing tables', 'Подростковые кровати': 'Teen beds',
  'Прогулочные': 'Strollers', 'Трансформеры 2в1': '2-in-1 transformers', 'Для двойни': 'For twins',
  'Аксессуары для колясок': 'Stroller accessories', '0–13 кг': '0–13 kg', '9–18 кг': '9–18 kg', '15–36 кг': '15–36 kg',
  'Для новорождённых': 'For newborns', 'Для мальчиков': 'For boys', 'Для девочек': 'For girls',
  'Верхняя одежда': 'Outerwear', 'Бутылочки': 'Bottles', 'Смеси': 'Formula', 'Стульчики для кормления': 'High chairs',
  'Посуда': 'Tableware', 'Подгузники': 'Diapers', 'Косметика': 'Cosmetics', 'Аксессуары для купания': 'Bath accessories',
  'Развивающие': 'Educational', 'Интерактивные': 'Interactive', 'Конструкторы': 'Building sets',
  'Маленький': 'Small', 'Средний': 'Medium', 'Большой': 'Large', 'Белый': 'White', 'Берёза': 'Birch',
  'Бук': 'Beech', 'Дуб': 'Oak', 'Ольха': 'Alder', 'Сосна': 'Pine', 'ЛДСП': 'Chipboard', 'МДФ': 'MDF', 'Ясень': 'Ash',
  'Официальные дилеры лучших мировых производителей': 'Official dealers of the world’s best manufacturers',
  'Собственное эко-производство': 'In-house eco production', 'Цены ниже, чем у конкурентов': 'Prices lower than competitors',
  'Все товары для детей в одном месте': 'All children’s products in one place', 'Только в наличии': 'In stock only',
  'Цена, ₽': 'Price, ₽', 'от': 'from', 'до': 'to', 'Колеса': 'Wheels', 'Ящик': 'Drawer', 'Маятник': 'Pendulum',
  'Мои заказы': 'My orders', 'Заказ №': 'Order no.', 'Товаров по выбранным фильтрам не найдено': 'No products match the selected filters',
  'Показано': 'Showing', 'из': 'of', 'Количество': 'Quantity', 'Курьерская доставка': 'Courier delivery',
  'Самовывоз': 'Pickup', 'Транспортная компания': 'Transport company', 'Наличными при получении': 'Cash on delivery',
  'Заказ принят в обработку.': 'Your order is being processed.', 'Оплата и доставка': 'Payment and delivery',
  'Смотреть все акции': 'View all sales', 'Назад': 'Back', 'Город:': 'City:',
  'Все самое необходимое для вашего ребенка': 'Everything your child needs',
  'Посмотрите нашу новую подборку для ухода за вашим ребенком': 'Explore our new collection for caring for your child',
  'Все детские костюмы с акцией 10%': 'All children’s outfits with 10% off',
  'Карапуз - это онлайн гипермаркет товаров для детей. С нами вырастают поколения!': 'Karapuz is an online hypermarket for children’s products. Generations grow with us!',
  'Выгодное предложение': 'Great offer', 'Популярные товары': 'Popular products',
  'Товар добавлен в корзину': 'Product added to cart', 'Перейти в корзину': 'Go to cart',
};

const reverseTranslations = Object.fromEntries(Object.entries(commonTranslations).map(([ru, en]) => [en, ru]));
const translateText = (value, language) => {
  const dictionary = language === 'en' ? commonTranslations : reverseTranslations;
  return Object.keys(dictionary)
    .sort((a, b) => b.length - a.length)
    .reduce((text, source) => text.split(source).join(dictionary[source]), value);
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
        const original = textNode.nodeValue;
        const translated = translateText(original, language);
        if (translated !== original && original.trim()) {
          textNode.nodeValue = translated;
        }
      });

      document.querySelectorAll('[placeholder], [title], [aria-label]').forEach((element) => {
        ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (value) element.setAttribute(attribute, translateText(value, language));
        });
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
