import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  getDate,
  getMonth,
  getYear,
  endOfMonth,
  getDaysInMonth,
  isThisMonth,
  addMonths
} from 'date-fns';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';

import { openModal, closeModal } from '../store/actions/modalActions';
import { addEvent } from '../store/actions/eventActions';
import { convertToCode } from '../utils';
import { EVENT_STATE, BUSINESS_HOURS, MONTHS } from '../constants';


const styles = {
  button: {
    margin: '10px 0',
  },
  textfield: {
    marginRight: '10px',
    minWidth: '120px',
  }
}

const schema = Yup.object().shape({
  name: Yup.string().max(20, 'Maximum 20 characters allowed').required('This is a required field'),
});

class MyForm extends Component {
  static propTypes = {
    isNewEvent: PropTypes.bool,
    day: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isNewEvent: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      typeLabelWidth: 0,
      hourLabelWidth: 0,
      dateLabelWidth: 0,
      monthLabelWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({
      typeLabelWidth: ReactDOM.findDOMNode(this.TypeInputLabelRef).offsetWidth,
      hourLabelWidth: ReactDOM.findDOMNode(this.HourInputLabelRef).offsetWidth,
      dateLabelWidth: ReactDOM.findDOMNode(this.DateInputLabelRef).offsetWidth,
      monthLabelWidth: ReactDOM.findDOMNode(this.MonthInputLabelRef).offsetWidth,
    });
  }

  renderDateOptions = (values) => {
    const today = getDate(new Date());
    const selectedMonthIndex = MONTHS.indexOf(values.month);
    const lastDayOfMonth = getDate(endOfMonth(new Date(2019, selectedMonthIndex)));
    const isCurrentMonth = isThisMonth(new Date(2019, selectedMonthIndex));
    let options = [];
    let i = isCurrentMonth ? today : 1;

    for (; i<=lastDayOfMonth; i++ ) {
      options.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      )
    }
    return options;
  }

  renderMonthOptions = () => {
    const thisMonth = getMonth(new Date());
    const nextMonth = getMonth(addMonths(new Date(), 1));
    let options = [];

    for (let i = thisMonth; i <= nextMonth; i++ ) {
      options.push(
        <MenuItem key={i} value={MONTHS[i]}>
          {MONTHS[i]}
        </MenuItem>
      )
    }
    return options;
  }

  validateForm = (values) => {
    const { events } = this.props;
    const monthIndex = MONTHS.indexOf(values.month);
    const hourCode = convertToCode(values.hour);
    let errors = {};


    if (!!events[2019][monthIndex][values.date][hourCode]) {
      errors.duplicate = 'Duplicated events'
    }

    return errors;
  }

  handleSubmit = values => {
    const { closeModal, addEvent } = this.props;
    const monthIndex = MONTHS.indexOf(values.month);
    const hourCode = convertToCode(values.hour);
    const event = {
      year: 2019,
      month: monthIndex,
      date: values.date,
      hour: hourCode,
      data: {
        name: values.name,
        type: values.type,
      }
    }
    addEvent(event);
    closeModal();

    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   closeModal();
    // }, 500);

  }

  render() {
    const { day, classes, closeModal } = this.props;
    const date = getDate(day);
    const month = MONTHS[getMonth(day)];
    const year = getYear(day)

    return (
      <div>
        <Paper elevation={0}>
          Create an event for {`${month} ${date}, ${year}`}
        </Paper>
        <Formik
          initialValues={{
            name: '',
            hour: '8:00 am',
            type: 'Solo',
            date: date,
            month: month,
          }}
          onSubmit={this.handleSubmit}
          validate={this.validateForm}
          validationSchema={schema}
          render={({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
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
              {errors.name && touched.name ? (
                <FormHelperText error={!!errors.name}>
                  {errors.name}
                </FormHelperText>) : null
              }
              <FormControl
                variant="outlined"
                margin="normal"
                className={classes.textfield}
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
                  {this.renderDateOptions(values)}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                className={classes.textfield}
                margin="normal"
              >
                <InputLabel
                  ref={ref => {
                    this.MonthInputLabelRef = ref;
                  }}
                  htmlFor="month-select"
                >
                  Month
                </InputLabel>
                <Select
                  label="Month"
                  name="month"
                  value={values.month}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.monthLabelWidth}
                      name="month-select"
                      id="month-select"
                    />
                  }
                >
                  {this.renderMonthOptions()}
                </Select>
              </FormControl>
              {errors.duplicate ? (
                <FormHelperText error={!!errors.duplicate}>
                  {errors.duplicate}
                </FormHelperText>) : null
              }
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

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  addEvent: (event) => dispatch(addEvent(event)),
  openModal: (component, props) => dispatch(openModal(component, props)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyForm));
