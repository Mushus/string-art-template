import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  transitions: { create: () => 'none' },
});

export default theme;
