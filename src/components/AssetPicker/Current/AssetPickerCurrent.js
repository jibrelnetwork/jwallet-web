// @flow

import React, { PureComponent, Fragment } from 'react'

import { formatBalance } from 'utils/numbers'
import { handleTargetValue } from 'utils/eventHandlers'
import { JText, JAssetSymbol } from 'components/base'

type Props = {|
  asset: ?DigitalAsset,
  balance: ?Balance,
  isOpen: boolean,
  filterChange: (text: string) => void,
  filterValue: string,
  placeholder: string,
  label: string,
|}

class AssetPickerCurrent extends PureComponent<Props, *> {
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

    this.filterTextInput = React.createRef()
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.filterTextInput.current.focus()
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
      <div className='asset-picker-current'>
        { !asset && !isEdit &&
          <div className='placeholder'>
            <JText
              value={placeholder}
              whiteSpace='wrap'
              color='gray'
            />
          </div> }
        { asset && !isEdit &&
        <Fragment>
          <div className='label'>
            <JText
              value={label}
              color='gray'
              size='small'
              whiteSpace='wrap'
            />
          </div>
          <div className='name'>
            <JText
              value={asset.name}
              color='gray'
              size='semilarge'
              weight='bold'
              whiteSpace='wrap'
            />
            { balanceStr &&
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
        </Fragment> }
        { isEdit &&
        <Fragment>
          <div className='label'>
            <JText value={label} size='small' whiteSpace='wrap' color='gray' />
          </div>
          <div className='edit'>
            <input
              ref={this.filterTextInput}
              type='text'
              value={filterValue}
              onChange={handleTargetValue(filterChange)}
              onClick={this.onFilterClick}
              className='input'
            />
          </div>
        </Fragment> }
      </div>
    )
  }
}

export default AssetPickerCurrent
