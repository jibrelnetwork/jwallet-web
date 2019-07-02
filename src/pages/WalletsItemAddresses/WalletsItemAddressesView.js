// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'
import { formatAssetBalance } from 'utils/formatters'

import {
  JIcon,
  Button,
} from 'components/base'

import {
  TitleHeader,
  WalletActions,
} from 'components'

import styles from './walletsItemAddresses.m.scss'
import { WalletAddressCard } from './components/WalletAddressCard/WalletAddressCard'

export type Props = {|
  +walletId: string,
  +name: string,
  +type: WalletCustomType,
  +derivationIndex: number,
|}

type StateProps = {|
  +addresses: Address[],
  +ethBalance: ?BigNumber,
|}

export class WalletsItemAddressesView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ethBalance: null,
      addresses: this.deriveAddresses(props),
    }
  }

  async componentDidMount() {
    this.requestETHBalance()
  }

  async componentWillReceiveProps(nextProps: Props) {
    if (nextProps.derivationIndex === this.props.derivationIndex) {
      return
    }

    await this.requestETHBalance()
    this.setState({ addresses: this.deriveAddresses(nextProps) })
  }

  requestETHBalance = async () => {
    const ethBalance: BigNumber = await walletsPlugin.requestETHBalance(this.props.walletId)

    this.setState({
      ethBalance: formatAssetBalance(
        'Ethereum',
        ethBalance,
        18,
        'ETH',
      ),
    })
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

    const addressesCount: number = (derivationIndex + 1)
    const addressesLabel: string = (derivationIndex === 0) ? t`Address` : t`Addresses`

    return (
      <div className={styles.core}>
        <TitleHeader title={t`Manage Addresses`}>
          <Button
            onClick={this.handleAdd}
            className={styles.add}
            theme='additional-icon'
          >
            <JIcon
              name='ic_add_24-use-fill'
              className={styles.icon}
            />
            <span className={styles.text}>
              {t`Add New Address`}
            </span>
          </Button>
        </TitleHeader>
        <div className={styles.wallet}>
          <div className={styles.main}>
            <div className={styles.info}>
              <div className={styles.name}>
                {name}
              </div>
              <div className={styles.addresses}>
                {t`Multi-Address Wallet  •  ${addressesCount} ${addressesLabel}`}
              </div>
            </div>
            <div className={`${styles.name} ${styles.balance}`}>
              {this.state.ethBalance}
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
