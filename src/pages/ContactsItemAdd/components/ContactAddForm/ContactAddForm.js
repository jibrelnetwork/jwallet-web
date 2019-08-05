// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'
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

import offset from 'styles/offsets.m.scss'
import style from './contactAddForm.m.scss'

export type FormValues = {|
  address: string,
  description: string, // note
  name: string,
|}

export type Props = {|
  +initialValues: FormValues,
  +i18n: I18nType,
  +checkContactExistsByAddress: (address: OwnerAddress) => boolean,
  +checkContactExistsByName: (name: string, contcactId: string) => boolean,
  +addContact: (contact: FormValues) => any,
  +goBack: () => any,
|}

class ContactAddFormComponent extends PureComponent<Props> {
  validate = (values: FormValues) => {
    const {
      i18n,
      checkContactExistsByAddress,
      checkContactExistsByName,
    } = this.props

    const {
      name,
      address,
    } = values

    if (!checkAddressValid(address)) {
      return {
        address: i18n._(
          'ContactsEditForm.input.address.error.invalid',
          null,
          { defaults: 'Invalid address' },
        ),
      }
    }

    if (checkContactExistsByAddress(name)) {
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

  handleSubmit = (values: FormValues) => {
    const addressWithChecksum = getAddressChecksum(values.address)

    this.props.addContact({
      ...values,
      address: addressWithChecksum,
    })

    this.props.goBack()
  }

  render() {
    const {
      i18n,
      initialValues,
    } = this.props

    const { address } = initialValues

    return (
      <Form
        render={({
          handleSubmit,
          submitting,
          valid: isValid,
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
              isDisabled={submitting || address}
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
              isDisabled={!isValid}
              isLoading={submitting}
            >
              {i18n._('ContactForm.actions.save', null, { defaults: 'Save' })}
            </Button>
          </form>
        )}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
      />
    )
  }
}

export const ContactAddForm = withI18n()(ContactAddFormComponent)
