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
      isScrolled: false,
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
    const isScrolled: boolean = !!this.rootElement && (this.rootElement.scrollTop > 20)

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
