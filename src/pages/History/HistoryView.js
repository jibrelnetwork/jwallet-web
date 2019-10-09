// @flow strict

import React, { PureComponent } from 'react'
import { type I18n } from '@lingui/core'

import {
  HistoryList,
  SearchInput,
  TitleHeader,
  TransactionsFilter,
} from 'components'

import styles from './history.m.scss'

export type Props = {|
  +changeSearchInput: (value: string) => any,
  +items: TransactionWithNoteAndNames[],
  +i18n: I18n,
  +searchQuery: string,
  +currentBlock: number,
  +isLoading: boolean,
|}

type StateProps = {|
  +isListScrolled: boolean,
  +isAsideScrolled: boolean,
|}

export class HistoryView extends PureComponent<Props, StateProps> {
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
        <TitleHeader
          title={i18n._(
            'History.title',
            null,
            { defaults: 'History' },
          )}
          isScrolled={isListScrolled || isAsideScrolled}
          withMenu
        >
          <SearchInput
            onChange={this.handleChangeSearchInput}
            value={searchQuery}
          >
            <TransactionsFilter />
          </SearchInput>
        </TitleHeader>
        <HistoryList
          onListScroll={this.handleListScroll}
          onAsideScroll={this.handleAsideScroll}
          items={items}
          currentBlock={currentBlock}
          isLoading={isLoading}
          withDetailsPanel
        />
      </div>
    )
  }
}
