import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  getDate,
  getMonth,
  getYear,
  isThisMonth,
  isToday,
} from 'date-fns';

import {
  addEvent,
  deleteEvent,
} from '../store/actions/eventActions';

import Event from './Event';

const styles = {
  root: {
    flex: '1',
    minWidth: 'calc(100%/7)',
    maxWidth: 'calc(100%/7)',
    borderRight: '1px solid #ccc9c9',
    borderBottom: '1px solid #ccc9c9',
    backgroundColor: "#ddd",
    color: "#b7b6b6",
  },
  thisMonth: {
    backgroundColor: "#fff",
    color: "#101010",
  },
  container: {
    padding: '5px',
  },
  dateContainer: {
    borderRadius: '50%',
    height: '1.6rem',
    width: '1.6rem',
    fontSize: '1rem',
    backgroundColor: "transparent",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: {
    backgroundColor: "#90caf9",
  },
  eventContainer: {
    overflow: 'auto',
  }
}

class Day extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    events: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
      })
    )
  }

  static defaultProps = {
    events: {}
  }

  renderEvents = () => {
    const { events } = this.props;
    if (_.isEmpty(events)) return null;

    return Object.keys(events).sort().map(key => {
      return (
        <Event
          key={key}
          day={this.props.day}
          hour={key}
          data={events[key]}
        />
      )
    });
  }

  render() {
    const { day, classes } = this.props;
    const inThisMonth = isThisMonth(day);
    const today = isToday(day);
    return (
      <div
        className={[classes.root, inThisMonth ? classes.thisMonth : null].join(' ')}
      >
        <div className={classes.container}>
          <div className={[classes.dateContainer, today ? classes.today : null].join(' ')}>
            {getDate(day)}
          </div>
          <div className={classes.eventContainer}>
            {this.renderEvents()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const date = getDate(ownProps.day);
  const month = getMonth(ownProps.day);
  const year = getYear(ownProps.day);

  if (
    !state.events[year] ||
    !state.events[year][month] ||
    !state.events[year][month][date]
  ) return {};

  const events = state.events[year][month][date];
  console.log(events);
  return {
    events
  };
}

const mapDispatchToProps = dispatch => ({
  addEvent,
  deleteEvent,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Day));
