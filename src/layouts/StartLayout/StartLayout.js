// @flow strict

import React from 'react'
import classNames from 'classnames'
import { i18n } from 'i18n/lingui'

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
    <div
      className={classNames(
        className,
        startLayoutStyle.core,
        !hasNoLogo && startLayoutStyle.hasLogo,
      )}
    >
      {!hasNoLogo && (
        <img
          className={startLayoutStyle.logo}
          src={svgLogoBlue}
          alt={i18n._(
            'Start.logoAlt',
            null,
            { defaults: 'Jwallet Logo' },
          )}
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
