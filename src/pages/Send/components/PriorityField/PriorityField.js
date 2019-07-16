// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'
import { Field } from 'react-final-form'
import { i18n } from 'i18n/lingui'

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

  handleOpen = (isOpen: boolean) => {
    const {
      input: {
        onChange,
      },
    } = this.props

    onChange(isOpen)
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

    const isOpen = !isDisabled && !!input.value

    const gasLimitLabel = estimatedGasLimit
      ? i18n._(
        'Send.PriorityField.gasLimit.estimated',
        { estimatedGasLimit },
        { defaults: 'Gas limit ({estimatedGasLimit} estimated)' },
      )
      : i18n._(
        'Send.PriorityField.gasLimit',
        null,
        { defaults: 'Gas limit' },
      )

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
          isOpen && fieldStyle.open,
          isLoading && fieldStyle.loading,
          isDisabled && fieldStyle.disabled,
        )}
        >
          <div className={fieldStyle.main}>
            <div className={fieldStyle.title}>
              {isOpen
                ? blockchainFee
                  ? i18n._(
                    'Send.PriorityField.fee.estimated',
                    { blockchainFee },
                    { defaults: 'Blockchain fee — {blockchainFee} ETH' },
                  )
                  : i18n._(
                    'Send.PriorityField.fee',
                    null,
                    { defaults: 'Blockchain Fee' },
                  )
                : i18n._(
                  'Send.PriorityField.fee.custom',
                  null,
                  { defaults: 'Custom Blockchain Fee' },
                )}
            </div>
            <JSwitch
              name='priority-field-switch'
              isChecked={isOpen}
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
                label={i18n._(
                  'Send.PriorityField.gasPrice',
                  null,
                  { defaults: 'Gas price' },
                )}
                unit='GWei'
              />
            </div>
            <div className={fieldStyle.bottom}>
              {i18n._(
                'Send.PriorityField.help',
                null,
                // eslint-disable-next-line max-len
                { defaults: 'Higher gas price reduces the processing time but increases the transaction fee.' },
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { PriorityField }
