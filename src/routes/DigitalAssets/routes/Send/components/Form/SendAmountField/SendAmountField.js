// @flow strict

import * as React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { getErrorMessage } from 'utils/form'
import {
  JFieldMessage,
  JIcon,
} from 'components/base'

import fieldStyle from './sendAmountField.m.scss'

// #TODO: Fix types

type Props = {|
  blockchainFee: string,
  blockchainFeeCurrency: string,
  className: string,
  currency: string,
  fiatCurrency: string,
  fiatAmount: string,
  input: FinalFormInput,
  maxValue: string,
  meta: FinalFormMeta,
  validateType: FinalFormValidateType,
|}

const handleMaxClick = (input: FinalFormInput, maxValue: string) => () => input.onChange(maxValue)

const handleClearClick = (input: FinalFormInput) => () => input.onChange('')

const LABEL_TEXT = t`Amount`

function SendAmountField({
  blockchainFee,
  blockchainFeeCurrency,
  className,
  currency,
  fiatCurrency,
  fiatAmount,
  input,
  maxValue,
  meta,
  validateType,
}: Props) {
  const isActive = meta.active || !!input.value
  const errorMessage = getErrorMessage(meta, validateType)

  return (
    <div className={classNames(
      fieldStyle.core,
      '__sendamountfield',
      className,
    )}
    >
      <div className={classNames(
        fieldStyle.wrap,
        isActive && fieldStyle.active,
      )}
      >
        <div className={fieldStyle.currencyMask}>
          <span className={fieldStyle.invisible}>{input.value}</span>
          <span className={fieldStyle.currencyValue}>{currency}</span>
        </div>
        <input
          type='text'
          id='amountInputId'
          className={fieldStyle.input}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='none'
          spellCheck='false'
          {...input}
        />
        <div className={fieldStyle.iconHolder}>
          <button
            type='button'
            className={fieldStyle.maxButton}
            onClick={handleMaxClick(input, maxValue)}
          >
            {t`MAX`}
          </button>
          <a
            className={fieldStyle.clearButton}
            onClick={handleClearClick(input)}
          >
            <JIcon name='close-padding' color='black' />
          </a>
        </div>
        <label htmlFor='amountInputId' className={fieldStyle.label} >{LABEL_TEXT}</label>
        <div className={fieldStyle.bottom}>
          <div className={fieldStyle.fiatAmount}>{`=${fiatCurrency}${fiatAmount}`}</div>
          <div className={fieldStyle.blockchainFee}>
            {t`Blockchain fee — ${blockchainFee} ${blockchainFeeCurrency}`}
          </div>
        </div>
      </div>
      {errorMessage && (
        <JFieldMessage
          theme='error'
          message={errorMessage}
          className={fieldStyle.fieldMessage}
        />
      )}
    </div>
  )
}

SendAmountField.defaultProps = {
  input: {},
  meta: {},
  validateType: 'touched',
  className: '',
}

export { SendAmountField }
