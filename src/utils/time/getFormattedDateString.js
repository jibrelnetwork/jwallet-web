// @flow

export default function getFormattedDateString(
  dateObj: Date | number,
  format: string = 'hh:mm MM/DD/YYYY',
): string {
  const date: Date = (dateObj instanceof Date) ? dateObj : new Date(dateObj)

  const _year = date.getFullYear()
  const _month = date.getMonth() + 1
  const _date = date.getDate()
  const _hour = date.getHours()
  const _min = date.getMinutes()
  const _sec = date.getSeconds()

  const tokens: { [string]: string } = {
    MM: `${(_month > 9) ? '' : '0'}${_month}`,
    M: `${_month}`,
    DD: `${(_date > 9) ? '' : '0'}${_date}`,
    D: `${_date}`,
    YYYY: `${_year}`,
    YY: `${_year}`.substr(2),
    hh: `${(_hour > 9) ? '' : '0'}${_hour}`,
    h: `${_hour}`,
    mm: `${(_min > 9) ? '' : '0'}${_min}`,
    m: `${_min}`,
    ss: `${(_sec > 9) ? '' : '0'}${_sec}`,
    s: `${_sec}`,
  }

  let dateString: string = format

  Object.keys(tokens).forEach((token) => {
    if (dateString.indexOf(token) > -1) {
      dateString = dateString.replace(token, tokens[token])
    }
  })

  return dateString
}
