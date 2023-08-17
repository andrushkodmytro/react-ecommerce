import { Box, Skeleton } from '@mui/material';

const CardLoader = () => {
  return (
    <Box>
      <Skeleton variant='rectangular' width='100%' height={264} />
      <Skeleton width='100%' sx={{ height: '40px' }} />
      <Skeleton width='60%' sx={{ height: '36px' }} />
      <Skeleton width='49%' sx={{ height: '36px' }} />
    </Box>
  );
};

export default CardLoader;
