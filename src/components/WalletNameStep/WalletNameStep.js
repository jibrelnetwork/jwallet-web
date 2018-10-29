// @flow

import React, { PureComponent } from 'react'

import WalletStep from 'components/WalletStep'
import { JInput } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangeName: Function,
  +invalidFields: FormFields,
  +fieldName: string,
  +valueName: string,
  +buttonLabel: string,
  +placeholder: string,
  +isLoading: boolean,
|}

class WalletNameStep extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
  }

  render() {
    const {
      onSubmit,
      onChangeName,
      invalidFields,
      fieldName,
      valueName,
      buttonLabel,
      placeholder,
      isLoading,
    }: Props = this.props

    return (
      <WalletStep
        onSubmit={onSubmit}
        buttonLabel={buttonLabel}
        isLoading={isLoading}
      >
        <JInput
          onChange={onChangeName}
          name={fieldName}
          value={valueName}
          placeholder={placeholder}
          errorMessage={invalidFields.name}
          color='white'
          isAutoFocus
        />
      </WalletStep>
    )
  }
}

export default WalletNameStep
