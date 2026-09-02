import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router';

const PaymentDelivery = () => {
    // Состояние для переключения вкладок: 'payment' или 'delivery'
    const [activeTab, setActiveTab] = useState('payment');

    return (
        <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ 
                maxWidth: { xs: '100%', md: '1450px' }, 
                margin: 'auto',
                py: { xs: 4, md: 8 }, 
                px: { xs: 2, md: 4 }, 
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}
        >
            {/* Хлебные крошки */}
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 2 }}>
                <Box component={NavLink} to="/cart" sx={{ color: '#7E929D', textDecoration: 'none', '&:hover': { color: '#334D5C' } }}>
                    Корзина
                </Box> 
                &nbsp;&gt;&nbsp; 
                <Box component="span" sx={{ color: '#334D5C' }}>Оплата и доставка</Box>
            </Typography>

            {/* Заголовок страницы */}
            <Typography 
                variant="h4" 
                sx={{ 
                    color: '#334D5C', 
                    fontWeight: 'bold', 
                    mb: 3,
                    fontSize: { xs: '24px', md: '36px' }
                }}
            >
                Оплата и доставка
            </Typography>

            {/* Кнопки переключения (Оплата / Доставка) */}
            <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                <Button 
                    onClick={() => setActiveTab('payment')}
                    variant={activeTab === 'payment' ? 'contained' : 'outlined'}
                    sx={{ 
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 4,
                        py: 1,
                        fontSize: '15px',
                        borderColor: '#CCD6DD',
                        backgroundColor: activeTab === 'payment' ? '#334D5C' : 'transparent',
                        color: activeTab === 'payment' ? '#fff' : '#334D5C',
                        boxShadow: 'none',
                        '&:hover': { 
                            backgroundColor: activeTab === 'payment' ? '#22333D' : '#f5f5f5',
                            borderColor: '#334D5C'
                        }
                    }}
                >
                    Оплата
                </Button>

                <Button 
                    onClick={() => setActiveTab('delivery')}
                    variant={activeTab === 'delivery' ? 'contained' : 'outlined'}
                    sx={{ 
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 4,
                        py: 1,
                        fontSize: '15px',
                        borderColor: '#CCD6DD',
                        backgroundColor: activeTab === 'delivery' ? '#334D5C' : 'transparent',
                        color: activeTab === 'delivery' ? '#fff' : '#334D5C',
                        boxShadow: 'none',
                        '&:hover': { 
                            backgroundColor: activeTab === 'delivery' ? '#22333D' : '#f5f5f5',
                            borderColor: '#334D5C'
                        }
                    }}
                >
                    Доставка
                </Button>
            </Box>

            {/* Контент в зависимости от выбранной вкладки */}
            <AnimatePresence mode="wait">
                {activeTab === 'payment' ? (
                    /* РАЗДЕЛ: ОПЛАТА */
                    <Box 
                        key="payment"
                        component={motion.div}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Сетка вариантов оплаты */}
                        <Box 
                            sx={{ 
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                                gap: { xs: 4, md: 8 },
                                mb: 6
                            }}
                        >
                            {/* Варианты оплаты г. Москва */}
                            <Box>
                                <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                                    Варианты оплаты г. Москва
                                </Typography>
                                <Box component="ol" sx={{ color: '#334D5C', pl: 2, lineHeight: 1.8, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <li>Оплата товара курьеру наличными при доставке;</li>
                                    <li>Оплата товара курьеру с помощью банковских карт Visa/MasterCard/МИР без комиссии;</li>
                                    <li>Оплата товара по счету для физических и юридических лиц на р/с организации. Доставка товара осуществляется на следующий день после поступления денег на р/с нашей организации.</li>
                                </Box>
                            </Box>

                            {/* Варианты оплаты регионы России */}
                            <Box>
                                <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                                    Варианты оплаты регионы России
                                </Typography>
                                <Box component="ol" sx={{ color: '#334D5C', pl: 2, lineHeight: 1.8, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <li>Оплата товара онлайн через сайт с помощью банковских карт Visa/MasterCard/МИР без комиссии;</li>
                                    <li>Оплата товара по счету для физических и юридических лиц на р/с организации;</li>
                                    <li>В регионы России товары отправляются только после 100% предоплаты;</li>
                                    <li>Оплата доставки между терминалами осуществляется при получении кресла на терминале ТК (за исключением городов с бесплатной доставкой).</li>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ borderBottom: '1px solid #E0E0E0', my: 6 }} />

                        {/* Оплата банковской картой на сайте */}
                        <Box sx={{ mb: 6, maxWidth: '900px' }}>
                            <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                                Оплата банковской картой на сайте
                            </Typography>
                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 2 }}>
                                Оплата банковской картой производится непосредственно на сайте в режиме online. Для этого при оформлении заказа укажите способ оплаты «Оплата банковской картой». Оплата осуществляется на сайте сразу после оформления заказа.
                            </Typography>
                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 2 }}>
                                После подтверждения состава заказа, Ваших личных данных и адреса доставки откроется страница, где будет предложено ввести данные банковской карты плательщика:
                            </Typography>
                            <Box component="ul" sx={{ color: '#334D5C', pl: 3, lineHeight: 1.7, fontSize: '14px', mb: 2 }}>
                                <li>номер карты;</li>
                               <li>ФИО владельца;</li>
                                <li>срок действия карты;</li>
                                <li>CVV/CVC код.</li>
                            </Box>
                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 2 }}>
                                После ввода данных карты внимательно проверьте все заполненные поля и нажмите кнопку «Оплатить».
                            </Typography>
                            <Typography sx={{ color: '#7E929D', fontSize: '13px', lineHeight: 1.6 }}>
                                Операция проводится через авторизационный сервер процессингового центра банка с использованием банковских карт платежных систем МИР, VISA, MasterCard (РФ и СНГ).
                            </Typography>
                        </Box>

                        <Box sx={{ borderBottom: '1px solid #E0E0E0', my: 6 }} />

                        {/* Банковский перевод */}
                        <Box sx={{ maxWidth: '900px' }}>
                            <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                                Банковский перевод
                            </Typography>
                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 2 }}>
                                Оплата за заказ производится банковским платёжным поручением на расчётный счёт магазина.
                            </Typography>
                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 2 }}>
                                При оформлении заказа выберите способ оплаты «Банковский перевод». Наш оператор свяжется с Вами и выставит счёт. Оплату можно произвести в любом из отделений банка или Почты России.
                            </Typography>
                            <Typography sx={{ color: '#7E929D', fontSize: '13px', lineHeight: 1.6 }}>
                                Обратите внимание, что банки могут взимать комиссию (как правило, в размере 1,5- 2%) за проведение платежа.
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    /* РАЗДЕЛ: ДОСТАВКА */
                    <Box 
                        key="delivery"
                        component={motion.div}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Доставка по Москве */}
                        <Box sx={{ mb: 6, maxWidth: '900px' }}>
                            <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                                Доставка по Москве
                            </Typography>
                            <Box component="ul" sx={{ color: '#334D5C', pl: 2, lineHeight: 1.8, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <li>Мы доставляем заказы по Москве с понедельника по субботу с 9:00 до 19:00.</li>
                                <li>Заказы, оформленные до 14:00 мы доставим на следующий день (кроме воскресенья).</li>
                                <li>Курьер позвонит вам в день доставки за 40–60 минут до прибытия по адресу. Просим указывать данные фактического получателя заказа.</li>
                                <li>Заказы, подлежащие доставке транспортной компанией, мы доставим на терминал транспортной компании через 1–2 дня после получения оплаты.</li>
                            </Box>
                        </Box>

                        <Box sx={{ borderBottom: '1px solid #E0E0E0', my: 6 }} />

                        {/* Мы осуществляем отправку товара в любой город России! */}
                        <Box sx={{ maxWidth: '950px' }}>
                            <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                                Мы осуществляем отправку товара в любой город России!
                            </Typography>
                            <Box component="ol" sx={{ color: '#334D5C', pl: 2, lineHeight: 1.8, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                <li>Отправка производится только после 100% предоплаты</li>
                                <li>Доставка до терминала транспортной компанией в Москве и Махачкале и оформление документов для отправки - БЕСПЛАТНО</li>
                                <li>Доставка товаров с платной доставкой - согласно тарифам Транспортной Компании</li>
                                <li>Отправка осуществляется с терминала в Москве, Махачкале до терминала в городе назначения</li>
                                <li>Доставка товара осуществляется в фирменной упаковке, но по желанию и за счёт клиента можем заказать и обрешётку</li>
                            </Box>

                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 2, fontWeight: '500' }}>
                                Внимание! В связи изменениями в Федеральных законах, установлен новый обязательный порядок приема-сдачи груза к экспедированию/перевозке и проверке достоверности информации о клиенте и свойствах груза. Транспортные компании требуют предоставление полных паспортных данных грузополучателя, таких как:
                            </Typography>
                            <Box component="ul" sx={{ color: '#334D5C', pl: 3, lineHeight: 1.7, fontSize: '14px', mb: 2 }}>
                                <li>полностью ФИО;</li>
                                <li>серия паспорта;</li>
                                <li>номер паспорта;</li>
                                <li>дата выдачи паспорта.</li>
                            </Box>
                            <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.7, mb: 3, fontWeight: '500' }}>
                                С 1 сентября 2016 года грузы без указания этих данных транспортные компании к перевозке не принимают.
                            </Typography>

                            <Box component="ol" start={6} sx={{ color: '#334D5C', pl: 2, lineHeight: 1.8, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                                <li>Для мебели, пластмассовых и стеклянных изделий без жесткой упаковки, электронных приборов требуется обрешетка. Обрешетка оплачивается получателем на терминале транспортной компании при получении. Стоимость обрешетки зависит от города доставки и габаритов груза и рассчитывается в транспортной компании.</li>
                                <li>После получения денег на счёт товар отправляется в ТК в течении 1-3 рабочих дней.</li>
                            </Box>

                            <Typography sx={{ color: '#7E929D', fontSize: '13px', lineHeight: 1.6 }}>
                                После отправки мы вышлем все номера квитанций, адрес и телефон транспортной компании, где Вы будете получать груз.
                            </Typography>
                        </Box>
                    </Box>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default PaymentDelivery;