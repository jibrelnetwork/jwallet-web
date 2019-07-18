// @flow strict

import React, { PureComponent } from 'react'
import ViewSlider from 'react-view-slider'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'
import { compose } from 'redux'

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
  +i18n: I18nType,
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

    const {
      i18n,
    } = this.props

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
          {i18n._(
            'Introduction.action.submit',
            null,
            { defaults: 'Get Started' },
          )}
        </Button>
      </StartLayout>
    )
  }
}

const mapDispatchToProps = {
  setIntroductionIsPassed,
}

export const Introduction = compose(
  withI18n(),
  connect(
    null,
    mapDispatchToProps,
  ),
)(IntroductionScreen)
