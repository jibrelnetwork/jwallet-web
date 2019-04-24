// @flow strict

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import svgLogoBlue from 'public/assets/logo/logo-blue.svg'

import startLayoutStyle from 'layouts/StartLayout/startLayout.m.scss'

type Props = {|
  className?: ?string,
  +children: React$Node,
|}

export function StartLayout({
  children,
  className,
}: Props) {
  return (
    <div className={classNames(startLayoutStyle.core, className)}>
      <img
        className={startLayoutStyle.logo}
        src={svgLogoBlue}
        alt={t`Jwallet Logo`}
        width='136'
        height='48'
      />
      <main className={startLayoutStyle.main}>
        {children}
      </main>
    </div>
  )
}

StartLayout.defaultProps = {
  className: null,
}
