// @flow strict

import React from 'react'
import { t } from 'ttag'
import { map } from 'lodash-es'

import {
  JIcon,
} from 'components/base'

import {
  JPickerBody,
  JPickerList,
  JPickerCurrent,
  DefaultItem,
} from 'components/base/JPicker'

import currenciesList from 'data/currencies'

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
|}

export function CurrencyPicker({
  meta,
  input,
}: Props) {
  const {
    value,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  } = input

  const {
    code: activeCode = '',
    name: activeName = '',
  } = currenciesList[value] || {}

  return (
    <JPickerBody
      isOpen={meta.active || false}
      onOpen={handleFocus}
      onClose={handleBlur}
      currentRenderer={() => (
        <JPickerCurrent
          isEditable={false}
          label={t`Local currency`}
          value={activeName}
          iconRenderer={() => (
            <JIcon name={`ic_${activeCode.toLowerCase()}_24-use-fill`} size='24' color='blue' />
          )}
        />
      )}
    >
      <JPickerList
        onItemClick={handleChange}
        activeItemKey={value}
      >
        {map(currenciesList, (item) => {
          const {
            name,
            code,
          } = item

          return (
            <DefaultItem
              key={code}
              title={name}
              description={code}
              iconName={`ic_${code.toLowerCase()}_24-use-fill`}
            />
          )
        })}
      </JPickerList>
    </JPickerBody>
  )
}
