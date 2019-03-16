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

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

import {
  openModal,
  closeModal,
} from '../store/actions/modalActions';

import Week from './Week';
import Form from './Form';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderLeft: '1px solid #ccc9c9',
    borderTop: '1px solid #ccc9c9',
  },
  modal: {
    backgroundColor: '#fff',
    width: '500px',
    minHeight: '300px',
    maxWidth: '70%',
    padding: '20px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    const { classes, modalIsOpen, closeModal } = this.props;
    return (
      <div className={classes.root}>
        {this.renderWeek()}
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
        >
          <Paper elevation={20} className={classes.modal}>
            <Form />
          </Paper>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalIsOpen: state.modal.isOpen,
});

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openModal()),
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Calendar));
