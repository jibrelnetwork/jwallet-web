import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  JbButton,
  JbSelect,
  JbAlert,
  JTextInput,
  JbIcon,
} from '../base'

const currencyList = [
  { text: 'USD' },
  { text: 'EUR' },
  { text: 'GBK' },
]

class SendForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      extraFieldsVizible: false,
    }
  }

  toggleExtraOptions() {
    this.setState({
      toggleExtraOptions: !this.state.toggleExtraOptions,
    })
  }

  updateFromState() {

  }

  render() {
    return <div className='app-form'>
      <JbAlert text='Test alert box text'/>
      <JTextInput
        onValueChange={this.updateFromState}
        multiline={false}
        errorMessage=''
        successMessage=''
        name='Disabled field'
        placeholder='0x678546756745..'
        value={''}
      />
      <JTextInput
        onValueChange={this.updateFromState}
        multiline={false}
        errorMessage=''
        successMessage=''
        name='Amount'
        placeholder='100'
        value={''}
      />

      <span onClick={this.toggleExtraOptions}>
        <JbIcon name='add' small='true'/> Custom options
        
        <JTextInput
        onValueChange={this.updateFromState}
        multiline={true}
        errorMessage=''
        successMessage=''
        name='Transaction description'
        placeholder=''
        value={''}
      />

        <JbSelect error={null}
          label={'Currency'}
          list={currencyList}
          selected={currencyList[0]}
      />
      </span>

      <JbButton label='Send'/>

    </div>
  }
}

SendForm.propTypes = {
  code: PropTypes.object,
}

export default SendForm
