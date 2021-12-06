import * as React from 'react';
import Menu from '@mui/material/Menu';

export default function BasicMenu({ children, anchorEl, setAnchorEl }) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}>{children}</Menu>
  );
}