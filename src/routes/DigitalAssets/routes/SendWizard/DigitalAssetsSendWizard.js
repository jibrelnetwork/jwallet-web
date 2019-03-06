// @flow

import React, {
  Component,
  Fragment,
} from 'react'
import { t } from 'ttag'
import { Scrollbars } from 'react-custom-scrollbars'

import { JText } from 'components/base'
import { Deffered } from 'utils/misc'

import {
  type SendTransactionPayload,
  type SendTransactionResult,
  type AddPendingTransactionPayload,
  typeof sendTransaction as SendTransactionFunction,
  typeof addPendingTransaction as AddPendingTransactionFunction,
} from 'store/modules/digitalAssetsSendWizard'

import {
  HeaderPanel,
  FirstStepForm,
  PasswordStepForm,
  ErrorMessage,
} from './components'

import styles from './digitalAssetsSendWizard.m.scss'

export const FIRST_STEP: 1 = 1
export const PASSWORD_STEP: 2 = 2
export type WizardStep = typeof FIRST_STEP | typeof PASSWORD_STEP

type Props = {|
  +close: () => void,
  +sendTransaction: SendTransactionFunction,
  +addPendingTransaction: AddPendingTransactionFunction,
  +owner: OwnerAddress,
  +location: {
    +search: string,
  },
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
  isLoading: boolean,
  firstStepValues: FirstStepValues,
  passwordStepValues: PasswordStepValues,
  sendTransactionError: string,
|}

class DigitalAssetsSendWizard extends Component<Props, State> {
  static defaultProps = {
    close: () => null,
    location: {
      search: '',
    },
  }

  state: State = {
    step: FIRST_STEP,
    isLoading: false,
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

  saveFirstStepValues = (values: FirstStepValues) => {
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

  savePasswordStep = async (values: PasswordStepValues) => {
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
      const sendTransactionPayload: SendTransactionPayload = {
        asset,
        recipient,
        amount,
        privateKey,
      }
      const sendTransactionResolver: Deffered<SendTransactionResult> = new Deffered()

      this.props.sendTransaction(sendTransactionPayload, sendTransactionResolver)

      const {
        result: {
          txHash,
        },
      } = await sendTransactionResolver.promise

      // add pending transaction
      const addPendingTransactionPayload: AddPendingTransactionPayload = {
        sendTransactionPayload,
        txHash,
      }
      const addPendingTransactionResolver: Deffered<void> = new Deffered()

      this.props.addPendingTransaction(addPendingTransactionPayload, addPendingTransactionResolver)

      await addPendingTransactionResolver.promise

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
      isLoading,
      firstStepValues,
      sendTransactionError,
    } = this.state

    return (
      <div className={styles.wizard}>
        <HeaderPanel
          goToPrevStep={this.goToPrevStep}
          currentStep={step}
          isLoading={isLoading}
        />
        <div className={styles.content}>
          <Scrollbars autoHide>
            <div className={styles.steps}>
              {(step === FIRST_STEP) && (
                <Fragment>
                  <FirstStepForm
                    initialValues={firstStepValues}
                    saveValues={this.saveFirstStepValues}
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
                    saveValues={this.savePasswordStep}
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
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsSendWizard
