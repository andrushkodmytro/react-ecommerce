import { Routes, Route } from 'react-router-dom';
import Header from 'containers/header/Header';
import Footer from 'containers/footer/Footer';
import Home from 'pages/home/Home';
import ProductList from 'pages/productList/ProductList';
import ProductDetails from 'pages/productDetails/ProductDetails';
import AddProduct from 'pages/addProduct/AddProduct';
import Login from 'pages/login/Login';
import SignUp from 'pages/signUp/SignUp';
import Account from 'pages/account/Account';
import NotFound from 'pages/notFound/NotFound';
import About from 'pages/about/About';
import Contact from 'pages/contact/Contact';
import Checkout from 'pages/checkout/Checkout';
import { Box } from '@mui/material';
import PrivetRoute from 'components/PrivetRoute';
import Orders from 'pages/orders/Orders';
import './App.css';

const styles = {
  app: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  main: {
    flex: '1 0 0',
    // backgroundColor: 'gray',
  },
};

function App() {
  return (
    <Box sx={styles.app}>
      <Header />
      <Box component='main' sx={styles.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/products/add' element={<AddProduct />} />

          <Route
            path='orders'
            element={
              <PrivetRoute>
                <Orders />
              </PrivetRoute>
            }
          />

          <Route path='/checkout' element={<Checkout />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='account'
            element={
              <PrivetRoute>
                <Account />
              </PrivetRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
