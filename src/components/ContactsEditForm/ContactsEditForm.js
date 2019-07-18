// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

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
  +address: string,
  +note: string,
  +name: string,
  +i18n: I18nType,
  +saveForm: (values: Contact) => Promise<?FormValues>,
|}

class ContactsEditFormComponent extends PureComponent<Props> {
  handleSubmit = async (values: FormValues) => {
    const { i18n } = this.props
    const errors: $Shape<FormValues> = {}

    if (!checkAddressValid(values.address)) {
      // eslint-disable-next-line no-param-reassign, fp/no-mutation
      errors.address = i18n._(
        'ContactsItemAdd.input.address.error.invalid',
        null,
        { defaults: 'Invalid address' },
      )
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
      i18n,
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
              label={i18n._(
                'ContactsItemAdd.input.name.title',
                null,
                { defaults: 'Name' },
              )}
              name='name'
              isDisabled={submitting}
            />
            <Field
              component={JInputField}
              label={i18n._(
                'ContactsItemAdd.input.address.title',
                null,
                { defaults: 'Address' },
              )}
              name='address'
              isDisabled={submitting || address}
            />
            <Field
              className={offset.mb32}
              component={JInputField}
              label={i18n._(
                'ContactsItemAdd.input.note.title',
                null,
                { defaults: 'Note' },
              )}
              name='note'
              infoMessage={i18n._(
                'ContactsItemAdd.input.note.info',
                null,
                { defaults: 'This note is only visible to you.' },
              )}
              isDisabled={submitting}
            />
            <Button
              type='submit'
              isLoading={submitting}
            >
              {i18n._('ContactsItemAdd.actions.save', null, { defaults: 'Save' })}
            </Button>
          </form>
        )}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
      />
    )
  }
}

export const ContactsEditForm = withI18n()(ContactsEditFormComponent)
