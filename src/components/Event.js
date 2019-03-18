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
import { EVENT_STATE } from '../constants';

import Form from './Form';

const styles = theme => ({
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
  solo: {
    backgroundColor: theme.palette.solo.main,
  },
  team: {
    backgroundColor: theme.palette.team.main,
  },
  company: {
    backgroundColor: theme.palette.company.main,
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
})
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

  get classForType() {
    const { classes, data } = this.props;
    let typeClass = "";

    if (EVENT_STATE.SOLO === data.type) {
      typeClass = classes.solo;
    } else if (EVENT_STATE.TEAM === data.type) {
      typeClass = classes.team;
    } else if (EVENT_STATE.COMPANY === data.type) {
      typeClass = classes.company;
    }

    return typeClass;
  }

  render() {
    const { classes, hour, data, isPast } = this.props;
    const formattedHour = convertToFormattedHour(hour);

    return (
      <div onClick={isPast ? null : this.handleClick} className={[classes.root, this.classForType, isPast ? classes.past : null].join(' ')}>
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
