// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import offset from 'styles/offsets.m.scss'
import { gaSendEvent } from 'utils/analytics'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  Button,
  JInputField,
} from 'components/base'

import styles from './contactEditForm.m.scss'

export type FormValues = {|
  address: string,
  description: string, // note
  name: string,
|}

export type Props = {|
  +onEditFinish: (contact: FormValues) => any,
  +onDelete: (address: OwnerAddress) => any,
  +checkContactExistsByName: (name: string, address: OwnerAddress) => boolean,
  +goBack: () => any,
  +i18n: I18n,
  +initialValues: FormValues,
|}

class ContactEditFormComponent extends PureComponent<Props> {
  validate = (values: FormValues) => {
    const {
      i18n,
      checkContactExistsByName,
    }: Props = this.props

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

  handleSubmit = ({
    name,
    address,
    description,
  }: FormValues) => {
    this.props.onEditFinish({
      address,
      name: (name || '').trim(),
      description: (description || '').trim(),
    })

    gaSendEvent(
      'ContactManager',
      'ContactUpdated',
    )

    this.props.goBack()
  }

  handleDeleteClick = () => {
    this.props.onDelete(this.props.initialValues.address)
  }

  render() {
    const {
      i18n,
      initialValues,
    }: Props = this.props

    return (
      <Form
        render={({
          handleSubmit,
          submitting,
          pristine,
        }: FormRenderProps) => (
          <form
            onSubmit={handleSubmit}
            className={`${styles.form} ${offset.mb16}`}
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
