// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { TitleHeader } from 'components'

import {
  Button,
  JInputField,
} from 'components/base'

import styles from './digitalAssetEditForm.m.scss'

type Props = {|
  +submit: FormFields => Promise<?FormFields>,
  +initialValues: FormFields,
  +i18n: I18n,
  +isLoading: boolean,
  +isAddressEditable: boolean,
|}

class DigitalAssetEditForm extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
    isAddressEditable: false,
  }

  checkFormReadyToSubmit = (values: FormFields): boolean => {
    const {
      name,
      symbol,
      address,
      decimals,
    }: FormFields = values

    return !!(
      (name || '').trim() &&
      (symbol || '').trim() &&
      (address || '').trim() &&
      !Number.isNaN(parseInt(decimals, 10))
    )
  }

  renderForm = ({
    values,
    handleSubmit,
    submitting: isSubmitting,
  }: FormRenderProps) => {
    const {
      i18n,
      isLoading,
      isAddressEditable,
    }: Props = this.props

    const isDisabled: boolean = isSubmitting || isLoading

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          component={JInputField}
          label={i18n._(
            'common.DigitalAssetEditForm.address.label',
            null,
            { defaults: 'Asset Address' },
          )}
          name='address'
          maxLength={40}
          isDisabled={isDisabled || !isAddressEditable}
        />
        <Field
          component={JInputField}
          label={i18n._(
            'common.DigitalAssetEditForm.name.label',
            null,
            { defaults: 'Name' },
          )}
          name='name'
          maxLength={32}
          isDisabled={isDisabled}
        />
        <Field
          component={JInputField}
          label={i18n._(
            'common.DigitalAssetEditForm.symbol.label',
            null,
            { defaults: 'Symbol' },
          )}
          name='symbol'
          maxLength={10}
          isDisabled={isDisabled}
        />
        <Field
          component={JInputField}
          label={i18n._(
            'common.DigitalAssetEditForm.decimals.label',
            null,
            { defaults: 'Decimals' },
          )}
          name='decimals'
          maxLength={3}
          isDisabled={isDisabled}
        />
        <Button
          type='submit'
          isLoading={isDisabled}
          isDisabled={!this.checkFormReadyToSubmit(values || {})}
        >
          {i18n._(
            'common.DigitalAssetEditForm.submit',
            null,
            { defaults: 'Save' },
          )}
        </Button>
      </form>
    )
  }

  render() {
    const {
      i18n,
      initialValues,
      submit: handleSubmit,
    }: Props = this.props

    return (
      <div className={styles.core}>
        <TitleHeader
          title={i18n._(
            'common.DigitalAssetEditForm.title',
            null,
            { defaults: 'Edit Asset' },
          )}
        />
        <Form
          onSubmit={handleSubmit}
          render={this.renderForm}
          initialValues={initialValues}
        />
      </div>
    )
  }
}

const DigitalAssetEditFormEnhanced = withI18n()(DigitalAssetEditForm)
export { DigitalAssetEditFormEnhanced as DigitalAssetEditForm }
