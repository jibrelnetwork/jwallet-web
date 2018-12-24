// @flow

import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

import { formatBalance } from 'utils/numbers'
import { handleTargetValue } from 'utils/eventHandlers'
import { JText, JAssetSymbol } from 'components/base'

type Props = {|
  asset: ?DigitalAssetWithBalance,
  balance: ?Balance,
  isOpen: boolean,
  filterChange: (text: string) => void,
  filterValue: string,
  placeholder: string,
  label: string,
|}

type ComponentState = {
  filterTextInput: React$ElementRef<any>,
}

class AssetPickerCurrent extends Component<Props, ComponentState> {
  static defaultProps = {
    isOpen: false,
    asset: null,
    balance: null,
    placeholder: 'Digital asset',
    label: 'Digital asset',
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
      asset,
      balance,
      label,
      isOpen: isEdit,
      placeholder,
      filterChange,
      filterValue,
    } = this.props

    const balanceStr = (asset && balance && !balance.isLoading && !balance.isError)
      ? `: ${formatBalance(balance.value)} ${asset.symbol}`
      : ''

    return (
      <div className={classNames('asset-picker-current', isEdit || asset ? '-value' : '')}>
        <div className='placeholder'>
          <JText
            value={isEdit || asset ? label : placeholder}
            whiteSpace='wrap'
            color='gray'
            size={isEdit || asset ? 'small' : 'semilarge'}
          />
        </div>
        {asset && !isEdit &&
        <Fragment>
          <div className='name'>
            <JText
              value={asset.name}
              color='gray'
              size='semilarge'
              weight='bold'
              whiteSpace='wrap'
            />
            {balanceStr &&
              <JText
                value={balanceStr}
                color='gray'
                size='semilarge'
                weight='bold'
                whiteSpace='wrap'
              /> }
          </div>
          <div className='symbol'>
            <JAssetSymbol symbol={asset.symbol} color='gray' />
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
            weight='bold'
          />
        </div>
        }
      </div>
    )
  }
}

export default AssetPickerCurrent
