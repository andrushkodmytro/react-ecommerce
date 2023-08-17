import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Rooms from './components/Rooms';
import Categories from './components/Categories';
import { getCategories, resetPage, setIsLoading } from './homeSlice';
import { RootState } from 'store';
import service from 'service';
import imgUrl3 from 'assets/images/home.jpg';

const styles = {
  banner: {
    img: {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
};

const Home = () => {
  const dispatch = useDispatch();

  const { categories, isLoading } = useSelector(
    (state: RootState) => state.homeSlice,
  );

  useEffect(() => {
    try {
      dispatch(setIsLoading(true));

      const fetchOptions = async () => {
        const data = await service.get('/api/categories?limit=10');
       
        dispatch(getCategories(data));
      
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

  return (
    <Box>
      <Box sx={styles.banner}>
        <Box component='img' src={imgUrl3} />
      </Box>

      <Rooms />
      <Categories categories={categories}/>
    </Box>
  );
};

export default Home;
