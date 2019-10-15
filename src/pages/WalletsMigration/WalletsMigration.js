// @flow strict

import Promise from 'bluebird'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  type FormRenderProps,
} from 'react-final-form'

import { migrate } from 'store/migrations'
import { WalletPasswordForm } from 'components'

import {
  gaSendEvent,
  gaSendException,
} from 'utils/analytics'

import styles from './walletsMigration.m.scss'

type Props = {|
  +i18n: I18n,
  +hint: string,
|}

const INITIAL_VALUES: FormFields = {
  password: '',
}

class WalletsMigration extends Component<Props> {
  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const { i18n }: Props = this.props

    gaSendEvent(
      'MigrateWallets',
      'PasswordEntered',
    )

    try {
      await migrate(values.password || '')

      gaSendEvent(
        'MigrateWallets',
        'WalletsMigrationSuccess',
      )

      window.location.reload()

      return null
    } catch (error) {
      console.error(error)

      gaSendException({
        exDescription: 'Wallets migration error',
        exFatal: true,
      })

      return {
        password: i18n._(
          'entity.Password.error.invalid',
          null,
          { defaults: 'Invalid password' },
        ),
      }
    }
  }

  renderForm = ({
    handleSubmit,
    values = {},
    submitting,
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

    return (
      <WalletPasswordForm
        handleSubmit={handleSubmit}
        values={values}
        hint={this.props.hint}
        description={i18n._(
          'WalletsMigration.description',
          null,
          // eslint-disable-next-line max-len
          { defaults: 'To migrate storage data, you need to enter security password. Please don\'t close the tab, this process will take a while.' },
        )}
        isSubmitting={submitting}
      />
    )
  }

  render() {
    return (
      <div className={styles.core}>
        <Form
          render={this.renderForm}
          onSubmit={this.handleSubmit}
          initialValues={INITIAL_VALUES}
        />
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  // $FlowFixMe
  if (state.password && state.password.persist && state.password.persist.version) {
    return {
      hint: state.password.persist.hint,
    }
  }

  return {
    // $FlowFixMe
    hint: (state.wallets && state.wallets.persist && state.wallets.persist.passwordOptions)
      ? state.wallets.persist.passwordOptions.passwordHint
      : '',
  }
}

const WalletsMigrationEnhanced = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
  ),
)(WalletsMigration)

export { WalletsMigrationEnhanced as WalletsMigration }
