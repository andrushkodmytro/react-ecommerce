import { MenuItem, TextFieldProps, TextField } from '@mui/material';

interface IOption {
  label: string;
  value: string;
}

type SelectType = {
  options: IOption[];
} & TextFieldProps;

const Select = ({ options, ...rest }: SelectType) => {
  return (
    <TextField select label='Select' {...rest}>
      {options.map(({ label, value }) => {
        return <MenuItem value={value}>{label}</MenuItem>;
      })}
    </TextField>
  );
};

export default Select;
