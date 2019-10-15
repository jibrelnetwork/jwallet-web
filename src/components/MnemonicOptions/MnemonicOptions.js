// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'
import { Field } from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import { validateDerivationPath } from 'utils/wallets'

import {
  Button,
  JInputField,
} from 'components/base'

type Props = {|
  +derivationPath: string,
  +isFormDisabled: boolean,
  +i18n: I18nType,
|}

type StateProps = {|
  +isOpened: boolean,
|}

class MnemonicOptionsComponent extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpened: false,
    }
  }

  handleOpen = () => {
    this.setState({ isOpened: true })
  }

  render() {
    const {
      derivationPath,
      isFormDisabled,
      i18n,
    }: Props = this.props

    const DERIVATION_PATH_MESSAGE: string = i18n._(
      'common.MnemonicOptions.derivationPath.info',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'Derivation path and BIP39 mnemonic passphrase affect generation of blockchain addresses from mnemonic. Usually you need to edit them to import mnemonic from a hardwallet. In all other cases just leave it as is.' },
    )

    return this.state.isOpened ? (
      <Fragment>
        <Field
          component={JInputField}
          label={i18n._(
            'common.MnemonicOptions.mnemonicPassphrase.title',
            null,
            { defaults: 'Mnemonic Passphrase (Optional)' },
          )}
          name='passphrase'
          maxLength={1000}
          isDisabled={isFormDisabled}
        />
        <Field
          component={JInputField}
          label={i18n._(
            'common.MnemonicOptions.derivationPath.title',
            null,
            { defaults: 'Derivation Path (Optional)' },
          )}
          infoMessage={DERIVATION_PATH_MESSAGE}
          errorMessage={validateDerivationPath(derivationPath)}
          name='derivationPath'
          maxLength={100}
          isDisabled={isFormDisabled}
        />
      </Fragment>
    ) : (
      <Button
        onClick={this.handleOpen}
        className={ofssetsStyle.mt16}
        theme='secondary'
      >
        {i18n._(
          'common.MnemonicOptions.actions.advanced',
          null,
          { defaults: 'Advanced' },
        )}
      </Button>
    )
  }
}

export const MnemonicOptions = withI18n()(MnemonicOptionsComponent)
