import React from 'react';
import { Container, Box, TextField, Typography, Button } from '@mui/material';
import { ReactComponent as FacebookIcon } from 'assets/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from 'assets/icons/instagram.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/twitter.svg';
import { ReactComponent as YouTubeIcon } from 'assets/icons/you-tube.svg';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';

const styles = {
  footer: {
    backgroundColor: '#FFE7BA',
    padding: '80px 0 20px',
  },
  formContainer: {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#003459',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flex: '2 0 0',
    gap: '12px',
    maxWidth: '700px',
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '16px',
  },

  field: {
    flex: '1 0 0',
  },
  text: {
    flex: '1 0 0',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
    color: 'white',
  },
  link: {
    color: '#003459',
    textTransform: 'unset',
    fontWeight: 700,
  },
  socialMediaContainer: {
    display: 'flex',
    gap: '40px',
    marginBottom: '80px',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottomBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const pages = ['Home', 'Category', 'About', 'Contact'];
const links = [{ img: '', url: '' }];

const Footer = () => {
  return (
    <Box component='footer' sx={styles.footer}>
      <Container maxWidth='xl'>
        <Box sx={styles.formContainer}>
          <Typography sx={styles.text}>
            Register now so you don't miss our programs
          </Typography>

          <Box sx={styles.form}>
            <TextField sx={styles.field} />
            <Button variant='contained'>Subcribe Now</Button>
          </Box>
        </Box>
        <Box sx={styles.navContainer}>
          <Box>
            {pages.map((page) => (
              <Button key={page} sx={styles.link}>
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={styles.socialMediaContainer}>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <YouTubeIcon />
          </Box>
        </Box>
        <Box sx={styles.bottomBlock}>
          <Typography>© 2023 Monito. All rights reserved.</Typography>
          <LogoIcon />
          <Box>
            <Button>Terms of Service</Button>
            <Button>Privacy Policy</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
