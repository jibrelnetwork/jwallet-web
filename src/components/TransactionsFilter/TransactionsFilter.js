// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import PopupButton from 'components/PopupButton'
import { JText, JCheckbox } from 'components/base'

type Props = {|
  +setOnlyPending: (boolean) => void,
  +filterCount: number,
  +isOnlyPending: boolean,
|}

class TransactionsFilter extends PureComponent<Props> {
  static defaultProps = {
    isOnlyPending: false,
  }

  render() {
    const {
      setOnlyPending,
      filterCount,
      isOnlyPending,
    } = this.props

    return (
      <PopupButton icon={filterCount ? 'filter-selected' : 'filter'} counter={filterCount}>
        <div className='transactions-filter'>
          <div className='title'>
            <JText
              color='gray'
              size='normal'
              weight='bold'
              value={t`Filter`}
              whiteSpace='wrap'
            />
          </div>
          <JCheckbox
            onChange={setOnlyPending}
            name='only-pending'
            label={t`Only pending`}
            isChecked={isOnlyPending}
          />
        </div>
      </PopupButton>
    )
  }
}

export default TransactionsFilter
