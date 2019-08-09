// @flow strict

import React, { PureComponent } from 'react'
import { type I18n as I18nType } from '@lingui/core'

import { Header } from 'components/base'

import {
  HistoryList,
  SearchInput,
  TransactionsFilter,
} from 'components'

import styles from './assetItem.m.scss'

export type Props = {|
  +changeSearchInput: (value: string) => any,
  +items: TransactionWithNoteAndNames[],
  +i18n: I18nType,
  +searchQuery: string,
  +currentBlock: number,
  +isLoading: boolean,
  /* :: +assetId: string, */
|}

type StateProps = {|
  +isListScrolled: boolean,
  +isAsideScrolled: boolean,
|}

export class AssetsItemView extends PureComponent<Props, StateProps> {
  static defaultProps = {
    currentBlock: 0,
    isLoading: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isListScrolled: false,
      isAsideScrolled: false,
    }
  }

  handleListScroll = (e: SyntheticUIEvent<HTMLDivElement>) => {
    // $FlowFixMe
    this.setState({ isListScrolled: !!e.target.scrollTop })
  }

  handleAsideScroll = (e: SyntheticUIEvent<HTMLDivElement>) => {
    // $FlowFixMe
    this.setState({ isAsideScrolled: !!e.target.scrollTop })
  }

  handleChangeSearchInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.changeSearchInput(e.target.value)
  }

  render() {
    const {
      i18n,
      items,
      searchQuery,
      currentBlock,
      isLoading,
    }: Props = this.props

    const {
      isListScrolled,
      isAsideScrolled,
    }: StateProps = this.state

    return (
      <div className={styles.core}>
        <Header
          className={(isListScrolled || isAsideScrolled) ? styles.scrolled : ''}
          title={i18n._(
            'AssetsItem.title',
            null,
            { defaults: 'Transfers' },
          )}
        >
          <SearchInput
            onChange={this.handleChangeSearchInput}
            value={searchQuery}
          >
            <TransactionsFilter />
          </SearchInput>
        </Header>
        <HistoryList
          onListScroll={this.handleListScroll}
          onAsideScroll={this.handleAsideScroll}
          items={items}
          currentBlock={currentBlock}
          isLoading={isLoading}
        />
      </div>
    )
  }
}
