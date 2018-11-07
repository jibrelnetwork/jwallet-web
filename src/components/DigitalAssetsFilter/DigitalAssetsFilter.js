// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { PopupButton } from 'components'
import { JIcon, JText, JCheckbox } from 'components/base'
import { handle } from 'utils/eventHandlers'

type Props = {
  +onClickSortByName: ((void) => void),
  +onClickSortByBalance: ((void) => void),
  +onChangeMyAssetsFirst: ((boolean) => void),
  +onChangeHideZeroBalance: ((boolean) => void),
  +sortByNameOrder: SortOrder,
  +sortByBalanceOrder: SortOrder,
  +sortBy: 'name' | 'balance',
  +isMyAssetsFirst: boolean,
  +isHideZeroBalance: boolean,
}

class DigitalAssetsFilter extends PureComponent<Props> {
  static defaultProps = {
    sortByNameOrder: 'asc',
    sortByBalanceOrder: 'asc',
    sortBy: 'name',
    isMyAssetsFirst: false,
    isHideZeroBalance: false,
  }

  render() {
    const {
      onClickSortByName,
      onClickSortByBalance,
      onChangeMyAssetsFirst,
      onChangeHideZeroBalance,
      sortByNameOrder,
      sortByBalanceOrder,
      sortBy,
      isMyAssetsFirst,
      isHideZeroBalance,
    } = this.props

    const sortByNameIcon = (sortByNameOrder === 'asc') ? 'down' : 'up'

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
              onClick={handle(onClickSortByName)()}
              className={classNames('button', sortBy === 'name' ? '-active' : '')}
            >
              <span className='icon'>
                <JIcon
                  size='medium'
                  color='blue'
                  name={`sort-alphabet-${sortByNameIcon}`}
                />
              </span>
              Name
            </button>
            <button
              onClick={handle(onClickSortByBalance)()}
              className={classNames('button', sortBy === 'balance' ? '-active' : '')}
            >
              <span className='icon'>
                <JIcon
                  size='medium'
                  color='blue'
                  name={`sort-${sortByBalanceOrder}`}
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
