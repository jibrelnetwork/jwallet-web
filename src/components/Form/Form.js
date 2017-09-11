import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  JbButton,
  JbInput,
  JbSelect,
  JbAlert,
  JbTextarea,
} from '../base'

const currencyList = [
  { text: 'USD' },
  { text: 'EUR' },
  { text: 'GBK' },
]

class Form extends Component {
  render() {
    return <div className='app-form'>
      <JbAlert text='Test alert box text'/>
      <JbInput label='Disabled field' placeholder='0x678546756745..' disabled={true}/>
      <JbInput label='Crate PIN code' placeholder='****' />
      <JbTextarea label='Crate PIN code' placeholder='****' />
      <JbSelect         error={null}
        label={'Currency'}
        list={currencyList}
        selected={currencyList[0]}/>
      <JbButton label='Send'/>

    </div>
  }
}

Form.propTypes = {
  code: PropTypes.object,
}

export default Form
