import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getMonth } from 'date-fns';

import { goToNextMonth, goToPreviousMonth } from '../store/actions/settingActions';

const styles = theme => ({
  root: {
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  nav: {

  }
})

class CalendarControls extends Component {
  render() {
    const { classes, goToNextMonth, goToPreviousMonth, displayMonth } = this.props;
    const thisMonth = getMonth(new Date())
    const canGoBack = thisMonth < displayMonth;
    const canGoNext = displayMonth < 11 && displayMonth >= thisMonth;
    return (
      <div className={classes.root}>
        <div className={classes.direction}>
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
        <div className={classes.nav}>
          <Button
            disabled={!canGoBack}
            onClick={() => goToPreviousMonth(displayMonth)}
            className={[classes.button, classes.back].join(' ')}
          >Back</Button>
          <Button
            disabled={!canGoNext}
            onClick={() => goToNextMonth(displayMonth)}
            className={[classes.button, classes.next].join(' ')}
          >Next</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  displayMonth: state.setting.displayMonth,
})

const mapDispatchToProps = dispatch => ({
  goToNextMonth: (displayMonth) => dispatch(goToNextMonth(displayMonth)),
  goToPreviousMonth: (displayMonth) => dispatch(goToPreviousMonth(displayMonth)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalendarControls));
