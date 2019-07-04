// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'
import { Field } from 'react-final-form'
import { t } from 'ttag'

import {
  JSwitch,
} from 'components/base'

import { InputWithUnit } from './InputWithUnit/InputWithUnit'

import fieldStyle from './priorityField.m.scss'

type PriorityFieldInput = {|
  name: string,
  onBlur: (?SyntheticFocusEvent<any>) => any,
  onChange: (value: boolean) => any,
  onFocus: (?SyntheticFocusEvent<any>) => any,
  value: boolean,
|}

type Props = {|
  +isEth: boolean,
  +isLoading: boolean,
  +input: PriorityFieldInput,
  +blockchainFee: ?string,
  +className: ?string,
  +gasPriceFieldName: string,
  +gasLimitFieldName: string,
  +estimatedGasLimit: ?string,
  +isDisabled: boolean,
|}

class PriorityField extends Component<Props> {
  static defaultProps = {
    blockchainFee: null,
    isEth: false,
    isLoading: false,
    className: null,
    gasPriceFieldName: 'gasPrice',
    gasLimitFieldName: 'gasLimit',
    validateType: 'touched',
    isDisabled: false,
  }

  handleOpen = (isOpened: boolean) => {
    const {
      input: {
        onChange,
      },
    } = this.props

    onChange(isOpened)
  }

  render() {
    const {
      isEth,
      input,
      className,
      blockchainFee,
      isLoading,
      gasPriceFieldName,
      gasLimitFieldName,
      estimatedGasLimit,
      isDisabled,
    } = this.props

    const isOpened = !!input.value

    const gasLimitLabel = estimatedGasLimit
      ? t`Gas limit (estimated: ${estimatedGasLimit})`
      : t`Gas limit`

    return (
      <div
        className={classNames(
          fieldStyle.core,
          '__priority-field',
          className,
        )}
      >
        <div className={classNames(
          fieldStyle.wrap,
          isOpened && fieldStyle.open,
          isLoading && fieldStyle.loading,
          isDisabled && fieldStyle.disabled,
        )}
        >
          <div className={fieldStyle.main}>
            <div className={fieldStyle.title}>
              {isOpened
                ? blockchainFee
                  ? t`Blockchain Fee — ${blockchainFee} ETH`
                  : t`Blockchain Fee`
                : t`Custom Blockchain Fee`}
            </div>
            <JSwitch
              name='priority-field-switch'
              isChecked={isOpened}
              onChange={this.handleOpen}
              isDisabled={isDisabled || isLoading}
            />
          </div>
          <div className={fieldStyle.settings}>
            <div className={fieldStyle.fields}>
              {!isEth &&
                <Field
                  className={fieldStyle.field}
                  component={InputWithUnit}
                  name={gasLimitFieldName}
                  label={gasLimitLabel}
                  isDisabled={isDisabled}
                />
              }
              <Field
                className={fieldStyle.field}
                component={InputWithUnit}
                name={gasPriceFieldName}
                isDisabled={isDisabled}
                label={t`Gas price`}
                unit='GWei'
                forceZero
              />
            </div>
            <div className={fieldStyle.bottom}>
              {t`Higher gas price reduces the processing time but increases the transaction fee.`}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { PriorityField }
