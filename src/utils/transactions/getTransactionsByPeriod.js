// @flow

const TIME_UNITS: { [string]: string } = {
  TODAY: 'Today',
  YESTERDAY: 'Yesterday',
  LAST_WEEK: 'Last Week',
  LAST_MONTH: 'Last Month',
  LAST_YEAR: 'Last Year',
  LATER: 'Later',
}

function getUnits(timestamp: number): TimeUnits {
  const date: Date = new Date(timestamp)

  return {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  }
}

function getKey(timestamp: number): string {
  const nowUnits: TimeUnits = getUnits(Date.now())
  const txUnits: TimeUnits = getUnits(timestamp)

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

function getTransactionsByPeriod(transactions: Transactions): TransactionsByPeriod {
  return transactions
    .reduce((result: TransactionsByPeriod, transaction: Transaction) => {
      const key: string = getKey(transaction.timestamp)
      const value: Transactions = result[key] || []

      return Object.assign({}, result, {
        [key]: value.concat(transaction),
      })
    }, {})
}

type TimeUnits = {
  +date: number,
  +year: number,
  +month: number,
}

export default getTransactionsByPeriod
