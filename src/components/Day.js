import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  getDate,
  getMonth,
  getYear,
  isToday,
  isFirstDayOfMonth,
} from 'date-fns';
import { isPastDay } from '../utils';
import { MONTHS } from '../constants';

import {
  openModal,
  closeModal,
} from '../store/actions/modalActions';

import {
  addEvent,
  deleteEvent,
} from '../store/actions/eventActions';

import Event from './Event';
import Form from './Form';

const styles = {
  root: {
    flex: '1',
    minWidth: 'calc(100%/7)',
    maxWidth: 'calc(100%/7)',
    borderRight: '1px solid #ccc9c9',
    borderBottom: '1px solid #ccc9c9',
    backgroundColor: "#fff",
    color: "#101010",
  },
  past: {
    backgroundColor: "#ddd",
    color: "#b7b6b6",
  },
  container: {
    padding: '5px',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
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
  month: {

  },
  eventContainer: {
    overflow: 'auto',
  },
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

  get isPast() {
    const { day } = this.props;

    return isPastDay(day);
  }

  renderEvents = () => {
    const { events } = this.props;
    if (_.isEmpty(events)) return null;

    return Object.keys(events).sort().map(key => {
      return (
        <Event
          key={key}
          day={this.props.day}
          isPast={this.isPast}
          hour={key}
          data={events[key]}
        />
      )
    });
  }

  render() {
    const { day, classes, openModal, closeModal } = this.props;
    const today = isToday(day);
    const firstDayOfMonth = isFirstDayOfMonth(day);

    return (
      <React.Fragment>
        <div
          onClick={this.isPast ? null : () => openModal(<Form />, { day, isNew: true })}
          className={[classes.root, this.isPast ? classes.past : null].join(' ')}
        >
          <div className={classes.container}>
            <div className={classes.dateContainer}>
              <span className={[classes.date, today ? classes.today : null].join(' ')}>
                {getDate(day)}
              </span>
              {firstDayOfMonth &&
                <span>{MONTHS[getMonth(day)]}</span>
              }
            </div>
            <div className={classes.eventContainer}>
              {this.renderEvents()}
            </div>
          </div>
        </div>
      </React.Fragment>
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
  ) return {
    events: {},
  };

  const events = state.events[year][month][date];
  return {
    events,
  };
}

const mapDispatchToProps = dispatch => ({
  openModal: (component, props) => dispatch(openModal(component, props)), // component is element: <MyComponent />
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Day));
