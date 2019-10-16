// @flow strict

import React from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from './links.m.scss'

type OwnProps = {|
  +assetPage: ?DigitalAssetPage,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18nType,
|}

function getURLLabel(
  i18n: I18nType,
  type: string,
): string {
  switch (type) {
    case 'site':
      return i18n._(
        'AssetsItem.About.Links.label.site',
        null,
        { defaults: 'Token Website' },
      )

    default:
      return i18n._(
        'AssetsItem.About.Links.label.info',
        { type },
        { defaults: '{type} Info' },
      )
  }
}

function Links({
  i18n,
  assetPage,
}: Props) {
  if (!assetPage) {
    return null
  }

  return (
    <ul className={styles.core}>
      {assetPage.urls.map((item: DigitalAssetPageUrl) => (
        <li
          key={item.url}
          className={styles.link}
        >
          <JLink
            href={item.url}
            className={styles.anchor}
          >
            <span className={styles.label}>
              {getURLLabel(i18n, item.type)}
            </span>
            <JIcon
              name='ic_open_link_24-use-fill'
              className={styles.icon}
            />
          </JLink>
        </li>
      ))}
    </ul>
  )
}

const LinksEnhanced = withI18n()(Links)

export { LinksEnhanced as Links }
