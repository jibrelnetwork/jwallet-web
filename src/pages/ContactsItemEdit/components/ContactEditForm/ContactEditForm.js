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
  +checkContactExistsByName: (name: string, address: OwnerAddress) => boolean,
  +goBack: () => any,
|}

class ContactEditFormComponent extends PureComponent<Props> {
  validate = (values: FormValues) => {
    const {
      checkContactExistsByName,
      i18n,
    } = this.props

    const {
      name,
      address,
    } = values

    if (checkContactExistsByName(name, address)) {
      return {
        name: i18n._(
          'ContactsEditForm.input.name.error.exists',
          null,
          { defaults: 'Contact with this name already exists' },
        ),
      }
    }

    return null
  }

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
          pristine,
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
              maxLength={32}
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
              maxLength={256}
            />
            <Button
              type='submit'
              className={offset.mb16}
              isLoading={submitting}
              isDisabled={pristine}
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
        validate={this.validate}
        initialValues={initialValues}
      />
    )
  }
}

export const ContactEditForm = withI18n()(ContactEditFormComponent)
