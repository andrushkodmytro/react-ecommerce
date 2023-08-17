import React from 'react';
import { Box, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

const styles = {
  filterCheckBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    color: '#00171F',
  },
  checkBoxList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};

type CheckBoxFilterProp = {
  title: string;
  options: { title: string; id: string }[];
  values: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxFilter = ({
  title,
  options,
  values,
  onChange,
}: CheckBoxFilterProp) => {
  return (
    <Box sx={styles.filterCheckBox}>
      <Typography component='h3' sx={styles.title}>
        {title}
      </Typography>
      <Box sx={styles.checkBoxList}>
        {options.map(({ title, id }) => {
          return (
            <FormControlLabel
            key={id}
              control={
                <Checkbox
                  checked={values.includes(id)}
                  value={id}
                  onChange={onChange}
                />
              }
              label={title}
            />
          );
        })}
      </Box>
      <Divider />
    </Box>
  );
};

export default CheckBoxFilter;
