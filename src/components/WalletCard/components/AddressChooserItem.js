// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { JIcon } from 'components/base'
import { walletsPlugin } from 'store/plugins'
import { formatFiatBalance } from 'utils/formatters'
import { selectFiatCurrency } from 'store/selectors/user'
import { selectAddressNames } from 'store/selectors/wallets'

import {
  getAddressName,
  getShortenedAddress,
} from 'utils/address'

import styles from './addressChooserItem.m.scss'

type OwnProps = {|
  +onClick: (e: Event, addressIndex: number) => any,
  +address: string,
  +index: number,
  +isActive: boolean,
|}

type Props = {|
  ...OwnProps,
  +addressName: string,
  +fiatCurrency: FiatCurrencyCode,
|}

type StateProps = {|
  +balance: ?BigNumber,
|}

class AddressChooserItem extends Component<Props, StateProps> {
  static defaultProps = {
    isActive: false,
  }

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

  handleClick = (e: Event) => {
    const {
      onClick,
      index,
    }: Props = this.props

    onClick(e, index)
  }

  render() {
    const {
      address,
      addressName,
      isActive,
    }: Props = this.props

    const { balance }: StateProps = this.state

    return (
      <div
        onClick={this.handleClick}
        className={classNames(
          styles.core,
          isActive && styles.active,
        )}
      >
        <JIcon className={styles.icon} name='0x-use-fill' />
        <div className={styles.info}>
          <div className={styles.name}>
            {addressName}
          </div>
          <div className={styles.address}>
            {getShortenedAddress(address)}
          </div>
        </div>
        {balance && (
          <span className={styles.balance}>
            {balance}
          </span>
        )}
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

const AddressChooserItemEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(AddressChooserItem)

export { AddressChooserItemEnhanced as AddressChooserItem }
