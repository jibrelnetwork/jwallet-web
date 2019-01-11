// @flow

import React, { Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import classNames from 'classnames'

import CloseableScreen from 'components/CloseableScreen'
import { JInputField } from 'components/base/JInput'
import { JText, JLoader } from 'components/base'

import './verifyView.scss'

type Props = {|
  +onClose: Function,
  +onUnavailable: () => void,
  +onSubmitPrivateKey: ({ privateKey: string }) => void,
  +onSubmitMnemonic: ({
    mnemonic: string,
    passphrase: string,
    derivationPath: string,
  }) => void,
  +isReadOnly: boolean,
  +isMnemonic: boolean,
  +isLoading: boolean,
|}

const noop = () => undefined

function VerifyView({
  onClose,
  onUnavailable,
  onSubmitPrivateKey,
  onSubmitMnemonic,
  isReadOnly,
  isMnemonic,
  isLoading,
}: Props) {
  if (!isReadOnly) {
    // FIXME: we should do it in controller or in router
    onUnavailable()
    return null
  }

  const props = isMnemonic ?
    {
      title: 'Add mnemonic',
      finalForm: {
        onSubmit: onSubmitMnemonic,
      },
      inputField: {
        name: 'mnemonic',
        placeholder: 'Mnemonic',
        rows: 6,
      },
    } :
    {
      title: 'Add private key',
      finalForm: {
        onSubmit: onSubmitPrivateKey,
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
      <div className='verify-view'>
        <Form
          onSubmit={isLoading ? noop : props.finalForm.onSubmit}
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
                {isLoading ?
                  <JLoader color='white' /> :
                  <JText
                    value='Save'
                  />
                }
              </button>
            </form>
          )}
        />
      </div>
    </CloseableScreen>
  )
}

export default VerifyView
