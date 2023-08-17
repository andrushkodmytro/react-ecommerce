import { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import service from 'service';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from './ordersSlice';
import { RootState } from 'store';

const styles = {
  ordersPage: {
    paddingTop: '60px',
    paddingBottom: '60px',
  },
  orderList: {
    minHeight: '200px',
  },
};

const Orders = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state: RootState) => state.ordersSlice);

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 150,
    },
    {
      field: 'img',
      headerName: 'Image',
      width: 200,

      renderCell: (params: GridRenderCellParams) => {
        const images = params.row.products.slice(0, 3);
        const aditionImgs = params.row.products.length - 3;

        return (
          <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {images.map(({ imgUrl }: any) => (
              <Box
                component='img'
                sx={{ height: '30px', width: '30px' }}
                src={imgUrl}
              />
            ))}

            {aditionImgs > 0 && <Typography>+{aditionImgs}</Typography>}
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
    },
  ];

  useEffect(() => {
    const getOrdersFetch = async () => {
      const data = await service.get(`api/orders`);

      dispatch(getOrders(data));
    };

    getOrdersFetch();
  }, [dispatch]);

  return (
    <Container>
      <Box sx={styles.ordersPage}>
        <Typography component='h1' variant='h1'>
          Orders
        </Typography>

        <DataGrid
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          pageSizeOptions={[5]}
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default Orders;
