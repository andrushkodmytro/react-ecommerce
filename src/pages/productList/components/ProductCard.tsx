import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProductType } from '../productListSlice';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    boxShadow: '0px 4px 28px -2px rgba(0, 0, 0, 0.08)',
    padding: '8px 8px 20px 8px',
    borderRadius: '12px',
    textDecoration: 'unset',
    color: 'unset',
  },
  imgContainer: {
    width: '100%',
    aspectRatio: '1/1',
    marginBottom: '16px',

    img: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '12px',
    },
  },
  content: {
    padding: '0px 8px',
  },
  name: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
  },
  price: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px',
  },
};

type Product = {
  name: string;
  price: number;
  imgUrl: string;
  _id: string;
};

const ProductCard = ({ name, price, imgUrl, _id }: Product) => {
  return (
    <Box sx={styles.card} component={Link} to={`/products/${_id}`}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={imgUrl} />
      </Box>

      <Box sx={styles.content}>
        <Typography sx={styles.name}>{name}</Typography>
        <Typography>Gene:</Typography>
        <Typography sx={styles.price}>{price}$</Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
