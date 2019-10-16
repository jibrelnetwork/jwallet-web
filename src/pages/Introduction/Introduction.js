// @flow strict

import ViewSlider from 'react-view-slider'
import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { StartLayout } from 'layouts'
import { Button } from 'components/base'
import { gaSendEvent } from 'utils/analytics'
import { setIntroductionIsPassed } from 'store/modules/user'

import slides from './data'
import styles from './introduction.m.scss'
import { Slide } from './components/Slide'
import { SliderButton } from './components/SliderButton'

type Props = {|
  +i18n: I18n,
  +setIntroductionIsPassed: () => any,
|}

type StateProps = {|
  +activeId: number,
|}

const renderView = ({ index }) => (
  <div className={styles.slider}>
    <div className={styles.slide}>
      <Slide
        title={slides[index].title}
        descr={slides[index].descr}
        imgCover={slides[index].img}
        animationName={slides[index].animationName}
      />
    </div>
  </div>
)

class IntroductionScreen extends PureComponent<Props, StateProps> {
  state = {
    activeId: 0,
  }

  handleSliderButtonClick = (activeId: number) => {
    this.setState({ activeId })
  }

  handleGetStartedClick = () => {
    this.props.setIntroductionIsPassed()

    gaSendEvent(
      'CreateAccount',
      'IntroductionPassed',
    )
  }

  render() {
    const { i18n }: Props = this.props
    const { activeId }: StateProps = this.state

    return (
      <StartLayout className='__introduction'>
        <div className={styles.wrapper}>
          <ViewSlider
            renderView={renderView}
            numViews={slides.length}
            activeView={activeId}
          />
        </div>
        <div className={styles.paginations}>
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
          className={`__get-started ${styles.button}`}
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
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    null,
    mapDispatchToProps,
  ),
)(IntroductionScreen)
