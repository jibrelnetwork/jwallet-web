// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actions } from 'redux-router5'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { TitleHeader } from 'components'
import { Button } from 'components/base'
import { toastsPlugin } from 'store/plugins'
import { type FiatCurrencyCode } from 'data'
import { setFiatCurrency } from 'store/modules/user'
import { selectFiatCurrency } from 'store/selectors/user'

import stylesOffsets from 'styles/offsets.m.scss'

import { CurrencyPicker } from './components/CurrencyPicker/CurrencyPicker'

import styles from './settingsCurrency.m.scss'

type FormValues = {|
  +currencyCode: FiatCurrencyCode,
|}

type Props = {|
  +goBack: () => any,
  +setFiatCurrency: (code: FiatCurrencyCode) => any,
  +selectedCurrencyCode: FiatCurrencyCode,
  +i18n: I18nType,
|}

class SettingsCurrencyPage extends Component<Props> {
  static defaultProps = {
    selectedCurrencyCode: 'USD',
  }

  handleSubmit = (values: FormValues) => {
    this.props.setFiatCurrency(values.currencyCode)

    toastsPlugin.showToast(this.props.i18n._(
      'SettingsCurrency.toast',
      null,
      { defaults: 'Currency changed' },
    ))
  }

  handleBackClick = () => {
    if (this.props.goBack) {
      this.props.goBack()
    }
  }

  renderForm = (props: FormRenderProps) => {
    const {
      handleSubmit,
      submitting: isSubmitting,
    } = props

    const {
      i18n,
    } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          className={stylesOffsets.mb16}
          component={CurrencyPicker}
          name='currencyCode'
        />
        <Button
          type='submit'
          name='send'
          isLoading={isSubmitting}
        >
          {i18n._('SettingsCurrency.form.submit', null, { defaults: 'OK' })}
        </Button>
      </form>
    )
  }

  render() {
    const {
      selectedCurrencyCode,
      i18n,
    } = this.props

    const initialValues = {
      currencyCode: selectedCurrencyCode,
    }

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBackClick}
          title={i18n._('SettingsCurrency.title', null, { defaults: 'Currency' })}
        />
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderForm}
          initialValues={initialValues}
        />
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  const selectedCurrencyCode = selectFiatCurrency(state)

  return {
    selectedCurrencyCode,
  }
}

const mapDispatchToProps = {
  goBack: () => actions.navigateTo('Settings'),
  setFiatCurrency,
}

export const SettingsCurrency = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SettingsCurrencyPage)
