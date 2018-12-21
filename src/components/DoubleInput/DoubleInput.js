// @flow

import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'
import { JInput, JText, JLoader, JIcon } from 'components/base'

/*
type Props = {|
  +onChangeLeft: (value: string) => void,
  +onChangeRight: ?((value: string) => void),
  +onClose: ?(() => void),
  valueLeft: string,
  valueRight: string,
  placeholderLeft: string,
  placeholderRight: string,
  errorMessage: string,
  isLoading: boolean,
|}
*/

type Props = {|
  +onChange: (value: string) => void,
  +onClose: ?(() => void),
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
    onClose: null,
  }

  render() {
    const {
      onChange,
      onClose,
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
        {onClose &&
        <div className='close' onClick={onClose}>
          <JIcon name='close' size='small' color='gray' />
        </div>}
      </div>
    )
  }
}

export default DoubleInput
