import { Theme } from '@mui/material';

type StyleFieldProps = {
  theme: Theme;
  error?: string;
};

const styleField = ({ theme, error }: StyleFieldProps) => ({
  ...theme.typography.body2,
  padding: '15px',
  borderRadius: '8px',
  border: `1px solid ${error ? theme.palette.error.main : '#494949'}`,
  outline: 'none',
  width: '100%',
  backgroundColor: 'transparent',
  [theme.breakpoints.down('md')]: {
    padding: '11.76px 10.34px',
    ...theme.typography.body2,
  },

  '&:focus': {
    borderColor: theme.palette.secondary.main,
  },
});

export default styleField;
