// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  Component,
} from 'react'

import JText from 'components/base/JText'
import { getShortenedAddress } from 'utils/address'
import {
  ignoreEvent,
  handleTargetValue,
} from 'utils/eventHandlers'

type Props = {|
  +onChange: (string) => void,
  +label: string,
  +address: ?Address,
  +addressName: ?string,
  +searchQuery: string,
  +placeholder: string,
  +isOpen: boolean,
|}

type ComponentState = {|
  +filterTextInput: React$ElementRef<any>,
|}

class AddressPickerCurrent extends Component<Props, ComponentState> {
  static defaultProps = {
    searchQuery: '',
    address: '',
    addressName: '',
    label: 'Recipient address',
    placeholder: 'Recipient address',
    isOpen: false,
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

  render() {
    const {
      onChange,
      label,
      address,
      addressName,
      placeholder,
      searchQuery,
      isOpen,
    }: Props = this.props

    const isActive: boolean = (isOpen || !!address)

    return (
      <div className={classNames('address-picker-current', isActive ? '-active' : '')}>
        <div className='placeholder'>
          <JText
            value={isActive ? label : placeholder}
            size={isActive ? 'small' : 'semilarge'}
            color='gray'
            whiteSpace='wrap'
          />
        </div>
        {address && !isOpen && (
          <div className='name'>
            {addressName ?
              <Fragment>
                <div className='addrname'>
                  <JText
                    value={addressName}
                    color='gray'
                    weight='bold'
                    size='semilarge'
                    whiteSpace='nowrap'
                  />
                </div>
                <JText
                  value={`\u202F—\u202F${getShortenedAddress(address, 7, 6, '\u22EF')}`}
                  color='gray'
                  weight='bold'
                  size='semilarge'
                  whiteSpace='wrap'
                />
              </Fragment>
              :
              <JText
                value={address}
                color='gray'
                weight='bold'
                size='semilarge'
                whiteSpace='wrap'
              />}
          </div>
        )}
        {isOpen && (
          <div className='edit'>
            <input
              onClick={ignoreEvent()}
              onChange={handleTargetValue(onChange)}
              ref={this.state.filterTextInput}
              value={searchQuery}
              type='text'
              weight='bold'
              className='input'
            />
          </div>
        )}
      </div>
    )
  }
}

export default AddressPickerCurrent
