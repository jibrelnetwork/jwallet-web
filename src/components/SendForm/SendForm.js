import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  JButton,
  JSelect,
  JbAlert,
  JTextInput,
  JIcon,
  JInputSelect,
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
      extraFieldsVizible: !this.state.extraFieldsVizible,
    })
  }

  updateFromState() {

  }

  render() {
    const extraFieldsBlockOpen = this.state.extraFieldsVizible

    return <div className='app-form'>
      <JbAlert text='Test alert box text'/>
    {}  <JTextInput
        onValueChange={this.updateFromState}
        multiline={false}
        errorMessage='Something is wrong!'
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
        editable={false}
        name='Disabled field'
        placeholder='0x678546756745..'
        value={''}
      />
      <JTextInput
        onValueChange={this.updateFromState}
        multiline={false}
        editable
        errorMessage=''
        successMessage=''
        name='Amount'
        placeholder='Amount'
        value={''}
      />
    
    {<div>
      <div onClick={() => this.toggleExtraOptions()}>
        <JIcon
          name='small-add'
          small
        /> Custom options
        </div>

        {extraFieldsBlockOpen && <div>
          <JTextInput
            onValueChange={this.updateFromState}
            multiline
            editable
            errorMessage=''
            successMessage=''
            name='Transaction description'
            placeholder=''
            value={''}
          />

          <JSelect error={null}
            label={'Currency'}
            list={currencyList}
            selected={currencyList[0]}
          />

          <JInputSelect error={null}
            label={'Currency'}
            list={currencyList}
            selected={currencyList[0]}
          />
                </div>}
      </div>
      }
      <JButton label='Send' fullWidth />

    </div>
  }
}

SendForm.propTypes = {
  code: PropTypes.object,
}

export default SendForm
