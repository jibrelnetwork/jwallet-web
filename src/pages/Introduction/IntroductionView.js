// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'
import Swiper from 'react-id-swiper'
import { Pagination } from 'swiper/dist/js/swiper.esm'

import {
  JLink,
  JRaisedButton,
} from 'components/base'

import {
  setIntroductionValue,
} from 'utils/introduction'

import { Slide } from './components/Slide'

import introductionViewStyle from './introductionView.m.scss'
import './swiper.scss'

const sliders = [
  {
    id: 0,
    img: '/assets/feature/jwallet.png',
    animationName: 'jwallet',
    title: 'Jwallet',
    descr: [
      'A simple, fast and secure mobile wallet',
      'for Ethereum and all ERC-20 tokens.',
    ],
  },
  {
    id: 1,
    img: '/assets/feature/store.png',
    animationName: 'store',
    title: 'Store',
    descr: [
      'Create and manage several wallets for different goals or just simply',
      'import your existing Ethereum and ERC-20 wallet.',
    ],
  },
  {
    id: 2,
    img: '/assets/feature/protect.png',
    animationName: 'protect',
    title: 'Protect',
    descr: [
      'All sensitive data never leaves your device and your private keys',
      'are never shared with anyone, including us.',
    ],
  },
  {
    id: 3,
    img: '/assets/feature/send_receive.png',
    animationName: 'send_receive',
    title: 'Send & Receive',
    descr: [
      'All sensitive data never leaves your device and your private keys',
      'are never shared with anyone, including us.',
    ],
  },
  {
    id: 4,
    img: '/assets/feature/manage.png',
    animationName: 'manage',
    title: 'Manage',
    descr: [
      'Enjoy complete control over your digital assets.',
      'Manage ETH and all ERC-20 tokens.',
    ],
  },
]

export type Props = {|
|}

type State = {|
  activeId: number,
|}

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

  render() {
    const {
      activeId,
    }: State = this.state

    const self = this

    const params = {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination.customized-swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      spaceBetween: 0,
      on: {
        slideChange() {
          self.setState({
            activeId: this.activeIndex,
          })
        },
      },
    }

    return (
      <div className={`__introduction ${introductionViewStyle.core}`} >
        <div className={introductionViewStyle.slider}>
          <Swiper {...params}>
            {sliders.map(item => (
              <div className={introductionViewStyle.slide} key={item.id}>
                <Slide
                  id={item.id}
                  activeId={activeId}
                  descr={item.descr}
                  title={item.title}
                  imgCover={item.img}
                  animationName={item.animationName}
                />
              </div>
            ))}
          </Swiper>
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
