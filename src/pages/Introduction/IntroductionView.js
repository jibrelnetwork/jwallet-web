// @flow strict

import React, { PureComponent } from 'react'

import { StartLayout } from 'layouts'
import { t } from 'ttag'
import ViewSlider from 'react-view-slider'

import {
  JLink,
  JRaisedButton,
} from 'components/base'

import {
  setIntroductionValue,
} from 'utils/introduction'

import { Slide } from './components/Slide'
import { SliderButton } from './components/SliderButton'

import introductionViewStyle from './introductionView.m.scss'

export type Props = {|
|}

type ComponentState = {|
  +activeId: number,
|}

const sliders = [
  {
    img: '/assets/feature/jwallet.png',
    animationName: 'jwallet',
    title: t`Jwallet`,
    descr: t`A simple, fast and secure mobile wallet 
      <br> for Ethereum and all ERC-20 tokens.`,
  },
  {
    img: '/assets/feature/store.png',
    animationName: 'store',
    title: t`Store`,
    descr: t`Create and manage several wallets for different goals or just simply 
      <br> import your existing Ethereum and ERC-20 wallet.`,
  },
  {
    img: '/assets/feature/protect.png',
    animationName: 'protect',
    title: t`Protect`,
    descr: t`All sensitive data never leaves your device and your private keys 
      <br> are never shared with anyone, including us.`,
  },
  {
    img: '/assets/feature/send_receive.png',
    animationName: 'send_receive',
    title: t`Send & Receive`,
    descr: t`All sensitive data never leaves your device and your private keys 
      <br> are never shared with anyone, including us.`,
  },
  {
    img: '/assets/feature/manage.png',
    animationName: 'manage',
    title: t`Manage`,
    descr: t`Enjoy complete control over your digital assets. 
      <br> Manage ETH and all ERC-20 tokens.`,
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

export class IntroductionView extends PureComponent<Props, ComponentState> {
  state = {
    activeId: 0,
  }

  handleSliderButtonClick = (activeId: number) => {
    this.setState({ activeId })
  }

  handleGetStartedClick = () => {
    setIntroductionValue()
  }

  render() {
    const {
      activeId,
    } = this.state

    return (
      <StartLayout className='__introduction'>
        <ViewSlider
          renderView={renderView}
          numViews={sliders.length}
          activeView={activeId}
        />
        <div className={introductionViewStyle.paginations}>
          {sliders.map((slide, index) => (
            <SliderButton
              slideId={index}
              key={slide.animationName}
              isActive={activeId === index}
              onClick={this.handleSliderButtonClick}
            />
          ))}
        </div>
        <JLink href='/wallets' className={introductionViewStyle.link}>
          <JRaisedButton
            className={introductionViewStyle.button}
            theme='blue'
            onClick={this.handleGetStartedClick}
          >
            {t`Get Started`}
          </JRaisedButton>
        </JLink>
      </StartLayout>
    )
  }
}
