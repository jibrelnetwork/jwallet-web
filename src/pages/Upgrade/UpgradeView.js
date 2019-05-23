// @flow

import React, { Fragment } from 'react'
import { t } from 'ttag'

import {
  Form,
  Field,
} from 'react-final-form'

import CloseableScreen from 'components/CloseableScreen'
import { JInputField } from 'components/base/JInput'

import {
  Button,
} from 'components/base'

import './upgradeView.scss'

export type Props = {|
  +onClose: Function,
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
const renderNewPasswordField = (isInvalidPassword: boolean) => (fieldProps) => {
  if (isInvalidPassword) {
    return (
      <JInputField
        {...fieldProps}
        meta={Object.assign(
          {},
          fieldProps.meta,
          { error: t`Incorrect password` },
        )}
      />
    )
  }

  return <JInputField {...fieldProps} />
}

function UpgradeView({
  onClose,
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
    return null
  }

  const data = isMnemonic ? {
    title: t`Add mnemonic`,
    finalForm: {
      onSubmit: onSubmitMnemonic,
      validate: validateMnemonic,
    },
    inputField: {
      name: 'mnemonic',
      placeholder: t`Mnemonic`,
      rows: 6,
    },
  } : {
    title: t`Add private key`,
    finalForm: {
      onSubmit: onSubmitPrivateKey,
      validate: validatePrivateKey,
    },
    inputField: {
      name: 'privateKey',
      placeholder: t`Private key`,
      rows: 0,
    },
  }

  return (
    <CloseableScreen
      close={isLoading ? noop : onClose}
      title={data.title}
    >
      <div className='upgrade-view'>
        <Form
          onSubmit={isLoading ? noop : data.finalForm.onSubmit}
          validate={data.finalForm.validate}
          render={({
            handleSubmit,
            invalid,
          }) => (
            <form
              onSubmit={handleSubmit}
              className='form'
            >
              <Field
                {...data.inputField}
                component={JInputField}
                color='gray'
                isAutoFocus
              />
              {isMnemonic && (
                <Fragment>
                  <Field
                    name='passphrase'
                    placeholder={t`BIP39 Mnemonic passphrase (optional)`}
                    component={JInputField}
                    color='gray'
                  />
                  <Field
                    name='derivationPath'
                    placeholder={t`Derivation path (optional)`}
                    component={JInputField}
                    color='gray'
                  />
                </Fragment>
              )}
              <Field
                name='password'
                placeholder={t`Payment password`}
                type='password'
                color='gray'
                isDisabled={isLoading}
                render={renderNewPasswordField(isInvalidPassword)}
              />
              <Button
                type='submit'
                disabled={(isLoading || invalid)}
              >{t`Save`}
              </Button>
            </form>
          )}
        />
      </div>
    </CloseableScreen>
  )
}

export default UpgradeView
