import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  JFormAlert,
  JTextInput,
  JbButton,
  JbCheckbox,
  JbIcon,
  JbLoader,
  JbLogo,
  JbSelect,
} from '../src/components/base'

import props from './props'

storiesOf('JbButton', module)
  .add('white', () => {
    return (
      <div style={{padding: '20px'}}>
        <JbButton white label={'White Button'} onClick={() => alert('Button click')} />
      </div>
    )
  })
  .add('blue', () => {
    return (
      <div style={{padding: '20px'}}>
        <JbButton blue label={'Blue Button'} onClick={() => alert('Button click')} />
      </div>
    )
  })
  .add('disabled', () => {
    return (
      <div style={{padding: '20px'}}>
        <JbButton disabled label={'Disabled Button'} onClick={() => alert('Button click')} />
      </div>
    )
  })

storiesOf('JbCheckbox', module)
  .add('common', () => {
    let isActive = false
    const toggle = newState => { isActive = newState }

    return <JbCheckbox toggle={toggle} isActive={isActive} />
  })
  .add('with label', () => {
    let isActive = false
    const toggle = newState => { isActive = newState }

    return <JbCheckbox toggle={toggle} isActive={isActive} label={'Label'} />
  })

storiesOf('JbIcon', module)
  .add('common', () => {
    return (
      <JbIcon name='send' />
    )
  })
  .add('small', () => {
    return (
      <JbIcon name='convert' small />
    )
  })

storiesOf('JTextInput', module)
  .add('common', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JTextInput
          onValueChange={text => console.log(text)}
          name='common'
          placeholder='Common Field'
          value={''}
          errorMessage={''}
          successMessage={''}
          editable={true}
        />
      </div>
    )
  })
  .add('with error message', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JTextInput
          onValueChange={text => console.log(text)}
          name='error'
          placeholder='Error Field'
          value={''}
          errorMessage={'Something is wrong'}
          successMessage={''}
          editable={true}
        />
      </div>
    )
  })
  .add('with success message', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JTextInput
          onValueChange={text => console.log(text)}
          name='success'
          placeholder='Success Field'
          value={''}
          errorMessage={''}
          successMessage={'Something is right'}
          editable={true}
        />
      </div>
    )
  })
  .add('disabled', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JTextInput
          onValueChange={text => console.log(text)}
          name='disabled'
          placeholder='Disabled Field'
          value={''}
          errorMessage={''}
          successMessage={''}
        />
      </div>
    )
  })
  .add('multiline', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JTextInput
          multiline
          onValueChange={text => console.log(text)}
          name='multiline'
          placeholder='Multiline Field'
          value={''}
          errorMessage={''}
          successMessage={''}
          editable={true}
        />
      </div>
    )
  })

storiesOf('JbLoader', module)
  .add('common', () => {
    return (
      <div style={props.loaderStyle}>
        <JbLoader />
      </div>
    )
  })
  .add('fixed', () => {
    return <JbLoader fixed />
  })

storiesOf('JbLogo', module)
  .add('common', () => {
    return (
      <JbLogo />
    )
  })

storiesOf('JbSelect', module)
  .add('common', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
      />
    )
  })
  .add('selected', () => {
    return (
      <JbSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
        selected={props.currencyList[0]}
      />
    )
  })

storiesOf('JFormAlert', module)
  .add('common', () => {
    return (
      <div style={{width: '420px'}}>
        <JFormAlert
          text='Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
        />
      </div>
    )
  })
