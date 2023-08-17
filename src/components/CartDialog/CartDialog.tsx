import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { RootState } from 'store';
import { setOpen } from 'slices/cartSlice';
import CartProductList from 'components/cartProductList/CartProductList';

const styles = {
  dialog: {},
  noProductsContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.MuiTypography-root': {
      fontWeight: 600,
    },
  },
};

const CartDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, open } = useSelector((state: RootState) => state.cartSlice);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const onBuyHandler = () => {
    handleClose();
    navigate('/checkout');
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        Cart
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ minHeight: '160px', height: '1px' }}>
        {products.length ? (
          <CartProductList />
        ) : (
          <Box sx={styles.noProductsContainer}>
            <Typography>No products</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          variant='contained'
          disabled={!Boolean(products.length)}
          onClick={onBuyHandler}
        >
          Buy products
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
