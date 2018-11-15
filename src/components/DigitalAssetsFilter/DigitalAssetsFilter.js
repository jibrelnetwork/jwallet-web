// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { PopupButton } from 'components'
import { JIcon, JText, JCheckbox } from 'components/base'

type Props = {|
  +sortByNameClick: ((void) => void),
  +sortByBalanceClick: ((void) => void),
  +setHideZeroBalance: ((boolean) => void),
  +sortByNameDirection: SortDirection,
  +sortByBalanceDirection: SortDirection,
  +sortBy: 'name' | 'balance',
  +isHideZeroBalance: boolean,
  +filterCount: number,
|}

class DigitalAssetsFilter extends PureComponent<Props> {
  static defaultProps = {
    sortByNameDirection: 'asc',
    sortByBalanceDirection: 'asc',
    sortBy: 'name',
    isHideZeroBalance: false,
    filterCount: 0,
  }

  render() {
    const {
      sortByNameClick,
      sortByBalanceClick,
      setHideZeroBalance,
      sortByNameDirection,
      sortByBalanceDirection,
      sortBy,
      isHideZeroBalance,
      filterCount,
    } = this.props

    return (
      <PopupButton icon={(filterCount === 0) ? 'filter' : 'filter-selected'} counter={filterCount}>
        <div className='digital-assets-filter'>
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
            onChange={setHideZeroBalance}
            name='hide-zero-balance'
            label='Hide zero balance'
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
              onClick={sortByNameClick}
              className={classNames('button', sortBy === 'name' ? '-active' : '')}
            >
              <span className='icon'>
                <JIcon
                  size='medium'
                  color='blue'
                  name={`sort-alphabet-${sortByNameDirection}`}
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
              onClick={sortByBalanceClick}
              className={classNames('button', sortBy === 'balance' ? '-active' : '')}
            >
              <span className='icon'>
                <JIcon
                  size='medium'
                  color='blue'
                  name={`sort-${sortByBalanceDirection}`}
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
