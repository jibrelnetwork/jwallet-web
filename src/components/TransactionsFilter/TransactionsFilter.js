// @flow

import React, { PureComponent } from 'react'

import { PopupButton } from 'components'
import { JText, JCheckbox } from 'components/base'

type Props = {|
  +setOnlyPending: ((boolean) => void),
  +isOnlyPending: boolean,
  +filterCount: number,
|}

class TransactionAssetsFilter extends PureComponent<Props> {
  static defaultProps = {
    isOnlyPending: false,
    filterCount: 0,
  }

  render() {
    const {
      setOnlyPending,
      isOnlyPending,
      filterCount,
    } = this.props

    return (
      <PopupButton icon={(filterCount === 0) ? 'filter' : 'filter-selected'} counter={filterCount}>
        <div className='transaction-assets-filter'>
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
            onChange={setOnlyPending}
            name='only-pending'
            label='Only pending'
            isChecked={isOnlyPending}
          />
        </div>
      </PopupButton>
    )
  }
}

export default TransactionAssetsFilter
