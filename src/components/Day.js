import React, { Component } from 'react';
import styled from 'styled-components';
import { getDate, isThisMonth } from 'date-fns';

const DayWrapper = styled.div`
  flex: 1;
  min-width: calc(100%/7);
  max-width: calc(100%/7);
  border-right: 1px solid #ccc9c9;
  border-bottom: 1px solid #ccc9c9;
  background-color: ${props => props.inThisMonth ? "#fff" : "#ddd"};
  color: ${props => props.inThisMonth ? "#101010" : "#b7b6b6"};
`;

class Day extends Component {
  render() {
    const { day } = this.props;
    const inThisMonth = isThisMonth(day);
    return (
      <DayWrapper
        inThisMonth={inThisMonth}
      >
        {getDate(day)}
      </DayWrapper>
    );
  }
}

export default Day;
