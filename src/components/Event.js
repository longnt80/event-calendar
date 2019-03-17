import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  convertToFormattedHour,
  convertToCode
} from '../utils';

const styles = {
  root: {
    backgroundColor: '#fb8c00',
    borderRadius: '8px',
    padding: '3px',
    marginBottom: '3px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#000',

    '&:first-child': {
      marginTop: '3px',
    }
  },
  past: {
    backgroundColor: '#bbb',
    color: '#565656',
  },
  time: {
    fontSize: '0.6rem',
    marginRight: '5px',
  },
  content: {
    fontSize: '0.8rem',
    flex: '1',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}
class Event extends Component {

  handleClick = e => {
    e.stopPropagation();
  }

  render() {
    const { classes, hour, data, isPast } = this.props;
    const formattedHour = convertToFormattedHour(hour);
    return (
      <div onClick={this.handleClick} className={[classes.root, isPast ? classes.past : null].join(' ')}>
        <span className={classes.time}>
          {formattedHour}
        </span>
        <span className={classes.content}>
          {data.name}
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(Event);
