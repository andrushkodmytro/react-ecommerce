import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { logOut } from 'slices/userSlice';
import { setOpen, setCart, IProducts } from 'slices/cartSlice';
import service from 'service';
import CartDialog from 'components/CartDialog/CartDialog';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as ShoppingCartIcon } from 'assets/icons/shopping-cart.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: '/products' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: 'contact/' },
];

const styles = {
  appBar: {
    backgroundColor: 'white',
    border: 'none',
  },
  navMenuContainer: {
    display: { xs: 'none', md: 'flex' },
    gap: '40px',
    alignItems: 'center',
  },
  link: {
    color: '#003459',
    textTransform: 'unset',
    fontWeight: 700,
  },
  avatar: {
    // marginLeft: 'auto',
  },
  loginBtn: {
    // marginLeft: 'auto',
  },
  cartQty: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    fontSize: '12px',
    lineHeight: '12px',
    fontWeight: 600,
    color: 'white',
    backgroundColor: 'red',
    borderRadius: '100px',
    padding: '4px',
    minWidth: '20px',
  },
  userSettingsBtn: {
    fontWeight: 600,
    borderRadius: '40px',
    paddingLeft: '12px',
    paddingRight: '12px',

    svg: {
      transition: 'transform 100ms linear ',

      '&.open': {
        transform: 'rotate(180deg)',
      },
    },
  },
};

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.userSlice);
  const { products } = useSelector((state: RootState) => state.cartSlice);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    handleCloseUserMenu();
    dispatch(logOut());
  };

  const settings: {
    title: string;
    onClick?: React.MouseEventHandler<HTMLLIElement> | undefined;
  }[] = [
    {
      title: 'Account',
      onClick: () => {
        navigate('/account');
        handleCloseUserMenu();
      },
    },
    {
      title: 'My Orders',
      onClick: () => {
        navigate('/orders');
        handleCloseUserMenu();
      },
    },
    { title: 'Logout', onClick: logout },
  ];

  useEffect(() => {
    const getCart = async () => {
      const { products } = await service.get(`api/carts`);

      dispatch(setCart(products || []));
    };

    if (user) {
      getCart();
    }
  }, [user, dispatch]);

  const openCartHandler = () => {
    dispatch(setOpen(true));
  };

  const cartQty = (products as IProducts[]).reduce(
    (prev, cur) => (prev += cur.quantity),
    0,
  );

  return (
    <>
      <AppBar position='static' sx={styles.appBar}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
                Hello
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(({ title }) => (
                  <MenuItem key={title} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center' sx={styles.link}>
                      {title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={styles.navMenuContainer}>
              <LogoIcon />

              {pages.map(({ title, path }) => (
                <Button
                  key={title}
                  onClick={handleCloseNavMenu}
                  sx={styles.link}
                  component={Link}
                  to={path}
                >
                  {title}
                </Button>
              ))}
            </Box>

            <IconButton
              onClick={openCartHandler}
              sx={{
                marginLeft: 'auto',
                position: 'relative',
                marginRight: '16px',
              }}
            >
              <ShoppingCartIcon style={{ height: '30px', width: '30px' }} />
              {!!cartQty && (
                <Box component='span' sx={styles.cartQty}>
                  {cartQty}
                </Box>
              )}
            </IconButton>

            {!!user ? (
              <Box sx={styles.avatar}>
                <Tooltip title='Open settings'>
                  <Button
                    sx={styles.userSettingsBtn}
                    onClick={handleOpenUserMenu}
                  >
                    {`${user?.firstName?.[0].toLocaleUpperCase()}${user?.lastName?.[0].toLocaleUpperCase()}`}{' '}
                    <ExpandMoreIcon
                      {...(Boolean(anchorElUser) ? { className: 'open' } : {})}
                    />
                  </Button>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(({ title, onClick }) => (
                    <MenuItem key={title} onClick={onClick}>
                      <Typography textAlign='center'>{title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                sx={styles.loginBtn}
                variant='outlined'
                component={Link}
                to='/login'
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <CartDialog />
    </>
  );
}
export default ResponsiveAppBar;
