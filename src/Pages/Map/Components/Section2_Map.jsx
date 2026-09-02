import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Box, Typography } from '@mui/material';

const Section2Map = () => {
    // Координаты центра Душанбе (например, площадь им. Исмоили Сомони)
    const defaultState = {
        center: [38.5598, 68.7870],
        zoom: 13,
    };

    return (
        <Box sx={{ maxWidth: {xs: '100%', md: '1450px'}, margin: 'auto', height: '450px', borderRadius: '16px', overflow: 'hidden', my: 4 }}>
            <Typography variant="h6" sx={{ color: '#334D5C', fontWeight: 'bold', mb: 2 }}>
                Мы на карте (Душанбе)
            </Typography>
            <YMaps>
                <Map defaultState={defaultState} width="100%" height="100%">
                    {/* Метка на карте для Душанбе */}
                    <Placemark geometry={[38.5598, 68.7870]} />
                </Map>
            </YMaps>
        </Box>
    );
}

export default Section2Map;