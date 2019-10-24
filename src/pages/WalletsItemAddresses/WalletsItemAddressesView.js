// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import titleHeaderStyles from 'components/TitleHeader/titleHeader.m.scss'
import { gaSendEvent } from 'utils/analytics'
import { formatFiatBalance } from 'utils/formatters'

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
  +i18n: I18n,
  +name: string,
  +walletId: string,
  +type: WalletCustomType,
  +fiatCurrency: FiatCurrencyCode,
  +derivationIndex: number,
|}

type StateProps = {|
  +balance: ?BigNumber,
|}

class WalletsItemAddressesViewComponent extends PureComponent<Props, StateProps> {
  walletRef = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      balance: null,
    }
  }

  async componentDidMount() {
    this.requestBalance()
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.derivationIndex !== this.props.derivationIndex) {
      this.requestBalance()

      if (this.walletRef && this.walletRef.current) {
        this.walletRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        })
      }
    }
  }

  requestBalance = async () => {
    const {
      walletId,
      fiatCurrency,
    }: Props = this.props

    const balance: BigNumber = await walletsPlugin.requestFiatBalance(walletId)

    this.setState({
      balance: formatFiatBalance(
        balance,
        fiatCurrency,
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
      { defaults: 'Address Added.' },
    ))

    gaSendEvent(
      'WalletManager',
      'AddressAdded',
    )
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
                    defaults: 'Multi-Address Wallet • {count, plural, one {1 Address} other {# Addresses}}',
                  },
                )}
              </div>
            </div>
            <div className={`${styles.name} ${styles.balance}`}>
              {this.state.balance}
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
