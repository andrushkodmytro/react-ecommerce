import { useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'components/ui/select/Select';
import { Formik } from 'formik';
import * as yup from 'yup';
import service from 'service';
import { getCategories } from './signUpSlice';
import { RootState } from 'store';
import { useSnackbar } from 'notistack';

const styles = {
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
  email: '',
  password: '',
  confirmPassword: '',
};

const addProductSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required'),
  password: yup.number().required('Password is required'),

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

const SignUp = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { categories, rooms } = useSelector(
    (state: RootState) => state.addProductSlice,
  );

  useEffect(() => {
    // try {
    //   dispatch(setIsLoading(true));
    //   const fetchOptions = async () => {
    //     const data = await service.get('/api/categories');
    //     const data2 = await service.get('/api/rooms');
    //     dispatch(getCategories(data));
    //     dispatch(getRooms(data2));
    //   };
    //   dispatch(setIsLoading(false));
    //   fetchOptions();
    // } catch (error) {
    //   dispatch(setIsLoading(false));
    // }
    // return () => {
    //   dispatch(resetPage());
    // };
  }, [dispatch]);



  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      await service.post('api/users/register', values);
      enqueueSnackbar('Product created successfully');
      resetForm();
    } catch (error) {
      enqueueSnackbar('Error');
    }
  };

  return (
    <Box>
      <Container maxWidth='xl' sx={styles.addProductPage}>
        <Paper sx={styles.paper}>
          <Typography component='h1' variant='h2' sx={styles.title}>
            Sign up
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={addProductSchema}
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
                <TextFieldNew label='Email' name='email' formik={props} />

                <TextFieldNew label='Password' name='password' formik={props} />
                <TextFieldNew
                  label='Confirm password'
                  name='confirmPassword'
                  formik={props}
                />

                <Box sx={styles.actionBlock}>
                  <Button variant='outlined'> Cancel</Button>
                  <Button variant='contained' type='submit'>
                    Sign up
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
