// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'
import { actions } from 'redux-router5'

import web3 from 'services/web3'

import { TitleHeader } from 'components'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectActiveWalletAddressOrThrow } from 'store/selectors/wallets'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'
import { checkETH } from 'utils/digitalAssets'
import getTransactionValue from 'utils/transactions/getTransactionValue'

import * as transaction from 'store/modules/transactions'

import {
  toBigNumber,
  fromGweiToWei,
  // isValidNumeric,
} from 'utils/numbers'

import {
  ConnectedStepOneForm,
  type SendFormValues,
} from './StepOneForm'
import { ConnectedPasswordStepForm } from './PasswordStepForm'

import styles from './send.m.scss'

const { sendTransaction } = web3

type Props = {|
  +network: Network,
  +ownerAddress: OwnerAddress,
  +goHome: () => any,
  +openTransaction: (txHash: string) => any,
  +getAssetDecimals: (assetAddress: string) => number,
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

type ComponentState = {|
  currentStep: SendAssetStep,
  sendFormValues: SendFormValues,
|}

class SendAsset extends Component<Props, ComponentState> {
  state = {
    currentStep: STEPS.SEND_FORM,
    sendFormValues: {
      assetAddress: 'Ethereum',
      recipientAddress: '',
      amountValue: '',
      isPriorityOpen: false,
      gasPriceValue: '',
      gasLimitValue: '21000',
    },
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

  handleSendFormSubmit = (values: SendFormValues) => {
    this.setState({
      sendFormValues: values,
      currentStep: STEPS.SEND_CONFIRM,
    })
  }

  renderSendFormStep = () => {
    const {
      sendFormValues,
    } = this.state

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleClose}
          title={t`Send`}
        />
        <ConnectedStepOneForm
          onSubmit={this.handleSendFormSubmit}
          initialValues={sendFormValues}
        />
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

    const gasPrice = gasPriceValue
      ? toBigNumber(fromGweiToWei(gasPriceValue))
      : undefined

    const amount = getTransactionValue(amountValue, decimals)

    // send transaction
    const sendTransactionPayload: SendTransactionProps = {
      to: recipientAddress,
      value: amount,
      privateKey,
      gasLimit,
      gasPrice,
      // nonce
    }

    console.log('sendTransactionPayload', sendTransactionPayload)

    try {
      const txHash = await sendTransaction(
        network,
        assetAddress,
        sendTransactionPayload,
      )

      console.log('txHash', txHash)

      addPendingTransaction(
        networkId,
        ownerAddress,
        assetAddress,
        {
          data: {
            gasPrice,
          },
          blockData: {
            timestamp: Date.now() / 1000,
          },
          receiptData: {
            status: 1,
            gasUsed: parseInt(gasLimit, 10),
          },
          hash: txHash,
          to: recipientAddress,
          blockHash: null,
          blockNumber: null,
          from: ownerAddress,
          contractAddress: null,
          eventType: checkETH(assetAddress) ? 0 : 1,
          amount,
          isRemoved: false,
        },
      )

      openTransaction(txHash)
    } catch (err) {
      console.error(err)
      this.setState({ currentStep: STEPS.ERROR })
    }
  }

  renderPasswordStep = () => (
    <div className={styles.core}>
      <TitleHeader
        onBack={this.handleBackToSendForm}
        title={t`Enter Secutity Password`}
      />
      <ConnectedPasswordStepForm
        onDecryptPrivateKey={this.handleDecryptPrivateKey}
      />
    </div>
  )

  render() {
    switch (this.state.currentStep) {
      case STEPS.SEND_FORM:
        return this.renderSendFormStep()

      case STEPS.SEND_CONFIRM:
        return this.renderPasswordStep()

      default:
        return <span />
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
  const network = selectCurrentNetworkOrThrow(state)
  const ownerAddress = selectActiveWalletAddressOrThrow(state)

  return {
    network,
    ownerAddress,
    getAssetDecimals: getAssetDecimals(state),
  }
}

const mapDispatchToProps = {
  addPendingTransaction: transaction.addPendingTransaction,
  goHome: () => actions.navigateTo('Home'),
  openTransaction: (txHash: string) => actions.navigateTo('HistoryItem', { itemId: txHash }),
}

export const Send = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(SendAsset)
