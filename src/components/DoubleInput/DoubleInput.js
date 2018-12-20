// @flow

import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'
import { JInput, JText, JLoader } from 'components/base'

type Props = {|
  +onChange: () => void,
  +valueFiat: string,
  +valueAmount: string,
  +errorMessageAmount: string,
  +isLoading: boolean,
  +isActive: boolean,
|}

class DoubleInput extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
    isActive: false,
  }

  render() {
    const {
      onChange,
      valueFiat,
      valueAmount,
      errorMessageAmount,
      isLoading,
      isActive,
    } = this.props
    return (
      <div className={classNames('double-input', isActive && '-active')}>
        <div className='field'>
          <JInput
            onChange={onChange}
            value={valueAmount}
            name='ValueETH'
            errorMessage={errorMessageAmount}
            placeholder='Value ETH'
            type='text'
            color='gray'
            isVirtualHalfSize
          />
        </div>
        <div className='fiat'>
          <div className='box'>
            <div className='label'>
              <JText
                value='Value USD'
                whiteSpace='wrap'
                color='gray'
                size={isActive ? 'small' : 'semilarge'}
              />
            </div>
            {isActive && (
              <Fragment>
                {isLoading ? (
                  <div className='value'>
                    <JText
                      value={valueFiat}
                      whiteSpace='wrap'
                      color='gray'
                      size='semilarge'
                      weight='bold'
                    />
                  </div>
                ) : (
                  <div className='loader'>
                    <JLoader color='blue' />
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DoubleInput
