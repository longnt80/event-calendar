import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { get } from 'lodash';
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
import { addEvent, deleteEvent } from '../store/actions/eventActions';
import { convertToCode } from '../utils';
import { EVENT_STATE, BUSINESS_HOURS, MONTHS } from '../constants';


const styles = {
  button: {
    margin: '30px 0 10px',

    '&:not(:first-child)': {
      marginLeft: '10px',
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
      errMsg: {},
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
    const lastMonth = 11;
    let options = [];

    for (let i = thisMonth; i <= lastMonth; i++ ) {
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
    const eventIsExisted = get(events, [2019, monthIndex, values.date, hourCode], false);
    let errors = {};
    console.log("Start validation");

    if (!values.name) {
      errors.name = 'This field is required';
    } else if (values.name.length > 20) {
      errors.name = 'Maximum 20 characters allowed';
    };

    if (!values.hour) {
      errors.hour = 'Please pick a time';
    }

    if (!values.date) {
      errors.date = 'Please pick a date';
    }

    if (!!eventIsExisted && isNewEvent) {
      errors.duplicate = 'Duplicated events';
    };

    console.log("Hell no");
    return errors;
  }

  handleMonthChange = (handleChange, setFieldValue) => e => {
    setFieldValue('date', "", true);

    handleChange(e);
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

  handleDeleteBtn = (values) => {
    const { deleteEvent, closeModal } = this.props;
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

    deleteEvent(event);
    closeModal();
  }

  render() {
    const { day, hour, name, type, classes, closeModal, isNewEvent } = this.props;
    const date = getDate(day);
    const month = MONTHS[getMonth(day)];
    const year = getYear(day);
    const initialName = name !== "" ? name : "";
    console.log({ initialName, type, date, month });

    return (
      <div>
        <Paper elevation={0}>
          {isNewEvent ? "Create" : "Edit"} an event for {`${month} ${date}, ${year}`}
        </Paper>
        <Formik
          initialValues={{
            name: initialName,
            hour: hour,
            type: type,
            date: date,
            month: month,
          }}
          validate={this.validateForm}
          onSubmit={this.handleSubmit}
          render={({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            setTouched,
            setErrors,
            setFieldValue,
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
                  {Object.keys(EVENT_STATE).map(stateVar => (
                      <MenuItem key={EVENT_STATE[stateVar]} value={EVENT_STATE[stateVar]}>
                        {EVENT_STATE[stateVar]}
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
                {errors.hour && touched.hour ? (
                  <FormHelperText error={!!errors.hour}>
                    {errors.hour}
                  </FormHelperText>) : null
                }
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
                  {errors.date && touched.date ? (
                    <FormHelperText error={!!errors.date}>
                      {errors.date}
                    </FormHelperText>) : null
                  }
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
                    onChange={this.handleMonthChange(handleChange, setFieldValue)}
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
                  disabled={isSubmitting}
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
                {!isNewEvent &&
                  <Button
                    onClick={() => this.handleDeleteBtn(values)}
                    className={classes.button}
                    variant="contained"
                    color="danger"
                  >Delete</Button>
                }
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
  deleteEvent: (event) => dispatch(deleteEvent(event)),
  openModal: (component, props) => dispatch(openModal(component, props)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MyForm));
