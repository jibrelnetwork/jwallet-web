export default function getFormattedDateString(dateObj, format = 'hh:mm MM/DD/YYYY') {
  const date = (dateObj instanceof Date) ? dateObj : new Date(dateObj)

  const _year = date.getFullYear()
  const _month = date.getMonth() + 1
  const _date = date.getDate()
  const _hour = date.getHours()
  const _min = date.getMinutes()
  const _sec = date.getSeconds()

  const tokens = {
    MM: (_month > 9) ? _month : `0${_month}`,
    M: _month,
    DD: (_date > 9) ? _date : `0${_date}`,
    D: _date,
    YYYY: _year,
    YY: `${_year}`.substr(2),
    hh: (_hour > 9) ? _hour : `0${_hour}`,
    h: _hour,
    mm: (_min > 9) ? _min : `0${_min}`,
    m: _min,
    ss: (_sec > 9) ? _sec : `0${_sec}`,
    s: _sec,
  }

  let dateString = format

  Object.keys(tokens).forEach((token) => {
    if (dateString.indexOf(token) > -1) {
      dateString = dateString.replace(token, tokens[token])
    }
  })

  return dateString
}
