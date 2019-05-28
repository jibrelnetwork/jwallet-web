// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JFieldMessage } from 'components/base'
import { getErrorMessage } from 'utils/form'

import inputStyles from './inputWithUnit.m.scss'

type Props = {|
  +className: string,
  +label: string,
  +unit: ?string,
  +input: FinalFormInput,
  +meta: FinalFormMeta,
  +validateType: FinalFormValidateType,
|}

// Allow to use only digits and dot and remove leading zeroes
function filterNumericValue(value: string) {
  return value.replace(/[^\d.]/g, '').replace(/^00+/g, '0')
}

class InputWithUnit extends PureComponent<Props> {
  static defaultProps = {
    unit: null,
    validateType: 'touched',
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      input: {
        onChange,
      },
    } = this.props

    onChange(filterNumericValue(e.target.value))
  }

  render() {
    const {
      className,
      label,
      unit,
      input: {
        name,
        value,
        onFocus,
        onBlur,
      },
      meta,
      validateType,
    } = this.props

    const errorMessage = getErrorMessage(meta, validateType)
    const hasError = !!errorMessage

    return (
      <div className={classNames(
        inputStyles.core,
        className,
        hasError && inputStyles.error,
      )}
      >
        <label className={inputStyles.label}>
          <span className={inputStyles.title}>{label}</span>
          {unit &&
            <span className={inputStyles.mask}>
              <span className={inputStyles.maskedValue}>{value}</span>
              <span className={inputStyles.maskedUnit}>{unit}</span>
            </span>
          }
          <input
            maxLength={32}
            type='text'
            autoComplete='off'
            name={name}
            value={value}
            className={inputStyles.input}
            onChange={this.handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </label>
        {errorMessage && (
          <JFieldMessage
            theme='error'
            message={errorMessage}
            className={inputStyles.fieldMessage}
          />
        )}
      </div>
    )
  }
}

export { InputWithUnit }
