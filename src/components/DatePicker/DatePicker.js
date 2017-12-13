import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

import JIcon from 'components/base/JIcon'

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = { focusedInput: null }
  }

  componentWillReceiveProps(nextProps) {
    const isClosed = !this.props.filterData.isOpen
    const isAboutToOpen = nextProps.filterData.isOpen

    if (isClosed && isAboutToOpen) {
      this.setFocused('startDate')
    }
  }

  render() {
    const { startTime, endTime, isOpen } = this.props.filterData

    if (!isOpen) {
      return null
    }

    const startDate = startTime ? moment(startTime) : null
    const endDate = endTime ? moment(endTime) : null

    const icon = (startDate || endDate)
      ? <JIcon name='small-clear' small className='date-picker__clear-icon' onClick={this.clean} />
      : null

    return (
      <div className='date-picker clear'>
        <div className='date-picker__title pull-left'>{`${i18n('transactions.filterTitle')}:`}</div>
        <DateRangePicker
          onDatesChange={this.setFilterTime}
          onFocusChange={this.setFocused}
          isOutsideRange={this.excludeDaysOutsideRange}
          startDate={startDate}
          endDate={endDate}
          focusedInput={this.state.focusedInput}
          displayFormat={'MM.DD.YYYY'}
          anchorDirection={'right'}
          daySize={35}
        />
        {icon}
      </div>
    )
  }

  setFocused = focusedInput => this.setState({ focusedInput })

  setFilterTime = ({ startDate, endDate }) => {
    const { setStartFilterTime, setEndFilterTime } = this.props

    const startFilterTime = startDate ? startDate.toDate().getTime() : 0
    const endFilterTime = endDate ? endDate.toDate().getTime() : 0

    setStartFilterTime(startFilterTime)
    setEndFilterTime(endFilterTime)
  }

  clean = (e) => {
    const { setStartFilterTime, setEndFilterTime, filterTransactions } = this.props

    setStartFilterTime(0)
    setEndFilterTime(0)
    filterTransactions(false)(e)
  }

  excludeDaysOutsideRange = () => false
}

DatePicker.propTypes = {
  filterTransactions: PropTypes.func.isRequired,
  setStartFilterTime: PropTypes.func.isRequired,
  setEndFilterTime: PropTypes.func.isRequired,
  filterData: PropTypes.shape({
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default DatePicker
