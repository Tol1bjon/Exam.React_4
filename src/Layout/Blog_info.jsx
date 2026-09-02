import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
   import { getBlogItems } from '../API/contentData';

const BlogInfo = () => {
    const { id } = useParams();
    const [blogItem, setBlogItem] = useState(null);

    async function fetchBlog() {
        try {
               const blogArray = await getBlogItems();
            const found = blogArray.find(item => String(item.id) === String(id));
            setBlogItem(found || blogArray[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (!blogItem) {
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
                maxWidth: { xs: '100%', md: '1000px' }, 
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
                <Box component={NavLink} to="/blog" sx={{ color: '#7E929D', textDecoration: 'none', '&:hover': { color: '#334D5C' } }}>
                    Блог
                </Box> 
                &nbsp;&gt;&nbsp; 
                <Box component="span" sx={{ color: '#334D5C' }}>
                    {blogItem.title}
                </Box>
            </Typography>

            {/* Главное изображение (img) */}
            <Box 
                component="img"
                src={blogItem.img} 
                alt={blogItem.title}
                sx={{ 
                    width: '100%',
                    height: { xs: '220px', sm: '350px', md: '450px' },
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
                    mb: { xs: 3, md: 4 }
                }}
            />

            {/* Заголовок */}
            <Typography 
                variant="h4" 
                sx={{ 
                    color: '#334D5C', 
                    fontWeight: 'bold', 
                    mb: 1,
                    fontSize: { xs: '22px', sm: '28px', md: '34px' },
                    lineHeight: 1.2
                }}
            >
                {blogItem.title}
            </Typography>

            {/* Дата */}
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 3 }}>
                {blogItem.data}
            </Typography>

            {/* Основное описание */}
            <Typography 
                sx={{ 
                    fontSize: { xs: '14px', md: '16px' },
                    color: '#334D5C',
                    lineHeight: 1.6,
                    mb: 4
                }}
            >
                {blogItem.description}
            </Typography>

            {/* Второе изображение (img2) */}
            {blogItem.img2 && (
                <Box 
                    component="img"
                    src={blogItem.img2} 
                    alt="detail"
                    sx={{ 
                        width: '100%',
                        height: { xs: '200px', sm: '300px', md: '400px' },
                        objectFit: 'cover',
                        borderRadius: '16px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
                        mb: { xs: 3, md: 4 }
                    }}
                />
            )}

            {/* Цитата с иконкой кавычек */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    my: 4, 
                    p: 3, 
                    backgroundColor: '#F8F9FA', 
                    borderRadius: '12px',
                    borderLeft: '4px solid #334D5C'
                }}
            >
                <Typography sx={{ fontSize: '40px', lineHeight: 1, color: '#CCD6DD' }}>
                    “
                </Typography>
                <Typography 
                    sx={{ 
                        fontSize: { xs: '14px', md: '15px' },
                        color: '#334D5C',
                        fontStyle: 'italic',
                        lineHeight: 1.5
                    }}
                >
                    {blogItem.description}
                </Typography>
            </Box>

            {/* Дополнительный текст (desxription2) */}
            {blogItem.desxription2 && (
                <Typography 
                    sx={{ 
                        fontSize: { xs: '14px', md: '16px' },
                        color: '#334D5C',
                        lineHeight: 1.6,
                        mb: 6
                    }}
                >
                    {blogItem.desxription2}
                </Typography>
            )}

            {/* Ссылка на следующую статью */}
            <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #E0E0E0' }}>
                <Typography 
                    component={NavLink}
                    to="/blog"
                    sx={{ 
                        color: '#334D5C',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': { color: '#5BC0EB' }
                    }}
                >
                    Читать следующую статью &gt;
                </Typography>
            </Box>
        </Box>
    );
};

export default BlogInfo;