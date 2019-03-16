import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { getDate, endOfMonth } from 'date-fns';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { EVENT_STATE, BUSINESS_HOURS } from '../constants';

const styles = {
  button: {
    margin: '10px 0',
  },
  textfield: {
    marginRight: '10px',
    width: '150px',
  }
}

class MyForm extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
  }

  renderOptions = () => {
    const { day } = this.props;
    const lastDate = getDate(endOfMonth(day));
    let options = [];

    for (let i = 1; i<=lastDate; i++ ) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return options;
  }

  render() {
    const { day, classes } = this.props;
    const date = getDate(day);

    return (
      <div>
        <Paper elevation={0}>
          Create an event
        </Paper>
        <Formik
          initialValues={{
            name: '',
            state: '',
            date: date,
            hour: '8:00 am',
          }}
          onSubmit={values => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500);
          }}
          render={({
            values,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
                />

              <TextField
                label="State"
                name="state"
                select
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
                fullWidth
              >
                {EVENT_STATE.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))
                }
              </TextField>

              <TextField
                className={classes.textfield}
                label="Date"
                name="date"
                select
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
                >
                {this.renderOptions()}
              </TextField>
              <TextField
                className={classes.textfield}
                label="Hour"
                name="hour"
                select
                value={values.hour}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="normal"
              >
                {BUSINESS_HOURS.map(hour => (
                    <option key={hour.code} value={hour.code}>
                      {hour.value}
                    </option>
                  ))
                }
              </TextField>
              <Paper className={classes.button} elevation={0}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >Submit</Button>
              </Paper>
            </Form>
          )}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => ({

// })

export default withStyles(styles)(MyForm);
