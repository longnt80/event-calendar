import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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
// import Modal from './common/Modal';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderLeft: '1px solid #ccc9c9',
    borderTop: '1px solid #ccc9c9',
  }
}

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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderWeek()}
        {/* <Modal open={this.props.modalIsOpen}>Some Form</Modal> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modalIsOpen: state.modal.isOpen
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(Calendar));
