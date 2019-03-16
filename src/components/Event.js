import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  convertToFormattedHour,
  convertToCode
} from '../utils';

const EventWrapper = styled.div`
  background-color: #fb8c00;
  border-radius: 8px;
  padding: 3px;
  margin-bottom: 3px;
  display: flex;
  align-items: center;

  &:first-child {
    margin-top: 3px;
  }
`;

const Time = styled.span`
  font-size: 0.6rem;
  margin-right: 5px;
`;

const Content = styled.span`
  font-size: 0.8rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class Event extends Component {

  render() {
    const { hour, data } = this.props;
    const formattedHour = convertToFormattedHour(hour);
    return (
      <EventWrapper>
        <Time>
          {formattedHour}
        </Time>
        <Content>
          {data.name}
        </Content>
      </EventWrapper>
    );
  }
}

export default Event;
