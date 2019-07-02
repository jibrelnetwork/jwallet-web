// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { web3 } from 'services'
import { CopyIconButton } from 'components'
import { formatAssetBalance } from 'utils/formatters'
import { selectAddressNames } from 'store/selectors/wallets'
import { selectCurrentNetwork } from 'store/selectors/networks'
import { setAddressName } from 'store/modules/walletsAddresses'

import styles from './walletAddressCard.m.scss'

type OwnProps = {|
  +address: Address,
  +index: number,
|}

type Props = {|
  +setAddressName: (address: Address, name: string) => any,
  +network: Network,
  +address: Address,
  +addressName: string,
  /* ::
  +index: number,
  */
|}

type StateProps = {|
  +newName: string,
  +ethBalance: ?BigNumber,
  +isRenameActive: boolean,
|}

const MINUTE: number = 60 * 1000

class WalletAddressCard extends Component<Props, StateProps> {
  nameInputRef: Object

  constructor(props: Props) {
    super(props)

    this.state = {
      newName: props.addressName,
      ethBalance: null,
      isRenameActive: false,
    }

    this.nameInputRef = React.createRef()
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

  handleChangeName = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ newName: event.target.value })
  }

  handleActivateRename = (isRenameActive?: boolean = true) => {
    this.setState({ isRenameActive: !!isRenameActive }, () => {
      if (isRenameActive) {
        this.nameInputRef.current.focus()
      }
    })
  }

  handleRenameBlur = () => {
    this.handleActivateRename(false)

    const {
      address,
      addressName,
    } = this.props

    const newName: string = this.state.newName.substring(0, 32).trim().replace(/\//g, '–')

    if (!newName || (addressName === newName)) {
      this.setState({ newName: addressName })

      return
    }

    this.props.setAddressName(address, newName)
    this.setState({ newName })
  }

  render() {
    const {
      address,
      addressName,
    }: Props = this.props

    const {
      newName,
      ethBalance,
      isRenameActive,
    }: StateProps = this.state

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
            <div className={styles.wrapper}>
              <div
                className={classNames(
                  styles.name,
                  styles.title,
                  isRenameActive && styles.editable,
                )}
                onClick={this.handleActivateRename}
              >
                {isRenameActive
                  /**
                   * Next line is necessarry, because we must render newName inside div
                   * to show background. But ending spaces are ignored,
                   * so we have to replace them by something.
                   */
                  ? newName.replace(/ /g, '.')
                  : newName
                }
              </div>
              {isRenameActive && (
                <input
                  onBlur={this.handleRenameBlur}
                  onChange={this.handleChangeName}
                  ref={this.nameInputRef}
                  value={newName}
                  className={styles.input}
                  type='text'
                />
              )}
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

const mapDispatchToProps = {
  setAddressName,
}

const WalletAddressCardEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WalletAddressCard)

export { WalletAddressCardEnhanced as WalletAddressCard }
