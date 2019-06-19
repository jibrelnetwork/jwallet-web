// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'

import {
  WalletActions,
  CopyIconButton,
} from 'components'

import walletsItemAddressesStyle from './walletsItemAddresses.m.scss'
import { Header } from './Header/Header'

export type Props = {|
  +walletId: string,
  +name: string,
  +type: WalletCustomType,
  +derivationIndex: number,
  +isSimplified: boolean,
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

  handleRemove = () => {
    walletsPlugin.removeWallet(this.props.walletId)
  }

  handleAdd = () => {
    walletsPlugin.deriveOneMoreAddress(this.props.walletId)
  }

  render() {
    const {
      name,
      type,
      walletId,
      isSimplified,
      derivationIndex,
    }: Props = this.props

    const specific: string = isSimplified ? t`Single-Address` : t`Multi-Address`
    const addressesLabel: string = (derivationIndex === 0) ? t`Address` : t`Addresses`

    return (
      <div className={walletsItemAddressesStyle.core}>
        <Header onAdd={this.handleAdd} />
        <div className={walletsItemAddressesStyle.wallet}>
          <div className={walletsItemAddressesStyle.main}>
            <div className={walletsItemAddressesStyle.info}>
              <div className={walletsItemAddressesStyle.name}>
                {name}
              </div>
              <div className={walletsItemAddressesStyle.addresses}>
                {t`${specific} Wallet  •  ${derivationIndex + 1} ${addressesLabel}`}
              </div>
            </div>
            <div className={walletsItemAddressesStyle.actions}>
              <WalletActions
                type={type}
                id={walletId}
                isSimplified={isSimplified}
                isFromAddressManager
              />
            </div>
          </div>
          {this.state.addresses.map((address: Address, index: number) => {
            const addressName: string = t`Address ${index + 1}`

            return (
              <div
                key={address}
                className={walletsItemAddressesStyle.item}
              >
                <div className={walletsItemAddressesStyle.label}>
                  {t`Name`}
                </div>
                <div className={walletsItemAddressesStyle.title}>
                  {addressName}
                </div>
                <div className={walletsItemAddressesStyle.address}>
                  <div className={walletsItemAddressesStyle.title}>
                    {address}
                  </div>
                  <CopyIconButton
                    title={t`Copy ${addressName}`}
                    content={address}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
