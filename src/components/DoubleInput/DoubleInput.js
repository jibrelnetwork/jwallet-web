// @flow

import React, { PureComponent } from 'react'

import { JInput } from 'components/base'

type Props = {|
  +onChange: () => void,
  +valueFiat: string,
  +valueAmount: string,
  +errorMessageFiat: string,
  +errorMessageAmount: string,
  +isLoading: boolean,
|}

class DoubleInput extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
  }

  render() {
    const {
      onChange,
      valueFiat,
      valueAmount,
      errorMessageFiat,
      errorMessageAmount,
      isLoading,
    } = this.props
    return (
      <div className='double-input'>
        <div className='field'>
          <JInput
            onChange={onChange}
            value={valueAmount}
            name='ValueETH'
            errorMessage={errorMessageAmount}
            placeholder='Value ETH'
            type='text'
            color='gray'
          />
        </div>
        <div className='field'>
          <JInput
            value={valueFiat}
            name='ValueUSD'
            errorMessage={errorMessageFiat}
            placeholder='Value USD'
            type='text'
            color='gray'
            isDisabled
            isLoading={isLoading}
          />
        </div>
      </div>
    )
  }
}

export default DoubleInput
