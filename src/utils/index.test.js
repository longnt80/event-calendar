import {
  convertToFormattedHour,
  convertToCode,
} from './index';

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
