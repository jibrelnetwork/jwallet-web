// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { i18n } from 'i18n/lingui'
import { connect } from 'react-redux'

import { WalletActions } from 'components'
import { sanitizeName } from 'utils/wallets'
import { walletsPlugin } from 'store/plugins'
import { getAddressName } from 'utils/address'
import { JFieldMessage } from 'components/base'
import { formatAssetBalance } from 'utils/formatters'
import { setActiveWallet } from 'store/modules/wallets'

import {
  selectAddressNames,
  selectWalletOrThrow,
} from 'store/selectors/wallets'

import styles from './walletCard.m.scss'
import { AddressChooser } from './components/AddressChooser'

type OwnProps = {|
  +onActiveAddressChooser: (id: ?WalletId) => any,
  +id: WalletId,
  +activeAddressChooserId: ?WalletId,
  +isActive: boolean,
|}

type Props = {|
  ...OwnProps,
  +setActiveWallet: (WalletId) => void,
  +name: string,
  +addressIndex: ?number,
  +addressName: ?string,
  +type: WalletCustomType,
  +derivationIndex: number,
  +isSimplified: boolean,
  +isMultiAddress: boolean,
|}

type StateProps = {|
  +newName: string,
  +ethBalance: ?BigNumber,
  +isNewNameUniq: boolean,
  +isRenameActive: boolean,
|}

class WalletCard extends Component<Props, StateProps> {
  static defaultProps = {
    isActive: false,
  }

  nameInputRef = React.createRef<HTMLInputElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      ethBalance: null,
      newName: props.name,
      isNewNameUniq: true,
      isRenameActive: false,
    }
  }

  async componentDidMount() {
    const ethBalance: BigNumber = await walletsPlugin.requestETHBalance(this.props.id)

    this.setState({
      ethBalance: formatAssetBalance(
        'Ethereum',
        ethBalance,
        18,
        'ETH',
      ),
    })
  }

  handleSetActive = () => {
    const {
      id,
      isActive,
      isMultiAddress,
      onActiveAddressChooser,
      setActiveWallet: setActive,
    }: Props = this.props

    if (isMultiAddress) {
      onActiveAddressChooser(id)
    } else if (!isActive) {
      setActive(id)
    }
  }

  handleChangeName = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const newName: string = e.target.value
    const sanitizedName: string = sanitizeName(newName)

    try {
      if (sanitizedName !== this.props.name) {
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
      if (isRenameActive && this.nameInputRef && this.nameInputRef.current) {
        this.nameInputRef.current.focus()
      }
    })
  }

  handleRenameBlur = () => {
    this.handleActivateRename(false)

    const {
      id,
      name,
    } = this.props

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

  handleCloseAddressChooser = (e: Event) => {
    this.props.onActiveAddressChooser(null)
    e.stopPropagation()
  }

  render() {
    const {
      id,
      type,
      addressName,
      addressIndex,
      derivationIndex,
      activeAddressChooserId,
      isActive,
      isSimplified,
      isMultiAddress,
    }: Props = this.props

    const {
      newName,
      ethBalance,
      isNewNameUniq,
      isRenameActive,
    }: StateProps = this.state

    const addressesCount: number = (derivationIndex + 1)
    const nameWithDivider: string = addressName ? `${addressName}  •  ` : ''
    const hasMessage: boolean = (!isNewNameUniq && isRenameActive)
    const isAnyAddressChooserActive: boolean = !!activeAddressChooserId

    return (
      <div
        onClick={this.handleSetActive}
        className={classNames(
          '__wallet-card',
          styles.core,
          isActive && styles.active,
          hasMessage && styles.message,
          isAnyAddressChooserActive && styles.chooser,
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
                {i18n._(
                  'common.WalletCard.currentAddress',
                  {
                    nameWithDivider,
                    addressesCount,
                  },
                  { defaults: '{nameWithDivider}{addressesCount} Addresses' },
                )}
              </p>
            )}
            {ethBalance && (
              <p className={styles.balance}>
                {ethBalance}
              </p>
            )}
          </div>
          <div className={styles.actions}>
            <WalletActions
              id={id}
              type={type}
              isSimplified={isSimplified}
              onRename={this.handleActivateRename}
            />
          </div>
        </div>
        {isMultiAddress && (
          <AddressChooser
            onClose={this.handleCloseAddressChooser}
            walletId={id}
            activeIndex={addressIndex || 0}
            derivationIndex={derivationIndex}
            isOpen={(id === activeAddressChooserId)}
          />
        )}
        {hasMessage && (
          <JFieldMessage
            className={styles.warning}
            message={i18n._(
              'common.WalletCard.duplicateName',
              null,
              { defaults: 'You already have a wallet with this name.' },
            )}
            theme='info'
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state: AppState, {
  id,
}: OwnProps) {
  const wallet: Wallet = selectWalletOrThrow(state, id)
  const address: Address = walletsPlugin.getAddress(id)
  const addressNames: AddressNames = selectAddressNames(state)

  const {
    name,
    xpub,
    customType,
    addressIndex,
    derivationIndex,
    isSimplified,
  }: Wallet = wallet

  const addressName: ?string = !isSimplified
    ? getAddressName(addressNames[address], addressIndex)
    : null

  return {
    name,
    addressName,
    addressIndex,
    derivationIndex,
    type: customType,
    isSimplified,
    isMultiAddress: !!xpub && !isSimplified,
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
