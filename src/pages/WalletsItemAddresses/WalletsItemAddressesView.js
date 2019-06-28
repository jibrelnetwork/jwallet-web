// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'

import { WalletActions } from 'components'

import styles from './walletsItemAddresses.m.scss'
import { Header } from './Header/Header'
import { WalletAddressCard } from './components/WalletAddressCard/WalletAddressCard'

export type Props = {|
  +walletId: string,
  +name: string,
  +type: WalletCustomType,
  +derivationIndex: number,
|}

type StateProps = {|
  +addresses: Address[],
|}

export class WalletsItemAddressesView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      addresses: this.deriveAddresses(props),
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ addresses: this.deriveAddresses(nextProps) })
  }

  deriveAddresses = ({
    walletId,
    derivationIndex,
  }: Props): Address[] => walletsPlugin.getAddresses(
    walletId,
    0,
    derivationIndex,
  )

  handleAdd = () => {
    walletsPlugin.deriveOneMoreAddress(this.props.walletId)
  }

  render() {
    const {
      name,
      type,
      walletId,
      derivationIndex,
    }: Props = this.props

    const addressesLabel: string = (derivationIndex === 0) ? t`Address` : t`Addresses`

    return (
      <div className={styles.core}>
        <Header onAdd={this.handleAdd} />
        <div className={styles.wallet}>
          <div className={styles.main}>
            <div className={styles.info}>
              <div className={styles.name}>
                {name}
              </div>
              <div className={styles.addresses}>
                {t`Multi-Address Wallet  •  ${derivationIndex + 1} ${addressesLabel}`}
              </div>
            </div>
            <div className={styles.actions}>
              <WalletActions
                type={type}
                id={walletId}
                isFromAddressManager
              />
            </div>
          </div>
          {this.state.addresses.map((address: Address, index: number) => (
            <WalletAddressCard
              key={address}
              address={address}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  }
}
