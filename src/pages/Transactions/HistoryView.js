// @flow strict

import React, { PureComponent } from 'react'
import { type I18n as I18nType } from '@lingui/core'

import { HistoryList } from 'components'
import { Header } from 'components/base'

import styles from './history.m.scss'

export type Props = {|
  +items: TransactionWithPrimaryKeys[],
  +i18n: I18nType,
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

  handleListScroll = (e: Event) => {
    // $FlowFixMe
    this.setState({ isListScrolled: !!e.target.scrollTop })
  }

  handleAsideScroll = (e: Event) => {
    // $FlowFixMe
    this.setState({ isAsideScrolled: !!e.target.scrollTop })
  }

  render() {
    const {
      i18n,
      items,
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
            'History.title',
            null,
            { defaults: 'History' },
          )}
        />
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
