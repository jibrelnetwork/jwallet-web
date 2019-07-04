// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { sanitizeName } from 'utils/wallets'
import { walletsPlugin } from 'store/plugins'
import { getAddressName } from 'utils/address'
import { formatAssetBalance } from 'utils/formatters'
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
  /* ::
  +index: number,
  */
|}

type StateProps = {|
  +ethBalance: ?BigNumber,
|}

class WalletAddressCard extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ethBalance: null,
    }
  }

  async componentDidMount() {
    const ethBalance: BigNumber = await walletsPlugin.requestETHBalanceByAddress(this.props.address)

    this.setState({
      ethBalance: formatAssetBalance(
        'Ethereum',
        ethBalance,
        18,
        'ETH',
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
    }: Props = this.props

    const { ethBalance }: StateProps = this.state

    return (
      <div className={styles.core}>
        <div className={styles.main}>
          <EditableField
            sanitize={sanitizeName}
            onChangeFinish={this.handleChangeFinish}
            label={t`Name`}
            value={addressName}
            theme='white'
            maxLen={32}
          />
          {ethBalance && (
            <div className={styles.balance}>
              {ethBalance}
            </div>
          )}
        </div>
        <div className={styles.address}>
          <div className={styles.title}>
            {address}
          </div>
          <CopyIconButton
            title={t`Copy ${addressName}`}
            content={address}
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
    addressName: getAddressName(addressNames[address], index),
  }
}

const mapDispatchToProps = {
  setAddressName,
}

const WalletAddressCardEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WalletAddressCard)

export { WalletAddressCardEnhanced as WalletAddressCard }
