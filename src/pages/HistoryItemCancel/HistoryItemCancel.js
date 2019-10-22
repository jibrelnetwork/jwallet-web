// @flow strict

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  type FormRenderProps,
} from 'react-final-form'

import config from 'config'
import { web3 } from 'services'
import { JLink } from 'components/base'
import { PageNotFoundError } from 'errors'
import { toBigNumber } from 'utils/numbers'
import { getTxFee } from 'utils/transactions'
import { gaSendEvent } from 'utils/analytics'
import { walletsPlugin } from 'store/plugins'
import { selectPasswordHint } from 'store/selectors/password'
import { addPendingTransaction } from 'store/modules/transactions'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
import { selectPendingTransactionByHash } from 'store/selectors/transactions'

import {
  TitleHeader,
  PasswordForm,
  UserActionInfo,
  ButtonWithConfirm,
} from 'components'

import {
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import styles from './historyItemCancel.m.scss'

type HistoryItemCancelStep = 'AGREEMENT' | 'PASSWORD' | 'ERROR_CONNECTION' | 'ERROR_BALANCE'

type OwnProps = {|
  +id: TransactionId,
|}

type Props = {|
  ...OwnProps,
  +goToHistory: () => any,
  +goToHistoryItem: (txHash: Hash) => any,
  +addPendingTransaction: (
    networkId: string,
    ownerAddress: string,
    assetAddress: string,
    data: Transaction,
  ) => any,
  +i18n: I18n,
  +network: Network,
  +hint: string,
  +gasPrice: string,
  +walletId: string,
  +walletName: string,
  +from: OwnerAddress,
  +ethBalance: ?string,
  +nonce: number,
|}

type StateProps = {|
  +fee: ?BigNumber,
  +gasPrice: BigNumber,
  +currentStep: HistoryItemCancelStep,
|}

const ETH_GAS: number = 21000
const GAS_COEFFICIENT: number = 3
const ETH_ASSET_ADDRESS: string = 'Ethereum'
const CANCEL_AMOUNT: BigNumber = toBigNumber(0)

const INITIAL_VALUES = {
  password: '',
}

const STEPS: { [HistoryItemCancelStep]: HistoryItemCancelStep } = {
  AGREEMENT: 'AGREEMENT',
  PASSWORD: 'PASSWORD',
  ERROR_CONNECTION: 'ERROR_CONNECTION',
  ERROR_BALANCE: 'ERROR_BALANCE',
}

class HistoryItemCancel extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      fee: null,
      currentStep: STEPS.AGREEMENT,
      gasPrice: toBigNumber(props.gasPrice),
    }
  }

  async componentDidMount() {
    const {
      network,
      gasPrice,
      ethBalance,
    }: Props = this.props

    const gasPriceFromTx: BigNumber = toBigNumber(gasPrice)
    const gasPriceFromNode: BigNumber = await web3.getGasPrice(network)

    const gasPriceMax: BigNumber = gasPriceFromTx.gt(gasPriceFromNode)
      ? gasPriceFromTx
      : gasPriceFromNode

    const fee: BigNumber = gasPriceMax.times(ETH_GAS).times(GAS_COEFFICIENT)

    this.setState({
      fee,
      gasPrice: gasPriceMax,
      currentStep: toBigNumber(ethBalance).lt(fee) ? STEPS.ERROR_BALANCE : STEPS.AGREEMENT,
    })
  }

  handleBackFromPassword = () => {
    this.setState({ currentStep: STEPS.AGREEMENT })

    gaSendEvent(
      'TransactionCancel',
      'BackFromPassword',
    )
  }

  handleCancelAgreement = () => {
    this.props.goToHistory()

    gaSendEvent(
      'TransactionCancel',
      'BackFromAgreement',
    )
  }

  handleConfirmAgreement = () => {
    this.setState({ currentStep: STEPS.PASSWORD })

    gaSendEvent(
      'TransactionCancel',
      'AgreementConfirmed',
    )
  }

  sendCancelTransaction = async (privateKey: string) => {
    try {
      const {
        goToHistoryItem,
        from,
        network,
        nonce,
      }: Props = this.props

      const { gasPrice }: StateProps = this.state

      const sendTransactionPayload = {
        nonce,
        gasPrice,
        privateKey,
        value: CANCEL_AMOUNT,
        to: config.cancelAddress,
        gasLimit: toBigNumber(ETH_GAS),
      }

      console.log('sendTransactionPayload', sendTransactionPayload)

      const txHash = await web3.sendTransaction(
        network,
        ETH_ASSET_ADDRESS,
        sendTransactionPayload,
      )

      gaSendEvent(
        'TransactionCancel',
        'TransactionSent',
      )

      console.log('txHash', txHash)

      this.props.addPendingTransaction(
        network.id,
        from,
        ETH_ASSET_ADDRESS,
        {
          data: {
            nonce,
            hasInput: false,
            gasPrice: gasPrice.toNumber(),
          },
          blockData: {
            timestamp: Date.now() / 1000,
          },
          receiptData: {
            status: 1,
            gasUsed: ETH_GAS,
          },
          from,
          amount: '0',
          eventType: 0,
          hash: txHash,
          blockHash: null,
          blockNumber: null,
          contractAddress: null,
          to: config.cancelAddress,
          isRemoved: false,
        },
      )

      goToHistoryItem(txHash)
    } catch (error) {
      console.error(error)
      this.setState({ currentStep: STEPS.ERROR_CONNECTION })

      gaSendEvent(
        'TransactionCancel',
        'ConnectionFailed',
      )
    }
  }

  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const {
      i18n,
      walletId,
    } = this.props

    try {
      const privateKey = await walletsPlugin.getPrivateKey(
        walletId,
        values.password || '',
      )

      await this.sendCancelTransaction(privateKey)
    } catch (err) {
      return {
        password: i18n._(
          'HistoryItemCancel.password.error.invalid',
          null,
          { defaults: 'Invalid password' },
        ),
      }
    }

    return null
  }

  renderAgreementStep = () => {
    const {
      i18n,
      gasPrice,
    }: Props = this.props

    return (
      <div className={styles.core}>
        <UserActionInfo
          text={i18n._(
            'HistoryItemCancel.agreement.text',
            null,
            {
              // eslint-disable-next-line max-len
              defaults: 'Transfer has already been sent to the blockchain therefore cancelling it may take some time and incur blockchain fee. You can monitor operation status in your wallet History.',
            },
          )}
          title={i18n._(
            'HistoryItemCancel.agreement.title',
            null,
            { defaults: 'Cancel Transfer' },
          )}
          iconClassName={styles.icon}
          iconName='ic_delete_48-use-fill'
        />
        <div className={styles.fee}>
          {i18n._(
            'HistoryItemCancel.agreement.fee',
            { fee: getTxFee(ETH_GAS, gasPrice) },
            { defaults: 'Blockchain fee {fee} ETH' },
          )}
        </div>
        <ButtonWithConfirm
          onCancel={this.handleCancelAgreement}
          onConfirm={this.handleConfirmAgreement}
          labelConfirm={i18n._(
            'HistoryItemCancel.agreement.actions.submit',
            null,
            { defaults: 'Cancel Transfer' },
          )}
          labelCancel={i18n._(
            'HistoryItemCancel.agreement.actions.cancel',
            null,
            { defaults: 'Do It Later' },
          )}
        />
      </div>
    )
  }

  renderPasswordForm = ({
    handleSubmit,
    values = {},
    submitting,
  }: FormRenderProps) => {
    const { hint }: Props = this.props

    return (
      <PasswordForm
        isSubmitting={submitting}
        handleSubmit={handleSubmit}
        values={values}
        hint={hint}
      />
    )
  }

  renderPasswordStep = () => {
    const { i18n }: Props = this.props

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBackFromPassword}
          title={i18n._(
            'HistoryItemCancel.agreement.header',
            null,
            { defaults: 'Enter Security Password' },
          )}
        />
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderPasswordForm}
          initialValues={INITIAL_VALUES}
        />
      </div>
    )
  }

  renderErrorConnectionStep = () => {
    const { i18n }: Props = this.props

    return (
      <div className={styles.core}>
        <UserActionInfo
          text={i18n._(
            'HistoryItemCancel.connection.text',
            null,
            {
              // eslint-disable-next-line max-len
              defaults: 'Action can’t be processed without internet connection. Please, try again later.',
            },
          )}
          title={i18n._(
            'HistoryItemCancel.connection.title',
            null,
            { defaults: 'Internet Connection Error' },
          )}
          iconClassName={styles.icon}
          iconName='ic_fail_48-use-fill'
        />
        <ButtonWithConfirm
          onCancel={this.handleConfirmAgreement}
          onConfirm={this.handleCancelAgreement}
          labelConfirm={i18n._(
            'HistoryItemCancel.connection.actions.submit',
            null,
            { defaults: 'Go Back' },
          )}
          labelCancel={i18n._(
            'HistoryItemCancel.connection.actions.cancel',
            null,
            { defaults: 'Try Again' },
          )}
        />
      </div>
    )
  }

  renderErrorBalanceStep = () => {
    const {
      i18n,
      walletName,
    }: Props = this.props

    gaSendEvent(
      'TransactionCancel',
      'BalanceError',
    )

    return (
      <div className={styles.core}>
        <UserActionInfo
          text={i18n._(
            'HistoryItemCancel.balance.text',
            { name: walletName },
            {
              defaults: 'Your wallet “{ name }” doesn’t have enough ETH to restart a transfer.',
            },
          )}
          title={i18n._(
            'HistoryItemCancel.balance.title',
            null,
            { defaults: 'Error Canceling Transfer' },
          )}
          iconClassName={styles.icon}
          iconName='ic_fail_48-use-fill'
        />
        <JLink
          className={styles.button}
          href='/history'
          theme='button-general-confirm'
        >
          {i18n._(
            'HistoryItemCancel.balance.link',
            null,
            { defaults: 'Go to History' },
          )}
        </JLink>
      </div>
    )
  }

  render() {
    const {
      fee,
      currentStep,
    }: StateProps = this.state

    if (!fee) {
      return null
    }

    switch (currentStep) {
      case STEPS.AGREEMENT:
        return this.renderAgreementStep()

      case STEPS.PASSWORD:
        return this.renderPasswordStep()

      case STEPS.ERROR_BALANCE:
        return this.renderErrorBalanceStep()

      case STEPS.ERROR_CONNECTION:
        return this.renderErrorConnectionStep()

      default:
        return null
    }
  }
}

function mapStateToProps(state: AppState, { id }: OwnProps) {
  const hint: string = selectPasswordHint(state)
  const wallet: Wallet = selectActiveWallet(state)
  const network: Network = selectCurrentNetworkOrThrow(state)
  const from: OwnerAddress = selectActiveWalletAddress(state)

  const ethBalance: ?Balance = selectBalanceByAssetAddress(
    state,
    ETH_ASSET_ADDRESS,
  )

  const item: ?TransactionWithPrimaryKeys = selectPendingTransactionByHash(
    state,
    id,
  )

  if (!(item && item.data)) {
    throw new PageNotFoundError()
  }

  const {
    gasPrice,
    nonce,
  }: TransactionData = item.data

  return {
    network,
    from,
    hint,
    gasPrice,
    walletId: wallet.id,
    walletName: wallet.name,
    ethBalance: (ethBalance && !ethBalance.isError) ? ethBalance.value : null,
    nonce,
  }
}

const mapDispatchToProps = {
  addPendingTransaction,
  goToHistory: () => actions.navigateTo('History'),
  goToHistoryItem: (txHash: Hash) => actions.navigateTo('HistoryItem', { id: txHash }),
}

const HistoryItemCancelEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(HistoryItemCancel)

export { HistoryItemCancelEnhanced as HistoryItemCancel }
