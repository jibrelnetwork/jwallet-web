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
  JPicker,
} from '../src/components/base'

import props from './props'

const { Item } = JPicker

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
  .add('with value', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JTextInput
          onValueChange={text => console.log(text)}
          name='with-value'
          placeholder='Value Field'
          value={'Some Value'}
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

storiesOf('JPicker', module)
  .add('common', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JPicker
          onValueChange={text => console.log(text)}
          name='common'
          placeholder='Common Field'
          errorMessage={''}
          successMessage={''}
          enabled={true}
        >
          <Item label='Item Value' value='Item Value' />
          <Item label='Item2 Value' value='Item2 Value' />
          <Item label='Item3 Value' value='Item3 Value' />
          <Item label='Item4 Value' value='Item4 Value' />
          <Item label='Item5 Value' value='Item5 Value' disabled />
        </JPicker>
      </div>
    )
  })
  .add('selected value', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JPicker
          onValueChange={text => console.log(text)}
          name='selected'
          selectedValue={'Item2 Value'}
          placeholder='Selected Field'
          errorMessage={''}
          successMessage={''}
          enabled={true}
        >
          <Item label='Item Value' value='Item Value' />
          <Item label='Item2 Value' value='Item2 Value' />
          <Item label='Item3 Value' value='Item3 Value' />
          <Item label='Item4 Value' value='Item4 Value' />
          <Item label='Item5 Value' value='Item5 Value' disabled />
        </JPicker>
      </div>
    )
  })
  .add('error', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JPicker
          onValueChange={text => console.log(text)}
          name='error'
          selectedValue={'Item2 Value'}
          placeholder='Error Field'
          errorMessage={'Error msg'}
          successMessage={''}
          enabled={true}
        >
          <Item label='Item Value' value='Item Value' />
          <Item label='Item2 Value' value='Item2 Value' />
          <Item label='Item3 Value' value='Item3 Value' />
          <Item label='Item4 Value' value='Item4 Value' />
          <Item label='Item5 Value' value='Item5 Value' disabled />
        </JPicker>
      </div>
    )
  })
  .add('success', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JPicker
          onValueChange={text => console.log(text)}
          name='success'
          selectedValue={'Item2 Value'}
          placeholder='Success Field'
          errorMessage={''}
          successMessage={'Success msg'}
          enabled={true}
        >
          <Item label='Item Value' value='Item Value' />
          <Item label='Item2 Value' value='Item2 Value' />
          <Item label='Item3 Value' value='Item3 Value' />
          <Item label='Item4 Value' value='Item4 Value' />
          <Item label='Item5 Value' value='Item5 Value' disabled />
        </JPicker>
      </div>
    )
  })
  .add('disabled', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JPicker
          onValueChange={text => console.log(text)}
          name='disabled'
          selectedValue={'Item2 Value'}
          placeholder='Disabled Field'
          errorMessage={''}
          successMessage={''}
          enabled={false}
        >
          <Item label='Item Value' value='Item Value' />
          <Item label='Item2 Value' value='Item2 Value' />
          <Item label='Item3 Value' value='Item3 Value' />
          <Item label='Item4 Value' value='Item4 Value' />
          <Item label='Item5 Value' value='Item5 Value' disabled />
        </JPicker>
      </div>
    )
  })
  .add('without placeholder', () => {
    return (
      <div style={{backgroundColor: '#fff', padding: '20px', maxWidth: '400px'}}>
        <JPicker
          enabled
          onValueChange={text => console.log(text)}
          name='without-placeholder'
          selectedValue={'Item2 Value'}
          placeholder={''}
          errorMessage={''}
          successMessage={''}
        >
          <Item label='Item Value' value='Item Value' />
          <Item label='Item2 Value' value='Item2 Value' />
          <Item label='Item3 Value' value='Item3 Value' />
          <Item label='Item4 Value' value='Item4 Value' />
          <Item label='Item5 Value' value='Item5 Value' disabled />
        </JPicker>
      </div>
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
