// @flow strict

import * as React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'
import {
  Form,
  Field,
} from 'react-final-form'

import {
  JInputField,
  JRaisedButton,
} from 'components/base'

import {
  type FirstStepValues,
} from '../../DigitalAssetsSendWizard'

import styles from './firstStepForm.m.scss'

type SaveValuesFunction = (values: FirstStepValues) => Promise<void>

type Props = {|
  saveValues: SaveValuesFunction,
  initialValues: FirstStepValues,
|}

const validateAndSubmit =
  (saveValues: SaveValuesFunction) =>
    async (values: FirstStepValues) => {
      await saveValues(values)
    }

function FirstStep({
  saveValues,
  initialValues,
}: Props) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={validateAndSubmit(saveValues)}
      render={({
        handleSubmit, form, submitting, submitError,
      }) => (
        <form>
          <div className={classNames(
            styles.form,
            { [styles.submitting]: submitting },
          )}
          >
            {submitError && <div className='error'>{submitError}</div>}
            <Field
              component={JInputField}
              name='owner'
              color='gray'
              label={t`Current address`}
              isDisabled
            />
            <Field
              component={JInputField}
              name='recipient'
              color='gray'
              placeholder={t`Recipient address`}
            />
            <Field
              component={JInputField}
              name='asset'
              color='gray'
              label={t`Asset address`}
            />
            <Field
              component={JInputField}
              name='amount'
              color='gray'
              label={t`Amount`}
            />
            <JRaisedButton
              onClick={handleSubmit}
              color='blue'
              label={t`Confirm`}
              labelColor='white'
              isWide
            />
          </div>
        </form>
      )}
    />
  )
}

export default FirstStep
