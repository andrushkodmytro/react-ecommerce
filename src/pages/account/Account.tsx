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
import { Formik } from 'formik';
import * as yup from 'yup';
import service from 'service';
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

let initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  // password: '',
};

const addProductSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Name is required'),
  // password: yup.string().required('Description is required'),
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

const Account = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const user = useSelector((state: RootState) => state.userSlice.user);

  useEffect(() => {
    if (user) {
      initialValues.email = user.email;
      initialValues.firstName = user.firstName;
      initialValues.lastName = user.lastName;
    }
  }, [user, dispatch]);

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      const data = await service.patch('api/users/me', values);
    } catch (error) {
      enqueueSnackbar('Error');
    }
  };

  return (
    <Box>
      <Container maxWidth='xl' sx={styles.addProductPage}>
        <Paper sx={styles.paper}>
          <Typography component='h1' variant='h2' sx={styles.title}>
            Account
          </Typography>

          <Formik
            initialValues={initialValues}
            enableReinitialize
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

                <Box sx={styles.actionBlock}>
                  <Button variant='outlined'> Cancel</Button>
                  <Button variant='contained' type='submit'>
                    Save
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

export default Account;
