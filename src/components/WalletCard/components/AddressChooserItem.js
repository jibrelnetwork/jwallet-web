// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { JIcon } from 'components/base'
import { walletsPlugin } from 'store/plugins'
import { formatAssetBalance } from 'utils/formatters'
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
|}

type StateProps = {|
  +ethBalance: ?BigNumber,
|}

class AddressChooserItem extends Component<Props, StateProps> {
  static defaultProps = {
    isActive: false,
  }

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

    const { ethBalance }: StateProps = this.state

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
        {ethBalance && (
          <span className={styles.balance}>
            {ethBalance}
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
    addressName: getAddressName(addressNames[address], index),
  }
}

const AddressChooserItemEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(AddressChooserItem)

export { AddressChooserItemEnhanced as AddressChooserItem }
