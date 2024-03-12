import { useState } from 'react'
import moment, { Moment } from 'moment'

export const useDate = (initialDate = moment()) => {
  const [currentDate, setDate] = useState<Moment>(initialDate)

  /**
   * Format the date to a some datetime format
   * Default format is YYYY-MM-DD
   * @param formatString
   */
  const format = (formatString = 'YYYY-MM-DD') => {
    return currentDate.format(formatString)
  }

  /**
   * Get the current year
   */
  const getCurrentYear = () => {
    return currentDate.year()
  }

  return { currentDate, format, getCurrentYear }
}
