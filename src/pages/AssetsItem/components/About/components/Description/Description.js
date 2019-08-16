// @flow strict

import React from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { useFocus } from 'utils/hooks/useFocus'

import styles from './description.m.scss'

type OwnProps = {|
  +assetPage: DigitalAssetPage,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18nType,
|}

const SHOW_MORE_LENGTH: number = 430

function Description({
  i18n,
  assetPage,
}: Props) {
  if (!assetPage) {
    return null
  }

  const [isOpened, {
    onFocus: handleOpen,
  }] = useFocus()

  const { description }: DigitalAssetPage = assetPage
  const hasShowMore: boolean = (description.length > SHOW_MORE_LENGTH)
  const isHidden: boolean = (hasShowMore && !isOpened)

  return (
    <div className={styles.core}>
      <div className={styles.label}>
        {i18n._(
          'AssetsItem.About.Description.label',
          null,
          { defaults: 'Description' },
        )}
      </div>
      <div className={classNames(styles.text, isHidden && styles.hidden)}>
        {description}
      </div>
      {isHidden && (
        <div
          onClick={handleOpen}
          className={styles.more}
        >
          <span className={styles.button}>
            {i18n._(
              'AssetsItem.About.Description.more',
              null,
              { defaults: 'Show more' },
            )}
          </span>
        </div>
      )}
    </div>
  )
}

const DescriptionEnhanced = withI18n()(Description)

export { DescriptionEnhanced as Description }
