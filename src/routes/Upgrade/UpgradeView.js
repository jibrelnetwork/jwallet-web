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
  +validateMnemonic: (UpgradeMnemonicFormFieldValues) => UpgradeMnemonicFormFieldErrors,
  +validatePrivateKey: (UpgradePrivateKeyFormFieldValues) => UpgradePrivateKeyFormFieldErrors,
  +isLoading: boolean,
  +isReadOnly: boolean,
  +isMnemonic: boolean,
  +isInvalidPassword: boolean,
|}

const noop = () => undefined

// FIXME: if we move password errors to validation function, we could get rid of this ugly hack
// This is factory render function, so:
// eslint-disable-next-line react/display-name
const renderPasswordField = (isInvalidPassword: boolean) => (fieldProps) => {
  if (isInvalidPassword) {
    return (
      <JInputField
        {...fieldProps}
        meta={Object.assign(
          {},
          fieldProps.meta,
          { error: 'Incorrect password' }
        )}
      />
    )
  }

  return <JInputField {...fieldProps} />
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
  validateMnemonic,
  validatePrivateKey,
}: Props) {
  if (!isReadOnly) {
    // FIXME: we should do it in controller or in router
    onUnavailable()
    return null
  }

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
              <Field
                name='password'
                placeholder='Payment password'
                type='password'
                color='gray'
                isDisabled={isLoading}
                render={renderPasswordField(isInvalidPassword)}
              />
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
