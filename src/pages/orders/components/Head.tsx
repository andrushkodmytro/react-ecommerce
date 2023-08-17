import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
  orderRow: {
    display: 'flex',
    padding: '20px 0',
    borderBottom: '1px solid gray',

    '.MuiTypography-root': {
      flexGrow: 1,
    },
  },
};

const Row = () => {
  return (
    <Box sx={styles.orderRow}>
      <Typography>Number</Typography>
      <Typography>Status</Typography>
      <Typography>Crated</Typography>
      <Typography>Total</Typography>
    </Box>
  );
};
export default Row;
