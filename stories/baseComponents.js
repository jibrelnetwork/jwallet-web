import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  JbButton,
  JbCheckbox,
  JbIcon,
  JbInput,
  JbLoader,
  JbLogo,
  JbSelect,
  JbAlert,
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

storiesOf('JbInput', module)
  .add('common', () => {
    return (
      <JbInput
        error={null}
        label={'Account name'}
        placeholder={'Mr. Cardholder'}
      />
    )
  })
  .add('error', () => {
    return (
      <JbInput
        error={'Missing name'}
        label={'Account name'}
        placeholder={'Mr. Cardholder'}
      />
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

storiesOf('JbAlert', module)
  .add('common', () => {
    return (
      <JbAlert text='Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' />
    )
  })
