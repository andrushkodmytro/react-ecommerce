import { useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import service from 'service';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import CartProductList from 'components/cartProductList/CartProductList';
import { useNavigate } from 'react-router-dom';
import { resetCart } from 'slices/cartSlice';

const styles = {
  checkout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60px',
    paddingBottom: '60px',
    gap: '20px',
  },
  addProductPage: {
    padding: '60px 0px',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    width: '100%',
    maxWidth: '600px',
    padding: '40px',
  },
  title: {
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  actionBlock: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '16px',
  },
};

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
};

const checkoutSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup.string().required('Email is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
});

const TextFieldNew = ({ formik, ...rest }: any) => {
  return (
    <TextField
      value={formik.values[rest.name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[rest.name] && Boolean(formik.errors[rest.name])}
      helperText={formik.touched[rest.name] && formik.errors[rest.name]}
      {...rest}
    />
  );
};

const Checkout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userSlice.user);

  useEffect(() => {
    if (user) {
      initialValues.firstName = user.firstName;
      initialValues.lastName = user.lastName;
      initialValues.email = user.email;
    }
  }, [user]);

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      const data = await service.post('api/orders', values);
      dispatch(resetCart());

      navigate('/orders');
    } catch (error) {
      enqueueSnackbar('Error');
    }
  };

  return (
    <Container>
      <Box sx={styles.checkout}>
        <Paper sx={styles.paper}>
          <Typography component='h1' variant='h2' sx={styles.title}>
            1. Cart
          </Typography>

          <CartProductList />
        </Paper>

        <Paper sx={styles.paper}>
          <Typography component='h1' variant='h2' sx={styles.title}>
            2. Address
          </Typography>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={checkoutSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Box
                component='form'
                sx={styles.form}
                onSubmit={props.handleSubmit}
              >
                <TextFieldNew
                  label='First name'
                  name='firstName'
                  formik={props}
                />
                <TextFieldNew
                  label='Last name'
                  name='lastName'
                  formik={props}
                />
                <TextFieldNew label='Phone' name='phone' formik={props} />
                <TextFieldNew label='Email' name='email' formik={props} />
                <TextFieldNew label='City' name='city' formik={props} />
                <TextFieldNew label='Address' name='address' formik={props} />
                <Box sx={styles.actionBlock}>
                  <Button variant='outlined'> Cancel</Button>
                  <Button variant='contained' type='submit'>
                    Create order
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout;
