import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import {
  getDate,
  getMonth,
  getYear,
  endOfMonth,
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
    margin: '30px 0 10px',

    '&:first-child': {
      marginRight: '10px',
    }
  },
  textfield: {
    marginRight: '10px',
    minWidth: '120px',
  }
}

// const Schema = Yup.object().shape({
//   name: Yup.string()
//     .max(20, 'Nice try, nobody has a first name that long')
//     .required('Required'),
// });

class MyForm extends Component {
  static propTypes = {
    isNewEvent: PropTypes.bool,
    day: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    hour: PropTypes.string,
  }

  static defaultProps = {
    isNewEvent: true,
    name: "",
    type: "Solo",
    hour: "8:00 am",
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
    const { events, isNewEvent } = this.props;
    const monthIndex = MONTHS.indexOf(values.month);
    const hourCode = convertToCode(values.hour);
    let errors = {};

    console.log('validating');
    console.log(values.name);
    console.log(values.name.length > 20);

    if (!values.name) {
      errors.name = 'This field is required';
      console.log('This field is required');
      console.log(errors);
    } else if (values.name.length > 20) {
      errors.name = 'Maximum 20 characters allowed';
      console.log('Too long');
      console.log(errors);
    };

    if (!!events[2019][monthIndex][values.date][hourCode] && isNewEvent) {
      errors.duplicate = 'Duplicated events';
      console.log(errors);
    };

    console.log("Hell no");
    console.log(errors);
    return errors;
  }

  handleSubmit = (values, { setSubmitting }) => {
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
    setTimeout(() => {
      addEvent(event);
      closeModal();
      setSubmitting(false);
    }, 500);
  }

  render() {
    const { day, hour, name, type, classes, closeModal, isNewEvent } = this.props;
    const date = getDate(day);
    const month = MONTHS[getMonth(day)];
    const year = getYear(day)

    return (
      <div>
        <Paper elevation={0}>
          {isNewEvent ? "Create" : "Edit"} an event for {`${month} ${date}, ${year}`}
        </Paper>
        <Formik
          initialValues={{
            name: name !== "" ? name : "",
            hour: "",
            type: type,
            date: date,
            month: month,
          }}
          validate={this.validateForm}
          // validationSchema={Schema}
          onSubmit={this.handleSubmit}
          render={({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
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
              <Paper elevation={0}>
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
              </Paper>
              <Paper elevation={0}>
                <Button
                  disabled={isSubmitting || isEmpty(touched)}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                >Submit</Button>
                <Button
                  onClick={closeModal}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >Cancel</Button>
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
