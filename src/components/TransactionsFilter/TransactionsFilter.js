// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { SearchFilter } from 'components'
import { JCheckbox } from 'components/base'
import { selectTransactions } from 'store/selectors/transactions'

import * as transactions from 'store/modules/transactions'

type Props = {|
  +setErrorFilter: (boolean) => void,
  +setPendingFilter: (boolean) => void,
  +i18n: I18nType,
  +isErrorFiltered: boolean,
  +isPendingFiltered: boolean,
|}

class TransactionsFilter extends PureComponent<Props> {
  static defaultProps = {
    isPendingFiltered: false,
  }

  render() {
    const {
      setErrorFilter,
      setPendingFilter,
      i18n,
      isErrorFiltered,
      isPendingFiltered,
    }: Props = this.props

    return (
      <SearchFilter activeCount={isErrorFiltered + isPendingFiltered}>
        <JCheckbox
          onChange={setPendingFilter}
          name='pending-filter'
          isChecked={isPendingFiltered}
        >
          {i18n._(
            'TransactionsFilter.pending',
            null,
            { defaults: 'Pending transfer' },
          )}
        </JCheckbox>
        <JCheckbox
          onChange={setErrorFilter}
          name='error-filter'
          isChecked={isErrorFiltered}
        >
          {i18n._(
            'TransactionsFilter.error',
            null,
            { defaults: 'Error transfer' },
          )}
        </JCheckbox>
      </SearchFilter>
    )
  }
}

function mapStateToProps(state: AppState) {
  const {
    isErrorFiltered,
    // isStuckFiltered,
    isPendingFiltered,
  }: TransactionsState = selectTransactions(state)

  return {
    isErrorFiltered,
    isPendingFiltered,
  }
}

const mapDispatchToProps = {
  setErrorFilter: transactions.setErrorFilter,
  setPendingFilter: transactions.setPendingFilter,
}

const TransactionsFilterEnhanced = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TransactionsFilter)

export { TransactionsFilterEnhanced as TransactionsFilter }
