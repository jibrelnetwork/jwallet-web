import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JIcon, JTextInput } from 'components/base'

class CopyableField extends Component {
  constructor(props) {
    super(props)
    this.state = { isCopied: false }
  }

  render() {
    const { value, placeholder } = this.props
    const name = placeholder.toLowerCase().replace(' ', '-')

    return (
      <div className='copyable-field'>
        <JTextInput
          onValueChange={this.onValueChange}
          value={value}
          placeholder={placeholder}
          name={name}
          errorMessage={''}
          successMessage={''}
          editable={false}
          multiline={false}
        />
        <div className='copyable-field__hidden' id={name}>{value}</div>
        <JIcon
          name='copy'
          onClick={this.copyContentToBuffer(name)}
          className='copyable-field__copy'
          title={this.state.isCopied ? 'Copied' : 'Copy to Clipboard'}
        />
      </div>
    )
  }

  onValueChange = () => {}

  copyContentToBuffer = name => (/* event */) => {
    let copySuccess

    const currentTextInputEl = document.getElementById(name)
    this.selectElementText(currentTextInputEl)

    try {
      copySuccess = document.execCommand('copy')
      this.cleanSelection()
    } catch (e) {
      copySuccess = false
    }

    if (copySuccess) {
      this.setState({ isCopied: true })
    }
  }

  selectElementText = (el) => {
    const range = document.createRange()
    range.selectNodeContents(el)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }

  cleanSelection = () => {
    const selection = window.getSelection()
    selection.removeAllRanges()
  }
}

CopyableField.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default CopyableField
