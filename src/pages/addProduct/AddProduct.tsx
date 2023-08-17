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
import {
  setIsLoading,
  getCategories,
  getRooms,
  resetPage,
} from './addProductSlice';
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
  name: '',
  description: '',
  price: '',
  image: '',
  categoryId: '',
  roomId: '',
};

const addProductSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  image: yup.string().required('Image url is required'),
  categoryId: yup.string().required('Category is required'),
  roomId: yup.string().required('Room is required'),
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

const AddProduct = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { categories, rooms } = useSelector(
    (state: RootState) => state.addProductSlice,
  );

  useEffect(() => {
    try {
      dispatch(setIsLoading(true));

      const fetchOptions = async () => {
        const data = await service.get('/api/categories');
        const data2 = await service.get('/api/rooms');
        dispatch(getCategories(data));
        dispatch(getRooms(data2));
      };

      dispatch(setIsLoading(false));
      fetchOptions();
    } catch (error) {
      dispatch(setIsLoading(false));
    }

    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  const categoriesNormalized = categories.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const roomsNormalized = rooms.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      await service.post('api/products', values);
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
            Add a new product
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
                <TextFieldNew label='Name' name='name' formik={props} />
                <TextFieldNew
                  label='Description'
                  name='description'
                  formik={props}
                />
                <TextFieldNew label='Price' name='price' formik={props} />
                <TextFieldNew label='Image url' name='image' formik={props} />

                <Select
                  sx={{ width: '100%' }}
                  label='Category'
                  name='categoryId'
                  options={categoriesNormalized}
                  value={props.values.categoryId}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={
                    props.touched.categoryId && Boolean(props.errors.categoryId)
                  }
                  helperText={
                    props.touched.categoryId && props.errors.categoryId
                  }
                />
                <Select
                  sx={{ width: '100%' }}
                  label='Room'
                  name='roomId'
                  options={roomsNormalized}
                  value={props.values.roomId}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.touched.roomId && Boolean(props.errors.roomId)}
                  helperText={props.touched.roomId && props.errors.roomId}
                />

                <Box sx={styles.actionBlock}>
                  <Button variant='outlined'> Cancel</Button>
                  <Button variant='contained' type='submit'>
                    Add product
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

export default AddProduct;
