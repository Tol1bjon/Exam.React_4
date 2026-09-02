import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { NavLink } from 'react-router';

const Button2 = ({ text, to, onClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    if (!to) {
      event.preventDefault();
    }
    onClick?.(event);
  };

  const button = (
    <MuiButton
      type="button"
      onClick={handleClick}
      sx={{
        backgroundColor: 'transparent',
        border: '1px solid #446B80',
        color: '#446B80',
        fontWeight: 600,
        borderRadius: '10px',
        px: 2.5,
        py: 1,
        '&:hover': { bgcolor: 'black', color: 'white' },
        whiteSpace: 'nowrap',
      }}
      variant="outlined"
    >
      {text}
    </MuiButton>
  );

  if (to) {
    return (
      <NavLink to={to} onClick={(event) => event.stopPropagation()} style={{ textDecoration: 'none' }}>
        {button}
      </NavLink>
    );
  }

  return button;
};

export default Button2;
