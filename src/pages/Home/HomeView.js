// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import {
  JIcon, JLink,
} from 'components/base'

import {
  DigitalAssetsGrid,
} from 'components'

import homeStyle from './home.m.scss'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=home_exchange'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +items: AssetAddress[],
|}

export class HomeView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.items.length !== this.props.items.length
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      items,
    } = this.props

    return (
      <div className={homeStyle.core}>
        <section>
          <h2 className={homeStyle.title}>
            {t`Transfer`}
          </h2>
          <nav className={homeStyle.links}>
            <JLink
              className={homeStyle.link}
              href='/send'
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-send-use-fill'
                  color='blue'
                />
              </div>
              {t`Send`}
            </JLink>
            <JLink
              className={homeStyle.link}
              href='/receive'
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-receive-use-fill'
                  color='blue'
                />
              </div>
              {t`Receive`}
            </JLink>
            <JLink
              className={homeStyle.link}
              href={JCASH_UTM_URL}
            >
              <div className={homeStyle.linkIcon}>
                <JIcon
                  name='home-exchange-use-fill'
                  color='blue'
                />
              </div>
              {t`Exchange`}
            </JLink>
          </nav>
        </section>
        <section>
          <h2 className={homeStyle.title}>
            {t`Assets`}
          </h2>
          <div className={homeStyle.content}>
            <DigitalAssetsGrid
              items={items}
            />
          </div>
        </section>
      </div>
    )
  }
}
