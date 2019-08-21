// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import styles from './description.m.scss'

type OwnProps = {|
  +assetPage: DigitalAssetPage,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18nType,
|}

type StateProps = {|
  +isOpened: boolean,
|}

const SHOW_MORE_MIN_HEIGHT: number = 120

class Description extends Component<Props, StateProps> {
  textRef = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      isOpened: true,
    }
  }

  componentDidMount() {
    if (!(this.textRef && this.textRef.current && this.textRef.current.clientHeight)) {
      return
    }

    this.setState({
      isOpened: false,
    })
  }

  handleToggleDescription = () => this.setState({
    isOpened: !this.state.isOpened,
  })

  render() {
    const {
      i18n,
      assetPage,
    }: Props = this.props

    if (!assetPage) {
      return null
    }

    const textHeight: number = this.textRef.current && this.textRef.current.clientHeight
    const { description }: DigitalAssetPage = assetPage
    const hasShowMore: boolean = (textHeight > SHOW_MORE_MIN_HEIGHT)
    const isHidden: boolean = hasShowMore && !this.state.isOpened

    return (
      <div
        className={classNames(
          styles.core,
          isHidden && styles.hidden,
          hasShowMore && styles.more,
        )}
      >
        <div className={styles.label}>
          {i18n._(
            'AssetsItem.About.Description.label',
            null,
            { defaults: 'Description' },
          )}
        </div>
        <div
          className={styles.text}
        >
          {description}
        </div>
        <div
          ref={this.textRef}
          className={styles.invisible}
        >
          {description}
        </div>
        {hasShowMore && (
          <div className={styles.toggle}>
            <button
              onClick={this.handleToggleDescription}
              className={styles.button}
              type='button'
            >
              {isHidden ? i18n._(
                'AssetsItem.About.Description.more',
                null,
                { defaults: 'Show more' },
              ) : i18n._(
                'AssetsItem.About.Description.less',
                null,
                { defaults: 'Show less' },
              )}
            </button>
          </div>
        )}
      </div>
    )
  }
}

const DescriptionEnhanced = withI18n()(Description)

export { DescriptionEnhanced as Description }
