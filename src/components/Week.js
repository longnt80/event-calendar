import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { addDays } from 'date-fns';

import Day from './Day';

const styles = {
  root: {
    flex: '1',
    display: 'flex',
  }
}

class Week extends Component {
  static propTypes = {
    firstDay: PropTypes.object.isRequired,
  }

  renderDays = () => {
    const { firstDay } = this.props;
    const LENGTH_OF_WEEK = 7;
    let days = [];

    for (let i = 0; i  <= LENGTH_OF_WEEK; i++) {
      const currentDay = addDays(firstDay, i);
      days.push(
        <Day
          key={JSON.stringify(currentDay)}
          day={currentDay}
        />
      );
    }

    return days;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderDays()}
      </div>
    );
  }
}

export default withStyles(styles)(Week);
