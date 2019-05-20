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

import slides from './data.js'
import { Slide } from './components/Slide'
import { SliderButton } from './components/SliderButton'

import IntroductionStyle from './introduction.m.scss'

export type Props = {|
|}

type ComponentState = {|
  +activeId: number,
|}

const renderView = ({
  index,
}) => (
  <div className={IntroductionStyle.slider}>
    <div className={IntroductionStyle.slide}>
      <Slide
        title={slides[index].title}
        descr={slides[index].descr}
        imgCover={slides[index].img}
        animationName={slides[index].animationName}
      />
    </div>
  </div>
)

export class Introduction extends PureComponent<Props, ComponentState> {
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
          numViews={slides.length}
          activeView={activeId}
        />
        <div className={IntroductionStyle.paginations}>
          {slides.map((slide, index) => (
            <SliderButton
              slideId={index}
              key={slide.animationName}
              isActive={activeId === index}
              onClick={this.handleSliderButtonClick}
            />
          ))}
        </div>
        <JLink href='/wallets' className={IntroductionStyle.link}>
          <JRaisedButton
            className={IntroductionStyle.button}
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
