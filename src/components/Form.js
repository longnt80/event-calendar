import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { getDate, endOfMonth } from 'date-fns';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { EVENT_STATE, BUSINESS_HOURS } from '../constants';

const styles = {
  button: {
    margin: '10px 0',
  },
  textfield: {
    marginRight: '10px',
    minWidth: '120px',
  }
}

class MyForm extends Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
  }

  state = {
    typeLabelWidth: 0,
    dateLabelWidth: 0,
    hourLabelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      typeLabelWidth: ReactDOM.findDOMNode(this.TypeInputLabelRef).offsetWidth,
      dateLabelWidth: ReactDOM.findDOMNode(this.DateInputLabelRef).offsetWidth,
      hourLabelWidth: ReactDOM.findDOMNode(this.HourInputLabelRef).offsetWidth,
    });
  }

  renderOptions = () => {
    const { day } = this.props;
    const lastDate = getDate(endOfMonth(day));
    let options = [];

    for (let i = 1; i<=lastDate; i++ ) {
      options.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
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
            hour: '8:00 am',
            type: 'Solo',
            date: date,
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
              <FormControl
                variant="outlined"
                margin="normal"
                fullWidth
              >
                <InputLabel
                  ref={ref => {
                    this.TypeInputLabelRef = ref;
                  }}
                  htmlFor="type-select"
                >
                  Type
                </InputLabel>
                <Select
                  label="State"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.typeLabelWidth}
                      name="type-select"
                      id="type-select"
                    />
                  }
                >
                  {EVENT_STATE.map(state => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                className={classes.textfield}
                margin="normal"
              >
                <InputLabel
                  ref={ref => {
                    this.DateInputLabelRef = ref;
                  }}
                  htmlFor="date-select"
                >
                  Date
                </InputLabel>
                <Select
                  label="Date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.dateLabelWidth}
                      name="date-select"
                      id="date-select"
                    />
                  }
                >
                  {this.renderOptions()}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                className={classes.textfield}
                margin="normal"
              >
                <InputLabel
                  ref={ref => {
                    this.HourInputLabelRef = ref;
                  }}
                  htmlFor="hour-select"
                >
                  Hour
                </InputLabel>
                <Select
                  name="hour"
                  value={values.hour}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.hourLabelWidth}
                      name="hour-select"
                      id="hour-select"
                    />
                  }
                  autoWidth
                >
                  {BUSINESS_HOURS.map(hour => (
                      <MenuItem key={hour.code} value={hour.value}>
                        {hour.value}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
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
