import { useState } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

function renderLabel(label: string | null) {
  if (label === 'featured') {
    return 'Featured';
  }
  if (label === 'newest') {
    return 'Newest';
  }
  if (label === 'priceDesc') {
    return 'Price: High-Low';
  }
  return 'Price: Low-High';
}

// ----------------------------------------------------------------------

export default function NftShort() {

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
const [value, setValue] = useState('Featured');
  const handleOpen = (currentTarget: HTMLButtonElement) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value: string) => {
    setValue(value);
    handleClose();
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(event) => handleOpen(event.currentTarget)}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {renderLabel(value)}
        </Typography>
      </Button>

      <MenuPopover
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortBy(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
