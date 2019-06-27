// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'

import { JIcon } from 'components/base'

import styles from './titleHeader.m.scss'

type TitleHeaderHandler = () => any

type Props = {|
  +onBack: ?TitleHeaderHandler,
  +children: React$Node,
  +title: string,
|}

type StateProps = {|
  +isScrolled: boolean,
|}

const MIN_SCROLL_TOP_PIXELS: number = 20

function checkScrolled(rootElement: ?HTMLElement): boolean {
  return !!rootElement && (rootElement.scrollTop > MIN_SCROLL_TOP_PIXELS)
}

export class TitleHeader extends Component<Props, StateProps> {
  static defaultProps = {
    onBack: undefined,
    children: null,
  }

  rootElement: ?HTMLElement

  constructor(props: Props) {
    super(props)

    this.rootElement = this.rootElement || document.getElementById('root')

    this.state = {
      isScrolled: checkScrolled(this.rootElement),
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

  handleScroll = (e: Event) => {
    e.preventDefault()

    const wasScrolled: boolean = this.state.isScrolled
    const isScrolled: boolean = checkScrolled(this.rootElement)

    if (!wasScrolled && isScrolled) {
      this.setState({ isScrolled: true })
    } else if (wasScrolled && !isScrolled) {
      this.setState({ isScrolled: false })
    }
  }

  render() {
    const {
      onBack: handleClick,
      children,
      title,
    }: Props = this.props

    return (
      <div
        className={classNames(styles.core, this.state.isScrolled && styles.scrolled)}
        onScroll={this.handleScroll}
      >
        {handleClick && (
          <div
            onClick={handleClick}
            className={styles.back}
          >
            <JIcon name='arrow-back-use-fill' size='medium' color='blue' />
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        {children && (
          <aside className={styles.aside}>
            {children}
          </aside>
        )}
      </div>
    )
  }
}
