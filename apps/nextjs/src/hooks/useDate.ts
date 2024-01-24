import { useState } from 'react'
import moment, { Moment } from 'moment'

const useDate = (initialDate = moment()) => {
  const [currentDate, setDate] = useState<Moment>(initialDate)

  /**
   * Function to format the date
   * @param formatString
   */
  const format = (formatString = 'YYYY-MM-DD') => {
    return currentDate.format(formatString)
  }

  /**
   * Function to get the current year
   */
  const getCurrentYear = () => {
    return currentDate.year()
  }

  return { currentDate, format, getCurrentYear }
}

export default useDate
