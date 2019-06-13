// @flow strict

import React from 'react'

import { JIcon } from 'components/base'

import userActionInfoStyle from './userActionInfo.m.scss'

type Props = {
  text: string,
  title: string,
  iconName: string,
  iconClassName: string,
}

export function UserActionInfo({
  text,
  title,
  iconName,
  iconClassName,
}: Props) {
  /* eslint-disable react/no-danger */
  return (
    <div className={`__user-action-info ${userActionInfoStyle.core}`}>
      <JIcon
        className={`${userActionInfoStyle.icon} ${iconClassName}`}
        name={iconName}
      />
      <h2 className={userActionInfoStyle.title}>{title}</h2>
      <p
        className={userActionInfoStyle.text}
        dangerouslySetInnerHTML={{ __html: text.split('\n').join('<br />') }}
      />
    </div>
  )
  /* eslint-enable react/no-danger */
}

UserActionInfo.defaultProps = {
  iconClassName: '',
}
