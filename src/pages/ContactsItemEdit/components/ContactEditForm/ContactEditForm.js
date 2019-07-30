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

import offset from 'styles/offsets.m.scss'
import style from './contactEditForm.m.scss'

export type FormValues = {|
  address: string,
  description: string, // note
  name: string,
|}

export type Props = {|
  +initialValues: FormValues,
  +i18n: I18nType,
  +onEditFinish: (contact: FormValues) => any,
  +onDelete: (address: OwnerAddress) => any,
  +goBack: () => any,
|}

class ContactEditFormComponent extends PureComponent<Props> {
  handleSubmit = (values: FormValues) => {
    this.props.onEditFinish(values)
    this.props.goBack()
  }

  handleDeleteClick = () => {
    this.props.onDelete(this.props.initialValues.address)
  }

  render() {
    const {
      i18n,
      initialValues,
    } = this.props

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
                'ContactForm.input.name.title',
                null,
                { defaults: 'Name' },
              )}
              name='name'
              isDisabled={submitting}
              maxlength={32}
            />
            <Field
              component={JInputField}
              label={i18n._(
                'ContactForm.input.address.title',
                null,
                { defaults: 'Address' },
              )}
              name='address'
              isDisabled
            />
            <Field
              className={offset.mb32}
              component={JInputField}
              label={i18n._(
                'ContactForm.input.note.title',
                null,
                { defaults: 'Note' },
              )}
              name='description'
              infoMessage={i18n._(
                'ContactForm.input.note.info',
                null,
                { defaults: 'This note is only visible to you.' },
              )}
              isDisabled={submitting}
              maxlength={256}
            />
            <Button
              type='submit'
              className={offset.mb16}
              isLoading={submitting}
            >
              {i18n._('ContactForm.actions.save', null, { defaults: 'Save' })}
            </Button>
            <Button
              type='button'
              isLoading={submitting}
              theme='secondary'
              onClick={this.handleDeleteClick}
            >
              {i18n._('ContactForm.actions.delete', null, { defaults: 'Delete Contact' })}
            </Button>
          </form>
        )}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
      />
    )
  }
}

export const ContactEditForm = withI18n()(ContactEditFormComponent)
