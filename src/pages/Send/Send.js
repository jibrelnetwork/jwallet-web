// @flow

import React, {
  Component,
  Fragment,
} from 'react'
import { t } from 'ttag'

import { JText } from 'components/base'
import { executeDeferredAction } from 'utils/misc'

import {
  typeof sendTransaction as SendTransactionFunction,
  typeof addPendingTransaction as AddPendingTransactionFunction,
} from 'store/modules/digitalAssetsSendWizard'

import {
  FirstStepForm,
  PasswordStepForm,
  ErrorMessage,
} from './components'

import styles from './send.m.scss'

export const FIRST_STEP: 1 = 1
export const PASSWORD_STEP: 2 = 2
export type WizardStep = typeof FIRST_STEP | typeof PASSWORD_STEP

type Props = {|
  +close: () => void,
  +sendTransaction: SendTransactionFunction,
  +addPendingTransaction: AddPendingTransactionFunction,
  +owner: OwnerAddress,
|}

export type FirstStepValues = {|
  owner: OwnerAddress,
  asset: AssetAddress,
  recipient: Address,
  amount: string,
  fiatAmount: string,
|}

export type PasswordStepValues = {|
  privateKey: ?string,
|}

type State = {|
  step: WizardStep,
  firstStepValues: FirstStepValues,
  passwordStepValues: PasswordStepValues,
  sendTransactionError: string,
|}

class DigitalAssetsSendWizard extends Component<Props, State> {
  static defaultProps = {
    close: () => null,
  }

  state: State = {
    step: FIRST_STEP,
    firstStepValues: {
      owner: this.props.owner,
      asset: 'Ethereum',
      recipient: '',
      amount: '',
      fiatAmount: '',
    },
    passwordStepValues: {
      privateKey: null,
    },
    sendTransactionError: '',
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.owner !== state.firstStepValues.owner) {
      return {
        ...state,
        firstStepValues: {
          ...state.firstStepValues,
          owner: props.owner,
        },
        step: FIRST_STEP,
      }
    }

    return null
  }

  goToPrevStep = () => {
    switch (this.state.step) {
      case FIRST_STEP:
        this.props.close()

        break

      case PASSWORD_STEP:
        this.setState({
          step: FIRST_STEP,
          sendTransactionError: '',
          passwordStepValues: {
            privateKey: null,
          },
        })

        break

      default:
        console.error('Oops, invalid step', this.state.step)
        this.props.close()
    }
  }

  handleFirstStepSubmit = (values: FirstStepValues) => {
    const prom: Promise<void> = new Promise((resolve) => {
      this.setState({
        firstStepValues: values,
      }, () => {
        resolve()

        this.setState({
          step: PASSWORD_STEP,
        })
      })
    })

    return prom
  }

  handlePasswordStepSubmit = async (values: PasswordStepValues) => {
    const savePromise: Promise<void> = new Promise((resolve) => {
      this.setState({
        passwordStepValues: values,
      }, () => {
        resolve()
      })
    })

    await savePromise
    await this.sendAsset()
  }

  sendAsset = async () => {
    try {
      const {
        firstStepValues: {
          asset,
          recipient,
          amount,
        },
        passwordStepValues: {
          privateKey,
        },
      } = this.state

      if (!privateKey) {
        throw new Error('Invalid private key')
      }

      // send transaction
      const sendTransactionPayload = {
        asset,
        recipient,
        amount,
        privateKey,
      }

      const {
        txHash,
      } = await executeDeferredAction(this.props.sendTransaction, sendTransactionPayload)

      // add pending transaction
      const addPendingTransactionPayload = {
        sendTransactionPayload,
        txHash,
      }

      await executeDeferredAction(this.props.addPendingTransaction, addPendingTransactionPayload)

      // #TODO: change this
      // transaction addedd successfully, finish
      this.props.close()
    } catch (err) {
      this.setState({
        sendTransactionError: err.message,
      })
    }
  }

  render() {
    const {
      step,
      firstStepValues,
      sendTransactionError,
    } = this.state

    return (
      <div className={styles.wizard}>
        <div className={styles.content}>
          <div className={styles.steps}>
            {(step === FIRST_STEP) && (
              <Fragment>
                <FirstStepForm
                  initialValues={firstStepValues}
                  onSubmit={this.handleFirstStepSubmit}
                />
                <div className={styles.message}>
                  <JText
                    value={t`The app doesn’t charge you any fees. 
                      But you have to pay the blockchain fee to create a new transaction.`}
                    color='gray'
                    whiteSpace='wrap'
                    align='center'
                  />
                </div>
              </Fragment>
            )}
            {(step === PASSWORD_STEP) && (
              <Fragment>
                <PasswordStepForm
                  onSubmit={this.handlePasswordStepSubmit}
                />
                {sendTransactionError && (
                  <ErrorMessage
                    goBack={this.goToPrevStep}
                    errorMessage={sendTransactionError}
                  />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsSendWizard
