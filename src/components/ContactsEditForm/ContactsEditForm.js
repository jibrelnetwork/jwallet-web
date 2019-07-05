// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  Button,
  JInputField,
} from 'components/base'
import { checkAddressValid } from 'utils/address'

import offset from 'styles/offsets.m.scss'
import style from './contactsEditForm.m.scss'

type FormValues = {|
  address: string,
  note: string,
  name: string,
|}

export type Props = {|
  address: string,
  note: string,
  name: string,
  saveForm: (values: Contact) => Promise<?FormValues>,
|}

export class ContactsEditForm extends PureComponent<Props> {
  handleSubmit = async (values: FormValues) => {
    const errors: $Shape<FormValues> = {}

    if (!checkAddressValid(values.address)) {
      // eslint-disable-next-line no-param-reassign, fp/no-mutation
      errors.address = t`Invalid address`
    }

    if (errors) {
      return errors
    }

    const err = await this.props.saveForm({
      ...values,
      id: values.address,
    })

    return err || {}
  }

  render() {
    const {
      address = '',
      name = '',
      note = '',
    } = this.props

    const initialValues: FormValues = {
      address,
      name,
      note,
    }

    return (
      <Form
        render={({
          handleSubmit,
          submitting,
        }: FormRenderProps) => (
          <form
            onSubmit={handleSubmit}
            className={`${style.form} ${offset.mb16}`}
          >
            <Field
              component={JInputField}
              label={t`Name`}
              name='name'
              isDisabled={submitting}
            />
            <Field
              component={JInputField}
              label={t`Address`}
              name='address'
              isDisabled={submitting || address}
            />
            <Field
              className={offset.mb32}
              component={JInputField}
              label={t`Note`}
              name='note'
              infoMessage={t`This note is only visible to you.`}
              isDisabled={submitting}
            />
            <Button
              type='submit'
              isLoading={submitting}
            >
              {t`Save`}
            </Button>
          </form>
        )}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
      />
    )
  }
}
