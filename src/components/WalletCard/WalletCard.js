// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { setActiveWallet } from 'store/modules/wallets'
import { selectWalletOrThrow } from 'store/selectors/wallets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'

import walletCard from './walletCard.m.scss'
import { WalletCardActions } from './WalletCardActions/WalletCardActions'

type Props = {|
  +setActiveWallet: (WalletId) => void,
  +data: Wallet,
  +balance: ?Balance,
  +activeWalletId: WalletId,
  /* ::
  +id: WalletId,
  */
|}

type StateProps = {|
  +newName: string,
  +isRenameActive: boolean,
|}

class WalletCard extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      newName: props.data.name,
      isRenameActive: false,
    }

    this.nameInputRef = React.createRef()
  }

  nameInputRef: Object

  handleSetActive = () => {
    const {
      data,
      setActiveWallet: setActive,
    }: Props = this.props

    setActive(data.id)
  }

  handleChangeName = (event: SyntheticInputEvent<*>) => {
    this.setState({ newName: event.target.value })
  }

  handleActivateRename = (isRenameActive?: boolean = true) => {
    this.setState({ isRenameActive }, () => {
      if (isRenameActive) {
        this.nameInputRef.current.focus()
      }
    })
  }

  handleRenameBlur = () => {
    this.handleActivateRename(false)

    const { data }: Props = this.props
    const { newName }: StateProps = this.state

    if (data.name === newName) {
      return
    }

    walletsPlugin.updateWallet(data.id, {
      name: newName,
    })
  }

  render() {
    const {
      data,
      balance,
      activeWalletId,
    }: Props = this.props

    const {
      id,
      xpub,
      customType,
      isSimplified,
    }: Wallet = data

    const {
      newName,
      isRenameActive,
    }: StateProps = this.state

    const addressesCount: number = 5
    const isMultiAddress: boolean = !!xpub
    const addressName: ?string = 'Address Name'
    const isActive: boolean = (id === activeWalletId)

    return (
      <div
        onClick={(id === activeWalletId) ? undefined : this.handleSetActive}
        className={classNames(
          walletCard.core,
          isActive && walletCard.active,
          '__wallet-card',
        )}
      >
        <div className={walletCard.card}>
          <svg viewBox='0 0 62 104' className={walletCard['left-part']}>
            <path
              d='M62 0v104H4c-2.2 0-4-1.8-4-4V71.7c0-1.8 1.3-3.4 3-4.2 5.9-2.7
              10-8.6 10-15.5S8.9 39.2 3 36.5c-1.7-.8-3-2.3-3-4.2V4c0-2.2 1.8-4 4-4'
            />
          </svg>
        </div>
        <div className={walletCard.body}>
          <div className={walletCard.data}>
            <h2 className={walletCard['name-box']}>
              <span
                className={classNames(
                  walletCard.name,
                  isRenameActive && walletCard.editable,
                )}
                onClick={this.handleActivateRename}
              >
                {newName}
              </span>
              {isRenameActive && (
                <input
                  onBlur={this.handleRenameBlur}
                  onChange={this.handleChangeName}
                  ref={this.nameInputRef}
                  value={newName}
                  className={classNames(walletCard.input)}
                  type='text'
                />
              )}
            </h2>
            {isMultiAddress && (
              <p className={walletCard.address}>
                {t`${addressName}  •  ${addressesCount} Addresses`}
              </p>
            )}
            <p className={walletCard.balance}>
              {`${balance ? balance.value || 0 : 0} ETH`}
            </p>
          </div>
          <div className={walletCard.actions}>
            <WalletCardActions
              id={id}
              type={customType}
              isSimplified={isSimplified}
              onRename={this.handleActivateRename}
            />
          </div>
        </div>
      </div>
    )
  }
}

type OwnProps = {|
  +id: WalletId,
  +activeWalletId: WalletId,
|}

function mapStateToProps(state: AppState, {
  id,
  activeWalletId,
}: OwnProps) {
  return {
    activeWalletId,
    data: selectWalletOrThrow(state, id),
    balance: selectBalanceByAssetAddressToCurrentBlock(state, 'Ethereum'),
  }
}

const mapDispatchToProps = {
  setActiveWallet,
}

const WalletCardEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WalletCard)

export { WalletCardEnhanced as WalletCard }
