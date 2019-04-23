// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  Component,
} from 'react'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  ignoreEvent,
  handleTargetValue,
} from 'utils/eventHandlers'

import {
  JText,
  JAssetSymbol,
} from 'components/base'

type Props = {|
  +onChange: (string) => void,
  +currentAsset: ?DigitalAssetWithBalance,
  +label: string,
  +searchQuery: string,
  +placeholder: string,
  +isOpen: boolean,
|}

type ComponentState = {|
  +filterTextInput: React$ElementRef<any>,
|}

class DigitalAssetsSendFormAssetPickerCurrent extends Component<Props, ComponentState> {
  static defaultProps = {
    label: 'Digital asset',
    placeholder: 'Digital asset',
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

  renderCurrentAsset = (currentAsset: DigitalAssetWithBalance) => {
    const {
      name,
      symbol,
      balance,
      blockchainParams: {
        address,
        decimals,
      },
    }: DigitalAssetWithBalance = currentAsset

    const balanceStr: string = (balance && balance.value)
      ? `: ${formatBalance(divDecimals(balance.value, decimals), 6)} ${symbol}`
      : ''

    return (
      <Fragment>
        <div className='name'>
          <JText
            value={name}
            color='gray'
            weight='bold'
            size='semilarge'
            whiteSpace='wrap'
          />
          {balanceStr && (
            <JText
              value={balanceStr}
              color='gray'
              weight='bold'
              size='semilarge'
              whiteSpace='wrap'
            />
          )}
        </div>
        <div className='symbol'>
          <JAssetSymbol
            symbol={symbol}
            address={address}
            color='gray'
            size={24}
          />
        </div>
      </Fragment>
    )
  }

  render() {
    const {
      onChange,
      currentAsset,
      label,
      placeholder,
      searchQuery,
      isOpen,
    }: Props = this.props

    const isActive: boolean = (isOpen || !!currentAsset)

    return (
      <div
        className={classNames(
          'digital-assets-send-form-asset-picker-current',
          isActive && '-active',
        )}
      >
        <div className='placeholder'>
          <JText
            value={isActive ? label : placeholder}
            size={isActive ? 'small' : 'semilarge'}
            color='gray'
            whiteSpace='wrap'
          />
        </div>
        {currentAsset && !isOpen && this.renderCurrentAsset(currentAsset)}
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

export default DigitalAssetsSendFormAssetPickerCurrent
