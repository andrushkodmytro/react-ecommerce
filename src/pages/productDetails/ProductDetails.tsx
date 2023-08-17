import { useEffect, useState, useMemo } from 'react';
import { Container, Box, Paper, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getProduct, resetPage } from './productDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setCart } from 'slices/cartSlice';
import service from 'service';
import lodash from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const styles = {
  productDetailsPage: { padding: '60px 0' },
  paper: {
    display: 'flex',
    gap: '34px',
  },
  imgBlock: {
    flex: '1 0 0',
  },
  infoBlock: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  imgPreview: {
    borderRadius: '10px',
    overflow: ' hidden',
    marginBottom: '12px',
    aspectRatio: '1/1',

    img: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  imgList: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    maxWidth: '540px',
    padding: '3px',
  },
  smallImg: (active: boolean) => ({
    width: '94px',
    height: '94px',
    minWidth: '94px',
    borderRadius: '6px',
    overflow: ' hidden',
    outline: active ? '3px solid #F7DBA7' : 'none',
    cursor: 'pointer',
    transition: 'outline 300 ease-in-out',

    '&:hover': {
      outline: '3px solid #F7DBA7',
    },

    img: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  }),
  breadcrumbs: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#667479',
  },
  name: {
    marginBottom: '6px',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '50px',
    gap: '18px',
    backgroundColor: '#667479',
    alignSelf: 'start',
    padding: '2px',
    borderRadius: '57px',
  },
  addToCartBtn: {
    maxWidth: '200px',
  },
  skuText: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#99A2A5',
  },
  row: {
    display: 'flex',
    width: '100%',
    padding: '10px 0',
    borderBottom: '1px solid #EBEEEF',

    '& p': {
      flex: '1 0 0',
      color: '#667479',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
  },
  qty: {
    fontSize: '24px',
    color: 'white',
  },
};

const infoArr: { title: string; keyName: string }[] = [
  { title: 'Category', keyName: 'category.name' },
  { title: 'Room type', keyName: 'room.name' },
  { title: 'Description', keyName: 'description' },
];

const ProductDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.productDetailsSlice);
  const products = useSelector((state: RootState) => state.cartSlice.products);

  const [current, setCurrent] = useState<number>(0);

  const qty = useMemo(() => {
    return products.find((item) => item.productId._id === id)?.quantity || 0;
  }, [products, id]);

  useEffect(() => {
    const getProductFetch = async () => {
      const data = await service.get(`api/products/${id}`);

      dispatch(getProduct(data));
    };

    getProductFetch();

    return () => {
      dispatch(resetPage());
    };
  }, [dispatch, id]);

  const images = useMemo(() => {
    return [...(product.imgUrl ? [product.imgUrl] : []), ...product.imgGallery];
  }, [product.imgUrl, product.imgGallery]);

  const addToCart = async () => {
    const { products } = await service.post(`api/carts`, {
      productId: id,
      quantity: 1,
      price: 200,
    });

    dispatch(setCart(products || []));
  };

  const removeFromCart = async () => {
    const { products } = await service.post(`api/carts/remove`, {
      productId: id,
      quantity: 1,
    });

    dispatch(setCart(products || []));
  };

  return (
    <Box sx={styles.productDetailsPage}>
      <Container>
        <Paper sx={styles.paper}>
          <Box sx={styles.imgBlock}>
            <Box sx={styles.imgPreview}>
              <Box component='img' src={images[current]} alt={product.name} />
            </Box>
            <Box sx={styles.imgList}>
              {images.map((url, index) => {
                return (
                  <Box
                    key={index}
                    sx={styles.smallImg(index === current)}
                    onClick={() => setCurrent(index)}
                  >
                    <Box component='img' src={url} alt='test' />
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box sx={styles.infoBlock}>
            <Box>
              <Typography sx={styles.breadcrumbs}>{'Home > Bed'}</Typography>
            </Box>

            <Box>
              <Typography sx={styles.skuText}>SKU #1000078</Typography>
              <Typography variant='h3'>{product.name}</Typography>
              <Typography variant='h4'>{product.price}$</Typography>
            </Box>

            {qty > 0 ? (
              <Box sx={styles.addBtn}>
                <Button
                  variant='outlined'
                  sx={{ backgroundColor: 'white' }}
                  onClick={removeFromCart}
                >
                  <RemoveIcon />
                </Button>
                <Box sx={styles.qty}> {qty}</Box>
                <Button
                  variant='outlined'
                  sx={{ backgroundColor: 'white' }}
                  onClick={addToCart}
                >
                  <AddIcon />
                </Button>
              </Box>
            ) : (
              <Button
                sx={styles.addToCartBtn}
                variant='contained'
                onClick={addToCart}
              >
                Add to cart
              </Button>
            )}

            <Box>
              {infoArr.map(({ title, keyName }) => {
                return (
                  <Box key={keyName} sx={styles.row}>
                    <Typography>{title}</Typography>
                    <Typography>: {lodash.get(product, keyName)}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductDetails;
