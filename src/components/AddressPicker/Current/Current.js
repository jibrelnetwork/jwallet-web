// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  Component,
} from 'react'

import JText from 'components/base/JText'

import {
  ignoreEvent,
  handleTargetValue,
} from 'utils/eventHandlers'

type Props = {|
  +onChange: (string) => void,
  +label: string,
  +value: ?Address,
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
      value,
      placeholder,
      searchQuery,
      isOpen,
    }: Props = this.props

    const isActive: boolean = (isOpen || !!value)

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
        {value && !isOpen && (
          <Fragment>
            <div className='name'>
              <JText
                value={value}
                color='gray'
                weight='bold'
                size='semilarge'
                whiteSpace='wrap'
              />
            </div>
          </Fragment>
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
