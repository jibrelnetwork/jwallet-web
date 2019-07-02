// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { WalletActions } from 'components'
import { walletsPlugin } from 'store/plugins'
import { JFieldMessage } from 'components/base'
import { setActiveWallet } from 'store/modules/wallets'
import { selectWalletOrThrow } from 'store/selectors/wallets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'

import styles from './walletCard.m.scss'

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
  +isNewNameUniq: boolean,
  +isRenameActive: boolean,
|}

function sanitizeName(name: string) {
  return name.substring(0, 32).trim().replace(/\//g, '–')
}

class WalletCard extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      newName: props.data.name,
      isNewNameUniq: true,
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

  handleChangeName = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const newName: string = e.target.value
    const sanitizedName: string = sanitizeName(newName)

    try {
      if (sanitizedName !== this.props.data.name) {
        walletsPlugin.checkWalletUniqueness(sanitizedName, 'name')
      }
    } catch (error) {
      this.setState({
        newName,
        isNewNameUniq: false,
      })

      return
    }

    this.setState({
      newName,
      isNewNameUniq: true,
    })
  }

  handleActivateRename = (isRenameActive?: boolean = true) => {
    this.setState({ isRenameActive: !!isRenameActive }, () => {
      if (isRenameActive) {
        this.nameInputRef.current.focus()
      }
    })
  }

  handleRenameBlur = () => {
    this.handleActivateRename(false)

    const {
      id,
      name,
    } = this.props.data

    const newName: string = sanitizeName(this.state.newName)

    if (!newName || (name === newName)) {
      this.setState({ newName: name })

      return
    }

    walletsPlugin.updateWallet(id, {
      name: newName,
    })

    this.setState({ newName })
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
      isNewNameUniq,
      isRenameActive,
    }: StateProps = this.state

    const addressesCount: number = 5
    const isMultiAddress: boolean = !!xpub
    const addressName: ?string = 'Address Name'
    const isActive: boolean = (id === activeWalletId)
    const hasMessage: boolean = (!isNewNameUniq && isRenameActive)

    return (
      <div
        onClick={(id === activeWalletId) ? undefined : this.handleSetActive}
        className={classNames(
          '__wallet-card',
          styles.core,
          isActive && styles.active,
          hasMessage && styles.message,
        )}
      >
        <div className={styles.card}>
          <svg viewBox='0 0 62 104' className={styles.left}>
            <path
              d='M62 0v104H4c-2.2 0-4-1.8-4-4V71.7c0-1.8 1.3-3.4 3-4.2 5.9-2.7
              10-8.6 10-15.5S8.9 39.2 3 36.5c-1.7-.8-3-2.3-3-4.2V4c0-2.2 1.8-4 4-4'
            />
          </svg>
        </div>
        <div className={styles.body}>
          <div className={styles.data}>
            <h2 className={styles.wrapper}>
              <span
                className={classNames(
                  styles.name,
                  isRenameActive && styles.editable,
                )}
                onClick={this.handleActivateRename}
              >
                {isRenameActive
                  /**
                   * Next line is necessarry, because we must render newName inside div
                   * to show background. But ending spaces are ignored,
                   * so we have to replace them by something.
                   */
                  ? newName.replace(/ /g, '.')
                  : newName
                }
              </span>
              {isRenameActive && (
                <input
                  onBlur={this.handleRenameBlur}
                  onChange={this.handleChangeName}
                  ref={this.nameInputRef}
                  value={newName}
                  className={classNames(styles.input)}
                  type='text'
                />
              )}
            </h2>
            {isMultiAddress && (
              <p className={styles.address}>
                {t`${addressName}  •  ${addressesCount} Addresses`}
              </p>
            )}
            <p className={styles.balance}>
              {`${balance ? balance.value || 0 : 0} ETH`}
            </p>
          </div>
          <div className={styles.actions}>
            <WalletActions
              id={id}
              type={customType}
              isSimplified={isSimplified}
              onRename={this.handleActivateRename}
            />
          </div>
        </div>
        {hasMessage && (
          <JFieldMessage
            className={styles.warning}
            message={t`You already have a wallet with this name.`}
            theme='info'
          />
        )}
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
