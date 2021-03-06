// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'

import { checkStuck } from 'utils/transactions'
import { gaSendException } from 'utils/analytics'

import styles from './historyItemDetails.m.scss'
import { Burn } from './components/Burn/Burn'
import { Mint } from './components/Mint/Mint'
// import { Stuck } from './components/Stuck/Stuck'
import { Cancel } from './components/Cancel/Cancel'
import { Failed } from './components/Failed/Failed'
import { Pending } from './components/Pending/Pending'
import { Incoming } from './components/Incoming/Incoming'
import { Outgoing } from './components/Outgoing/Outgoing'
import { ContractCall } from './components/ContractCall/ContractCall'
import { ContractCreation } from './components/ContractCreation/ContractCreation'

import { type OwnProps } from './HistoryItemDetails'

type Props = {|
  ...OwnProps,
  +editNote: (id: TransactionId, note: string) => any,
  +fee: string,
  +to: ?Address,
  +hash: string,
  +note: ?string,
  +from: ?Address,
  +amount: ?string,
  +toName: ?string,
  +fromName: ?string,
  +amountStr: string,
  +assetName: ?string,
  +assetSymbol: ?string,
  +assetAddress: AssetAddress,
  +contractAddress: ?OwnerAddress,
  +eventType: TransactionEventType,
  +blockExplorerUISubdomain: BlockExplorerUISubdomain,
  +timestamp: number,
  +assetDecimals: number,
  +isSent: boolean,
  +isCancel: boolean,
  +hasInput: boolean,
  +isFailed: boolean,
  +isPending: boolean,
|}

export type CardProps = {|
  ...Props,
  onEditFinish: (note: string) => any,
|}

type StateProps = {|
  +note: ?string,
  +timeoutId: ?TimeoutID,
|}

/* eslint-disable fp/no-let */
let RENDER_COUNTER: number = 0
let RENDER_COUNTER_THRESHOLD_NOTIFIED: boolean = false
/* eslint-enable fp/no-let */
const RENDER_COUNTER_TIMEOUT: number = 1000
const RENDER_COUNTER_THRESHOLD: number = 60
const EDIT_NOTE_DELAY: number = 500

function checkRenderCounter() {
  if (RENDER_COUNTER_THRESHOLD_NOTIFIED) {
    return
  }

  setTimeout(() => {
    if (RENDER_COUNTER > RENDER_COUNTER_THRESHOLD) {
      const errorMessage: string = `Transaction item details rendered to much: ${RENDER_COUNTER}`

      console.error(errorMessage)

      gaSendException({
        exDescription: errorMessage,
        exFatal: false,
      })

      // eslint-disable-next-line fp/no-mutation
      RENDER_COUNTER_THRESHOLD_NOTIFIED = true
    }

    // eslint-disable-next-line fp/no-mutation
    RENDER_COUNTER = 0

    checkRenderCounter()
  }, RENDER_COUNTER_TIMEOUT)
}

export class HistoryItemDetailsView extends Component<Props, StateProps> {
  cardRef = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      note: this.props.note,
      timeoutId: null,
    }

    if (props.isPage) {
      checkRenderCounter()
    }
  }

  shouldComponentUpdate(
    nextProps: Props,
    nextState: StateProps,
  ) {
    const {
      id,
      note,
      isPending,
    }: Props = this.props

    const isIdChanged: boolean = id !== nextProps.id
    const isMined: boolean = isPending && !nextProps.isPending
    const isNotePropsChanged: boolean = note !== nextProps.note
    const isNoteStateChanged: boolean = this.state.note !== nextState.note

    return isIdChanged || isMined || isNotePropsChanged || isNoteStateChanged
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      if (this.state.note !== this.props.note) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ note: this.props.note })
      }

      if (this.cardRef && this.cardRef.current) {
        this.cardRef.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }
    }
  }

  handleEditNote = (note: string) => {
    this.setState({ note })
    const { timeoutId }: StateProps = this.state

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId: TimeoutID = setTimeout(() => {
      this.props.editNote(this.props.id, note)
      this.setState({ timeoutId: null })
    }, EDIT_NOTE_DELAY)

    this.setState({ timeoutId: newTimeoutId })
  }

  getCardComponent = () => {
    const {
      to,
      from,
      eventType,
      assetSymbol,
      contractAddress,
      timestamp,
      isSent,
      hasInput,
      isCancel,
      isFailed,
      isPending,
    }: Props = this.props

    const isUnknownAsset: boolean = !assetSymbol
    const isMintable: boolean = (eventType === 2)
    const isEventBurn: boolean = (isMintable && !to)
    const isEventMint: boolean = (isMintable && !from)

    if (isFailed) {
      return Failed
    }

    if (isPending && checkStuck(timestamp)) {
      // return Stuck
    }

    if (isPending) {
      return Pending
    }

    if (isEventBurn) {
      return Burn
    }

    if (isEventMint) {
      return Mint
    }

    if (hasInput || isUnknownAsset) {
      return ContractCall
    }

    if (contractAddress) {
      return ContractCreation
    }

    if (isCancel) {
      return Cancel
    }

    return isSent ? Outgoing : Incoming
  }

  render() {
    const CardComponent = this.getCardComponent()

    // eslint-disable-next-line no-plusplus, fp/no-mutation
    RENDER_COUNTER++

    return (
      <div
        ref={this.cardRef}
        className={classNames(styles.wrap, this.props.isPage && styles.page)}
      >
        <CardComponent
          {...this.props}
          onEditFinish={this.handleEditNote}
          note={this.state.note}
        />
      </div>
    )
  }
}
