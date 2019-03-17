import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
  },
  cell: {
    flex: '1',
    minWidth: 'calc(100%/7)',
    maxWidth: 'calc(100%/7)',
    borderRight: '1px solid #ccc9c9',
    borderBottom: '1px solid #ccc9c9',
    backgroundColor: "#fff",
    color: "#101010",
    textAlign: 'center',
  }
}

const CalendarHeader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.cell}>SUN</div>
      <div className={classes.cell}>MON</div>
      <div className={classes.cell}>TUE</div>
      <div className={classes.cell}>WED</div>
      <div className={classes.cell}>THU</div>
      <div className={classes.cell}>FRI</div>
      <div className={classes.cell}>SAT</div>
    </div>
  );
};

export default withStyles(styles)(CalendarHeader);
