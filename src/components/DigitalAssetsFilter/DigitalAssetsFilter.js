// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { PopupButton } from 'components'
import { JIcon, JText, JCheckbox } from 'components/base'

type Props = {
  +onClickName: ?Function,
  +onClickBalance: ?Function,
  +onChangeMyAssetsFirst: ?Function,
  +onChangeHideZeroBalance: ?Function,
  +sortName: 'down' | 'up',
  +sortBalance: 'asc' | 'desc',
  +sortButtonActive: 'name' | 'balance',
  +isMyAssetsFirst: boolean,
  +isHideZeroBalance: boolean,
}

class DigitalAssetsFilter extends PureComponent<Props> {
  static defaultProps = {
    sortName: 'down',
    sortBalance: 'asc',
    sortButtonActive: 'name',
    isMyAssetsFirst: false,
    isHideZeroBalance: false,
  }

  render() {
    const {
      onClickName,
      onClickBalance,
      onChangeMyAssetsFirst,
      onChangeHideZeroBalance,
      sortName,
      sortBalance,
      sortButtonActive,
      isMyAssetsFirst,
      isHideZeroBalance,
    } = this.props

    return (
      <PopupButton icon='filter'>
        <div className='assets-filter'>
          <div className='title'>
            <JText
              color='gray'
              size='normal'
              value='Filter'
              weight='bold'
              whiteSpace='wrap'
            />
          </div>
          <JCheckbox
            onChange={onChangeMyAssetsFirst}
            name='hide-zero-balance'
            label='Hide zero balance'
            isChecked={isMyAssetsFirst}
          />
          <JCheckbox
            onChange={onChangeHideZeroBalance}
            name='my-assets-first'
            label='My assets first'
            isChecked={isHideZeroBalance}
          />
          <div className='title'>
            <JText
              color='gray'
              size='normal'
              value='Sorting'
              weight='bold'
              whiteSpace='wrap'
            />
          </div>
          <div className='sorting'>
            <button
              onClick={onClickName}
              className={classNames('button', sortButtonActive === 'name' ? '-active' : '')}
            >
              <span className='icon'>
                <JIcon
                  size='medium'
                  color='blue'
                  name={`sort-alphabet-${sortName}`}
                />
              </span>
              Name
            </button>
            <button
              onClick={onClickBalance}
              className={classNames('button', sortButtonActive === 'balance' ? '-active' : '')}
            >
              <span className='icon'>
                <JIcon
                  size='medium'
                  color='blue'
                  name={`sort-${sortBalance}`}
                />
              </span>
              Balance
            </button>
          </div>
        </div>
      </PopupButton>
    )
  }
}

export default DigitalAssetsFilter
