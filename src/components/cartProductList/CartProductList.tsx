import React from 'react';
import { Box, Typography } from '@mui/material';
import Row from './Row';
import service from 'service';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, IProducts } from 'slices/cartSlice';
import { RootState } from 'store';

const styles = {
  dialog: {},
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  noProductsContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.MuiTypography-root': {
      fontWeight: 600,
    },
  },
  totalBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: '24px',
    fontWeight: 600,
  },
  totalPrice: {
    fontWeight: 600,
  },
};

const CartProductList = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.cartSlice);

  const addToCart = async (id: string) => {
    const data = await service.post(`api/carts`, {
      productId: id,
      quantity: 1,
      price: 200,
    });

    dispatch(setCart(data.products));
  };

  const removeFromCart = async (id: string) => {
    const data = await service.post(`api/carts/remove`, {
      productId: id,
      quantity: 1,
    });

    dispatch(setCart(data.products));
  };

  const total = (products as IProducts[]).reduce(
    (prev, curr) =>
      (prev += curr.quantity * curr.productId.price),
    0,
  );

  return (
    <Box sx={styles.productList}>
      {products.map((item: any) => {
        return (
          <Row
            key={item._id}
            {...item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      })}

      <Box sx={styles.totalBlock}>
        <Typography sx={styles.totalText}>Total</Typography>
        <Typography sx={styles.totalPrice}>{total} $</Typography>
      </Box>
    </Box>
  );
};

export default CartProductList;
