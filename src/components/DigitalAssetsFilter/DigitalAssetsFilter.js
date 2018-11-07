// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { PopupButton } from 'components'
import { JIcon, JText, JCheckbox } from 'components/base'
import { handle } from 'utils/eventHandlers'

type Props = {
  +onClickSortByName: ?(() => void),
  +onClickSortByBalance: ?(() => void),
  +onChangeHideZeroBalance: ?((boolean) => void),
  +sortByNameOrder: SortOrder,
  +sortByBalanceOrder: SortOrder,
  +sortBy: 'name' | 'balance',
  +isHideZeroBalance: boolean,
}

class DigitalAssetsFilter extends PureComponent<Props> {
  static defaultProps = {
    sortByNameOrder: 'asc',
    sortByBalanceOrder: 'asc',
    sortBy: 'name',
    isHideZeroBalance: false,
  }

  render() {
    const {
      onClickSortByName,
      onClickSortByBalance,
      onChangeHideZeroBalance,
      sortByNameOrder,
      sortByBalanceOrder,
      sortBy,
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
                  name={`sort-alphabet-${sortByNameOrder}`}
                />
              </span>
              <JText
                color='blue'
                size='normal'
                value='Name'
                weight='bold'
                whiteSpace='wrap'
              />
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
              <JText
                color='blue'
                size='normal'
                value='Balance'
                weight='bold'
                whiteSpace='wrap'
              />
            </button>
          </div>
        </div>
      </PopupButton>
    )
  }
}

export default DigitalAssetsFilter
