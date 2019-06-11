// @flow strict

import React from 'react'
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

export type Props = {|
  +blockchainFee: string,
  +className: string,
  +currency: string,
  +fiatAmount: string,
  +fiatCurrency: FiatCurrency,
  +infoMessage: string,
  +input: FinalFormInput,
  +isFetchingFiatAmount: boolean,
  +label: string,
  +maxValue: string,
  +meta: FinalFormMeta,
  +validateType: FinalFormValidateType,

  // from ownProps:
  +assetAddress: string,
  +gasPrice: string,
  +gasLimit: string,
|}

type InputRef = {
  current: null | HTMLInputElement,
}

const handleMaxClick = (input: FinalFormInput, maxValue: string) => () => input.onChange(maxValue)

const handleClearClick = (input: FinalFormInput) => () => input.onChange('')

// Allow to use only digits and dot and remove leading zeroes
const filterAmountValue = (value: string) => value.replace(/[^\d.]/g, '').replace(/^00+/g, '0')

const handlerOnChange = (input: FinalFormInput) => e =>
  input.onChange(filterAmountValue(e.target.value))

const handleFocus = (ref: InputRef) => () => ref.current && ref.current.focus()

const DEFAULT_LABEL_TEXT = t`Amount`

function SendAmountField({
  blockchainFee,
  className,
  currency,
  fiatCurrency,
  fiatAmount,
  infoMessage,
  input,
  isFetchingFiatAmount,
  label,
  maxValue,
  meta,
  validateType,
}: Props) {
  const textInput: InputRef = React.createRef()

  const isActive = meta.active || !!input.value

  const errorMessage = getErrorMessage(meta, validateType)
  const hasError = !!errorMessage
  const hasInfo = !!infoMessage
  const hasMessage = (hasError || hasInfo)
  const messageTheme = hasError
    ? 'error'
    : 'info'

  const formattedBlockchainFee = blockchainFee
    ? formatETHAmount(blockchainFee)
    : ''

  const formattedFiatAmount = fiatAmount
    ? `≈${formatCurrencyWithSymbol(fiatAmount, fiatCurrency)}`
    : ''

  const hasMaxValue = (maxValue && input.value === maxValue)

  return (
    <div
      className={classNames(
        fieldStyle.core,
        '__send-amount-field',
        className,
      )}
      onClick={handleFocus(textInput)}
    >
      <div className={classNames(
        fieldStyle.wrap,
        isActive && fieldStyle.active,
        hasMaxValue && fieldStyle.hasMaxValue,
        hasMessage && fieldStyle.message,
        hasError && fieldStyle.error,
      )}
      >
        <div className={fieldStyle.currency}>
          <span className={fieldStyle.invisible}>{input.value}</span>
          <span className={fieldStyle.value}>{currency}</span>
          {hasMaxValue && (
            <span className={fieldStyle.chevron} />
          )}
        </div>
        <input
          {...input}
          ref={textInput}
          type='text'
          id='amountInputId'
          className={fieldStyle.input}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='none'
          spellCheck='false'
          maxLength='40'
          onChange={handlerOnChange(input)}
        />
        <div className={classNames(
          fieldStyle.buttons,
        )}
        >
          <button
            type='button'
            className={fieldStyle.clean}
            onClick={handleClearClick(input)}
          >
            <JIcon name='close-use-fill' />
          </button>
          <button
            type='button'
            className={fieldStyle.max}
            onClick={handleMaxClick(input, maxValue)}
          >
            {t`MAX`}
          </button>
        </div>
        <div className={fieldStyle.bottom}>
          <div className={classNames(
            fieldStyle.amount,
            isFetchingFiatAmount && !formattedFiatAmount && fieldStyle.fetching,
          )}
          >
            {formattedFiatAmount}
          </div>
          <div className={classNames(
            fieldStyle.fee,
            !formattedBlockchainFee && fieldStyle.fetching,
          )}
          >
            {formattedBlockchainFee && t`Blockchain fee — ${formattedBlockchainFee} ETH`}
          </div>
        </div>
        <label htmlFor='amountInputId' className={fieldStyle.label} >{label}</label>
      </div>
      {hasMessage && (
        <JFieldMessage
          theme={messageTheme}
          message={errorMessage || infoMessage}
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
  infoMessage: '',
  isFetchingFiatAmount: false,
  label: DEFAULT_LABEL_TEXT,
  maxValue: '',
}

export { SendAmountField }
