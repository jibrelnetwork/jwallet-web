// @flow strict

import React, { PureComponent } from 'react'

import introductionStyle from './slide.m.scss'

type Props = {|
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
      descr,
      title,
      imgCover,
    } = this.props

    if (this.state.animationData && this.canvasRef.current) {
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
        <div className={introductionStyle.title}>
          {title}
        </div>
        <div className={introductionStyle.descr}>
          <p dangerouslySetInnerHTML={{ __html: descr }} />
        </div>
      </div>
    )
  }
}
