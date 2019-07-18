// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { HistoryList } from 'components'
import { type HistoryItem } from 'store/utils/HistoryItem/types'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { transactionsIndex } from 'store/utils/HistoryItem/HistoryItem'

import {
  Header,
  SearchInput,
  SearchFilter,
} from 'components/base'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import styles from './history.m.scss'

type Props = {|
  +i18n: I18nType,
  +items: HistoryItem[],
  +isLoading: boolean,
|}

type StateProps = {|
  +isListScrolled: boolean,
  +isAsideScrolled: boolean,
|}

class HistoryView extends PureComponent<Props, StateProps> {
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
        >
          <SearchInput onChange={() => {}}>
            <SearchFilter
              activeCount={-1}
            >
              <span>Hi! I am a filter</span>
            </SearchFilter>
          </SearchInput>
        </Header>
        <HistoryList
          onListScroll={this.handleListScroll}
          onAsideScroll={this.handleAsideScroll}
          items={items}
          isLoading={isLoading}
        />
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  const index = transactionsIndex(state)
  // Sorting transactions
  // eslint-disable-next-line fp/no-mutating-methods
  const items = Object.keys(index).map(id => index[id]).reverse()
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const processingBlock: ?BlockData = selectProcessingBlock(state, networkId)
  const isCurrentBlockEmpty: boolean = !currentBlock
  const isLoading: boolean = !!(processingBlock && processingBlock.isTransactionsLoading)

  return {
    items,
    isLoading: isCurrentBlockEmpty || isLoading,
  }
}

export const History = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
  ),
)(HistoryView)
