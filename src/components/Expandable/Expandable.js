import React, { Component } from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JIcon from 'components/base/JIcon'

class Expandable extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  render() {
    return (
      <div className={`expandable ${this.state.isOpen ? 'expandable--open' : ''}`}>
        {this.renderTitle()}
        {this.renderContent()}
      </div>
    )
  }

  renderTitle = () => {
    const { title, iconName } = this.props
    const expandableIconName = this.state.isOpen ? 'small-minus' : iconName

    return (
      <div className='expandable__title-wrap'>
        <div className='expandable__title' onClick={this.toggleOpen}>
          <JIcon className='expandable__icon' name={expandableIconName} small />{title}
        </div>
      </div>
    )
  }

  renderContent = () => {
    return <div className='expandable__content'>{this.props.children}</div>
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })
}

Expandable.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  iconName: PropTypes.string,
}

Expandable.defaultProps = {
  title: i18n.modals.sendFunds.customOptionsTitle,
  iconName: 'small-add',
}

export default Expandable
