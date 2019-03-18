import { getMonth, addMonths, subMonths } from 'date-fns';

import {
  CHANGE_TO_NEXT_MONTH,
  CHANGE_TO_PREVIOUS_MONTH,
} from '../constants';

export const goToNextMonth = (currenDisplaytMonth) => ({
  type: CHANGE_TO_NEXT_MONTH,
  month:  getMonth(addMonths(new Date(2019, currenDisplaytMonth), 1)),
})

export const goToPreviousMonth = (currenDisplaytMonth) => ({
  type: CHANGE_TO_PREVIOUS_MONTH,
  month: getMonth(subMonths(new Date(2019, currenDisplaytMonth), 1)),
})
