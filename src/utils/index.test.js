import { convertToFormattedHour, convertToCode, isPastDay } from './index';
import { addDays, subDays } from 'date-fns';

test('return correct formatted hour', () => {
  expect(convertToFormattedHour('0830')).toBe('8:30 am');
  expect(convertToFormattedHour('1530')).toBe('3:30 pm');
  expect(convertToFormattedHour('1200')).toBe('12:00 pm');
  expect(convertToFormattedHour('2400')).toBe('12:00 am');
  expect(convertToFormattedHour('2330')).toBe('11:30 pm');
});

test('return correct hour code', () => {
  expect(convertToCode('8:30 am')).toBe('0830');
  expect(convertToCode('3:30 pm')).toBe('1530');
  expect(convertToCode('12:00 pm')).toBe('1200');
  expect(convertToCode('12:00 am')).toBe('2400');
  expect(convertToCode('11:30 pm')).toBe('2330');
})

test('decide if a day is in the past', () => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const tomorrow = addDays(today, 1);
  expect(isPastDay(new Date(2012, 1, 29))).toBe(true);
  expect(isPastDay(new Date(2018, 3, 17))).toBe(true);
  expect(isPastDay(new Date(2019, 3, 18))).toBe(false);
  expect(isPastDay(new Date(yesterday))).toBe(true);
  expect(isPastDay(new Date(today))).toBe(false);
  expect(isPastDay(new Date(tomorrow))).toBe(false);
})
