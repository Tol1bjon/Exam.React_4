import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, NavLink, useLocation } from 'react-router';
   import { getSaleItems } from '../API/contentData';

const SaleInfo = () => {
    const { id } = useParams();
    const location = useLocation();
    const [saleItem, setSaleItem] = useState(location.state || null);

    useEffect(() => {
        async function fetchSaleItem() {
            try {
                   const items = await getSaleItems();
                const found = items.find(item => String(item.id) === String(id));
                if (found) {
                    setSaleItem(found);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (!saleItem || String(saleItem.id) !== String(id)) {
            fetchSaleItem();
        }
    }, [id]);

    if (!saleItem) {
        return <Box sx={{ p: 4, textAlign: 'center' }}>Загрузка...</Box>;
    }

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
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: { xs: 3, md: 4 } }}>
                <Box component={NavLink} to="/" sx={{ color: '#7E929D', textDecoration: 'none', '&:hover': { color: '#334D5C' } }}>
                    Главная
                </Box> 
                &nbsp;&gt;&nbsp; 
                <Box component={NavLink} to="/Sale" sx={{ color: '#7E929D', textDecoration: 'none', '&:hover': { color: '#334D5C' } }}>
                    Акции
                </Box> 
                &nbsp;&gt;&nbsp; 
                <Box component="span" sx={{ color: '#334D5C' }}>
                    {saleItem.title}
                </Box>
            </Typography>

            {/* Большой баннер акции */}
            <Box 
                component="img"
                src={saleItem.img} 
                alt={saleItem.title}
                sx={{ 
                    width: '100%',
                    height: { xs: '200px', sm: '350px', md: '480px' },
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
                    mb: { xs: 3, md: 5 }
                }}
            />

            {/* Заголовок */}
            <Typography 
                variant="h4" 
                sx={{ 
                    fontFamily: '"Balsamiq Sans", sans-serif', 
                    fontOpticalSizing: "auto", 
                    fontWeight: "400", 
                    fontStyle: "normal", 
                    color: "#446B80", 
                    mb: 1.5,
                    fontSize: { xs: '22px', sm: '28px', md: '36px' },
                    lineHeight: 1.2
                }}
            >
                {saleItem.title}
            </Typography>

            {/* Дата */}
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 3 }}>
                {saleItem.day}
            </Typography>

            {/* Основной текст (description) */}
            <Typography 
                sx={{ 
                    fontSize: { xs: '14px', md: '16px' },
                    color: '#334D5C',
                    lineHeight: 1.6,
                    mb: 3
                }}
            >
                {saleItem.description}
            </Typography>

            {/* Дополнительный текст (description2) */}
            <Typography 
                sx={{ 
                    fontSize: { xs: '14px', md: '16px' },
                    color: '#334D5C',
                    lineHeight: 1.6
                }}
            >
                {saleItem.description2}
            </Typography>
        </Box>
    );
};

export default SaleInfo;