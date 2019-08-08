// @flow strict

import React, { Component } from 'react'
import { actions } from 'redux-router5'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'
import { t } from '@lingui/macro'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import stylesOffsets from 'styles/offsets.m.scss'
import { Button } from 'components/base'
import { TitleHeader } from 'components'
import { toastsPlugin } from 'store/plugins'
import { type LanguageCode } from 'data/languages'

import {
  withLanguageChange,
  type WithLanguageChangeProps,
} from 'app/components'

import styles from './settingsLanguage.m.scss'
import { LanguagePicker } from './components/LanguagePicker/LanguagePicker'

type FormValues = {|
  language: LanguageCode,
|}

type Props = {|
  goBack: Function,
  i18n: I18nType,
  ...WithLanguageChangeProps,
|}

type OwnProps = {|
  i18n: I18nType,
  ...WithLanguageChangeProps,
|}

class SettingsLanguagePage extends Component<Props> {
  handleSubmit = async (values: FormValues) => {
    const {
      i18n,
      changeLanguage,
    }: Props = this.props

    await changeLanguage(values.language)

    toastsPlugin.showToast(i18n._(
      'SettingsLanguage.toast',
      null,
      { defaults: 'Language changed.' },
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
          component={LanguagePicker}
          label={i18n._(t('SettingsLanguage.LanguagePicker.label')`Language`)}
          name='language'
        />
        <Button
          type='submit'
          name='send'
          isLoading={isSubmitting}
        >
          {i18n._(t('SettingsLanguage.actions.ok')`OK`)}
        </Button>
      </form>
    )
  }

  render() {
    const {
      i18n,
      language,
    } = this.props

    const initialValues = {
      language,
    }

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBackClick}
          title={i18n._('SettingsLanguage.header.title')}
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

const mapDispatchToProps = {
  goBack: () => actions.navigateTo('Settings'),
}

export const SettingsLanguage = compose(
  withI18n(),
  withLanguageChange,
  connect<Props, OwnProps, _, _, _, _>(
    null,
    mapDispatchToProps,
  ),
)(SettingsLanguagePage)
