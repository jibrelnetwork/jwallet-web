// @flow strict

import React from 'react'

import { JIcon } from 'components/base'

import offset from 'styles/offsets.m.scss'

import style from './confirmationBody.m.scss'

type Props = {|
  +iconName: string,
  +title: string,
  +children: ?React$Node,
  +iconColor: ?('gray' | 'blue'),
|}

function Component({
  iconName,
  iconColor,
  title,
  children,
}) {
  return (
    <section className={`${style.core} ${offset.mb32}`}>
      <div className={`${style.icon} ${style[iconColor]} ${offset.mb32}`} >
        <JIcon name={iconName} />
      </div>
      <h2 className={`${style.title} ${children ? offset.mb8 : ''}`}>{title}</h2>
      {children && <p className={style.description}>{children}</p>}
    </section>
  )
}

Component.defaultProps = {
  iconColor: 'gray',
  description: undefined,
}

export const ConfirmationBody = React.memo<Props>(Component)
