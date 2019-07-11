// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

import {
  JIcon,
} from 'components/base'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
  DefaultItem,
} from 'components/base/JPicker'

import { CURRENCIES } from 'data'

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +className: string,
|}

export function CurrencyPicker({
  meta,
  input,
  className,
}: Props) {
  const {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
    value: currency,
  } = input
  const i18n = useI18n()

  const activeName: string = CURRENCIES[currency].name

  return (
    <JPickerBody
      isOpen={meta.active || false}
      onOpen={handleFocus}
      onClose={handleBlur}
      className={className}
      currentRenderer={() => (
        <JPickerCurrent
          isEditable={false}
          label={i18n._('SettingsCurrency.CurrencyPicker.title', null, { defaults: 'Currency' })}
          value={activeName}
          iconComponent={(
            <JIcon name={`ic_${currency.toLowerCase()}_24-use-fill`} size='24' color='blue' />
          )}
        />
      )}
    >
      <JPickerList
        onItemClick={handleChange}
        activeItemKey={currency}
      >
        {Object.keys(CURRENCIES).map((code: FiatCurrency) => (
          <DefaultItem
            key={code}
            description={code}
            title={CURRENCIES[code].name}
            iconName={`ic_${code.toLowerCase()}_24-use-fill`}
            iconColor='blue'
          />
        ))}
      </JPickerList>
    </JPickerBody>
  )
}
