import { createMuiTheme } from '@material-ui/core/styles';

import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import grey from "@material-ui/core/colors/grey";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#ffd149",
      main: amber[700],
      dark: "#c67100",
    },
    secondary: {
      light: "#aee571",
      main: lightGreen[600],
      dark: "#4b830d",
    },
    danger: {
      main: red[800],
    },
    company: {
      main: deepOrange[400],
    },
    team: {
      main: lightBlue[500],
    },
    solo: {
      main: lightGreen[500],
    },
    day: {
      sunday: {
        main: cyan[50],
        inactive: grey[400],
        constrastInactiveText: grey[600],
      },
      saturday: {
        main: cyan[50],
        inactive: grey[400],
        constrastText: grey[800],
      }
    }
  },
  typography: {
    useNextVariants: true,
  },
});
