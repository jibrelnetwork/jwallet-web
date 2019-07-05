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
import { TitleHeader } from 'components'
import { checkAddressValid } from 'utils/address'

import offset from 'styles/offsets.m.scss'

import style from './contactsItemAdd.m.scss'

type FormValues = {|
  address: string,
  note: string,
  name: string,
|}

type Props = {|
  address: string,
  note: string,
  name: string,
  saveContact: (values: Contact) => any,
|}

export class ContactsItemAddView extends PureComponent<Props> {
  handleSubmit(values: FormValues) {
    const errors: $Shape<FormValues> = {}

    if (!checkAddressValid(values.address)) {
      // eslint-disable-next-line no-param-reassign, fp/no-mutation
      errors.address = t`Invalid address`
    }

    if (errors) {
      return errors
    }

    return this.props.saveContact({
      ...values,
      id: values.address,
    })
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
      <div className={style.core}>
        <TitleHeader
          title={t`Add Contact`}
        />
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
                isDisabled={submitting}
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
      </div>
    )
  }
}
