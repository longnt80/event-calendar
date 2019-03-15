import React, { Component } from 'react';
import styled from 'styled-components';
import { addDays } from 'date-fns';

import Day from './Day';

const WeekWrapper = styled.div`
  flex: 1;
  display: flex;
`;

class Week extends Component {
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
    return (
      <WeekWrapper>
        {this.renderDays()}
      </WeekWrapper>
    );
  }
}

export default Week;
