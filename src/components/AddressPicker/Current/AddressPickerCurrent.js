// @flow

import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { handleTargetValue } from 'utils/eventHandlers'
import { JText } from 'components/base'

type Props = {|
  address: ?Address,
  isOpen: boolean,
  filterChange: (text: string) => void,
  filterValue: string,
  placeholder: string,
  label: string,
|}

type ComponentState = {|
  filterTextInput: React$ElementRef<any>,
|}

class AddressPickerCurrent extends Component<Props, ComponentState> {
  static defaultProps = {
    address: null,
    isOpen: false,
    placeholder: 'Recepient address',
    label: 'Recepient address',
    filterValue: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      filterTextInput: React.createRef(),
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.state.filterTextInput.current.focus()
    }
  }

  onFilterClick = (e: SyntheticEvent<HTMLInputElement>) => {
    // don't close on input click
    e.stopPropagation()
  }

  render() {
    const {
      address,
      label,
      isOpen: isEdit,
      placeholder,
      filterChange,
      filterValue,
    } = this.props

    return (
      <div className={classNames('address-picker-current', isEdit || address ? '-value' : '')}>
        <div className='placeholder'>
          <JText
            value={isEdit || address ? label : placeholder}
            whiteSpace='wrap'
            color='gray'
            size={isEdit || address ? 'small' : 'semilarge'}
          />
        </div>
        {address && !isEdit &&
        <Fragment>
          <div className='name'>
            <JText
              value={address}
              color='gray'
              size='semilarge'
              weight='bold'
              whiteSpace='wrap'
            />
          </div>
        </Fragment>}
        {isEdit &&
        <div className='edit'>
          <input
            ref={this.state.filterTextInput}
            type='text'
            value={filterValue}
            onChange={handleTargetValue(filterChange)}
            onClick={this.onFilterClick}
            className='input'
          />
        </div>}
      </div>
    )
  }
}

export default AddressPickerCurrent
