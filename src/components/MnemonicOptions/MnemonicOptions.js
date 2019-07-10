// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'

import { i18n } from 'i18n/lingui'
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
|}

type StateProps = {|
  +isOpened: boolean,
|}

const DERIVATION_PATH_MESSAGE: string = i18n._(
  'common.MnemonicOptions.derivationPath.info',
  null,
  // eslint-disable-next-line max-len
  { defaults: 'Derivation path and BIP39 mnemonic passphrase affect generation of blockchain addresses from mnemonic. Usually you need to edit them to import mnemonic from a hardwallet. In all other cases just leave it as is.' },
)

export class MnemonicOptions extends Component<Props, StateProps> {
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
    }: Props = this.props

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
