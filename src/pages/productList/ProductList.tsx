import { useEffect } from 'react';
import { Container, Box, Typography, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './components/ProductCard';
import CardLoader from './components/CardLoader';
import Filters from './components/Filters';
import {
  getProducts,
  setPage,
  setSorting,
  setCategories,
  setRooms,
  setIsLoading,
  resetPage,
} from './productListSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RootState } from 'store';
import service from '../../service';

const styles = {
  productListPage: {
    display: 'flex',
    gap: '20px',
    padding: '20px 0 60px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
    color: '#003459',
    marginRight: '14px',
  },
  products: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productsTop: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '14px',
  },
  qtyText: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#667479',
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    width: '100%',
  },
  pagination: {
    marginTop: '40px',
  },
};

const limit = 6;

const sortingOptions: { label: string; value: string }[] = [
  { label: 'Price up', value: 'price asc' },
  { label: 'Price down', value: 'price desc' },
  { label: 'A-Z', value: 'name asc' },
  { label: 'Z-A', value: 'name desc' },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    products,
    page,
    total,
    sortBy,
    orderBy,
    selectedCategories,
    selectedRooms,
    search,
    isLoading,
  } = useSelector((state: RootState) => state.productListSlice);

  useEffect(() => {
    try {
      dispatch(setIsLoading(true));

      const params: any = {
        page,
        limit,
        sortBy,
        orderBy,
      };

      const fetchProducts = async () => {
        const data = await service.get('/api/products', {
          ...params,
          ...(selectedCategories.length
            ? { categoryId: selectedCategories }
            : {}),
          ...(selectedRooms.length ? { roomId: selectedRooms } : {}),
          ...(search ? { search } : {}),
        });

        dispatch(getProducts(data));
      };

      fetchProducts();
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  }, [
    page,
    sortBy,
    orderBy,
    search,
    dispatch,
    selectedCategories,
    selectedRooms,
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await service.get('/api/categories');

      dispatch(setCategories(data?.data));
    };

    const fetchRooms = async () => {
      const data = await service.get('/api/rooms');

      dispatch(setRooms(data?.data));
    };

    fetchRooms();
    fetchCategories();

    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page));
  };

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSorting(event.target.value));
  };

  return (
    <Container maxWidth='xl' sx={styles.productListPage}>
      <Filters />

      <Box sx={styles.products}>
        <Box sx={styles.productsTop}>
          <Typography sx={styles.title}>Furniture</Typography>
          <Typography sx={styles.qtyText}>{total} items</Typography>

          <FormControl sx={{ marginLeft: 'auto', minWidth: 150 }}>
            <InputLabel id='demo-simple-select-autowidth-label'>
              Sort
            </InputLabel>
            <Select
              labelId='demo-simple-select-autowidth-label'
              id='demo-simple-select-autowidth'
              value={`${sortBy} ${orderBy}`}
              onChange={handleChange}
              autoWidth
              label='Age'
            >
              {sortingOptions.map(({ label, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box component='ul' sx={styles.productList}>
          {isLoading
            ? Array.from({ length: limit }).map((item, index) => {
                return <CardLoader key={index}/>;
              })
            : products.map((item: any) => {
                return <ProductCard key={item._id} {...item} />;
              })}
        </Box>

        <Pagination
          sx={styles.pagination}
          shape='rounded'
          count={Math.ceil(total / limit)}
          onChange={onPageChange}
        />
      </Box>
    </Container>
  );
};

export default ProductList;
