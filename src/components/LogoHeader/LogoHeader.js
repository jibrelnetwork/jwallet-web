// @flow strict

import React from 'react'

import { JLogo } from 'components/base'

import logoHeaderStyle from './logoHeader.m.scss'

export function LogoHeader() {
  return (
    <div className={`__logo-header ${logoHeaderStyle.core}`}>
      <JLogo theme='blue' className={logoHeaderStyle.logo} />
    </div>
  )
}
