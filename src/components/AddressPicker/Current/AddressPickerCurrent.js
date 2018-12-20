// @flow

import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
// import { formatBalance } from 'utils/numbers'
import { handleTargetValue } from 'utils/eventHandlers'
import { JText /* , JAssetSymbol */ } from 'components/base'

type Props = {|
  // asset: DigitalAsset,
  address: ?Address,
  // balance: ?Balance,
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
    // balance: null,
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
      // asset,
      address,
      // title,
      // balance,
      label,
      isOpen: isEdit,
      placeholder,
      filterChange,
      filterValue,
    } = this.props

    // const balanceStr = (address && balance && !balance.isLoading && !balance.isError)
    //   ? `: ${formatBalance(balance.value)} ${asset.symbol}`
    //   : ''

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
          {/* <div className='label'>
            <JText
              value={label}
              color='gray'
              size='small'
              whiteSpace='wrap'
            />
          </div> */}
          <div className='name'>
            <JText
              value={address}
              color='gray'
              size='semilarge'
              weight='bold'
              whiteSpace='wrap'
            />
            {/* { balanceStr &&
              <JText
                value={balanceStr}
                color='gray'
                size='semilarge'
                weight='bold'
                whiteSpace='wrap'
              /> } */}
          </div>
          {/* <div className='symbol'>
            <JAssetSymbol symbol={asset.symbol} color='gray' />
          </div> */}
        </Fragment> }
        {isEdit &&
        <Fragment>
          {/* <div className='label'>
            <JText value={label} size='small' whiteSpace='wrap' color='gray' />
          </div> */}
          <div className='edit'>
            <input
              ref={this.state.filterTextInput}
              type='text'
              value={filterValue}
              onChange={handleTargetValue(filterChange)}
              onClick={this.onFilterClick}
              className='input'
            />
          </div>
        </Fragment>}
      </div>
    )
  }
}

export default AddressPickerCurrent
