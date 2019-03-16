import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
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

const DayWrapper = styled.div`
  flex: 1;
  min-width: calc(100%/7);
  max-width: calc(100%/7);
  border-right: 1px solid #ccc9c9;
  border-bottom: 1px solid #ccc9c9;
  background-color: ${props => props.inThisMonth ? "#fff" : "#ddd"};
  color: ${props => props.inThisMonth ? "#101010" : "#b7b6b6"};
`;

const Container = styled.div`
  padding: 5px;
`;

const DateContainer = styled.div`
  padding: 3px;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  background-color: ${props => props.today ? "#90caf9" : "transparent"};
`;

const EventContainer = styled.div`
  overflow: auto;
`;

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
    const { day } = this.props;
    const inThisMonth = isThisMonth(day);
    return (
      <DayWrapper
        inThisMonth={inThisMonth}
      >
        <Container>
          <DateContainer today={isToday(day)}>
            {getDate(day)}
          </DateContainer>
          <EventContainer>
            {this.renderEvents()}
          </EventContainer>
        </Container>
      </DayWrapper>
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
)(Day);
