import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  imgContainer: {
    heigh: '60px',
    width: '60px',

    img: {
      display: 'block',
      width: ' 100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  qtyBlock: {
    marginLeft: 'auto',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  price: {
    minWidth: '80px',
    textAlign: 'end',
    fontWeight: 600,
  },
};

const Row = ({
  productId,
  quantity,
  addToCart,
  removeFromCart,
  ...rest
}: any) => {
  const { imgUrl, name, price, _id } = productId;

  return (
    <Box sx={styles.row}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={imgUrl} />
      </Box>
      <Typography>{name}</Typography>

      <Box sx={styles.qtyBlock}>
        <IconButton onClick={() => removeFromCart(_id)}>
          <RemoveIcon />
        </IconButton>
        <Box>{quantity}</Box>
        <IconButton onClick={() => addToCart(_id)}>
          <AddIcon />
        </IconButton>
      </Box>

      <Typography sx={styles.price}>{price} $</Typography>
    </Box>
  );
};

export default Row;
