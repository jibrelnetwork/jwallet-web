import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  JFormAlert,
  JTextInput,
  JButton,
  JCheckbox,
  JIcon,
  JLoader,
  JLogo,
  JSelect,
} from '../src/components/base'

import props from './props'

storiesOf('JButton', module)
  .add('white', () => {
    return (
      <div style={{padding: '20px'}}>
        <JButton white label={'White Button'} onClick={() => alert('Button click')} />
      </div>
    )
  })
  .add('blue', () => {
    return (
      <div style={{padding: '20px'}}>
        <JButton blue label={'Blue Button'} onClick={() => alert('Button click')} />
      </div>
    )
  })
  .add('disabled', () => {
    return (
      <div style={{padding: '20px'}}>
        <JButton disabled label={'Disabled Button'} onClick={() => alert('Button click')} />
      </div>
    )
  })

storiesOf('JCheckbox', module)
  .add('common', () => {
    let isActive = false
    const toggle = newState => { isActive = newState }

    return <JCheckbox toggle={toggle} isActive={isActive} />
  })
  .add('with label', () => {
    let isActive = false
    const toggle = newState => { isActive = newState }

    return <JCheckbox toggle={toggle} isActive={isActive} label={'Label'} />
  })

storiesOf('JIcon', module)
  .add('common', () => {
    return (
      <JIcon name='send' />
    )
  })
  .add('small', () => {
    return (
      <JIcon name='convert' small />
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

storiesOf('JLoader', module)
  .add('common', () => {
    return (
      <div style={props.loaderStyle}>
        <JLoader />
      </div>
    )
  })
  .add('fixed', () => {
    return <JLoader fixed />
  })

storiesOf('JLogo', module)
  .add('common', () => {
    return (
      <JLogo />
    )
  })

storiesOf('JSelect', module)
  .add('common', () => {
    return (
      <JSelect
        error={null}
        label={'Currency'}
        list={props.currencyList}
      />
    )
  })
  .add('selected', () => {
    return (
      <JSelect
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
