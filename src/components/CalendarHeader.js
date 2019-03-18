import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    borderTop: '1px solid #ccc9c9',
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
  },
  sunday: {
    backgroundColor: theme.palette.day.sunday.main,
  },
  saturday: {
    backgroundColor: theme.palette.day.saturday.main,
  },
})

const CalendarHeader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={[classes.cell, classes.sunday].join(' ')}>SUN</div>
      <div className={classes.cell}>MON</div>
      <div className={classes.cell}>TUE</div>
      <div className={classes.cell}>WED</div>
      <div className={classes.cell}>THU</div>
      <div className={classes.cell}>FRI</div>
      <div className={[classes.cell, classes.saturday].join(' ')}>SAT</div>
    </div>
  );
};

export default withStyles(styles)(CalendarHeader);
