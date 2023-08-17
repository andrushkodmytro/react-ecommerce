import { Container, Box, Typography, Avatar } from '@mui/material';
import aboutImgUrl from 'assets/images/about/about.webp';
import memberImgUrl from 'assets/images/about/member1.png';
import memberImgUr2 from 'assets/images/about/member2.png';
import memberImgUr3 from 'assets/images/about/member3.png';

const styles = {
  aboutPage: {
    paddingBottom: '80px',
  },
  section1: {
    position: 'relative',
  },
  imgContainer: {
    height: '600px',
    background:
      'linear-gradient(88deg, #454545 0%, rgba(69, 69, 69, 0.00) 100%)',

    img: {
      display: 'block',
      width: '100%',
      height: '100%',
    },
  },
  section1Container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',

    p: {},
  },
  textContainer: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(88deg, #454545 0%, rgba(69, 69, 69, 0.00) 100%)',
  },
  title: {
    color: 'white',
  },
  text: {
    color: 'white',
    maxWidth: '350px',
    fontWeight: 400,
  },
};

const styles2 = {
  section2: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '60px 0',
  },
  item: {
    width: '200px',
    height: '300px',
    borderRadius: '8px',
    padding: '40px 24px',
  },
  itemQuote: {
    backgroundColor: '#454545',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    h3: {
      color: 'white',
      fontSize: '24px',
    },
    p: {
      color: 'white',
      fontSize: '18px',
    },
  },
  itemMember: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',

    '& .MuiAvatar-root': {
      width: '120px',
      height: '120px',
    },

    h3: {
      marginTop: 'auto',
      fontSize: '24px',
      fontWeight: 700,
    },
    p: {
      fontSize: '18px',
    },
  },
};

const arr: { imgUrl: string; text1: string; text2: string }[] = [
  { imgUrl: memberImgUrl, text1: 'Albert ', text2: 'XR Developer' },
  {
    imgUrl: '',
    text1: 'Design is intelligence made visible',
    text2: 'Alina Wheeler',
  },
  { imgUrl: memberImgUr2, text1: 'Simon', text2: 'Web Developer' },
  { imgUrl: '', text1: 'Good design is Good Business', text2: 'Thomas Watson' },
  { imgUrl: memberImgUr3, text1: 'Kato', text2: 'UI/UX Designer' },
];

const About = () => {
  return (
    <Box sx={styles.aboutPage}>
      <Box component='section' sx={styles.section1}>
        <Box sx={styles.imgContainer}>
          <Box component='img' src={aboutImgUrl} />
        </Box>

        <Box sx={styles.textContainer}>
          <Container sx={styles.section1Container}>
            <Typography component='h1' variant='h1' sx={styles.title}>
              About Us
            </Typography>
            <Typography component='p' variant='h5' sx={styles.text}>
              Get to know the team behind this website
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container>
        <Box component='section' sx={styles2.section2}>
          {arr.map(({ imgUrl, text1, text2 }) => {
            if (imgUrl) {
              return (
                <Box sx={{ ...styles2.item, ...styles2.itemMember }}>
                  <Avatar alt={text2} src={imgUrl} />
                  <Typography component='h3'>{text1}</Typography>
                  <Typography component='p'>{text2}</Typography>
                </Box>
              );
            }

            return (
              <Box sx={{ ...styles2.item, ...styles2.itemQuote }}>
                <Typography component='h3'>{text1}</Typography>
                <Typography component='p'>{text2}</Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default About;
