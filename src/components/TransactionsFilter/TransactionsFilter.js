// @flow

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'

import PopupButton from 'components/PopupButton'

import {
  JText,
  JCheckbox,
} from 'components/base'

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
              value={i18n._(
                'TransactionsFilter.filter',
                null,
                { defaults: 'Filter' },
              )}
              whiteSpace='wrap'
            />
          </div>
          <JCheckbox
            onChange={setOnlyPending}
            name='only-pending'
            label={i18n._(
              'TransactionsFilter.pendingOnly',
              null,
              { defaults: 'Only pending' },
            )}
            isChecked={isOnlyPending}
          />
        </div>
      </PopupButton>
    )
  }
}

export default TransactionsFilter
