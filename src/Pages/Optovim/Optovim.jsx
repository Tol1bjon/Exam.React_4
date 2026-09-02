import React from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';

const Optovim = () => {
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
            
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 2 }}>
                <Box component={NavLink} to="/cart" sx={{ color: '#7E929D', textDecoration: 'none', '&:hover': { color: '#334D5C' } }}>
                    Корзина
                </Box> 
                &nbsp;&gt;&nbsp; 
                <Box component="span" sx={{ color: '#334D5C' }}>Оптовым клиентам</Box>
            </Typography>

            
            <Typography 
                variant="h4" 
                sx={{ 
                    color: '#334D5C', 
                    fontWeight: 'bold', 
                    mb: 1,
                    fontSize: { xs: '24px', md: '36px' }
                }}
            >
                Оптовым клиентам
            </Typography>

            <Typography 
                sx={{ 
                    color: '#334D5C', 
                    mb: 4,
                    fontSize: { xs: '14px', md: '16px' }
                }}
            >
                Заполните форму и мы отправим Вам выгодные условия партнерства
            </Typography>

            
            <Box 
                component="form" 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2.5,
                    maxWidth: '550px'
                }}
            >
                <TextField 
                    label="Имя*"
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
                    label="Телефон*"
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

                <TextField 
                    label="Электронный адрес*"
                    variant="outlined"
                    placeholder="example@mail.ru"
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
                    label="Город*"
                    variant="outlined"
                    size="small"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            borderColor: '#CCD6DD',
                        },
                        '& .MuiInputLabel-root': { color: '#7E929D' }
                    }}
                />

                
                <Box 
                    sx={{ 
                        border: '1px solid #CCD6DD', 
                        borderRadius: '8px', 
                        p: 1.5, 
                        maxWidth: '220px',
                        backgroundColor: '#fafafa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography sx={{ color: '#7E929D', fontSize: '13px' }}>
                        Вставить каптчу
                    </Typography>
                </Box>

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
    );
}

export default Optovim;