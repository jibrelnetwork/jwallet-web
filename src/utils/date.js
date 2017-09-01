export default function date(dateObj, format) {
  const _year = dateObj.getFullYear()
  const _month = dateObj.getMonth() + 1
  const _date = dateObj.getDate()
  const _hour = dateObj.getHours()
  const _min = dateObj.getMinutes()
  const _sec = dateObj.getSeconds()

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
