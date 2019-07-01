// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { web3 } from 'services'
import { CopyIconButton } from 'components'
import { formatAssetBalance } from 'utils/formatters'
import { selectAddressNames } from 'store/selectors/wallets'
import { selectCurrentNetwork } from 'store/selectors/networks'

import styles from './walletAddressCard.m.scss'

type OwnProps = {|
  +address: Address,
  +index: number,
|}

type Props = {|
  +network: Network,
  +address: Address,
  +addressName: string,
  /* ::
  +index: number,
  */
|}

type StateProps = {|
  +ethBalance: ?BigNumber,
|}

const MINUTE: number = 60 * 1000

class WalletAddressCard extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ethBalance: null,
    }
  }

  async componentDidMount() {
    this.requestETHBalance()
  }

  requestETHBalance = async () => {
    const {
      network,
      address,
    }: Props = this.props

    try {
      const ethBalanceStr: string = await web3.getAssetBalance(network, address, 'Ethereum')

      this.setState({
        ethBalance: formatAssetBalance('Ethereum', ethBalanceStr, 18, 'ETH'),
      })
    } catch (error) {
      console.error(error)

      setTimeout(() => {
        this.requestETHBalance()
      }, MINUTE)
    }
  }

  render() {
    const {
      address,
      addressName,
    }: Props = this.props

    const { ethBalance }: StateProps = this.state

    return (
      <div
        key={address}
        className={styles.core}
      >
        <div className={styles.main}>
          <div className={styles.info}>
            <div className={styles.label}>
              {t`Name`}
            </div>
            <div className={styles.title}>
              {addressName}
            </div>
          </div>
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
  const addessIndex: number = (index + 1)
  const network: ?Network = selectCurrentNetwork(state)
  const addressNames: AddressNames = selectAddressNames(state)

  if (!network) {
    throw new Error('Network not found')
  }

  return {
    network,
    addressName: addressNames[address] || t`Address ${addessIndex}`,
  }
}

const WalletAddressCardEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletAddressCard)

export { WalletAddressCardEnhanced as WalletAddressCard }
