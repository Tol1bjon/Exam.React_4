import React from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Section1Map = () => {
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
                boxSizing: 'border-box'
            }}
        >
            {/* Хлебные крошки */}
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 2 }}>
                <Box component={NavLink} to="/" sx={{ color: '#7E929D', textDecoration: 'none', '&:hover': { color: '#334D5C' } }}>
                    Главная
                </Box> 
                &nbsp;&gt;&nbsp; 
                <Box component="span" sx={{ color: '#334D5C' }}>Контакты</Box>
            </Typography>

            {/* Заголовок страницы */}
            <Typography 
                variant="h4" 
                sx={{ 
                    color: '#334D5C', 
                    fontWeight: 'bold', 
                    mb: { xs: 4, md: 6 },
                    fontSize: { xs: '24px', md: '36px' }
                }}
            >
                Контакты
            </Typography>

            {/* Основной контент: Две колонки */}
            <Box 
                sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                    gap: { xs: 6, md: 8 },
                    alignItems: 'start'
                }}
            >
                {/* Левая колонка: Контактные данные */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Box>
                        <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 1, fontSize: '18px' }}>
                            Адрес
                        </Typography>
                        <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.6 }}>
                            Республика Дагестан, г. Махачкала, улица Батырая 108
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 1, fontSize: '18px' }}>
                            Телефон
                        </Typography>
                        <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.6 }}>
                            +7 872 278 08 58
                        </Typography>
                        <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.6 }}>
                            +7 988 799 93 27
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 1, fontSize: '18px' }}>
                            Электронный адрес
                        </Typography>
                        <Typography sx={{ color: '#334D5C', fontSize: '14px', lineHeight: 1.6 }}>
                            karapuz_108@mail.ru
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2, fontSize: '18px' }}>
                            Мы в социальных сетях
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box component="a" href="#" sx={{ color: '#54B5F6', fontSize: '28px', '&:hover': { opacity: 0.8 } }}>
                                <InstagramIcon fontSize="inherit" />
                            </Box>
                            <Box component="a" href="#" sx={{ color: '#54B5F6', fontSize: '28px', '&:hover': { opacity: 0.8 } }}>
                                <WhatsAppIcon fontSize="inherit" />
                            </Box>
                            <Box component="a" href="#" sx={{ color: '#54B5F6', fontSize: '28px', '&:hover': { opacity: 0.8 } }}>
                                <TelegramIcon fontSize="inherit" />
                            </Box>
                            <Box component="a" href="#" sx={{ color: '#54B5F6', fontSize: '28px', '&:hover': { opacity: 0.8 } }}>
                                <FacebookIcon fontSize="inherit" />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Правая колонка: Форма обратной связи */}
                <Box 
                    component="form" 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 3,
                        maxWidth: '550px'
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', fontSize: '18px' }}>
                        Напишите нам, и мы ответим на все Ваши вопросы
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <TextField 
                            label="Имя"
                            variant="outlined"
                            defaultValue="Арсен"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    borderColor: '#CCD6DD',
                                },
                                '& .MuiInputLabel-root': { color: '#7E929D' }
                            }}
                        />
                        <TextField 
                            label="Телефон"
                            variant="outlined"
                            placeholder="+7 (___) ___-__-__"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    borderColor: '#CCD6DD',
                                },
                                '& .MuiInputLabel-root': { color: '#7E929D' }
                            }}
                        />
                    </Box>

                    <TextField 
                        label="Сообщение"
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                borderColor: '#CCD6DD',
                            },
                            '& .MuiInputLabel-root': { color: '#7E929D' }
                        }}
                    />

                    <FormControlLabel 
                        control={
                            <Checkbox 
                                sx={{ 
                                    color: '#7E929D',
                                    '&.Mui-checked': { color: '#54B5F6' }
                                }} 
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: '13px', color: '#7E929D' }}>
                                Соглашение на обработку данных и пользовательское соглашение
                            </Typography>
                        }
                    />

                    <Button 
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#89D2F8',
                            color: '#fff',
                            textTransform: 'none',
                            borderRadius: '8px',
                            py: 1.5,
                            fontSize: '15px',
                            fontWeight: '500',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#6AC4F3',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Отправить
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Section1Map;
