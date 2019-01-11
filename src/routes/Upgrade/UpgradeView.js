// @flow

import classNames from 'classnames'
import React, { Fragment } from 'react'

import {
  Form,
  Field,
} from 'react-final-form'

import CloseableScreen from 'components/CloseableScreen'
import { JInputField } from 'components/base/JInput'

import {
  JText,
  JLoader,
} from 'components/base'

import './upgradeView.scss'

type Props = {|
  +onClose: Function,
  +onUnavailable: () => void,
  +onSubmitMnemonic: (UpgradeMnemonicFormFieldValues) => void,
  +onSubmitPrivateKey: (UpgradePrivateKeyFormFieldValues) => void,
  +isLoading: boolean,
  +isReadOnly: boolean,
  +isMnemonic: boolean,
  +isInvalidPassword: boolean,
|}

const noop = () => undefined

const validatePrivateKey = ({ privateKey }: UpgradePrivateKeyFormFieldValues) => {
  if (!privateKey) {
    return {
      privateKey: 'Private key is required',
    }
  }

  if (privateKey.length < 64) {
    return {
      privateKey: `${privateKey.length} characters is too short! Private key is 64 characters`,
    }
  }

  return {}
}

const validateMnemonic = ({
  mnemonic,
  derivationPath,
}: UpgradeMnemonicFormFieldValues) => {
  /* eslint-disable fp/no-mutation */
  const errors = {}

  if (!mnemonic) {
    errors.mnemonic = 'Mnemonic is required'
  }

  if (derivationPath) {
    // FIXME: should validate derivation path
  }

  return errors
  /* eslint-enable fp/no-mutation */
}

function UpgradeView({
  onClose,
  onUnavailable,
  onSubmitMnemonic,
  onSubmitPrivateKey,
  isLoading,
  isReadOnly,
  isMnemonic,
  isInvalidPassword,
}: Props) {
  if (!isReadOnly) {
    // FIXME: we should do it in controller or in router
    onUnavailable()
    return null
  }

  console.log(isInvalidPassword)

  const props = isMnemonic ? {
    title: 'Add mnemonic',
    finalForm: {
      onSubmit: onSubmitMnemonic,
      validate: validateMnemonic,
    },
    inputField: {
      name: 'mnemonic',
      placeholder: 'Mnemonic',
      rows: 6,
    },
  } : {
    title: 'Add private key',
    finalForm: {
      onSubmit: onSubmitPrivateKey,
      validate: validatePrivateKey,
    },
    inputField: {
      name: 'privateKey',
      placeholder: 'Private key',
      rows: 0,
    },
  }

  return (
    <CloseableScreen
      close={onClose}
      title={props.title}
    >
      <div className='upgrade-view'>
        <Form
          onSubmit={isLoading ? noop : props.finalForm.onSubmit}
          validate={props.finalForm.validate}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className='form'
            >
              <Field
                {...props.inputField}
                component={JInputField}
                color='gray'
                isDisabled={isLoading}
                isAutoFocus
              />
              {isMnemonic && (
                <Fragment>
                  <Field
                    name='passphrase'
                    placeholder='BIP39 Mnemonic passphrase (optional)'
                    component={JInputField}
                    color='gray'
                    isDisabled={isLoading}
                  />
                  <Field
                    name='derivationPath'
                    placeholder='Derivation path (optional)'
                    component={JInputField}
                    color='gray'
                    isDisabled={isLoading}
                  />
                </Fragment>
              )}
              <button
                className={classNames(
                  'submit j-raised-button -blue',
                  isLoading && '-disabled'
                )}
                type='submit'
              >
                {isLoading
                  ? <JLoader color='white' />
                  : <JText value='Save' />
                }
              </button>
            </form>
          )}
        />
      </div>
    </CloseableScreen>
  )
}

export default UpgradeView
