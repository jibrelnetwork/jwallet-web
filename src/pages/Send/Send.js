// @flow strict

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { type I18n as I18nType } from '@lingui/core'

import {
  withI18n,
  Trans,
} from '@lingui/react'

import web3 from 'services/web3'
import getTransactionValue from 'utils/transactions/getTransactionValue'
import { TitleHeader } from 'components'
import { checkETH } from 'utils/digitalAssets'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'

import {
  toBigNumber,
  fromGweiToWei,
  // isValidNumeric,
} from 'utils/numbers'

import * as transaction from 'store/modules/transactions'

import styles from './send.m.scss'

import { SendError } from './SendError'
import { ValidationFailed } from './ValidationFailed'
import { ConnectedPasswordStepForm } from './PasswordStepForm'

import {
  ConnectedStepOneForm,
  type SendFormValues,
} from './StepOneForm'

type OwnProps = {|
  +to?: string,
  +asset?: string,
  +amount?: string,
|}

type Props = {|
  ...OwnProps,
  +network: Network,
  +ownerAddress: OwnerAddress,
  +goHome: () => any,
  +openTransaction: (txHash: Hash) => any,
  +getAssetDecimals: (assetAddress: string) => number,
  +i18n: I18nType,
  +addPendingTransaction: (
    networkId: string,
    ownerAddress: string,
    assetAddress: string,
    data: Transaction,
  ) => any,
|}

const STEPS = {
  SEND_FORM: 'SEND_FORM',
  SEND_CONFIRM: 'SEND_CONFIRM',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  ERROR: 'ERROR',
}

type SendAssetStep = $Keys<typeof STEPS>

type StateProps = {|
  +nodeError: ?string,
  +currentStep: SendAssetStep,
  +sendFormValues: SendFormValues,
|}

class SendAsset extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    const {
      to,
      asset,
      amount,
    }: Props = props

    this.state = {
      nodeError: null,
      currentStep: STEPS.SEND_FORM,
      sendFormValues: {
        gasPriceValue: '',
        gasLimitValue: '21000',
        amountValue: amount || '',
        recipientAddress: to || '',
        assetAddress: asset || 'Ethereum',
        isPriorityOpen: false,
      },
    }
  }

  handleAssetAddressChange = (assetAddress: string) => {
    this.setState({
      sendFormValues: {
        ...this.state.sendFormValues,
        assetAddress,
      },
    })
  }

  handleClose = () => {
    this.props.goHome()
  }

  handleSendFormSubmit = (values: SendFormValues, isValidationFailed: boolean) => {
    this.setState({
      nodeError: null,
      sendFormValues: values,
      currentStep: isValidationFailed
        ? STEPS.VALIDATION_FAILED
        : STEPS.SEND_CONFIRM,
    })
  }

  renderSendFormStep = () => {
    const {
      nodeError,
      sendFormValues,
    }: StateProps = this.state

    const { i18n }: Props = this.props

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleClose}
          title={i18n._('Send.title', null, { defaults: 'Send' })}
        />
        <ConnectedStepOneForm
          onSubmit={this.handleSendFormSubmit}
          nodeError={nodeError}
          initialValues={sendFormValues}
        />
        <Trans id='Send.fee.description' render='p' className={styles.warning}>
          The app doesn’t charge you any fees.<br />
          But you have to pay the blokchain fee to create a new transaction.
        </Trans>
      </div>
    )
  }

  handleBackToSendForm = () => {
    this.setState({ currentStep: STEPS.SEND_FORM })
  }

  handleDecryptPrivateKey = async (privateKey: string) => {
    const {
      network,
      ownerAddress,
      getAssetDecimals,
      addPendingTransaction,
      openTransaction,
    } = this.props

    const {
      id: networkId,
    } = network

    const {
      assetAddress,
      recipientAddress,
      amountValue,
      gasPriceValue,
      gasLimitValue,
    } = this.state.sendFormValues

    const decimals = getAssetDecimals(assetAddress)

    const gasLimit = gasLimitValue
      ? toBigNumber(gasLimitValue)
      : undefined

    const gasPrice = toBigNumber(fromGweiToWei(gasPriceValue))

    const amount = getTransactionValue(amountValue, decimals)

    try {
      const nonce = await web3.getNonce(
        network,
        ownerAddress,
        'pending',
      )

      const sendTransactionPayload: SendTransactionProps = {
        to: recipientAddress,
        value: amount,
        privateKey,
        gasLimit,
        gasPrice,
        nonce,
      }

      const txHash = await web3.sendTransaction(
        network,
        assetAddress,
        sendTransactionPayload,
      )

      addPendingTransaction(
        networkId,
        ownerAddress,
        assetAddress,
        {
          data: {
            nonce,
            gasPrice,
            hasInput: false,
          },
          blockData: {
            timestamp: Date.now() / 1000,
          },
          receiptData: {
            status: 1,
            gasUsed: parseInt(gasLimit, 10),
          },
          amount,
          hash: txHash,
          to: recipientAddress,
          blockHash: null,
          blockNumber: null,
          from: ownerAddress,
          contractAddress: null,
          eventType: checkETH(assetAddress) ? 0 : 1,
          isRemoved: false,
        },
      )

      openTransaction(txHash)
    } catch (error) {
      const errMsg: string = error.message
      const isNetworkError: boolean = (errMsg === 'Invalid JSON RPC response: ""')

      if (isNetworkError) {
        this.setState({ currentStep: STEPS.ERROR })

        return
      }

      this.setState({
        nodeError: errMsg,
        currentStep: STEPS.SEND_FORM,
      })
    }
  }

  renderPasswordStep = () => {
    const { i18n } = this.props

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBackToSendForm}
          title={i18n._('Send.PasswordStepForm.title', null,
                        { defaults: 'Enter Security Password' })}
        />
        <ConnectedPasswordStepForm
          onDecryptPrivateKey={this.handleDecryptPrivateKey}
        />
      </div>
    )
  }

  handleValidationFailedNextClick = () => {
    this.setState({ currentStep: STEPS.SEND_CONFIRM })
  }

  renderValidationFailedStep = () => (
    <div className={styles.core}>
      <TitleHeader
        onBack={this.handleBackToSendForm}
        title=''
      />
      <ValidationFailed
        onGoBackClick={this.handleBackToSendForm}
        onGoNextClick={this.handleValidationFailedNextClick}
      />
    </div>
  )

  renderErrorStep = () => (
    <div className={styles.core}>
      <TitleHeader
        onBack={this.handleBackToSendForm}
        title=''
      />
      <SendError
        onGoBackClick={this.handleBackToSendForm}
        onCancelClick={this.handleClose}
      />
    </div>
  )

  render() {
    switch (this.state.currentStep) {
      case STEPS.SEND_FORM:
        return this.renderSendFormStep()

      case STEPS.SEND_CONFIRM:
        return this.renderPasswordStep()

      case STEPS.VALIDATION_FAILED:
        return this.renderValidationFailedStep()

      case STEPS.ERROR:
        return this.renderErrorStep()

      default:
        return null
    }
  }
}

const getAssetDecimals = (state: AppState) => (assetAddress: string): number => {
  const {
    blockchainParams: {
      decimals,
    },
  } = selectDigitalAssetOrThrow(state, assetAddress)

  return decimals
}

function mapStateToProps(state: AppState) {
  return {
    getAssetDecimals: getAssetDecimals(state),
    network: selectCurrentNetworkOrThrow(state),
    ownerAddress: selectActiveWalletAddress(state),
  }
}

const mapDispatchToProps = {
  addPendingTransaction: transaction.addPendingTransaction,
  goHome: () => actions.navigateTo('Home'),
  openTransaction: (txHash: Hash) => actions.navigateTo('HistoryItem', { id: txHash }),
}

export const Send = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SendAsset)
