// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'

import { JIcon } from 'components/base'

import styles from './titleHeader.m.scss'

type TitleHeaderBack = () => any
type TitleHeaderScroll = (isScrolled: boolean) => any

type Props = {|
  +onBack: ?TitleHeaderBack,
  +onScroll: ?TitleHeaderScroll,
  +children: React$Node,
  +title: ?string,
  +className: ?string,
  +offsetTop: number,
  +withMenu: boolean,
  +isScrolled: ?boolean,
|}

type StateProps = {|
  +isScrolled: boolean,
|}

const MIN_SCROLL_TOP_PIXELS: number = 20

function checkScrolled(
  isScrolled: ?boolean,
  rootElement: ?HTMLElement,
  offsetTop: number,
): boolean {
  return (isScrolled !== null) && (isScrolled !== undefined)
    ? isScrolled
    : !!rootElement && (rootElement.scrollTop > (MIN_SCROLL_TOP_PIXELS + offsetTop))
}

export class TitleHeader extends Component<Props, StateProps> {
  static defaultProps = {
    onBack: undefined,
    onScroll: undefined,
    children: null,
    title: null,
    className: null,
    offsetTop: 0,
    withMenu: false,
    isScrolled: null,
  }

  rootElement: ?HTMLElement

  constructor(props: Props) {
    super(props)

    this.rootElement = this.rootElement || document.getElementById('root')

    const {
      offsetTop,
      isScrolled,
    }: Props = props

    this.state = {
      isScrolled: checkScrolled(
        isScrolled,
        this.rootElement,
        offsetTop,
      ),
    }
  }

  componentDidMount() {
    if (this.rootElement) {
      this.rootElement.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (this.rootElement) {
      this.rootElement.removeEventListener('scroll', this.handleScroll)
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isScrolled !== this.props.isScrolled) {
      this.handleScroll()
    }
  }

  handleScroll = () => {
    const wasScrolled: boolean = this.state.isScrolled

    const {
      onScroll,
      offsetTop,
      isScrolled,
    }: Props = this.props

    const isNowScrolled: boolean = checkScrolled(
      isScrolled,
      this.rootElement,
      offsetTop,
    )

    if (!wasScrolled && isNowScrolled) {
      this.setState({ isScrolled: true })

      if (onScroll) {
        onScroll(true)
      }
    } else if (wasScrolled && !isNowScrolled) {
      this.setState({ isScrolled: false })

      if (onScroll) {
        onScroll(false)
      }
    }
  }

  render() {
    const {
      onBack: handleClick,
      children,
      title,
      className,
      offsetTop,
      withMenu,
    }: Props = this.props

    const { isScrolled }: StateProps = this.state
    const isAbsolute: boolean = (!offsetTop || isScrolled)

    return (
      <div
        onScroll={this.handleScroll}
        className={classNames(
          styles.core,
          className,
          !isAbsolute && styles.static,
          isScrolled && styles.scrolled,
          isAbsolute && withMenu && styles.menu,
        )}
        style={{ top: isScrolled ? 0 : offsetTop }}
      >
        <div className={styles.content}>
          {handleClick && (
            <div
              onClick={handleClick}
              className={styles.back}
            >
              <JIcon name='arrow-back-use-fill' size='medium' color='blue' />
            </div>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
          {children && (
            <aside className={styles.aside}>
              {children}
            </aside>
          )}
        </div>
      </div>
    )
  }
}
