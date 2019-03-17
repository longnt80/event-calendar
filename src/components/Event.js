import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  convertToFormattedHour,
  // convertToCode
} from '../utils';
import {
  openModal,
} from '../store/actions/modalActions';

import Form from './Form';

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
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    day: PropTypes.object.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    hour: PropTypes.string.isRequired,
    isPast: PropTypes.bool.isRequired,
    classes: PropTypes.object,
  }

  static defaultProps = {
    classes: {},
  }

  handleClick = e => {
    e.stopPropagation();
    const { openModal, day, data, hour } = this.props;
    const formattedHour = convertToFormattedHour(hour);

    openModal(<Form />, { day, isNewEvent: false, hour: formattedHour, ...data });
  }

  render() {
    const { classes, hour, data, isPast } = this.props;
    const formattedHour = convertToFormattedHour(hour);
    return (
      <div onClick={isPast ? null : this.handleClick} className={[classes.root, isPast ? classes.past : null].join(' ')}>
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

const mapDispatchToProps = dispatch => ({
  openModal: (component, props) => dispatch(openModal(component, props)),
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Event));
