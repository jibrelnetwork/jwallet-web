// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { t } from 'ttag'

import jTextStyle from 'styles/components/jText.m.scss'

import introductionStyle from './slide.m.scss'

type Props = {|
  id: number,
  activeId: number,
  descr: Object,
  title: string,
  imgCover: string,
  animationName: string,
|}

type State = {|
  animationData: ?string,
|}

export class Slide extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.lottie = null
    this.canvasRef = React.createRef()

    this.state = {
      animationData: null,
    }

    Promise
      .all([
        import('lottie-web'),
        import(`../animations/${this.props.animationName}`),
      ])
      .then(([
        lottie,
        animationData,
      ]) => {
        this.lottie = lottie

        this.setState({
          animationData,
        })
      })
  }
  lottie: Object
  canvasRef: React$Ref<'div'>

  render() {
    const {
      id,
      activeId,
      descr,
      title,
      imgCover,
    } = this.props

    if (id === activeId && this.state.animationData && this.canvasRef.current) {
      this.lottie.destroy()

      this.lottie.loadAnimation({
        container: this.canvasRef.current,
        loop: false,
        animationData: this.state.animationData,
        autoplay: true,
      })
    }

    return (
      <div className={introductionStyle.slide}>
        <div className={introductionStyle.preview}>
          <img src={imgCover} className={introductionStyle.img} alt='' />
          <div className={introductionStyle.animation} ref={this.canvasRef} />
        </div>
        <div className={classNames(
          introductionStyle.title,
          jTextStyle.mainBlack,
          jTextStyle.tab,
        )}
        >
          {t`${title}`}
        </div>
        <div className={classNames(
          introductionStyle.descr,
          jTextStyle.mainBlack,
          jTextStyle.tab,
        )}
        >
          {descr.map(item => (
            <p key={item}>{t`${item}`}</p>
          ))}
        </div>
      </div>
    )
  }
}
