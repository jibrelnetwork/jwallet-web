// @flow strict

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import svgLogoBlue from 'public/assets/logo/logo-blue.svg'

import startLayoutStyle from './startLayout.m.scss'

type Props = {|
  +children: React$Node,
  +className: ?string,
  +hasNoLogo: boolean,
|}

export function StartLayout({
  children,
  className,
  hasNoLogo,
}: Props) {
  return (
    <div className={classNames(startLayoutStyle.core, className)}>
      {!hasNoLogo && (
        <img
          className={startLayoutStyle.logo}
          src={svgLogoBlue}
          alt={t`Jwallet Logo`}
          width='136'
          height='48'
        />
      )}
      <main className={startLayoutStyle.main}>
        {children}
      </main>
    </div>
  )
}

StartLayout.defaultProps = {
  className: null,
  hasNoLogo: false,
}
