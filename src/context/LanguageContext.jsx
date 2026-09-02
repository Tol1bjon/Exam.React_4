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
  'Главная': 'Home',
  'Детская мебель': 'Children’s furniture',
  'Коляски': 'Strollers',
  'Кроватки': 'Cots',
  'Популярные категории': 'Popular categories',
  'Новинки': 'New arrivals',
  'В корзину': 'Add to cart',
  'Купить в один клик': 'Buy now',
  'Смотреть': 'View',
  'Подробнее': 'Learn more',
  'Показать еще': 'Show more',
  'Избранное': 'Favorites',
  'Мое избранное': 'My favorites',
  'Настройки личных данных': 'Personal data settings',
  'Личные данные': 'Personal data',
  'Корзина': 'Cart',
  'Войти': 'Sign in',
  'Выйти': 'Sign out',
  'Регистрация': 'Registration',
  'Восстановить пароль': 'Reset password',
  'Оформление заказа': 'Checkout',
  'Ваш заказ': 'Your order',
  'Итого': 'Total',
  'Итого к оплате': 'Total to pay',
  'Перейти к оплате': 'Proceed to payment',
  'Оплата банковской картой': 'Bank card payment',
  'Оплатить': 'Pay',
  'Спасибо за покупку': 'Thank you for your purchase',
  'Заказ оплачен': 'Order paid',
  'Вернуться в магазин': 'Back to shop',
  'Заказ не найден': 'Order not found',
  'Товар для оформления не выбран': 'No product selected for checkout',
  'Цена, ₽': 'Price, ₽',
  'Бренд': 'Brand',
  'Цвет': 'Color',
  'Материал': 'Material',
  'Размер': 'Size',
  'Доставка': 'Delivery',
  'Адрес доставки': 'Delivery address',
  'Город': 'City',
  'Имя': 'First name',
  'Фамилия': 'Last name',
  'Телефон': 'Phone',
  'Комментарий к заказу': 'Order comment',
  'Новая карта': 'New card',
  'Номер карты': 'Card number',
  'Имя владельца': 'Cardholder name',
  'Срок': 'Expiry date',
  'Срок действия ММ/ГГ': 'MM/YY',
  'Мои заказы': 'My orders',
  'Каталог товаров': 'Product catalog',
  'Акции': 'Sale',
  'О нас': 'About us',
  'Блог': 'Blog',
  'Контакты': 'Contacts',
  'Оплата и доставка': 'Payment and delivery',
  'Возврат': 'Returns',
  'Оптовым клиентам': 'Wholesale',
  'Колыбели': 'Cradles',
  'Люльки': 'Bassinets',
  'Пеленальные комоды': 'Changing tables',
  'Шкафы': 'Wardrobes',
  'Аксессуары': 'Accessories',
  'Только в наличии': 'In stock only',
  'Сбросить все': 'Reset all',
  'Поиск': 'Search',
  'По популярности': 'Popular',
  'Сначала дешевые': 'Price: low to high',
  'Сначала дорогие': 'Price: high to low',
  'По новизне': 'Newest',
  'Пока нет отзывов': 'No reviews yet',
  'Отзывы': 'Reviews',
  'Описание': 'Description',
  'Характеристики': 'Specifications',
  'Дальше': 'Next',
  'Читать': 'Read',
  'Смотреть костюмы': 'View sets',
  'Сообщение': 'Message',
  'Электронный адрес': 'Email address',
  'Ваш электронный адрес': 'Your email address',
  'Пароль': 'Password',
  'Повторите пароль': 'Repeat password',
  'Пользователь': 'User',
  'Пожалуйста, введите email': 'Please enter email',
  'Заполните все поля': 'Fill in all fields',
  'Пароли не совпадают': 'Passwords do not match',
  'Пароль должен быть минимум 6 символов': 'Password must be at least 6 characters',
  'Успешная регистрация': 'Registration successful',
  'Успешный вход': 'Login successful',
  'Неверный email или пароль': 'Incorrect email or password',
  'Некорректный email': 'Invalid email',
  'Email не найден': 'Email not found',
  'Инструкции отправлены на почту': 'Instructions sent by email',
  'Введите пароль': 'Enter password',
  'Введите имя': 'Enter your name',
  'Введите корректный email': 'Enter a valid email',
  'Введите корректный телефон': 'Enter a valid phone number',
  'Есть': 'Yes',
  'Нет': 'No',
  'Комоды': 'Dressers',
  'Пеленаторы': 'Changing tables',
  'Подростковые кровати': 'Teen beds',
  'Прогулочные': 'Strollers',
  'Трансформеры 2в1': '2-in-1 transformers',
  'Для двойни': 'For twins',
  'Аксессуары для колясок': 'Stroller accessories',
  '0–13 кг': '0–13 kg',
  '9–18 кг': '9–18 kg',
  '15–36 кг': '15–36 kg',
  'Для новорождённых': 'For newborns',
  'Для мальчиков': 'For boys',
  'Для девочек': 'For girls',
  'Верхняя одежда': 'Outerwear',
  'Бутылочки': 'Bottles',
  'Смеси': 'Formula',
  'Стульчики для кормления': 'High chairs',
  'Посуда': 'Tableware',
  'Подгузники': 'Diapers',
  'Косметика': 'Cosmetics',
  'Аксессуары для купания': 'Bath accessories',
  'Развивающие': 'Educational',
  'Интерактивные': 'Interactive',
  'Конструкторы': 'Building sets',
  'Маленький': 'Small',
  'Средний': 'Medium',
  'Большой': 'Large',
  'Белый': 'White',
  'Берёза': 'Birch',
  'Бук': 'Beech',
  'Дуб': 'Oak',
  'Ольха': 'Alder',
  'Сосна': 'Pine',
  'ЛДСП': 'Chipboard',
  'МДФ': 'MDF',
  'Ясень': 'Ash',
  'Официальные дилеры лучших мировых производителей': 'Official dealers of the world’s best manufacturers',
  'Собственное эко-производство': 'In-house eco production',
  'Цены ниже, чем у конкурентов': 'Prices lower than competitors',
  'Все товары для детей в одном месте': 'All children’s products in one place',
  'от': 'from',
  'до': 'to',
  'Колеса': 'Wheels',
  'Ящик': 'Drawer',
  'Маятник': 'Pendulum',
  'Заказ №': 'Order no.',
  'Товаров по выбранным фильтрам не найдено': 'No products match the selected filters',
  'Показано': 'Showing',
  'из': 'of',
  'Количество': 'Quantity',
  'Курьерская доставка': 'Courier delivery',
  'Самовывоз': 'Pickup',
  'Транспортная компания': 'Transport company',
  'Наличными при получении': 'Cash on delivery',
  'Заказ принят в обработку.': 'Your order is being processed.',
  'Смотреть все акции': 'View all sales',
  'Назад': 'Back',
  'Город:': 'City:',
  'Найти': 'Search',
  'Я хочу купить...': 'I want to buy...',
  'Выход': 'Sign out',
  'Москва': 'Moscow',
  'Онлайн гипермаркет': 'Online hypermarket',
  'товаров для детей': 'children’s products',
  'Вход в аккаунт': 'Sign in to your account',
  'Восстановить пароль?': 'Reset password?',
  'Нет аккаунта? Зарегистрироваться': 'No account? Register',
  'Питание в I триместре': 'Nutrition in the first trimester',
  'Что принимать в пищу, чтобы малышу было комфортно и уютно в первые месяцы беременности': 'What to eat to keep your baby comfortable during the first months of pregnancy',
  'В 1-м триместре беременности рацион женщины существенно не отличается от ее меню до беременности, могут лишь поменяться вкусы беременной. Но уже сейчас нужно начать придерживаться принципов правильного питания, чтобы избежать токсикоза и заложить основу правильного развития эмбриона.': 'During the first trimester, a woman’s diet does not differ significantly from her pre-pregnancy menu, although her tastes may change. Start following healthy eating principles now to reduce morning sickness and support healthy embryo development.',
  'Постарайтесь включить в меню ежедневно зеленые салаты с растительным маслом и морскую рыбу. Важно начать прием препаратов фолиевой кислоты, йода и витамина Е, принимать на протяжении всей беременности. Из-за повышенной работы печени и почек целесообразно в самом начале  беременности значительно ограничить в рационе количество острых блюд и таких пряностей, как перец, горчица, уксус. Для снижения нагрузки на печень жареное и жирное старайтесь заменить на отварное и тушеное, ограничьте употребление сливочного масла, сметаны высокой жирности, сливок, растительного масла. Творог употреблять маложирный. Наряду с овощами и фруктами, кушайте хлеб грубого помола, так как в нем содержится клетчатка и витамины группы В.': 'Try to include green salads with vegetable oil and sea fish in your daily menu. Start taking folic acid, iodine and vitamin E throughout pregnancy. Because the liver and kidneys work harder, limit spicy foods and seasonings such as pepper, mustard and vinegar early in pregnancy. Replace fried and fatty foods with boiled or stewed dishes, and limit butter, full-fat sour cream, cream and vegetable oil. Choose low-fat cottage cheese. Along with vegetables and fruit, eat wholemeal bread rich in fibre and B vitamins.',
  'Читать следующую статью': 'Read the next article',
  'В корзине': 'In cart', 'Проверьте выбранные товары и оформите покупку': 'Review your products and place the order',
  'Стоимость товаров:': 'Products total:', 'За 1 шт.': 'Per item', 'Всего': 'Total',
  'Продолжить покупки': 'Continue shopping', 'Бесплатная доставка при покупке от 5000 ₽': 'Free delivery on orders over 5,000 ₽',
  'Возврат товара до 14 дней': '14-day returns', 'Гарантия на все товары': 'Warranty on all products',
  'Ваша корзина пуста': 'Your cart is empty', 'Вы еще ничего не добавили в корзину. Начните покупки прямо сейчас!': 'You have not added anything to your cart yet. Start shopping now!',
  'С этим покупают': 'Frequently bought together', 'Артикул:': 'Article:',
  'Данные получателя': 'Recipient details', 'Способ оплаты': 'Payment method', 'Количество:': 'Quantity:',
  'Товар для оформления не выбран': 'No product selected for checkout', 'Введите корректный телефон': 'Enter a valid phone number',
  'Заполните поле': 'Fill in this field', 'Перейти к оплате': 'Proceed to payment',
  'товар': 'item', 'Доставка:': 'Delivery:', 'Итого к оплате:': 'Total to pay:',
  'Вкусные скидки до -25% на все детское питание': 'Delicious discounts up to 25% off all baby food',
  'Оплата': 'Payment', 'Варианты оплаты г. Москва': 'Payment options in Moscow', 'Варианты оплаты регионы России': 'Payment options in Russian regions',
  'Оплата банковской картой на сайте': 'Online card payment', 'Банковский перевод': 'Bank transfer',
  'номер карты;': 'card number;', 'ФИО владельца;': 'cardholder full name;', 'срок действия карты;': 'card expiry date;', 'CVV/CVC код.': 'CVV/CVC code.',
  'Доставка по Москве': 'Delivery in Moscow', 'Мы осуществляем отправку товара в любой город России!': 'We ship products to any city in Russia!',
  'Мы доставляем заказы по Москве с понедельника по субботу с 9:00 до 19:00.': 'We deliver orders in Moscow Monday through Saturday from 9:00 to 19:00.',
  'Заказы, оформленные до 14:00 мы доставим на следующий день (кроме воскресенья).': 'Orders placed before 14:00 are delivered the next day, except Sunday.',
  'Курьер позвонит вам в день доставки за 40–60 минут до прибытия по адресу. Просим указывать данные фактического получателя заказа.': 'The courier will call 40–60 minutes before delivery. Please provide the actual recipient’s details.',
  'Заказы, подлежащие доставке транспортной компанией, мы доставим на терминал транспортной компании через 1–2 дня после получения оплаты.': 'Orders shipped by a transport company arrive at its terminal within 1–2 days after payment.',
  'Отправка производится только после 100% предоплаты': 'Shipping takes place only after 100% prepayment',
  'Доставка до терминала транспортной компанией в Москве и Махачкале и оформление документов для отправки - БЕСПЛАТНО': 'Delivery to the transport terminal in Moscow and Makhachkala and shipping documents are FREE',
  'Доставка товаров с платной доставкой - согласно тарифам Транспортной Компании': 'Paid delivery is charged according to the transport company’s rates',
  'Отправка осуществляется с терминала в Москве, Махачкале до терминала в городе назначения': 'Shipments go from the Moscow or Makhachkala terminal to the destination terminal',
  'Доставка товара осуществляется в фирменной упаковке, но по желанию и за счёт клиента можем заказать и обрешётку': 'Products ship in branded packaging; custom crating is available at the customer’s expense',
  'полностью ФИО;': 'full name;', 'серия паспорта;': 'passport series;', 'номер паспорта;': 'passport number;', 'дата выдачи паспорта.': 'passport issue date.',
  'С 1 сентября 2016 года грузы без указания этих данных транспортные компании к перевозке не принимают.': 'Since September 1, 2016, transport companies have not accepted shipments without these details.',
  'После получения денег на счёт товар отправляется в ТК в течении 1-3 рабочих дней.': 'After payment is received, the product is shipped within 1–3 business days.',
  'После отправки мы вышлем все номера квитанций, адрес и телефон транспортной компании, где Вы будете получать груз.': 'After shipping, we will send all receipt numbers and the transport company’s contact details.',
  'Оплата товара курьеру наличными при доставке;': 'Pay the courier in cash upon delivery;',
  'Оплата товара курьеру с помощью банковских карт Visa/MasterCard/МИР без комиссии;': 'Pay the courier by Visa, MasterCard or MIR card without a fee;',
  'Оплата товара по счету для физических и юридических лиц на р/с организации. Доставка товара осуществляется на следующий день после поступления денег на р/с нашей организации.': 'Pay by invoice for individuals or businesses. Delivery takes place the day after the payment reaches our account.',
  'Оплата товара онлайн через сайт с помощью банковских карт Visa/MasterCard/МИР без комиссии;': 'Pay online with a Visa, MasterCard or MIR card without a fee;',
  'Оплата товара по счету для физических и юридических лиц на р/с организации;': 'Pay by invoice for individuals or businesses;',
  'В регионы России товары отправляются только после 100% предоплаты;': 'Shipments to Russian regions require 100% prepayment;',
  'Оплата доставки между терминалами осуществляется при получении кресла на терминале ТК (за исключением городов с бесплатной доставкой).': 'Inter-terminal delivery is paid when the product is collected, except in cities with free delivery.',
  'Оплата банковской картой производится непосредственно на сайте в режиме online. Для этого при оформлении заказа укажите способ оплаты «Оплата банковской картой». Оплата осуществляется на сайте сразу после оформления заказа.': 'Card payment is made online directly on the website. Select card payment during checkout and pay immediately after placing the order.',
  'После подтверждения состава заказа, Ваших личных данных и адреса доставки откроется страница, где будет предложено ввести данные банковской карты плательщика:': 'After confirming your order, personal details and delivery address, a page will open where you can enter the payer’s card details:',
  'После ввода данных карты внимательно проверьте все заполненные поля и нажмите кнопку «Оплатить».': 'Check all card details carefully and click “Pay”.',
  'Оплата за заказ производится банковским платёжным поручением на расчётный счёт магазина.': 'Orders can be paid by bank transfer to the store’s account.',
  'При оформлении заказа выберите способ оплаты «Банковский перевод». Наш оператор свяжется с Вами и выставит счёт. Оплату можно произвести в любом из отделений банка или Почты России.': 'Select bank transfer at checkout. Our operator will contact you and issue an invoice, which can be paid at a bank or post office.',
  'Обратите внимание, что банки могут взимать комиссию (как правило, в размере 1,5- 2%) за проведение платежа.': 'Please note that banks may charge a transaction fee, usually 1.5–2%.',
  'Всё самое лучшее для вашего малыша с доставкой на дом.': 'The very best for your baby delivered to your home.',
  'Каталог': 'Catalog', 'Покупателям': 'For customers', 'Контакты': 'Contacts', 'О компании': 'About the company',
  'Автокресла': 'Car seats', 'Одежда и обувь': 'Clothing and shoes', 'Акции и скидки': 'Sales and discounts',
  'Возврат товара': 'Returns', 'Политика конфиденциальности': 'Privacy policy', 'Условия использования': 'Terms of use',
  'г. Москва, ул. Детская, 15': '15 Detskaya St., Moscow',
  '© 2026 Интернет-магазин «Карапуз». Все права защищены.': '© 2026 Karapuz online store. All rights reserved.',
  '© 2026 «Карапуз». Все права защищены.': '© 2026 Karapuz. All rights reserved.',
  'Все самое необходимое для вашего ребенка': 'Everything your child needs',
  'Посмотрите нашу новую подборку для ухода за вашим ребенком': 'Explore our new collection for caring for your child',
  'Все детские костюмы с акцией 10%': 'All children’s sets with 10% off',
  'Карапуз - это онлайн гипермаркет товаров для детей. С нами вырастают поколения!': 'Karapuz is an online hypermarket for children’s products. Generations grow with us!',
  'Выгодное предложение': 'Great offer',
  'Популярные товары': 'Popular products',
  'Товар добавлен в корзину': 'Product added to cart',
  'Перейти в корзину': 'Go to cart',
  'Коляска Riko Basic, Польша': 'Riko Basic stroller, Poland',
  'Кроватка детская Erbesi Incanto, Италия': 'Erbesi Incanto baby cot, Italy',
  'Постельное белье Riko Basic (3 предмета)': 'Riko Basic bedding set (3 pieces)',
  'Коляска Riko Basic, Зеленая': 'Riko Basic stroller, green',
  'Стульчик для кормления Happy Baby William': 'Happy Baby William high chair',
  'Автокресло Chicco Seat Up 012': 'Chicco Seat Up 012 car seat',
  'Электронные качели Mamaroo 4.0': 'Mamaroo 4.0 electronic swing',
  'Комод с пеленальным столом Incanto': 'Incanto dresser with changing table',
  'Развивающий коврик Fisher-Price': 'Fisher-Price educational play mat',
  'Набор детской посуды из бамбука': 'Bamboo children’s tableware set',
  'Ванночка для купания со сливом': 'Baby bath with drain',
  'Мобиль на кроватку музыкальный': 'Musical crib mobile',
  'Рюкзак-кенгуру ErgoBaby': 'ErgoBaby baby carrier',
  'Радионяня Philips Avent': 'Philips Avent baby monitor',
  'Ходунки каталка детские': 'Baby walker',
  'Манеж игровой складной': 'Foldable playpen',
  'Зимний конверт в коляску': 'Winter stroller footmuff',
  'Стерилизатор для бутылочек электрический': 'Electric bottle sterilizer',
  'Ночник проектор звездного неба': 'Starry sky projector night light',
  'Самокат трехколесный детский': 'Children’s three-wheel scooter',
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
