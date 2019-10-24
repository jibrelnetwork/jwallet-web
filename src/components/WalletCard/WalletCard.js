// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { sanitizeName } from 'utils/wallets'
import { gaSendEvent } from 'utils/analytics'
import { walletsPlugin } from 'store/plugins'
import { getAddressName } from 'utils/address'
import { JFieldMessage } from 'components/base'
import { formatFiatBalance } from 'utils/formatters'
import { setActiveWallet } from 'store/modules/wallets'
import { selectFiatCurrency } from 'store/selectors/user'

import {
  EditableField,
  WalletActions,
} from 'components'

import {
  selectWallet,
  selectAddressNames,
} from 'store/selectors/wallets'

import styles from './walletCard.m.scss'
import { AddressChooser } from './components/AddressChooser'

type OwnProps = {|
  +onActiveAddressChooser: (id: ?WalletId) => any,
  +i18n: I18n,
  +id: WalletId,
  +activeAddressChooserId: ?WalletId,
  +isActive: boolean,
|}

type Props = {|
  ...OwnProps,
  +setActiveWallet: (WalletId) => void,
  +i18n: I18n,
  +name: string,
  +addressIndex: ?number,
  +addressName: string,
  +type: WalletCustomType,
  +fiatCurrency: FiatCurrencyCode,
  +derivationIndex: number,
  +isSimplified: boolean,
  +isMultiAddress: boolean,
|}

type StateProps = {|
  +balance: ?BigNumber,
  +isNewNameUniq: boolean,
  +isRenameActive: boolean,
|}

class WalletCard extends Component<Props, StateProps> {
  static defaultProps = {
    isActive: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      balance: null,
      isNewNameUniq: true,
      isRenameActive: false,
    }
  }

  async componentDidMount() {
    const {
      id,
      fiatCurrency,
    }: Props = this.props

    const balance: BigNumber = await walletsPlugin.requestFiatBalance(id)

    this.setState({
      balance: formatFiatBalance(
        balance,
        fiatCurrency,
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

  handleActivateRename = () => {
    this.setState({ isRenameActive: true })

    gaSendEvent(
      'WalletManager',
      'RenameStarted',
    )
  }

  handleRenameFocus = () => {
    this.setState({ isRenameActive: false })
  }

  handleChange = (newName: string) => {
    const sanitizedName: string = sanitizeName(newName)

    try {
      if (sanitizedName !== this.props.name) {
        walletsPlugin.checkWalletUniqueness(sanitizedName, 'name')
      }
    } catch (error) {
      this.setState({ isNewNameUniq: false })

      return
    }

    this.setState({ isNewNameUniq: true })
  }

  handleChangeFinish = (newName: string) => {
    this.setState({
      isNewNameUniq: true,
      isRenameActive: false,
    })

    walletsPlugin.updateWallet(this.props.id, {
      name: newName,
    })

    gaSendEvent(
      'WalletManager',
      'RenameFinished',
    )
  }

  handleCloseAddressChooser = (e: Event) => {
    this.props.onActiveAddressChooser(null)
    e.stopPropagation()
  }

  render() {
    const {
      id,
      name,
      type,
      i18n,
      addressName,
      addressIndex,
      derivationIndex,
      activeAddressChooserId,
      isActive,
      isSimplified,
      isMultiAddress,
    }: Props = this.props

    const {
      balance,
      isNewNameUniq,
      isRenameActive,
    }: StateProps = this.state

    const hasMessage: boolean = !isNewNameUniq
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
            <EditableField
              sanitize={sanitizeName}
              onChange={this.handleChange}
              onFocus={this.handleRenameFocus}
              onChangeFinish={this.handleChangeFinish}
              value={name}
              className={styles.name}
              theme='blue'
              maxLen={32}
              isDefaultFocused={isRenameActive}
            />
            {isMultiAddress && (
              <p className={styles.address}>
                {i18n._(
                  'common.WalletCard.currentAddress', {
                    name: addressName,
                    count: derivationIndex + 1,
                  }, {
                    defaults: '{name}{count, plural, one {1 Address} other {# Addresses}}',
                  },
                )}
              </p>
            )}
            {balance && (
              <p className={styles.balance}>
                {balance}
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
  isActive,
}: OwnProps) {
  const wallet: Wallet = selectWallet(state, id)
  const address: Address = walletsPlugin.getAddress(id)
  const addressNames: AddressNames = selectAddressNames(state)
  const fiatCurrency: FiatCurrencyCode = selectFiatCurrency(state)

  const {
    name,
    xpub,
    customType,
    addressIndex,
    derivationIndex,
    isSimplified,
  }: Wallet = wallet

  const isMultiAddress: boolean = !!xpub && !isSimplified

  const addressName: string = isMultiAddress && isActive
    ? `${getAddressName(addressNames[address], addressIndex || 0)} • `
    : ''

  return {
    name,
    addressName,
    fiatCurrency,
    addressIndex,
    derivationIndex,
    type: customType,
    isSimplified,
    isMultiAddress,
  }
}

const mapDispatchToProps = {
  setActiveWallet,
}

const WalletCardEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WalletCard)

export { WalletCardEnhanced as WalletCard }
