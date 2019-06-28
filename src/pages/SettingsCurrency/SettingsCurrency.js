// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import { t } from 'ttag'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { TitleHeader } from 'components'
import { Button } from 'components/base'
import { type FiatCurrencyCode } from 'data'

import stylesOffsets from 'styles/offsets.m.scss'

import { CurrencyPicker } from './components/CurrencyPicker/CurrencyPicker'

import styles from './settingsCurrency.m.scss'

type FormValues = {|
  currencyCode: string,
|}

type Props = {|
  goBack: Function,
  selectedCurrencyCode: FiatCurrencyCode,
|}

class SettingsCurrencyPage extends Component<Props> {
  static defaultProps = {
    selectedCurrencyCode: 'USD',
  }

  handleSubmit = (values: FormValues) => {
    alert(`Currency: ${JSON.stringify(values)}`)
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
          {t`OK`}
        </Button>
      </form>
    )
  }

  render() {
    const {
      selectedCurrencyCode,
    } = this.props

    const initialValues = {
      currencyCode: selectedCurrencyCode,
    }

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBackClick}
          title={t`Currency`}
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

function mapStateToProps() {
  return {

  }
}

const mapDispatchToProps = {
  goBack: () => actions.navigateTo('Settings'),
}

export const SettingsCurrency = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsCurrencyPage)
