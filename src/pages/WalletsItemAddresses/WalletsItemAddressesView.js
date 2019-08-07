// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import titleHeaderStyles from 'components/TitleHeader/titleHeader.m.scss'
import { formatAssetBalance } from 'utils/formatters'

import {
  toastsPlugin,
  walletsPlugin,
} from 'store/plugins'

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
  +i18n: I18nType,
|}

type StateProps = {|
  +ethBalance: ?BigNumber,
|}

class WalletsItemAddressesViewComponent extends PureComponent<Props, StateProps> {
  walletRef = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      ethBalance: null,
    }
  }

  async componentDidMount() {
    this.requestETHBalance()
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.derivationIndex !== this.props.derivationIndex) {
      this.requestETHBalance()

      if (this.walletRef && this.walletRef.current) {
        this.walletRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
      }
    }
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

  deriveAddresses = (): Address[] => {
    const {
      walletId,
      derivationIndex,
    }: Props = this.props

    return walletsPlugin.getAddresses(
      walletId,
      0,
      derivationIndex,
    )
  }

  handleAdd = () => {
    const {
      i18n,
      walletId,
    }: Props = this.props

    walletsPlugin.deriveOneMoreAddress(walletId)

    toastsPlugin.showToast(i18n._(
      'WalletsItemAddresses.toast',
      null,
      { defaults: 'Address Added' },
    ))
  }

  render() {
    const {
      name,
      type,
      walletId,
      derivationIndex,
      i18n,
    }: Props = this.props

    return (
      <div className={styles.core}>
        <TitleHeader
          title={i18n._(
            'WalletsItemAddresses.title',
            null,
            { defaults: 'Manage Addresses' },
          )}
        >
          <Button
            onClick={this.handleAdd}
            className={titleHeaderStyles.action}
            theme='additional-icon'
          >
            <JIcon
              name='ic_add_24-use-fill'
              className={titleHeaderStyles.icon}
            />
            <span className={titleHeaderStyles.label}>
              {i18n._(
                'WalletsItemAddresses.actions.addAddress',
                null,
                { defaults: 'Add New Address' },
              )}
            </span>
          </Button>
        </TitleHeader>
        <div
          ref={this.walletRef}
          className={styles.wallet}
        >
          <div className={styles.main}>
            <div className={styles.info}>
              <div className={styles.name}>
                {name}
              </div>
              <div className={styles.addresses}>
                {i18n._(
                  'WalletsItemAddresses.wallet.description', {
                    count: derivationIndex + 1,
                  }, {
                    /* eslint-disable-next-line max-len */
                    defaults: 'Multi-Address Wallet  •  {count, plural, one {1 Address} other {# Addresses}}',
                  },
                )}
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
          {this.deriveAddresses().map((address: Address, index: number) => (
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

export const WalletsItemAddressesView = withI18n()(
  WalletsItemAddressesViewComponent,
)
