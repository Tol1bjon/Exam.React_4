import React from 'react';
import { Box, Button, Pagination } from '@mui/material';

const PAGE_SIZE = 12;

const CatalogPagination = ({ total, page, extra, onPageChange, onShowMore }) => {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const shown = Math.min(total, (page - 1) * PAGE_SIZE + PAGE_SIZE + extra);
  const canShowMore = shown < total;

  if (total === 0) return null;

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
      {canShowMore && (
        <Button
          type="button"
          onClick={onShowMore}
          sx={{
            width: '100%',
            maxWidth: 720,
            border: '1px solid #C9D4DC',
            color: '#3A4B63',
            textTransform: 'none',
            borderRadius: '10px',
            py: 1.2,
            fontWeight: 500,
            '&:hover': { bgcolor: '#F5F8FA', borderColor: '#5FC2DE' },
          }}
        >
          Показать еще
        </Button>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          siblingCount={1}
          boundaryCount={1}
        />
        {page < totalPages && (
          <Button
            type="button"
            onClick={() => onPageChange(page + 1)}
            sx={{ textTransform: 'none', color: '#5FC2DE' }}
          >
            Дальше &gt;
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { PAGE_SIZE };
export default CatalogPagination;
