// @flow strict

import * as React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import { getErrorMessage } from 'utils/form'
import {
  formatETHAmount,
  formatCurrencyWithSymbol,
} from 'utils/formatters'
import {
  JFieldMessage,
  JIcon,
} from 'components/base'

import fieldStyle from './sendAmountField.m.scss'

// #TODO: Fix types

type Props = {|
  blockchainFee: string,
  className: string,
  currency: string,
  fiatAmount: string,
  fiatCurrency: FiatCurrency,
  input: FinalFormInput,
  maxValue: string,
  meta: FinalFormMeta,
  validateType: FinalFormValidateType,
|}

const handleMaxClick = (input: FinalFormInput, maxValue: string) => () => input.onChange(maxValue)

const handleClearClick = (input: FinalFormInput) => () => input.onChange('')

const filterAmountValue = (value: string) => value.replace(/[^\d.-]/g, '')

const handlerOnChange = (input: FinalFormInput) => e =>
  input.onChange(filterAmountValue(e.target.value))

const LABEL_TEXT = t`Amount`

function SendAmountField({
  blockchainFee,
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

  const formattedBlockchainFee = blockchainFee ? formatETHAmount(blockchainFee) : ''
  const formattedFiatAmount = fiatAmount ? formatCurrencyWithSymbol(fiatAmount, fiatCurrency) : ''
  const hasMaxValue = (input.value === maxValue)

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
        hasMaxValue && fieldStyle.hasMaxValue,
      )}
      >
        <div className={fieldStyle.currencyMask}>
          <span className={fieldStyle.invisible}>{input.value}</span>
          <span className={fieldStyle.currencyValue}>{currency}</span>
          {hasMaxValue && (
            <span className={fieldStyle.maxValueChevron} />
          )}
        </div>
        <input
          {...input}
          type='text'
          id='amountInputId'
          className={fieldStyle.input}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='none'
          spellCheck='false'
          onChange={handlerOnChange(input)}
        />
        <div className={classNames(
          fieldStyle.iconHolder,
          meta.active && fieldStyle.inputFocus,
        )}
        >
          <button
            type='button'
            className={fieldStyle.clearButton}
            onClick={handleClearClick(input)}
          >
            <JIcon name='close-padding' color='black' />
          </button>
          <button
            type='button'
            className={fieldStyle.maxButton}
            onClick={handleMaxClick(input, maxValue)}
          >
            {t`MAX`}
          </button>
        </div>
        <div className={fieldStyle.bottom}>
          <div className={fieldStyle.fiatAmount}>{`=${formattedFiatAmount}`}</div>
          <div className={fieldStyle.blockchainFee}>
            {t`Blockchain fee — ${formattedBlockchainFee} ETH`}
          </div>
        </div>
        <label htmlFor='amountInputId' className={fieldStyle.label} >{LABEL_TEXT}</label>
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
  fiatCurrency: 'USD',
  className: '',
}

export { SendAmountField }
