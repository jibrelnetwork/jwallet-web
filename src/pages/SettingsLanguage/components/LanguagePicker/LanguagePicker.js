// @flow strict

import React from 'react'
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

import { LANGUAGES } from 'data'

type Props = {|
  +meta: FinalFormMeta,
  +input: FinalFormInput,
  +label: string,
  +className: string,
|}

export function LanguagePicker({
  meta,
  input,
  label,
  className,
}: Props) {
  const {
    value,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  } = input

  const {
    title: activeTitle = '',
  } = LANGUAGES[value] || {}

  return (
    <JPickerBody
      isOpen={meta.active || false}
      onOpen={handleFocus}
      onClose={handleBlur}
      className={className}
      currentRenderer={() => (
        <JPickerCurrent
          isEditable={false}
          label={label}
          value={activeTitle}
          iconComponent={(
            <JIcon name={`ic_${value}_24`} size='24' />
          )}
        />
      )}
    >
      <JPickerList
        onItemClick={handleChange}
        activeItemKey={value}
      >
        {map(LANGUAGES, (item, code) => {
          const {
            title,
          } = item

          return (
            <DefaultItem
              key={code}
              title={title}
              iconName={`ic_${code}_24`}
            />
          )
        })}
      </JPickerList>
    </JPickerBody>
  )
}
