import React, { Component } from 'react';
import styled from 'styled-components';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  getMonth,
  getYear,
  differenceInWeeks,
  addDays,
} from 'date-fns';

import Week from './Week';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid #ccc9c9;
  border-top: 1px solid #ccc9c9;
`;

class Calendar extends Component {
  renderWeek = () => {
    const thisMonth = getMonth(new Date());
    const thisYear = getYear(new Date());
    const firstDayOfMonth = startOfMonth(new Date(thisYear, thisMonth ));
    const lastDayOfMonth = endOfMonth(new Date(thisYear, thisMonth ));
    const initialDay = startOfWeek(firstDayOfMonth);
    const lastDay =  endOfWeek(lastDayOfMonth);
    const numberOfWeeks = differenceInWeeks(addDays(lastDay, 1), addDays(initialDay, -1));
    const LENGTH_OF_WEEK = 7;
    let result = [];

    console.log({initialDay, lastDay, numberOfWeeks});

    for (let i = 0; i < numberOfWeeks; i++) {
      const firstDay = addDays(initialDay, LENGTH_OF_WEEK*i);

      result.push(
        <Week
          key={i}
          firstDay={firstDay}
        />
      );
    }
    return result;
  }

  render() {
    return (
      <CalendarWrapper>
        {this.renderWeek()}
      </CalendarWrapper>
    );
  }
}

export default Calendar;
