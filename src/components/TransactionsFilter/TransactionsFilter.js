// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
// import { type I18n as I18nType } from '@lingui/core'

import { SearchFilter } from 'components'
import { selectTransactions } from 'store/selectors/transactions'

import {
  setErrorFilter,
  setPendingFilter,
} from 'store/modules/transactions'

// import styles from './transactionsFilter.m.scss'

type Props = {|
  // +setErrorFilter: (boolean) => void,
  // +setPendingFilter: (boolean) => void,
  // +i18n: I18nType,
  +isErrorFiltered: boolean,
  +isPendingFiltered: boolean,
|}

class TransactionsFilter extends PureComponent<Props> {
  static defaultProps = {
    isPendingFiltered: false,
  }

  render() {
    const {
      // setErrorFilter,
      // setPendingFilter,
      // i18n,
      isErrorFiltered,
      isPendingFiltered,
    }: Props = this.props

    return (
      <SearchFilter activeCount={isErrorFiltered + isPendingFiltered}>
        <span>Test</span>
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
  setErrorFilter,
  setPendingFilter,
}

const TransactionsFilterEnhanced = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TransactionsFilter)

export { TransactionsFilterEnhanced as TransactionsFilter }
