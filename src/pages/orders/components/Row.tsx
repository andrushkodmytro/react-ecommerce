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

const Row = ({ _id, status, createdAt }: any) => {
  return (
    <Box sx={styles.orderRow}>
      <Typography>{_id}</Typography>
      <Typography>{status}</Typography>
      <Typography>{createdAt}</Typography>
      <Typography>total</Typography>
    </Box>
  );
};
export default Row;
