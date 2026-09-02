import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router';
import { getBlogItems } from '../../API/contentData';
import { useLanguage } from '../../context/LanguageContext';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Количество карточек на одной странице
    const navigate = useNavigate()
    const { t } = useLanguage();

    async function fetchBlogs() {
        try {
            const data = await getBlogItems();
            setBlogs(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(blogs.length / itemsPerPage);

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
            
            <Typography sx={{ fontSize: '14px', color: '#7E929D', mb: 2 }}>
                {t('Главная')} &nbsp;&gt;&nbsp; <Box component="span" sx={{ color: '#334D5C' }}>{t('Блог')}</Box>
            </Typography>

            
            <Typography 
                variant="h4" 
                sx={{ 
                    color: '#334D5C', 
                    fontWeight: 'bold', 
                    mb: { xs: 4, md: 6 },
                    fontSize: { xs: '24px', md: '36px' }
                }}
            >
                {t('Блог')}
            </Typography>

            
            <Box 
                sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: { xs: 3, md: 4 },
                    alignItems: 'start',
                    mb: 6
                }}
            >
                {currentItems.map((item, index) => (
                    <Box 
                        key={item.id || index}
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            border: '1px solid #E0E0E0',
                            borderRadius: '16px',
                            p: 2,
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        
                        <Box 
                            component={NavLink} 
                            to={`/blog/${item.id}`}
                            sx={{ borderRadius: '12px', overflow: 'hidden', display: 'block' }}
                        >
                            <Box 
                                component={motion.img}
                                whileHover={{ scale: 1.02 }}
                                src={item.img} 
                                alt={item.title}
                                sx={{ 
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </Box>

                        
                        <Typography 
                            component={NavLink}
                            to={`/blog/${item.id}`}
                            sx={{ 
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#334D5C',
                                textDecoration: 'none',
                                '&:hover': { color: '#5BC0EB' }
                            }}
                        >
                            {t(item.title)}
                        </Typography>

                        
                        <Typography 
                            sx={{ 
                                fontSize: '13px',
                                color: '#7E929D',
                                lineHeight: 1.4,
                                flexGrow: 1
                            }}
                        >
                            {t(item.instructure)}
                        </Typography>

                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                            <Button 
                                component={NavLink}
                                to={`/Blog/${item.id}`}
                                variant="outlined"
                                sx={{ 
                                    borderColor: '#CCD6DD',
                                    color: '#334D5C',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    px: 2,
                                    py: 0.5,
                                    fontSize: '13px',
                                    '&:hover': { borderColor: '#334D5C', backgroundColor: 'transparent' }
                                }}
                            >
                                {t('Читать')}
                            </Button>
                            
                            <Typography sx={{ fontSize: '12px', color: '#7E929D' }}>
                                {item.data}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 4 }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            sx={{ 
                                minWidth: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: '1px solid',
                                borderColor: currentPage === pageNumber ? '#334D5C' : '#E0E0E0',
                                backgroundColor: currentPage === pageNumber ? '#334D5C' : 'transparent',
                                color: currentPage === pageNumber ? '#fff' : '#334D5C',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: currentPage === pageNumber ? '#22333D' : '#f5f5f5'
                                }
                            }}
                        >
                            {pageNumber}
                        </Button>
                    ))}

                    
                    {currentPage < totalPages && (
                        <Button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            sx={{ 
                                color: '#334D5C',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                ml: 1,
                                '&:hover': { backgroundColor: 'transparent', color: '#5BC0EB' }
                            }}
                        >
                            {t('Дальше')} &gt;
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Blog;