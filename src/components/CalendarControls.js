import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: '5px',
  },
  instr: {
    display: 'inline-flex',
    alignItems: 'center',

    '&:not(:first-child)': {
      marginLeft: '10px',
    }
  },
  color: {
    height: '14px',
    width: '14px',
    borderRadius: '50%',
    marginRight: '3px',
  },
  solo: {
    backgroundColor: theme.palette.solo.main,
  },
  team: {
    backgroundColor: theme.palette.team.main,
  },
  company: {
    backgroundColor: theme.palette.company.main,
  },
  name: {
    flex: '1',
  }
})

class CalendarControls extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.instr}>
          <div className={[classes.color, classes.solo].join(' ')}></div>
          <div className={classes.name}>Solo</div>
        </div>
        <div className={classes.instr}>
          <div className={[classes.color, classes.team].join(' ')}></div>
          <div className={classes.name}>Team</div>
        </div>
        <div className={classes.instr}>
          <div className={[classes.color, classes.company].join(' ')}></div>
          <div className={classes.name}>Company</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarControls);
