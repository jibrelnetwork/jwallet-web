// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { sanitizeName } from 'utils/wallets'
import { walletsPlugin } from 'store/plugins'
import { getAddressName } from 'utils/address'
import { formatFiatBalance } from 'utils/formatters'
import { selectFiatCurrency } from 'store/selectors/user'
import { selectAddressNames } from 'store/selectors/wallets'
import { setAddressName } from 'store/modules/walletsAddresses'

import {
  EditableField,
  CopyIconButton,
} from 'components'

import styles from './walletAddressCard.m.scss'

type OwnProps = {|
  +address: Address,
  +index: number,
|}

type Props = {|
  +setAddressName: (address: Address, name: string) => any,
  +address: Address,
  +addressName: string,
  +fiatCurrency: FiatCurrencyCode,
  +i18n: I18nType,
  /* ::
  +index: number,
  */
|}

type StateProps = {|
  +balance: ?BigNumber,
|}

class WalletAddressCard extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      balance: null,
    }
  }

  async componentDidMount() {
    const {
      address,
      fiatCurrency,
    }: Props = this.props

    const balance: BigNumber = await walletsPlugin.requestFiatBalanceByAddress(address)

    this.setState({
      balance: formatFiatBalance(
        balance,
        fiatCurrency,
      ),
    })
  }

  handleChangeFinish = (newName: string) => {
    this.props.setAddressName(this.props.address, newName)
  }

  render() {
    const {
      address,
      addressName,
      i18n,
    }: Props = this.props

    const { balance }: StateProps = this.state

    return (
      <div className={styles.core}>
        <div className={styles.main}>
          <EditableField
            sanitize={sanitizeName}
            onChangeFinish={this.handleChangeFinish}
            value={addressName}
            label={i18n._(
              'WalletsItemAddresses.WalletAddressCard.title',
              null,
              { defaults: 'Name' },
            )}
            theme='white'
            maxLen={32}
          />
          {balance && (
            <div className={styles.balance}>
              {balance}
            </div>
          )}
        </div>
        <div className={styles.address}>
          <div className={styles.title}>
            {address}
          </div>
          <CopyIconButton
            content={address}
            title={i18n._(
              'WalletsItemAddresses.WalletAddressCard.actions.copy',
              { addressName },
              { defaults: 'Copy {addressName}' },
            )}
            toastMessage={i18n._(
              'WalletsItemAddresses.WalletAddressCard.actions.message',
              null,
              { defaults: 'Address copied.' },
            )}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(
  state: AppState,
  {
    address,
    index,
  }: OwnProps,
) {
  const addressNames: AddressNames = selectAddressNames(state)

  return {
    fiatCurrency: selectFiatCurrency(state),
    addressName: getAddressName(addressNames[address], index),
  }
}

const mapDispatchToProps = {
  setAddressName,
}

const WalletAddressCardEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WalletAddressCard)

export { WalletAddressCardEnhanced as WalletAddressCard }
