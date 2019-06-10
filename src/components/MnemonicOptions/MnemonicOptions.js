// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'

import { t } from 'ttag'
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

const DERIVATION_PATH_MESSAGE: string = t`Derivation path and BIP39 mnemonic passphrase 
affect generation of blockchain addresses from mnemonic. Usually you need to edit them to import 
mnemonic from a hardwallet. In all other cases just leave it as is.`

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
          label={t`Mnemonic Passphrase (Optional)`}
          name='passphrase'
          isDisabled={isFormDisabled}
        />
        <Field
          component={JInputField}
          label={t`Derivation Path (Optional)`}
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
        {t`Advanced`}
      </Button>
    )
  }
}
