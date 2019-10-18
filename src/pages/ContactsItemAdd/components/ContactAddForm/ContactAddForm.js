// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import offset from 'styles/offsets.m.scss'
import { gaSendEvent } from 'utils/analytics'

import {
  checkAddressValid,
  getAddressChecksum,
} from 'utils/address'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  Button,
  JInputField,
} from 'components/base'

import styles from './contactAddForm.m.scss'

export type FormValues = {|
  address: string,
  description: string, // note
  name: string,
|}

export type Props = {|
  +checkContactExistsByAddress: (address: OwnerAddress) => boolean,
  +checkContactExistsByName: (name: string, contcactId: string) => boolean,
  +addContact: (contact: FormValues) => any,
  +goBack: () => any,
  +i18n: I18n,
  +initialValues: FormValues,
|}

class ContactAddFormComponent extends PureComponent<Props> {
  validate = (values: FormValues): ?FormFields => {
    const {
      i18n,
      checkContactExistsByAddress,
      checkContactExistsByName,
    }: Props = this.props

    const {
      name,
      address,
    }: FormValues = values

    if (!checkAddressValid(address)) {
      return {
        address: i18n._(
          'ContactsEditForm.input.address.error.invalid',
          null,
          { defaults: 'Invalid address' },
        ),
      }
    }

    if (checkContactExistsByAddress(address)) {
      return {
        address: i18n._(
          'ContactsEditForm.input.address.error.exists',
          null,
          { defaults: 'Contact with this address already exists' },
        ),
      }
    }

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

  handleSubmit = (values: FormValues): ?FormFields => {
    const errors: ?FormFields = this.validate(values)

    if (errors) {
      return errors
    }

    const {
      name,
      address,
      description,
    }: FormValues = values

    this.props.addContact({
      name: (name || '').trim(),
      address: getAddressChecksum(address),
      description: (description || '').trim(),
    })

    gaSendEvent(
      'ContactManager',
      'AddedNewContact',
    )

    this.props.goBack()

    return null
  }

  render() {
    const {
      i18n,
      initialValues,
    }: Props = this.props

    const { address } = initialValues

    return (
      <Form
        render={({
          handleSubmit,
          values = {},
          submitting: isSubmitting,
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
              isDisabled={isSubmitting}
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
              isDisabled={isSubmitting || address}
              maxLength={42}
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
              isDisabled={isSubmitting}
              maxLength={256}
            />
            <Button
              type='submit'
              isLoading={isSubmitting}
              isDisabled={!values.address}
            >
              {i18n._('ContactForm.actions.save', null, { defaults: 'Save' })}
            </Button>
          </form>
        )}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
      />
    )
  }
}

export const ContactAddForm = withI18n()(ContactAddFormComponent)
