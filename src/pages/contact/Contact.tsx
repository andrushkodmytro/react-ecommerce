import { Container, Box, Typography, TextField, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const styles = {
  contactPage: {
    padding: '60px 0',
  },
  title: {
    textAlign: 'center',
    marginBottom: '8px',
  },
  text: {
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: '60px',
  },
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: '40px', lg: '80px' },
  },
  companyInfo: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  companyInfoItem: {
    display: 'flex',
    gap: '20px',

    svg: {
      marginTop: '4px',
    },
  },
  form: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  btn: { minWidth: '200px' },
};

const arr = [
  {
    id: 1,
    title: 'Address',
    text: ['236 5th SE Avenue, New York NY10000, United States'],
    icon: <PlaceIcon />,
  },
  {
    id: 2,
    title: 'Address',
    text: ['Mobile: +(84) 546-6789', 'Hotline: +(84) 456-6789'],
    icon: <PhoneIcon />,
  },
  {
    id: 3,
    title: 'Address',
    text: ['Monday-Friday: 9:00 - 22:00', 'Saturday-Sunday: 9:00 - 21:00'],
    icon: <WatchLaterIcon />,
  },
];

const Contact = () => {
  return (
    <Container sx={styles.contactPage}>
      <Typography component='h1' variant='h1' sx={styles.title}>
        Get In Touch With Us
      </Typography>

      <Typography sx={styles.text}>
        For More Information About Our Product & Services. Please Feel Free To
        Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
        Hesitate!
      </Typography>

      <Box sx={styles.container}>
        <Box sx={styles.companyInfo}>
          {arr.map(({ id, title, text, icon }) => {
            return (
              <Box sx={styles.companyInfoItem} key={id}>
                {icon}
                <Box>
                  <Typography component='h3' variant='h6'>
                    Address
                  </Typography>

                  {text.map((item, index) => {
                    return <Typography key={index}>{item}</Typography>;
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box sx={styles.form}>
          <TextField label='Full name' />
          <TextField label='Email' />
          <TextField label='Subject' />
          <TextField label='Message' multiline />
          <Box>
            <Button variant='contained' sx={styles.btn}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
