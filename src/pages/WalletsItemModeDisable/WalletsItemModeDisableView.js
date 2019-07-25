// @flow strict

import Promise from 'bluebird'
import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Form,
  Field,
} from 'react-final-form'

import { Button } from 'components/base'
import { walletsPlugin } from 'store/plugins'
import { getAddressName } from 'utils/address'
import { formatAssetBalance } from 'utils/formatters'
import { type AddressPickerItem } from 'components/AddressPicker/AddressPicker'

import {
  AddressPicker,
  UserActionInfo,
} from 'components'

import styles from './walletsItemModeDisable.m.scss'

export type Props = {|
  +addressNames: AddressNames,
  +i18n: I18nType,
  +walletId: string,
|}

type StateProps = {|
  +addresses: AddressPickerItem[],
  +addressIndex: number,
|}

export class WalletsItemModeDisableView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    const { addressIndex }: Wallet = walletsPlugin.getWallet(props.walletId)

    this.state = {
      addresses: [],
      addressIndex: addressIndex || 0,
    }
  }

  async componentDidMount() {
    const {
      addressNames,
      walletId,
    }: Props = this.props

    const { derivationIndex }: Wallet = walletsPlugin.getWallet(walletId)
    const items: Address[] = walletsPlugin.getAddresses(walletId, 0, derivationIndex || 0)
    const balances: string[] = await Promise.map(items, walletsPlugin.requestETHBalanceByAddress)

    this.setState({
      addresses: items.map((address, index) => ({
        address,
        name: getAddressName(addressNames[address], index),
        fiatBalance: formatAssetBalance(
          'Ethereum',
          balances[index],
          18,
          'ETH',
        ),
      })),
    })
  }

  handleDisable = () => {
    walletsPlugin.switchMode(this.props.walletId, this.state.addressIndex)
  }

  handleClick = (address: string, addressIndex: number) => {
    this.setState({ addressIndex })
  }

  render() {
    const { i18n }: Props = this.props

    const {
      addresses,
      addressIndex,
    }: StateProps = this.state

    /* eslint-disable max-len */
    return (
      <div className={styles.core}>
        <UserActionInfo
          text={i18n._('WalletsItemModeDisable.description', null, { defaults: 'This action will leave only one active wallet address of your choice. \nYou will be able return to the multi-address mode at any time and get access to all \nyour currently available addresses.' })}
          title={i18n._('WalletsItemModeDisable.title', null, { defaults: 'Disable Multi-Address Mode' })}
          iconClassName={styles.icon}
          iconName='ic_attention_48-use-fill'
        />
        <Form
          initialValues={{ addressIndex }}
          onSubmit={this.handleDisable}
          render={({
            form,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={classNames(
                styles.form,
                !addresses.length && styles.empty,
              )}
            >
              <Field
                component={AddressPicker}
                onItemClick={this.handleClick}
                addresses={addresses}
                label={i18n._('WalletsItemModeDisable.actions.address', null, { defaults: 'Address to Keep' })}
                name='addressIndex'
              />
              <Button
                className={styles.button}
                type='submit'
                theme='general'
              >
                {i18n._('WalletsItemModeDisable.actions.submit', null, { defaults: 'Disable' })}
              </Button>
            </form>
          )}
        />
      </div>
    )
    /* eslint-enable max-len */
  }
}