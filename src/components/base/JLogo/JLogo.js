// @flow

import classNames from 'classnames'
import React from 'react'
import { t } from 'ttag'

import { JLink } from 'components/base'

import svgLogoWhite from 'public/assets/logo/logo-white.svg'
import svgLogoBlue from 'public/assets/logo/logo-blue.svg'
import jLogoStyle from './jLogo.m.scss'

const logoSrcs = {
  white: svgLogoWhite,
  blue: svgLogoBlue,
}

type JLogoTheme = 'white' | 'blue'

type Props = StyleComponent<JLogoTheme>

export function JLogo({
  theme,
  className,
}: Props) {
  return (
    <JLink
      href='/'
      className={classNames(
        '__logo',
        jLogoStyle.core,
        jLogoStyle[theme],
        className,
      )}
    >
      <img
        src={logoSrcs[theme]}
        alt={t`Jwallet Logo`}
        width='136'
        height='48'
        className={jLogoStyle.image}
      />
    </JLink>
  )
}

JLogo.defaultProps = {
  theme: 'white',
  className: null,
}
