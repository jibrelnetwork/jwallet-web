// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { TitleHeader } from 'components'
import { Button } from 'components/base'
import { toastsPlugin } from 'store/plugins'
import { type FiatCurrencyCode } from 'data'
import { gaSendEvent } from 'utils/analytics'
import { setFiatCurrency } from 'store/modules/user'
import { selectFiatCurrency } from 'store/selectors/user'

import stylesOffsets from 'styles/offsets.m.scss'

import { CurrencyPicker } from './components/CurrencyPicker/CurrencyPicker'

import styles from './settingsCurrency.m.scss'

type FormValues = {|
  +currencyCode: FiatCurrencyCode,
|}

type Props = {|
  +setFiatCurrency: (code: FiatCurrencyCode) => any,
  +i18n: I18n,
  +selectedCurrencyCode: FiatCurrencyCode,
|}

class SettingsCurrencyPage extends Component<Props> {
  static defaultProps = {
    selectedCurrencyCode: 'USD',
  }

  handleSubmit = (values: FormValues) => {
    const { i18n }: Props = this.props
    this.props.setFiatCurrency(values.currencyCode)

    toastsPlugin.showToast(i18n._(
      'SettingsCurrency.toast',
      null,
      { defaults: 'Currency changed.' },
    ))

    gaSendEvent(
      'Settings',
      'CurrencyChanged',
    )
  }

  renderForm = ({
    handleSubmit,
    submitting: isSubmitting,
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

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
    }: Props = this.props

    const initialValues = {
      currencyCode: selectedCurrencyCode,
    }

    return (
      <div className={styles.core}>
        <TitleHeader title={i18n._('SettingsCurrency.title', null, { defaults: 'Currency' })} />
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
  return {
    selectedCurrencyCode: selectFiatCurrency(state),
  }
}

const mapDispatchToProps = {
  setFiatCurrency,
}

export const SettingsCurrency = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SettingsCurrencyPage)
