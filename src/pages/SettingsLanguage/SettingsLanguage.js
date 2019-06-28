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
import { type LanguageCode } from 'data'

import stylesOffsets from 'styles/offsets.m.scss'

import { LanguagePicker } from './components/LanguagePicker/LanguagePicker'

import styles from './settingsLanguage.m.scss'

type FormValues = {|
  language: string,
|}

type Props = {|
  goBack: Function,
  selectedLanguage: LanguageCode,
|}

class SettingsLanguagePage extends Component<Props> {
  static defaultProps = {
    selectedLanguage: 'en',
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
          component={LanguagePicker}
          name='language'
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
      selectedLanguage,
    } = this.props

    const initialValues = {
      language: selectedLanguage,
    }

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBackClick}
          title={t`Language`}
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

export const SettingsLanguage = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsLanguagePage)
