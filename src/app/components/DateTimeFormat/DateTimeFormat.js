// @flow

import React, { Fragment } from 'react'

import { useLanguage } from 'app/components'

type Props = {
  value: Date | string | number,
}

const optionsDate = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
}

const optionsTime = {
  hour: '2-digit',
  minute: '2-digit',
}

export function DateTimeFormat({
  value,
}: Props) {
  const { language } = useLanguage()
  const date = new Date(value)

  const formattedDate = new Intl.DateTimeFormat(language, optionsDate).format(date)
  const formattedTime = new Intl.DateTimeFormat('default', optionsTime).format(date)

  return (
    <Fragment>{`${formattedTime}\u2007\u2022\u2007${formattedDate}`}</Fragment>
  )
}
