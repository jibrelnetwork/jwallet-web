// @flow strict

import React, { PureComponent } from 'react'
import ViewSlider from 'react-view-slider'
import { connect } from 'react-redux'
import { t } from 'ttag'
import { StartLayout } from 'layouts'

import { setIntroductionIsPassed } from 'store/modules/user'
import {
  Button,
} from 'components/base'

import { Slide } from './components/Slide'
import { SliderButton } from './components/SliderButton'
import slides from './data'

import IntroductionStyle from './introduction.m.scss'

export type Props = {|
  setIntroductionIsPassed: () => any,
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

class IntroductionScreen extends PureComponent<Props, ComponentState> {
  state = {
    activeId: 0,
  }

  handleSliderButtonClick = (activeId: number) => {
    this.setState({ activeId })
  }

  handleGetStartedClick = () => {
    this.props.setIntroductionIsPassed()
  }

  render() {
    const {
      activeId,
    } = this.state

    return (
      <StartLayout className='__introduction'>
        <div className={IntroductionStyle.wrapper}>
          <ViewSlider
            renderView={renderView}
            numViews={slides.length}
            activeView={activeId}
          />
        </div>
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
        <Button
          className={`__get-started ${IntroductionStyle.button}`}
          theme='general'
          onClick={this.handleGetStartedClick}
        >
          {t`Get Started`}
        </Button>
      </StartLayout>
    )
  }
}

const mapDispatchToProps = {
  setIntroductionIsPassed,
}

export const Introduction = connect(
  null,
  mapDispatchToProps,
)(IntroductionScreen)
