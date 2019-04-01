// @flow

import React, { Component } from 'react'

import style from '../introduction.m.scss'

type Props = {|
|}

type State = {|
  animationData: ?string,
|}

export class Slide extends Component<Props, State> {
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
        import('../animations/vault'),
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
    if (this.state.animationData && this.canvasRef.current) {
      this.lottie.loadAnimation({
        container: this.canvasRef.current,
        loop: true,
        animationData: this.state.animationData,
      })
    }

    return (
      <section className={style.slide}>
        <div
          className={style.slideImage}
          ref={this.canvasRef}
        />
        <h2 className={style.slideTitle}>Jwallet</h2>
        <p className={style.slideDescription}>
          Easiest, fastest, and more secure mobile crypto wallet
          <br />
          for Ethereum & ERC20 tokens
        </p>
      </section>
    )
  }
}
