import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { NavLink } from 'react-router';

const Button = ({ text, to, onClick }) => {
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
        backgroundColor: '#5FC2DE',
        fontWeight: 600,
        borderRadius: '10px',
        px: 2.5,
        py: 1,
        '&:hover': { bgcolor: '#4CB2D1' },
        whiteSpace: 'nowrap',
      }}
      variant="contained"
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

export default Button;
