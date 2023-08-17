import { Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ICategory } from 'interfaces';

const styles = {
  categoriesSection: {
    padding: '60px 0',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr);',
    gap: '20px',
  },
  item: {
    padding: '20px',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'color 150ms ease, background-color 150ms ease  ',

    '&:hover': {
      backgroundColor: 'lightgray',
      h3: {
        color: '#003459',
      },
    },

    h3: {
      textAlign: 'center',
      color: '#4e5550',
      textTransform: 'capitalize',
    },
  },
  imgContainer: {
    height: '150px',

    img: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
};

interface ICategoriesProps {
  categories: ICategory[] | [];
}

const Categories = ({ categories }: ICategoriesProps) => {
  return (
    <Container sx={styles.categoriesSection}>
      <Typography sx={styles.title} component='h2' variant='h2'>
        Shop by furniture category
      </Typography>
      <Box sx={styles.list}>
        {categories.map(({ name, imgUrl }, index) => {
          return (
            <Box key={index} sx={styles.item} component={Link} to='/products'>
              <Box sx={styles.imgContainer}>
                <Box component='img' src={imgUrl} />
              </Box>
              <Typography component='h3' variant='h6'>
                {name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default Categories;
