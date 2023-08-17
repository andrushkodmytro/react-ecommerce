import { Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
  roomsSection: { padding: '60px 0' },
  title: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  rooms: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '20px',
    gap: '20px',
  },
  item: {
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',

    img: {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',

      '&.fill': {
        filter: 'grayscale(100%)',
        transition: 'filter 200ms linear',

        '&:hover': {
          filter: 'none',
        },
      },
    },

    '&:hover': {
      img: {
        '&.fill': {
          filter: 'none',
        },
      },
    },
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&.fill': {
      backgroundColor: 'rgba(0,52,89,.6)',
      transition: 'background-color 200ms linear',

      '&:hover': {
        backgroundColor: 'rgba(0,52,89,.2)',
      },
    },

    h3: {
      color: 'white',
      textDecoration: 'underline',
      textTransform: 'uppercase',
    },
  },
};

const arr = [
  {
    title: 'Sofas',
    imgUrl:
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/9a5980c0-0668-013c-0cd2-023752b465bb/img/custom_img/furniture_type_01.jpg',
  },
  {
    title: 'Dining',
    imgUrl:
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/9a5980c0-0668-013c-0cd2-023752b465bb/img/custom_img/furniture_type_02.jpg',
  },
  {
    title: 'Collections',
    imgUrl:
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/9a5980c0-0668-013c-0cd2-023752b465bb/img/custom_img/furniture_type_03.jpg',
  },
  {
    title: 'Bedroom',
    imgUrl:
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/9a5980c0-0668-013c-0cd2-023752b465bb/img/custom_img/furniture_type_04.jpg',
  },
];

const Rooms = () => {
  return (
    <Box component='section' sx={styles.roomsSection}>
      <Container maxWidth='xl'>
        <Typography component='h2' variant='h2' sx={styles.title}>
          Shop by furniture type
        </Typography>

        <Box sx={styles.rooms}>
          {arr.map(({ title, imgUrl }, index) => {
            return (
              <Box key={title} sx={styles.item} component={Link} to='/products'>
                <Box
                  component='img'
                  src={imgUrl}
                  className={index === 1 || index === 2 ? 'fill' : ''}
                />
                <Box
                  sx={styles.titleContainer}
                  className={index === 0 || index === 3 ? 'fill' : ''}
                >
                  <Typography component='h3' variant='h1'>
                    {title}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Rooms;
