import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategories, setSelectedRooms, setSearch } from '../productListSlice';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxFilter from './CheckBoxFilter';
import { RootState } from '../../../store';

const styles = {
  filters: {
    flex: '1 0 0',
    minWidth: '200px',
    maxWidth: '280px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '36px',
    color: '#003459',
    marginBottom: '14px',
  },
  filterList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  search: {
    // '& .MuiOutlinedInput-notchedOutline': {
    //   border: 'none',
    // },
  },
};

const Filters = () => {
  const dispatch = useDispatch();
  const { selectedCategories, categories, rooms, selectedRooms, search } = useSelector(
    (state: RootState) => state.productListSlice,
  );

  const onChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedCategories(event.target.value));
  };

  const onChangeRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedRooms(event.target.value));
  };

  const categoriesNormalized = categories.map(({ _id, name }) => ({
    title: name,
    id: _id,
  }));

  const roomsNormalized = rooms.map(({ _id, name }) => ({
    title: name,
    id: _id,
  }));

  const onSearchHandler = (e:any)=>{
    
    dispatch(setSearch(e.target.value))
  }

  return (
    <Box sx={styles.filters}>
      <Typography component='h2' sx={styles.title}>
        Filters
      </Typography>
      <TextField
        sx={styles.search}
        placeholder='Search something here!'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={onSearchHandler}
        value={search}
      />


      <Box sx={styles.filterList}>
        <CheckBoxFilter
          title='Rooms'
          options={roomsNormalized}
          values={selectedRooms}
          onChange={onChangeRoom}
        />
        <CheckBoxFilter
          title='Category'
          options={categoriesNormalized}
          values={selectedCategories}
          onChange={onChangeCategory}
        />
      </Box>
    </Box>
  );
};

export default Filters;
