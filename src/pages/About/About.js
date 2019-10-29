// @flow strict

import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { TitleHeader } from 'components'
import { gaSendException } from 'utils/analytics'

import {
  JIcon,
  JLink,
  JLoader,
  AppLogo,
} from 'components/base'

import styles from './about.m.scss'

type Props = {|
  +i18n: I18n,
|}

type StateProps = {|
  +version: ?string,
|}

const VERSION_TXT_URL: string = 'version.txt'

class AboutView extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      version: null,
    }
  }

  async componentDidMount() {
    try {
      const version: string = await this.requestVersion()
      this.setState({ version: version.replace(/\s/g, '') })
    } catch (error) {
      const errorMessage: string = error.message

      console.error(errorMessage)

      gaSendException({
        exDescription: errorMessage,
        exFatal: false,
      })

      const { i18n }: Props = this.props

      this.setState({
        version: i18n._(
          'About.version.error',
          null,
          { defaults: 'unavailable' },
        ),
      })
    }
  }

  requestVersion = (): Promise<string> => {
    if (__DEV__) {
      return new Promise(resolve => setTimeout(() => resolve('develop'), 2000))
    }

    return fetch(VERSION_TXT_URL).then((response: Response): Promise<string> => {
      if (!response.ok) {
        throw new Error('App version request failed')
      }

      return response.text()
    })
  }

  render() {
    const { i18n }: Props = this.props
    const { version }: StateProps = this.state

    return (
      <div className={styles.core}>
        <TitleHeader
          title={i18n._(
            'About.title',
            null,
            { defaults: 'Information' },
          )}
        />
        <div className={styles.info}>
          <AppLogo color='blue' />
          <div className={styles.version}>
            <div className={styles.label}>
              {i18n._(
                'About.version.label',
                null,
                { defaults: 'App version' },
              )}
            </div>
            <div className={styles.value}>
              {version || <JLoader color='gray' />}
            </div>
          </div>
          <div className={styles.links}>
            <JLink
              className={styles.link}
              theme='text-blue'
              href='https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'
            >
              {i18n._(
                'About.links.terms',
                null,
                { defaults: 'Terms of Use' },
              )}
              <JIcon
                className={styles.icon}
                name='ic_open_link_24-use-fill'
              />
            </JLink>
            <JLink
              className={styles.link}
              theme='text-blue'
              href='https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'
            >
              {i18n._(
                'About.links.privacy',
                null,
                { defaults: 'Privacy Policy' },
              )}
              <JIcon
                className={styles.icon}
                name='ic_open_link_24-use-fill'
              />
            </JLink>
          </div>
        </div>
        <div className={styles.copyright}>
          {i18n._(
            'About.copyright',
            null,
            { defaults: '© 2019 Jibrel Network. All Rights Reserved' },
          )}
        </div>
      </div>
    )
  }
}

export const About = withI18n()(AboutView)
