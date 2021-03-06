// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { CopyIconButton } from 'components'

import {
  JLink,
  JIcon,
} from 'components/base'

import styles from './fieldPreview.m.scss'

type FieldPreviewValue = string | number

type Props = {|
  +label: string,
  +link: ?string,
  +title: ?string,
  +value: FieldPreviewValue,
  +valueToShow: ?FieldPreviewValue,
  +isContact: boolean,
  +isCopyable: boolean,
|}

export function FieldPreview({
  link,
  label,
  title,
  value,
  valueToShow,
  isContact,
  isCopyable,
}: Props) {
  const i18n = useI18n()

  return (
    <div className={`__field-preview ${styles.core}`}>
      <div className={styles.data}>
        <div className={styles.label}>
          {label}
        </div>
        <div className={styles.value}>
          {link ? (
            <JLink
              className={styles.link}
              href={`https://${link}`}
            >
              {valueToShow || value}
            </JLink>
          ) : (
            <span>
              {valueToShow || value}
            </span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        {isContact && (
          <JLink
            className={styles.action}
            title={i18n._(
              'FieldPreview.action.contact',
              null,
              { defaults: 'Add Contact' },
            )}
            href={`/contacts/add?address=${value}`}
          >
            <JIcon
              className={styles.icon}
              name='add-contact-use-fill'
            />
          </JLink>)
        }
        {isCopyable && (
          <CopyIconButton
            title={title}
            content={value}
            toastMessage={i18n._(
              'FieldPreview.toast',
              { label },
              { defaults: '{ label } copied.' },
            )}
          />
        )}
      </div>
    </div>
  )
}

FieldPreview.defaultProps = {
  link: null,
  title: null,
  valueToShow: null,
  isContact: false,
  isCopyable: false,
}
