// @flow

import { assoc } from 'ramda'

const TIME_UNITS = {
  TODAY: 'Today',
  YESTERDAY: 'Yesterday',
  LAST_WEEK: 'Last Week',
  LAST_MONTH: 'Last Month',
  LAST_YEAR: 'Last Year',
  LATER: 'Later',
}

const getTransactionsByPeriod = (transactions: Transactions): Object => {
  return transactions
    .reduce((result: Object, transaction: Transaction) => {
      const key: string = getKey(transaction.timestamp)
      const value: Transactions = result[key] || []

      return assoc(key, value.concat(transaction))(result)
    }, {})
}

const getKey = (timestamp: number): string => {
  const nowUnits: Object = getUnits(Date.now())
  const txUnits: Object = getUnits(timestamp)

  if ((nowUnits.year - txUnits.year) > 1) {
    return TIME_UNITS.LATER
  }

  if ((nowUnits.year - txUnits.year) === 1) {
    return TIME_UNITS.LAST_YEAR
  }

  if ((nowUnits.month - txUnits.month) > 1) {
    return TIME_UNITS.LAST_YEAR
  }

  if ((nowUnits.month - txUnits.month) === 1) {
    return TIME_UNITS.LAST_MONTH
  }

  if ((nowUnits.date - txUnits.date) > 7) {
    return TIME_UNITS.LAST_MONTH
  }

  if ((nowUnits.date - txUnits.date) > 1) {
    return TIME_UNITS.LAST_WEEK
  }

  if ((nowUnits.date - txUnits.date) === 1) {
    return TIME_UNITS.YESTERDAY
  }

  return TIME_UNITS.TODAY
}

const getUnits = (timestamp: number): Object => {
  const date = new Date(timestamp)

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  }
}

export default getTransactionsByPeriod
