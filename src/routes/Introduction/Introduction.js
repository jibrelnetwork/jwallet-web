// @flow

import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { t } from 'ttag'

import { JRaisedButton } from 'components/base'

import style from './introduction.m.scss'

import { Slide } from './components/Slide'

type Props = {|
|}

export class Introduction extends PureComponent<Props> {
  render() {
    return (
      <div
        className={classnames(
          '__introduction',
          style.container,
        )}
      >
        <div className={style.logo} />
        <div className={style.content}>
          <Slide />
          <JRaisedButton theme='blue'>
            {t`Get Started`}
          </JRaisedButton>
        </div>
      </div>
    )
  }
}
