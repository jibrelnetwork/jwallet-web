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

import { toastsPlugin } from 'store/plugins'
import { gaSendEvent } from 'utils/analytics'
import { WalletPasswordForm } from 'components'
import { migrateWallets } from 'store/migrations/wallets'
import { migratePassword } from 'store/migrations/password'
import { applyWalletsMigration } from 'store/modules/wallets'
import { applyPasswordMigration } from 'store/modules/password'

import styles from './walletsMigration.m.scss'

type Props = {|
  +dispatch: Function,
  +migrateData: (
    password: string,
    dispatch: Function,
  ) => Promise<?FormFields>,
  +i18n: I18n,
  +hint: string,
|}

const INITIAL_VALUES: FormFields = {
  password: '',
}

class WalletsMigration extends Component<Props> {
  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const {
      dispatch,
      i18n,
    }: Props = this.props

    gaSendEvent(
      'MigrateWallets',
      'PasswordEntered',
    )

    try {
      const result = await this.props.migrateData(
        values.password || '',
        dispatch,
      )

      gaSendEvent(
        'MigrateWallets',
        'WalletsMigrationSuccess',
      )

      toastsPlugin.showToast(i18n._(
        'WalletsMigration.toast',
        null,
        { defaults: 'Wallets data successfully updated' },
      ))

      return result
    } catch (error) {
      gaSendEvent(
        'MigrateWallets',
        'WalletsMigrationError',
      )

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

function migrateData(state: AppState) {
  return async (
    password: string,
    dispatch: Function,
  ): Promise<?FormFields> => {
    const passwordData: PasswordPersist = await migratePassword(state)
    dispatch(applyPasswordMigration(passwordData))

    const walletsData: WalletsPersist = await migrateWallets(
      {
        ...state,
        password: {
          persist: passwordData,
        },
      },
      password,
    )

    dispatch(applyWalletsMigration(walletsData))
  }
}

function mapStateToProps(state: AppState) {
  const passwordVersion: number = state.password && state.password.persist
    ? state.password.persist.version
    : 0

  return {
    migrateData: migrateData(state),
    hint: passwordVersion
      ? state.password.persist.hint
      // $FlowFixMe
      : (state.wallets && state.wallets.persist && state.wallets.persist.passwordOptions)
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
