import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import kid from '../assets/Group 248.png';
import Button from './Button';
import img1 from '../assets/Ellipse 18.png';
import { useLanguage } from '../context/LanguageContext';

const Section1 = () => {
    const { t } = useLanguage();
    return (
        <Box sx={{ backgroundColor: "#FCF6F5", paddingY: { xs: "30px", md: "40px" }, overflow: 'hidden' }}>
            <Box sx={{
                maxWidth: "1450px",
                margin: "auto",
                px: { xs: 2, md: 4 },
                display: "flex",
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                gap: { xs: 4, md: 0 }
            }}>
                
                
                <Box 
                    component={motion.div}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "20px", 
                        alignItems: { xs: "", md: "start" },
                        textAlign: { xs: "center", md: "left" },
                        zIndex: 2,
                        maxWidth: { xs: '80%', md: '55%' }
                    }}
                >
                    <Typography 
                        variant='h2' 
                        sx={{
                            fontFamily: '"Balsamiq Sans", sans-serif', 
                            fontOpticalSizing: "auto", 
                            fontWeight: "400", 
                            fontStyle: "normal", 
                            color: "#446B80", 
                            fontSize: { xs: "34px", sm: "48px", md: "80px" },
                            lineHeight: { xs: 1.2, md: 1.1 }
                        }}
                    >
                        {t('Все самое необходимое для вашего ребенка')}
                    </Typography>

                    <Typography 
                        variant='body2' 
                        sx={{
                            color: "#446B80", 
                            maxWidth: "350px", 
                            fontSize: { xs: "15px", md: "17px" }
                        }}
                    >
                        {t('Посмотрите нашу новую подборку для ухода за вашим ребенком')}
                    </Typography>

                    <Button text={t('Смотреть')} to={"/"} />

                    
                    <Box sx={{ display: { lg: "block", xs: "none" }, position: "absolute", bottom: "100px", right: "770px" }} component={"img"} src={img1} />
                    <Box sx={{ display: { lg: "block", xs: "none" }, position: "absolute", bottom: "60px", right: "540px", width: "20px" }} component={"img"} src={img1} />
                    <Box sx={{ display: { lg: "block", xs: "none" }, position: "absolute", top: "60px", right: "540px", width: "20px" }} component={"img"} src={img1} />
                    <Box sx={{ display: { lg: "block", xs: "none" }, position: "absolute", top: "150px", right: "700px", width: "20px" }} component={"img"} src={img1} />
                    <Box sx={{ display: { lg: "block", xs: "none" }, position: "absolute", top: "60px", right: "880px", width: "40px" }} component={"img"} src={img1} />
                </Box>

                
                <Box 
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    sx={{ 
                        width: { xs: "100%", md: "50%" },
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box 
                        component={"img"} 
                        src={kid} 
                        sx={{ 
                            width: { xs: "100%", sm: "80%", md: "100%" }, 
                            maxWidth: "550px",
                            height: 'auto',
                            objectFit: 'contain'
                        }} 
                    />
                </Box>

            </Box>
        </Box>
    );
}

export default Section1;