// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'
import classNames from 'classnames'
import ViewSlider from 'react-view-slider'

import {
  JLink,
  JRaisedButton,
} from 'components/base'

import {
  setIntroductionValue,
} from 'utils/introduction'

import { Slide } from './components/Slide'

import introductionViewStyle from './introductionView.m.scss'

export type Props = {|
|}

type State = {|
  activeId: number,
|}

const sliders = [
  {
    img: '/assets/feature/jwallet.png',
    animationName: 'jwallet',
    title: t`Jwallet`,
    descr: [
      t`A simple, fast and secure mobile wallet`,
      t`for Ethereum and all ERC-20 tokens.`,
    ],
  },
  {
    img: '/assets/feature/store.png',
    animationName: 'store',
    title: t`Store`,
    descr: [
      t`Create and manage several wallets for different goals or just simply`,
      t`import your existing Ethereum and ERC-20 wallet.`,
    ],
  },
  {
    img: '/assets/feature/protect.png',
    animationName: 'protect',
    title: t`Protect`,
    descr: [
      t`All sensitive data never leaves your device and your private keys`,
      t`are never shared with anyone, including us.`,
    ],
  },
  {
    img: '/assets/feature/send_receive.png',
    animationName: 'send_receive',
    title: t`Send & Receive`,
    descr: [
      t`All sensitive data never leaves your device and your private keys`,
      t`are never shared with anyone, including us.`,
    ],
  },
  {
    img: '/assets/feature/manage.png',
    animationName: 'manage',
    title: t`Manage`,
    descr: [
      t`Enjoy complete control over your digital assets.`,
      t`Manage ETH and all ERC-20 tokens.`,
    ],
  },
]

const renderView = ({
  index,
}) => (
  <div className={introductionViewStyle.slider}>
    <div className={introductionViewStyle.slide}>
      <Slide
        title={sliders[index].title}
        descr={sliders[index].descr}
        imgCover={sliders[index].img}
        animationName={sliders[index].animationName}
      />
    </div>
  </div>
)

export class IntroductionView extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeId: 0,
    }
  }

  onClick = () => () => {
    setIntroductionValue()
  }

  setActiveId = number => () => {
    console.log(number)
    this.setState({ activeId: number })
  }

  render() {
    const {
      activeId,
    }: State = this.state

    return (
      <div className={`__introduction ${introductionViewStyle.core}`} >
        <ViewSlider
          renderView={renderView}
          numViews={5}
          activeView={activeId}
        />
        <div className={introductionViewStyle.paginations}>
          <button
            type='button'
            className={classNames(
              introductionViewStyle.item,
              activeId === 0 && introductionViewStyle['-current'],
            )}
            onClick={this.setActiveId(0)}
          />
          <button
            type='button'
            className={classNames(
              introductionViewStyle.item,
              activeId === 1 && introductionViewStyle['-current'],
            )}
            onClick={this.setActiveId(1)}
          />
          <button
            type='button'
            className={classNames(
              introductionViewStyle.item,
              activeId === 2 && introductionViewStyle['-current'],
            )}
            onClick={this.setActiveId(2)}
          />
          <button
            type='button'
            className={classNames(
              introductionViewStyle.item,
              activeId === 3 && introductionViewStyle['-current'],
            )}
            onClick={this.setActiveId(3)}
          />
          <button
            type='button'
            className={classNames(
              introductionViewStyle.item,
              activeId === 4 && introductionViewStyle['-current'],
            )}
            onClick={this.setActiveId(4)}
          />
        </div>
        <JLink href='/wallets' className={introductionViewStyle.link}>
          <JRaisedButton
            className={introductionViewStyle.button}
            theme='blue'
            onClick={this.onClick()}
          >
            {t`Get Started`}
          </JRaisedButton>
        </JLink>
      </div>
    )
  }
}
